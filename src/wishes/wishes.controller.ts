import {
	Controller,
	// Get,
	Post,
	Body,
	// Patch,
	// Param,
	// Delete,
	Req,
	UseGuards
} from '@nestjs/common';
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
// import { UpdateWishDto } from './dto/update-wish.dto';
import { Request } from 'express';
import { JwtGuard } from '../auth/jwt/jwt.guard';

@Controller('wishes')
export class WishesController {
	constructor(private readonly wishesService: WishesService) {}

	@UseGuards(JwtGuard)
	@Post()
	makeNewWish(@Body() createWishDTO: CreateWishDto, @Req() req: Request) {
		return this.wishesService.create(createWishDTO, req.user);
	}
}
