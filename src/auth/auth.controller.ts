import { Body, Controller, Post, Headers, UseGuards, Req, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { AuthLogInDTO } from './dto/auth-logIn.dto';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { AuthForgetDto } from './dto/auth-forget.dto';
import { AuthResetDto } from './dto/auth-reset.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { AuthGuard } from 'src/guards/auth.Guard';
import { User } from 'src/decorators/user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { FileService } from 'src/file/file.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly userService: UserService, private readonly authService: AuthService, private readonly fileService: FileService) { }

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

    @UseGuards(AuthGuard)
    @Post('me')
    async me(@User('id') user) {

        return { user: user }
    }

    @UseInterceptors(FileInterceptor('file'))
    @UseGuards(AuthGuard)
    @Post('photo')
    async uploadPhoto(@User() user, @UploadedFile('file') photo: Express.Multer.File) {

        const path = join(__dirname, '../', '../', 'storage', 'photos', `photo-${user.id}.png`)
        try{
            this.fileService.upload(photo, path);
        } catch(e) {
            throw new BadRequestException(e)
        }

        return {sucess:true}
    }
}
