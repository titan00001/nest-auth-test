import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
// import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'nest-auth';
import {
  GoogleOauthGuard,
  FacebookTokenOauthGuard,
  GoogleTokenOauthGuard,
  TwitterOauthGuard,
  LinkedinOauthGuard,
} from 'nest-auth';

@Controller('')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Get('google')
  // @UseGuards(AuthGuard('google'))
  @UseGuards(GoogleOauthGuard)
  async googleAuth(@Req() req) {}

  @Get('google/redirect')
  // @UseGuards(AuthGuard('google'))
  @UseGuards(GoogleOauthGuard)
  async googleAuthRedirect(@Req() req) {
    // console.log(req.user);
    return { user: req.user };
  }

  @Get('twitter')
  @UseGuards(TwitterOauthGuard)
  async twitterAuth(@Req() req) {}

  @Get('twitter/redirect')
  @UseGuards(TwitterOauthGuard)
  async twitterAuthRedirect(@Req() req) {
    return req.user;
  }

  @Get('linkedin')
  @UseGuards(LinkedinOauthGuard)
  async linkedinAuth(@Req() req) {}

  @Get('linkedin/redirect')
  @UseGuards(LinkedinOauthGuard)
  async linkedinAuthRedirect(@Req() req) {
    return req.user;
  }

  // @Get('facebook')
  // @UseGuards(FacebookOauthGuard)
  // async facebookAuth(@Req() req) {}

  // @Get('facebook/redirect')
  // @UseGuards(FacebookOauthGuard)
  // async facebookAuthRedirect(@Req() req) {
  //   return 'hello from twitter';
  // }

  @Get('google-token')
  // @UseGuards(AuthGuard('google'))
  @UseGuards(GoogleTokenOauthGuard)
  async googleTokenAuth(@Req() req) {
    return req.user;
  }

  @Get('facebook-token')
  @UseGuards(FacebookTokenOauthGuard)
  async facebookTokenAuth(@Req() req) {
    return req.user;
  }


  @Get('public')
  getPublicData() {
    return 'public data';
  }
}
