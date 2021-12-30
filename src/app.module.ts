import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoogleStrategy } from './google.strategy';
import { AuthService, NestAuthModule } from 'nest-auth';

@Module({
  imports: [
    NestAuthModule.register({
      strategies: {
        google: {
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_SECRET,
          callbackURL: 'http://localhost:3000/google/redirect',
          scope: ['email', 'profile'],
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, GoogleStrategy, AuthService],
})
export class AppModule {}
