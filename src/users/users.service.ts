import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Profile } from 'passport-yandex';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private usersRepository: Repository<User>
	) {}

	async create(createUserDto: CreateUserDto) {
		const user = await this.usersRepository.create(createUserDto);
		return await this.usersRepository.save(user);
	}

	async findOneById(id: number) {
		return await this.usersRepository.findOneBy({ id });
	}

	async findByUsername(username: string) {
		const user = await this.usersRepository.findOneBy({ username });
		return user;
	}

	async findByEmail(email: string) {
		const user = await this.usersRepository.findOneBy({ email });
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

	async createFromYandex(profile: Profile) {
		const user = await this.usersRepository.create({
			username: profile.username,
			email: profile.default_email,
			password: profile.login
		});
		return await this.usersRepository.save(user);
	}
}
