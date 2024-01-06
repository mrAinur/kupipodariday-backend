import { Controller, Post, UseGuards, Req, Body } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { LocalGuard } from './local/local.guard';
import { CreateUserDto } from '../users/dto/create-user.dto';
// import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AuthController {
	constructor(
		private usersService: UsersService,
		private authService: AuthService
	) {}

	/**
	 * Стратегия local автоматически достанет username и password из тела запроса
	 * Если пароль будет верным, данные пользователя окажутся в объекте req.user
	 */
	@UseGuards(LocalGuard)
	@Post('signin')
	signin(@Req() req) {
		/* Генерируем для пользователя JWT-токен */
		return this.authService.auth(req.user);
	}

	@Post('signup')
	async signup(@Body() createUserDto: CreateUserDto) {
		/* При регистрации создаём пользователя и генерируем для него токен */
		const user = await this.usersService.create(createUserDto);
		return this.authService.auth(user);
	}

	// @UseGuards(AuthGuard('yandex'))
	// @Get('yandex')
	// yandex() {
	// 	/* Этот метод можно оставить пустым, так как Passport перенаправит пользователя в Яндекс */
	// }

	// @UseGuards(AuthGuard('yandex'))
	// @Get('yandex/callback')
	// yandexCallback(@Req() req) {
	// 	return this.authService.auth(req.user);
	// }
}
