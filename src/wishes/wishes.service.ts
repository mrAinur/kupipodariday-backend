import { Injectable } from '@nestjs/common';
import { CreateWishDto } from './dto/create-wish.dto';
// import { UpdateWishDto } from './dto/update-wish.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wish } from './entities/wish.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class WishesService {
	constructor(
		@InjectRepository(Wish)
		private wishRepository: Repository<Wish>,
		@InjectRepository(User)
		private usersRepository: Repository<User>
	) {}
	async create(createWishDto: CreateWishDto, userInfo) {
		const user = await this.usersRepository.findOneBy({ id: userInfo.id });
		const wish = await this.wishRepository.create({
			...createWishDto,
			owner: user
		});
		console.log(user.wishes);
		await user.wishes.push(wish);
		await this.usersRepository.save(user);
		return await this.wishRepository.save(wish);
	}
}
