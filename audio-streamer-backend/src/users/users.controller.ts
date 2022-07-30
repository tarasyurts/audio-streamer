import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('artists')
export class UsersController {
    constructor(private userService: UsersService) {}

    @Post()
    create(@Body() user: CreateUserDto) {
        return this.userService.create(user);
    }

    @Get('/:id')
    getOne(@Param('id') id: string) {
        return this.userService.getOne(id);
    }

    @Put('/:id')
    update(@Param('id') id: string, @Body() user: CreateUserDto) {
        return this.userService.update(id, user);
    }

    @Post('/:id/block')
    block(@Param('id') id: string) {
        return this.userService.update(id, { isBloked: true });
    }

    @Post('/:id/unblock')
    unblock(@Param('id') id: string) {
        return this.userService.update(id, { isBloked: false });
    }
}
