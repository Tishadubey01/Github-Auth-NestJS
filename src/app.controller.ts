import { Controller, Get, Req, UseGuards,Post, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateRepositoryDto } from './create-repository.dto';
import { Octokit } from 'octokit';

@Controller()
export class AppController {
  
  // constructor() {}

  @UseGuards(AuthGuard('jwt'))
  //get the profile of the user
  @Get('profile')
  getProfile(@Req() req) {
    console.log(req.user);
    return req.user;
  }
  //create a new repository
  @Post('create-repo')
  async createRepo(@Req() req, @Body() createRepoDto: CreateRepositoryDto) {
    console.log(req.user,createRepoDto.name);
    return req.user, createRepoDto.name;
  }
  //get the list of all repositories
  @Get('repositories')
  @UseGuards(AuthGuard('jwt'))
  async getRepositories(@Req() req) {
    const user = req.user;
    const octokit = new Octokit({
      auth: "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",
    });

    try {
      const repositoryNames: string[] = [];

      // Get the first page of repositories
      let response = await octokit.rest.repos.listForAuthenticatedUser({
        username: user.username,
        per_page: 100, // Set the number of repositories per page
        page: 1, // Start with the first page
      });

      // Extract repository names from the first page
      repositoryNames.push(...response.data.map((repo) => repo.name));

      // Fetch remaining pages if available
      const totalPages = octokit.request.endpoint(response).headers.link?.match(/<[^>]+page=(\d+)>;\s+rel="last"/)?.[1];
      if (totalPages) {
        for (let page = 2; page <= parseInt(totalPages); page++) {
          response = await octokit.rest.repos.listForAuthenticatedUser({
            username: user.username,
            per_page: 100, // Set the number of repositories per page
            page, // Fetch the next page
          });

          repositoryNames.push(...response.data.map((repo) => repo.name));
        }
      }

      return {
        message: 'List of repository names',
        repositoryNames: repositoryNames,
      };
    } catch (error) {
      return { message: 'Failed to retrieve repository names', error: error.message };
    }
  }
//get the count of all repositories
  @Get('repositories/count')
  @UseGuards(AuthGuard('jwt'))
  async getRepositoriescount(@Req() req) {
    const user = req.user;
    const octokit = new Octokit({
      auth: "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",
    });

    try {
      let totalCount = 0;
      let page = 1;

      // Fetch repositories page by page until all pages are retrieved
      while (true) {
        const response = await octokit.rest.repos.listForAuthenticatedUser({
          username: user.username,
          per_page: 100, // Set the number of repositories per page
          page,
        });

        totalCount += response.data.length;

        // If the response doesn't have the maximum number of repositories per page,
        // then we have retrieved all repositories and can exit the loop
        if (response.data.length < 100) {
          break;
        }

        page++;
      }

      return {
        message: 'Total number of repositories',
        count: totalCount,
      };
    } catch (error) {
      return { message: 'Failed to retrieve the number of repositories', error: error.message };
    }
  }
}