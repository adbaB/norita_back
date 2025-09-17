import { Body, Controller, Put } from '@nestjs/common';
import { ApiHeader, ApiResponse } from '@nestjs/swagger';
import { UpdateResponse } from '../../utils/responses';
import { User } from '../decorators/user.decorator';
import { UpdateUserDto } from '../dto/user/update-user.dto';
import { UsersService } from '../services/users.service';

/**
 * UsersController is a controller that handles user-related operations.
 * It uses the UsersService to interact with the database.
 */
@ApiHeader({ name: 'Authorization', required: true })
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Update a user
   * @param createUserDto {UpdateUserDto} - The request body containing the user's updated information
   * @param user {string} - The user's UUID
   * @returns {Promise<UpdateResponse>} - A promise that resolves with an UpdateResponse object containing the result of the update
   */
  @ApiResponse({ status: '2XX', type: UpdateResponse, description: 'Success' })
  @ApiResponse({ status: '5XX', description: 'Internal error' })
  @Put()
  update(@Body() dto: UpdateUserDto, @User() user: string): Promise<UpdateResponse> {
    return this.usersService.update(user, dto);
  }
}
