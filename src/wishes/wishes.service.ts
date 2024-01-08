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
		user.wishes.push(wish);
		await this.usersRepository.save(user);
		return await this.wishRepository.save(wish);
	}

	async getWish(id: number) {
		const userWish = await this.wishRepository.findOne({
			where: { id },
			relations: { owner: true }
		});
		return userWish;
	}

	async removeWish(id: number) {
		const wish = await this.wishRepository.findOne({ where: { id } });
		return await this.wishRepository.remove(wish);
	}

	async getLastWishes() {
		return this.wishRepository.find({ order: { createdAt: 'DESC' }, take: 40 });
	}

	async getTopWishes() {
		return this.wishRepository.find({ order: { copied: 'DESC' }, take: 20 });
	}
}
