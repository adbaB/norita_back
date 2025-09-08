import { Body, Controller, Put } from '@nestjs/common';
import { UpdateResponse } from '../../utils/responses';
import { User } from '../decorators/user.decorator';
import { UpdateUserDto } from '../dto/user/update-user.dto';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Put()
  update(@Body() createUserDto: UpdateUserDto, @User() user: string): Promise<UpdateResponse> {
    return this.usersService.update(user, createUserDto);
  }
}
