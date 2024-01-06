import { IsNotEmpty, IsString, IsUrl, Length } from 'class-validator';
import { Wish } from '../../wishes/entities/wish.entity';
import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Wishlist {
	@PrimaryGeneratedColumn()
	id: number;
	@CreateDateColumn()
	createdAt: Date;
	@UpdateDateColumn()
	updatedAt: Date;
	@Column({
		type: 'varchar',
		length: 250
	})
	@IsNotEmpty()
	@Length(1, 250, { message: 'Строка должна включать от 1 до 250 символов' })
	@IsString()
	name: string;
	@Column({
		type: 'varchar',
		length: 1500
	})
	@IsNotEmpty()
	@Length(1, 1500, { message: 'Строка должна включать от 1 до 1500 символов' })
	@IsString()
	description: string;
	@Column({
		type: 'varchar'
	})
	@IsUrl()
	@IsNotEmpty()
	image: string;
	@OneToMany(() => Wish, wish => wish.wishlist)
	items: Wish[];
	@ManyToOne(() => User, user => user.wishlists)
	owner: User;
}
