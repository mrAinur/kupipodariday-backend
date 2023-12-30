import { IsEmail, IsNotEmpty, IsString, IsUrl, Length } from 'class-validator';
import { Offer } from '../../offers/entities/offer.entity';
import { Wish } from '../../wishes/entities/wish.entity';
import { Wishlist } from '../../wishlists/entities/wishlist.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @Column({
    type: 'varchar',
    length: 30,
  })
  @IsNotEmpty()
  @Length(2, 30, { message: 'Строка должна включать от 2 до 30 символов' })
  @IsString()
  username: string;
  @Column({
    type: 'varchar',
    length: 200,
    default: 'Пока ничего не рассказал о себе',
  })
  @IsNotEmpty()
  @Length(2, 200, { message: 'Строка должна включать от 2 до 200 символов' })
  @IsString()
  about: string;
  @Column({
    type: 'varchar',
    default: 'https://i.pravatar.cc/300',
  })
  @IsUrl()
  avatar: string;
  @Column({
    type: 'varchar',
    unique: true,
  })
  @IsEmail()
  email: string;
  @Column({
    type: 'varchar',
  })
  @IsNotEmpty()
  password: string;
  @OneToMany(() => Wish, (wish) => wish.owner)
  wishes: Wish[];
  @OneToMany(() => Offer, (offer) => offer.user)
  offers: Offer[];
  @OneToMany(() => Wishlist, (wishlist) => wishlist.owner)
  wishlists: Wishlist[];
}
