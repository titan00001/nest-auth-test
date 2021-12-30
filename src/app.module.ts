import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoogleStrategy } from './google.strategy';
import { GoogleOauthGuard } from './google-auth.guard';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, GoogleStrategy, GoogleOauthGuard],
})
export class AppModule {}
