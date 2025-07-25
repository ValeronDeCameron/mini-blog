import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { createUserDto } from './dto/create-user.dto';
import { updateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findUserById(@Param('id') id: string) {
    return this.userService.findUserById(Number(id))
  }

  @Post("new")
  createNewUser(@Body() dto: createUserDto) {
    return this.userService.createNewUser(dto)
  }

  @Patch("update/:id")
  updateUser(@Param('id') id: string, @Body() dto: updateUserDto) {
    this.findUserById
    return this.userService.updateUser(Number(id), dto);
  }

  @Delete('delete/:id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(Number(id))
  }
}
