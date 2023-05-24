import { Transform } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn,UpdateDateColumn, OneToMany } from 'typeorm';
import { UserPackage } from '../../user-package/entities/user-package.entity';


@Entity('package')
export class Package {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  name: string;

  @Column()
  price: number;

  @Column()
  duration: number; // in days

  @Column()
  fee: number; // in days

  @Column()
  maxStripeAccounts: number;

  @Column()
  maxStores: number;


  @OneToMany(() => UserPackage, (userPackage) => userPackage.package)
  userPackage: UserPackage[]
  
  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updated_at: Date;

}
