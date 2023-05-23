import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';



export class GetTransactionDto {

  @IsNotEmpty()
  @ApiProperty()
  @MaxLength(100)
  limit: number;

  @IsNotEmpty()
  @ApiProperty()
  offset: number;

  @IsNotEmpty()
  @ApiProperty()
  stripeAccount: number;

}