import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn,UpdateDateColumn } from 'typeorm';


@Entity('stripeAccount')
export class UpdateStripeAccountDto {

  @IsNotEmpty()
  @ApiProperty()
  stripeName: string;

  @IsNotEmpty()
  @ApiProperty()
  publicKey: string;

  @IsNotEmpty()
  @ApiProperty()
  secretKey: string;

  @IsNotEmpty()
  @ApiProperty()
  approvedWebsiteUrl: string;

  @IsNotEmpty()
  @ApiProperty()
  productDescription: string;

  @IsNotEmpty()
  @ApiProperty()
  isActiveAccount: boolean;

  @IsNotEmpty()
  @ApiProperty()
  isLiveAccount: boolean;
}