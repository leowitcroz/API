import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { PrismaService } from "src/prisma/prisma.service";


@Injectable()
export class UserService {

    constructor(private readonly prisma: PrismaService) { }

    async create({ email, name, password }: CreateUserDto) {

        return await this.prisma.user.create({

            data: {
                email,
                name,
                password
            },
        });

    }

    async list() {
        return await this.prisma.user.findMany()
    }

    async readOne(id: number) {
        return await this.prisma.user.findUnique({
            where: {
                id
            }
        })
    }

}