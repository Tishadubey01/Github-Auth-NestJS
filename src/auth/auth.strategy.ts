import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-github';

import { ExtractJwt, Strategy as PassportJwtStrategy, VerifyCallback } from 'passport-jwt';
import { createOAuthAppAuth } from '@octokit/auth-oauth-app';
import { Octokit } from 'octokit';
@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.get<string>('GITHUB_CLIENT_ID'),
      clientSecret: configService.get<string>('GITHUB_CLIENT_SECRET'),
      callbackURL: 'http://localhost:3000/auth/callback',
      scope: ['public_profile'],
    });
  }


  async validate(accessToken: string, _refreshToken: string, profile: Profile) {
    return profile;
  }
}

@Injectable()
export class JwtStrategy extends PassportStrategy(PassportJwtStrategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    return { id: payload.sub, username: payload.username };
  }
}
@Injectable()
export class AppService {
  private auth() {
    return createOAuthAppAuth({
      clientType: "oauth-app",
      clientId: "4dcd99c81c5786b68030",
      clientSecret: "f81fd2ab71afe297fed4cde50ee6349e52f15e01",
    });
  };

  public async create() {
    const octokit = new Octokit({
      auth:"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",
      // authStrategy: createOAuthAppAuth,
      // auth: this.auth()
    });

    return await octokit.rest.repos.createForAuthenticatedUser({
      name: `repoName/${new Date().toString()}`
    }).then(({ data }) => { message: data });
  }

}


