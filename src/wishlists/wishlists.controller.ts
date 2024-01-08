import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	Req,
	UseGuards
	// Patch,
	// Param,
	// Delete,
	// UseGuards,
	// Req
} from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
// import { CreateWishlistDto } from './dto/create-wishlist.dto';
// import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { JwtGuard } from '../auth/jwt/jwt.guard';
import { CreateWishlistDto } from './dto/create-wishlist.dto';

@Controller('wishlistlists')
export class WishlistsController {
	constructor(private readonly wishlistsService: WishlistsService) {}

	@UseGuards(JwtGuard)
	@Get()
	getWishlists(@Req() req) {
		return this.wishlistsService.getWishlists(req.user.id);
	}

	@UseGuards(JwtGuard)
	@Post()
	createWishlist(@Body() createWishlistDto: CreateWishlistDto, @Req() req) {
		return this.wishlistsService.createWishlist(createWishlistDto, req.user.id);
	}

	@UseGuards(JwtGuard)
	@Get(':id')
	getWishlist(@Param() userQuery: { id: string }) {
		return this.wishlistsService.getWishlist(+userQuery.id);
	}
}
