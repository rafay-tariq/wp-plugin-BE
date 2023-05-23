import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePackageDto {
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
