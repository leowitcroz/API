import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot([{
    ttl: 60,
    limit: 10,
  }]), forwardRef(() => AuthModule), forwardRef(() => UserModule),
   MailerModule.forRoot({
    transport: 'smtps://vinnie.bashirian@ethereal.email:QPeeSrYKxBxepdS52X@smtp.ethereal.email',
    defaults: {
      from: '"nest-modules" <modules@nestjs.com>',
    },
    template: {
      dir: __dirname + '/templates',
      adapter: new PugAdapter(),
      options: {
        strict: true,
      },
    },
  }),],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    }],
})
export class AppModule { }
