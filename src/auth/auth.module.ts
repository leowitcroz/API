import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';

@Module({
    imports: [JwtModule.register({
        secret: "DTzkbFVrBHyfu4zK6xxJecDoYPuFd7oE"
    })],
    providers: [AuthService]
})
export class AuthModule { }
