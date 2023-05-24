import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';



export class CreateUserPackageDto {
  @ApiProperty()
  @IsNotEmpty()
  autoRenew: boolean;

  @ApiProperty()
  @IsNotEmpty()
  expirationDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  userId: number;

  @ApiProperty()
  @IsNotEmpty()
  packageId: number;

}
