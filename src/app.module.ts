import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { GoogleStrategy } from './google.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { NestAuthModule, NestAuthModuleOptions } from 'nest-auth';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    UserModule,
    NestAuthModule.forRootAsync(NestAuthModule, {
      imports: [UserModule],
      inject: [UserService],
      useFactory: (userService: UserService): NestAuthModuleOptions => {
        return {
          userService,
          strategies: {
            google: {
              clientID: process.env.GOOGLE_CLIENT_ID,
              clientSecret: process.env.GOOGLE_SECRET,
              callbackURL: 'http://localhost:3000/google/redirect',
              scope: ['email', 'profile'],
            },
            twitter: {
              clientID: process.env.TWITTER_CLIENT_ID,
              clientSecret: process.env.TWITTER_SECRET,
              callbackURL: 'http://localhost:3000/twitter/redirect',
            },
            facebook: {
              clientID: process.env.FB_CLIENT_ID,
              clientSecret: process.env.FB_SECRET,
              callbackURL: 'http://localhost:3000/facebook/redirect',
            },
            linkedIn: {
              clientID: process.env.LI_CLIENT_ID,
              clientSecret: process.env.LI_SECRET,
              callbackURL: 'http://localhost:3000/linkedin/redirect',
              scope: ['r_emailaddress', 'r_liteprofile'],
            },
            facebookToken: {
              clientID: process.env.FB_CLIENT_ID,
              clientSecret: process.env.FB_SECRET,
            },
            googleToken: {
              clientID: process.env.GOOGLE_CLIENT_ID,
              clientSecret: process.env.GOOGLE_SECRET,
            },
          },
        };
      },
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/nest-auth'),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // GoogleStrategy,
    // UserService,
    // AuthService,
  ],
})
export class AppModule {}
