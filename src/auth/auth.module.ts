import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    imports: [JwtModule.register({
        secret: "DTzkbFVrBHyfu4zK6xxJecDoYPuFd7oE"
    }), 
    UserModule,
    PrismaModule
],
    providers: [AuthService],
    controllers: [AuthController]
})
export class AuthModule { }
