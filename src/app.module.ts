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

// const options = {
//   strategies: {
//     google: {
//       // clientID: process.env.GOOGLE_CLIENT_ID,
//       // clientSecret: process.env.GOOGLE_SECRET,
//       clientID:
//         '1049577978130-8ebuv43uena587ca09v5smomnh158i48.apps.googleusercontent.com',
//       clientSecret: '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',
//       callbackURL: 'http://localhost:3000/google/redirect',
//       scope: ['email', 'profile'],
//     },
//   },
//   userService: UserService,
// };
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
