import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {

    private issuer = 'login';
    private audience = 'users'

    constructor(private readonly mailer: MailerService, private readonly JWTService: JwtService, private readonly prisma: PrismaService, private readonly userService: UserService) { }

    createToken(user: User) {
        return {
            accessToken: this.JWTService.sign({
                id: user.id,
                name: user.name,
                email: user.email,
            },
                {
                    expiresIn: '7 days',
                    subject: String(user.id),
                    issuer: this.issuer,
                    audience: this.audience,
                }
            )
        }
    }

    checkToken(token: string) {
        try {
            const data = this.JWTService.verify(token, {
                issuer: this.issuer,
                audience: this.audience,
            });
            return data
        } catch (e) {
            throw new BadRequestException(e);
        }

    }

    isValidToken(token: string) {
        try {
            this.checkToken(token)
            return true
        } catch (e) {
            return false
        }
    }

    async login(email: string, password: string) {
        const user = await this.prisma.user.findFirst({
            where: {
                email
            }
        });

        if (!user) {

            throw new UnauthorizedException('Email e/ou senha incorretos.')
        }

        if (!await bcrypt.compare(password, user.password)) {

            throw new UnauthorizedException('Email e/ou senha incorretos.')
        }

        return this.createToken(user);
    }

    async forget(email: string) {

        const user = await this.prisma.user.findFirst({
            where: {
                email
            }
        });

        if (!user) {
            throw new UnauthorizedException('Email incorretos.')
        }

        //A fazer: Enviar o email para trocar senha

        const token = this.JWTService.sign({
            id: user.id
        }, {
            expiresIn: '30 minutes',
            subject: String(user.id),
            issuer: 'forget',
            audience: 'users',
        })

        await this.mailer.sendMail({
            subject: 'Recuperacao de senha',
            to: 'leo@gmail.com',
            template: 'forget',
            context: {
                name: user.name,
                token: token,
            }
        })

        return true;

    }

    async reset(password: string, token: string) {

        // To do: validar o token...

        try {
            const data = this.JWTService.verify(token, {
                issuer: 'forget',
                audience: 'users',
            });

            // vamos extrair o Id do token
            
            if (isNaN(Number(data.id))) {
                throw new BadRequestException('token invalido');
            }

            password = await bcrypt.hash(password, await bcrypt.genSalt())

            const user = await this.prisma.user.update({
                where: {
                    id: Number(data.id)
                },
                data: {
                    password
                }
            });

            return this.createToken(user);

        } catch (e) {
            throw new BadRequestException(e);
        }




    }

    async register(data: AuthRegisterDto) {
        const user = await this.userService.create(data)

        return this.createToken(user);
    }

}
