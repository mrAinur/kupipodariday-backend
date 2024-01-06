import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { Profile } from 'passport-yandex';

@Injectable()
export class AuthService {
	constructor(
		private jwtService: JwtService,
		private usersService: UsersService
	) {}

	auth(user: User) {
		const payload = { sub: Number(user.id) };
		return { access_token: this.jwtService.sign(payload) };
	}

	async validatePassword(username: string, password: string) {
		const user = await this.usersService.findByUsername(username);

		/* В идеальном случае пароль обязательно должен быть захэширован */
		if (user && user.password === password) {
			/* Исключаем пароль из результата */
			delete user.password;
			return user;
		}
		return null;
	}

	async validateFromYandex(profile: Profile) {
		const user = await this.usersService.findByEmail(profile.default_email);
		if (!user) return await this.usersService.createFromYandex(profile);
		delete user.password;
		return user;
	}
}
