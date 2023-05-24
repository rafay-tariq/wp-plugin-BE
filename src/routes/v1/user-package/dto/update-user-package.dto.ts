import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateUserPackageDto {
    @ApiProperty()
    @IsNotEmpty()
    autoRenew: boolean;

    @ApiProperty()
    @IsNotEmpty()
    expirationDate: Date;

    @ApiProperty()
    @IsNotEmpty()
    packageId: number;

    @ApiProperty()
    @IsNotEmpty()
    isActive: boolean;
    
}
