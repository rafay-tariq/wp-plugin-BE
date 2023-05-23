import { Column, Entity, PrimaryGeneratedColumn, Unique, CreateDateColumn,UpdateDateColumn, OneToMany } from 'typeorm';
import { Store } from '../../store/entities/store.entity';
import { StripeAccount } from '../../stripe-account/entities/stripe-account.entity';
import { UserRole, UserStatus } from "../../../../../constant/exception-message.constant";

@Entity('users')
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  isVerified: boolean;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.USER
  })
  userRole: UserRole;

  @Column({
    type: "enum",
    enum: UserStatus,
    default: UserStatus.ACTIVE
  })
  status: UserStatus;

  @Column({ nullable: true, select: false})
  verificationCode: string;

  @Column({ nullable: true})
  profileImage: string;

  @OneToMany(() => Store, (store) => store.user)
  store: Store[]

  @OneToMany(() => StripeAccount, (stripe) => stripe.user)
  stripeAccount: Store[]

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updated_at: Date;

}

