import {
	Controller
	// Get,
	// Post,
	// Body,
	// Patch,
	// Param,
	// Delete,
	// UseGuards,
	// Req
} from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
// import { CreateWishlistDto } from './dto/create-wishlist.dto';
// import { UpdateWishlistDto } from './dto/update-wishlist.dto';
// import { JwtGuard } from '../auth/jwt/jwt.guard';
import { UsersService } from 'src/users/users.service';

@Controller('wishlistlists')
export class WishlistsController {
	constructor(
		private readonly wishlistsService: WishlistsService,
		private readonly usersService: UsersService
	) {}
}
