import { Column, Entity, PrimaryGeneratedColumn, Unique, CreateDateColumn,UpdateDateColumn } from 'typeorm';


@Entity('stripeAccount')
export class StripeAccount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  stripeName: string;

  @Column()
  publicKey: string;

  @Column()
  secretKey: string;

  @Column()
  approvedWebsiteUrl: string;

  @Column({nullable: true})
  productDescription: string;

  @Column({ default: true })
  isActiveAccount: boolean;

  @Column({default: false})
  isLiveAccount: boolean;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updated_at: Date;

}