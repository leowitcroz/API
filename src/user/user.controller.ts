import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Patch, Post, Put, UseGuards, } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdatePutUserDto } from "./dto/update-put-user.dto";
import { UpdatePatchUserDto } from "./dto/update-patch-user.dto";
import { UserService } from "./user.service";
import { Roles } from "src/decorators/role.decorator";
import { Role } from "src/enums/role.enum";
import { RoleGuard } from "src/guards/role.Guard";
import { AuthGuard } from "src/guards/auth.Guard";

@UseGuards(AuthGuard,RoleGuard)
@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Roles(Role.Admin)
    @Post()
    async create(@Body() { email, name, password, role}: CreateUserDto) {
        return await this.userService.create({ email, name, password,role })
    }

    @Roles(Role.Admin)
    @Get()
    async read() {
        return await this.userService.list()
    }

    @Roles(Role.Admin)
    @Get(':id')
    async readOne(@Param('id', ParseIntPipe) id) {
        return await this.userService.readOne(id)
    }  

    @Roles(Role.Admin)
    @Put(':id')
    async update(@Body() { email, name, password, role }: UpdatePutUserDto, @Param('id', ParseIntPipe) params) {
        return this.userService.update(params, { email, name, password, role })
    }


    @Roles(Role.Admin)
    @Patch(':id')
    async updateParcial(@Body() { email, name, password, role }: UpdatePatchUserDto, @Param('id', ParseIntPipe) params) {
        return this.userService.updateParcial(params, { email, name, password, role })
    }

    @Roles(Role.Admin)
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id) {
        return this.userService.delete(id)
    }


}