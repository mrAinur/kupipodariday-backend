import { Module } from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { WishlistsController } from './wishlists.controller';
import { UsersModule } from '../users/users.module';

@Module({
	imports: [UsersModule],
	controllers: [WishlistsController],
	providers: [WishlistsService]
})
export class WishlistsModule {}
