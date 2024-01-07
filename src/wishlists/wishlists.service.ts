import { Injectable } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';

@Injectable()
export class WishlistsService {
	create(createWishlistDto: CreateWishlistDto) {
		return 'This action adds a new wishlist';
	}
}
