import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { User } from 'src/decorators/user.decorator';
import { FIleModule } from 'src/file/file.module';

@Module({
    imports: [JwtModule.register({
        secret: process.env.JWT_SECRET
    }), 
    forwardRef(() => UserModule),
    PrismaModule,
    FIleModule
],
    providers: [AuthService],
    controllers: [AuthController],
    exports: [AuthService,]
})
export class AuthModule { }
