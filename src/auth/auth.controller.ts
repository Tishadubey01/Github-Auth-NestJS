//auth.controller.ts

import { Controller, Get, Req, UseGuards,Post, Body, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Octokit } from 'octokit';

import { CreateRepositoryDto } from 'src/create-repository.dto';
@Controller('auth')
export class AuthController {
  constructor(private jwtService: JwtService) {}

  @Get()
  @UseGuards(AuthGuard('github'))
  async login() {
    //
  }

  @Get('callback')
  @UseGuards(AuthGuard('github'))
  async authCallback(@Req() req ,@Res() res) {
    const user = req.user;
    const payload = { sub: user.id, username: user.username };
    const accessToken = this.jwtService.sign(payload);
    console.log(accessToken);
    res.redirect( '/homepage.html?token=' + accessToken);
    // return { accessToken: this.jwtService.sign(payload) };
  }
  @Post('create-repo')
  @UseGuards(AuthGuard('jwt'))
  async createRepo(@Req() req,@Body() createRepoDto:CreateRepositoryDto){
    
    const user=req.user;
    const repoName=createRepoDto.name;
    
    const octokit = new Octokit({
      
      auth:"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",
  });
  try{
    const response=await octokit.rest.repos.createForAuthenticatedUser({
      // name:`${repoName}/${new Date().toString()}`
      name:`${repoName}`
  });
  return{message:'Repository created successfully',repository:response.data
  };
  }catch(error){
    return{message:'Repository creation failed',error:error.message};
  }
  }
  

}


