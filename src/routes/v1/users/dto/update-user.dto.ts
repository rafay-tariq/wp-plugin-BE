import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole, UserStatus } from "../../../../../constant/exception-message.constant";

export class UpdateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  password: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  status: UserStatus;

  @ApiProperty()
  @IsOptional()
  @IsString()
  userRole: UserRole;

}
