import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Patch, Post, Put, } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdatePutUserDto } from "./dto/update-put-user.dto";
import { UpdatePatchUserDto } from "./dto/update-patch-user.dto";
import { UserService } from "./user.service";

@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Post()
    async create(@Body() { email, name, password }: CreateUserDto) {
        return await this.userService.create({ email, name, password })
    }

    @Get()
    async read() {
        return await this.userService.list()
    }

    @Get(':id')
    async readOne(@Param('id', ParseIntPipe) id) {
        return await this.userService.readOne(id)
    }

    @Put(':id')
    async update(@Body() body: UpdatePutUserDto, @Param('id', ParseIntPipe) params) {
        return {
            body,
            params
        }
    }

    @Patch(':id')
    async updateParcial(@Body() body: UpdatePatchUserDto, @Param('id', ParseIntPipe) params) {
        return {
            body,
            params
        }
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id) {
        this.exist(id)
        return this.userService.delete(id)
    }

    async exist(id: number) {
        if (!(await this.readOne(id))) {
            throw new NotFoundException('The user doesnt exist');
        }
    }
}