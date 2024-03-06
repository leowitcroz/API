import { IsEmail, IsStrongPassword } from "class-validator";

export class AuthLogInDTO {
    @IsEmail()
    email : string

    @IsStrongPassword({
        minLength: 6,
        minUppercase: 0,
        minSymbols: 0,
        minNumbers: 0,
    })
    password: string;
}