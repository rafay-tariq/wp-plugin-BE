import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

@Entity('stripeAccount')
export class CreateStripeAccountDto {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  stripeName: string;

  @ApiProperty()
  @IsNotEmpty()
  publicKey: string;

  @ApiProperty()
  @IsNotEmpty()
  secretKey: string;

  @ApiProperty()
  @IsNotEmpty()
  approvedWebsiteUrl: string;

  @ApiProperty()
  @IsOptional()
  productDescription: string;

  @ApiProperty()
  @IsNotEmpty()
  isActiveAccount: boolean;

  @ApiProperty()
  @IsNotEmpty()
  isLiveAccount: boolean;

}