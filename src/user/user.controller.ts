import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdatePutUserDto } from "./dto/update-put-user.dto";

@Controller('users')
export class UserController {

    @Post()
    async create(@Body() body: CreateUserDto) {
        return {
            body
        }
    }

    @Get()
    async read() {
        return {
            users: []
        }
    }

    @Get(':id')
    async readOne(@Param() params) {
        return {
            user: [],
            params
        }
    }

    @Put(':id')
    async update(@Body() body: UpdatePutUserDto, @Param() params) {
        return {
            body,
            params
        }
    }

    @Patch(':id')
    async updateParcial(@Body() body, @Param() params) {
        return {
            body,
            params
        }
    }

    @Delete(':id')
    async delete(@Param() params){
        return params
    }


}