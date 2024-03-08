import { Body, Controller, Post } from '@nestjs/common';
import { AuthLogInDTO } from './dto/auth-logIn.dto';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { AuthForgetDto } from './dto/auth-forget.dto';
import { AuthResetDto } from './dto/auth-reset.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly userService: UserService, private readonly authService: AuthService) { }

    @Post('login')
    async logIn(@Body() { email, password }: AuthLogInDTO) {
        return this.authService.login(email, password)
    }

    @Post('register')
    async register(@Body() body: AuthRegisterDto) {
        return this.authService.register(body)
    }

    @Post('forget')
    async forget(@Body() { email }: AuthForgetDto) {
        return this.authService.forget(email)
    }

    @Post('reset')
    async reset(@Body() { password, token }: AuthResetDto) {
        return this.authService.reset(password, token)
    }
}
