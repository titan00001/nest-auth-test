import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
// import { GoogleOauthGuard } from './google-auth.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('google')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(AuthGuard('google'))
  // @UseGuards(GoogleOauthGuard)
  async googleAuth(@Req() req) {}

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  // @UseGuards(GoogleOauthGuard)
  googleAuthRedirect(@Req() req) {
    return this.appService.googleLogin(req);
  }

  @Get('/resource')
  @UseGuards(AuthGuard('google'))
  // @UseGuards(GoogleOauthGuard)
  async protectedRoute() {
    return 'You are logged in. You can view it';
  }

  @Get('/public')
  async unsecuredRoute() {
    return 'Anyone can view it';
  }
}
