import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { Wishlist } from '../wishlists/entities/wishlist.entity';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private usersRepository: Repository<User>,
		@InjectRepository(User)
		private wishlistRepository: Repository<Wishlist>
	) {}

	async create(createUserDto: CreateUserDto) {
		const user = await this.usersRepository.create(createUserDto);
		// const wishlist = await this.wishlistRepository.create();
		return await this.usersRepository.save(user);
	}

	async findOneById(id: number) {
		return await this.usersRepository.findOneBy({ id });
	}

	async findByUsername(username: string) {
		const user = await this.usersRepository.findOneBy({ username });
		return user;
	}

	async editUser(editUserData: UpdateUserDto, user) {
		return await this.usersRepository.save({
			...user,
			...editUserData
		});
	}

	async getUsers(query: FindManyOptions<User>) {
		return this.usersRepository.find(query);
	}

	async getUserWishes(user: User) {
		const userWishes = await this.usersRepository.findOne({
			where: { id: user.id },
			relations: { wishes: true }
		});
		return userWishes.wishes;
	}
}
