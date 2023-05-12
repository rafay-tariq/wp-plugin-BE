import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn,UpdateDateColumn } from 'typeorm';


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
  stripeAccount: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updated_at: Date;

}
