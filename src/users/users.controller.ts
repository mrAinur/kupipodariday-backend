import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	UseGuards,
	Req,
	Param
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtGuard } from '../auth/jwt/jwt.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	createUser(@Body() createUserDto: CreateUserDto) {
		return this.usersService.create(createUserDto);
	}

	@UseGuards(JwtGuard)
	@Patch('me')
	editUser(@Body() newUserData: UpdateUserDto, @Req() req) {
		return this.usersService.editUser(newUserData, req.user);
	}

	@UseGuards(JwtGuard)
	@Get(':id')
	findOne(@Req() req) {
		return req.user;
	}

	@UseGuards(JwtGuard)
	@Get('me/wishes')
	getUserWishes(@Req() req) {
		return this.usersService.getUserWishes(req.user);
	}

	@UseGuards(JwtGuard)
	@Get(':id/wishes')
	getUser(@Param() userQuery) {
		return this.usersService.getUsers({
			where: [{ email: userQuery.id }, { username: userQuery.id }],
			relations: { wishes: true }
		});
	}

	@UseGuards(JwtGuard)
	@Post('find')
	getUsers(@Body() query) {
		return this.usersService.getUsers({
			where: [{ email: query.query }, { username: query.query }]
		});
	}
}
