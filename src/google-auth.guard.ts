import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GoogleOauthGuard extends AuthGuard('google') {
  constructor() {
    super();
    console.log('in auth guard');
  }
  handleRequest(err, user, info, context, status) {
    console.log('in handle request:auth guard');
    if (err || !user) {
      throw err || new HttpException(info, status || HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}
