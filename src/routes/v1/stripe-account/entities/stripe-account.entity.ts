import { Column, Entity, PrimaryGeneratedColumn, Unique, CreateDateColumn,UpdateDateColumn, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { Store } from '../../store/entities/store.entity';
import { User } from '../../users/entities/user.entity';


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

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.stripeAccount)
  user: User;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updated_at: Date;

  @OneToMany(() => Store, (store) => store.stripeAccount)
  store: Store[]
}