import { IsEmail, IsMobilePhone, Length, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @Length(1, 50, { message: 'Name must be between 1 and 50 characters' })
  @ApiProperty({ description: 'The name of the user' })
  name: string;

  @IsEmail({}, { message: 'Invalid email format' })
  @ApiProperty({ description: 'The email address of the user' })
  email: string;

  @IsMobilePhone(undefined, undefined, {
    message: 'Invalid mobile number format',
  })
  @ApiProperty({ description: 'The mobile number of the user' })
  mobileNo: string;

  @IsDateString(undefined, { message: 'Invalid date format' })
  @ApiProperty({ description: 'The date of birth of the user' })
  dateOfBirth: Date;
}
