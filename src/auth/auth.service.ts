import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(private readonly JWTService: JwtService) { }

    async createToken() {
        // return this.JWTService.sign;
    }

    async checkToken(token: string) {
        //return this.JWTService.verify()
    }

}
