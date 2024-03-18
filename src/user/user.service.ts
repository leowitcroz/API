import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdatePutUserDto } from "./dto/update-put-user.dto";
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {

    constructor(private readonly prisma: PrismaService) { }

    async create({ email, name, password }: CreateUserDto) {

        password = await bcrypt.hash(password, await bcrypt.genSalt())

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

    async update(id: number, { email, name, password, role }: UpdatePutUserDto) {

        this.exist(id);

        password = await bcrypt.hash(password, await bcrypt.genSalt())

        return this.prisma.user.update({

            data: {
                email, name, password, role
            },

            where: {
                id
            }
        })
    }

    async updateParcial(id: number, data: UpdatePutUserDto) {

        this.exist(id)

        if (data.password) {

            data.password = await bcrypt.hash(data.password, await bcrypt.genSalt());
        }

        return this.prisma.user.update({

            data,
            where: {
                id
            }
        })
    }


    async delete(id: number) {

        this.exist(id)

        return await this.prisma.user.delete(
            { where: { id } }
        )
    }

    async exist(id: number) {
        if (!(await this.readOne(id))) {
            throw new NotFoundException('The user doesnt exist');
        }
    }

}