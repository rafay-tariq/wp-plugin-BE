import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn,UpdateDateColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { StripeAccount } from '../../stripe-account/entities/stripe-account.entity';
import { User } from '../../users/entities/user.entity';


@Entity('store')
export class Store {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  websiteName: string;

  @Column()
  websiteUrl: string;

  @Column()
  consumerKey: string;

  @Column()
  consumerSecretKey: string;

  @Column()
  stripeAccountId: number;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.store)
  user: User

  @ManyToOne(() => StripeAccount, (stripe) => stripe.store)
  stripeAccount: StripeAccount

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updated_at: Date;

}
