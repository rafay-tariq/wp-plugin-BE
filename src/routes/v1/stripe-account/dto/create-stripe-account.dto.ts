import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn,UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('stripeAccount')
export class CreateStripeAccountDto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ApiProperty()
  stripeName: string;

  @Column()
  @ApiProperty()
  publicKey: string;

  @Column()
  @ApiProperty()
  secretKey: string;

  @Column()
  @ApiProperty()
  approvedWebsiteUrl: string;

  @Column()
  @ApiProperty()
  productDescription: string;

  @Column({ default: true })
  @ApiProperty()
  isActiveAccount: boolean;

  @Column()
  @ApiProperty()
  isLiveAccount: boolean;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updated_at: Date;

}