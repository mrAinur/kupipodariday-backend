import { Injectable } from '@nestjs/common';
import { CreateWishDto } from './dto/create-wish.dto';
// import { UpdateWishDto } from './dto/update-wish.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wish } from './entities/wish.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Wishlist } from '../wishlists/entities/wishlist.entity';

@Injectable()
export class WishesService {
	constructor(
		@InjectRepository(Wish)
		private wishRepository: Repository<Wish>,
		@InjectRepository(User)
		private usersRepository: Repository<User>,
		@InjectRepository(User)
		private wishlistRepository: Repository<Wishlist>
	) {}
	async create(createWishDto: CreateWishDto, userInfo) {
		const user = await this.usersRepository.findOne({
			where: { id: userInfo.id },
			relations: { wishes: true, wishlists: true }
		});
		const wish = await this.wishRepository.create({
			...createWishDto,
			owner: user
		});
		console.log(`${user.wishes} и список подарков ${user.wishlists}`);
		user.wishes.push(wish);
		await this.usersRepository.save(user);
		return await this.wishRepository.save(wish);
	}

	async getWish(id: number, user: User) {
		const userWish = await this.usersRepository.findOne({
			where: { id: user.id },
			relations: { wishes: true }
		});
		return userWish.wishes.find(item => item.id === id);
	}
}
