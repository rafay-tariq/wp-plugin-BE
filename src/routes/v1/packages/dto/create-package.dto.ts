import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';



export class CreatePackageDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  duration: number;

  @ApiProperty()
  @IsNotEmpty()
  maxStripeAccounts: number;

  @ApiProperty()
  @IsNotEmpty()
  maxStores: number;

  @ApiProperty()
  @IsNotEmpty()
  fee: number;

}

