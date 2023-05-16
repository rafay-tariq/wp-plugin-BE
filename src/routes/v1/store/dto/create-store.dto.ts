import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStoreDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  websiteName: string;

  @ApiProperty()
  @IsOptional()
  @IsUrl()
  websiteUrl?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  consumerKey: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  consumerSecretKey: string;

  @ApiProperty()
  @IsNotEmpty()
  stripeAccountId: number;

}
