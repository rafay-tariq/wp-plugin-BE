import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn,UpdateDateColumn } from 'typeorm';


@Entity('stripeAccount')
export class UpdateStripeAccountDto {

  @Column()
  stripeName: string;

  @Column()
  publicKey: string;

  @Column()
  secretKey: string;

  @Column()
  approvedWebsiteUrl: string;

  @Column()
  productDescription: string;

  @Column({ default: true })
  isActiveAccount: boolean;

  @Column()
  isLiveAccount: boolean;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updated_at: Date;

}