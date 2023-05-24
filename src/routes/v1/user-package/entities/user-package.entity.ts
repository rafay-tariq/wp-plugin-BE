import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn,UpdateDateColumn, ManyToOne } from 'typeorm';
import { Package } from '../../packages/entities/package.entity';
import { User } from '../../users/entities/user.entity';


@Entity('userPackage')
export class UserPackage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({default: false})
  autoRenew: boolean;

  @Column()
  expirationDate: Date;

  @Column({ default: true})
  isActive: boolean;

  @Column()
  userId: number;

  @Column()
  stripeTransactionId: number;

  @ManyToOne(() => User, (user) => user.stripeAccount)
  user: User;

  @Column()
  packageId: number;

  @ManyToOne(() => Package, (userPackage) => userPackage.userPackage)
  package: Package;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updated_at: Date;
}