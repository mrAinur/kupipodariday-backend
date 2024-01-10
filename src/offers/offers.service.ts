import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { Wish } from '../wishes/entities/wish.entity';
import { Offer } from './entities/offer.entity';

@Injectable()
export class OffersService {
	constructor(
		@InjectRepository(User)
		private usersRepository: Repository<User>,
		@InjectRepository(Wish)
		private wishRepository: Repository<Wish>,
		@InjectRepository(Offer)
		private offerRepository: Repository<Offer>
	) {}

	async createOffer(createOfferDto: CreateOfferDto, user: User) {
		const wish = await this.wishRepository.findOne({
			where: { id: +createOfferDto.itemId },
			relations: { owner: true }
		});
		if (wish.owner.id === user.id) {
			throw new BadRequestException({
				description: 'Вы не можете скидываться на подарок себе'
			});
		} else if (
			Number(wish.raised) + Number(createOfferDto.amount) >
			Number(wish.price)
		) {
			throw new BadRequestException({
				description:
					'Вы не можете скидывать сумму, которая при добавлении к текущей собранной сумме превысит стоимость подарка'
			});
		}
		wish.raised = Number(createOfferDto.amount) + Number(wish.raised);
		this.wishRepository.save(wish);
		const offer = await this.offerRepository.create({
			user,
			item: wish,
			amount: createOfferDto.amount,
			hidden: createOfferDto.hidden,
			name: user.username
		});
		return await this.offerRepository.save(offer);
	}
}
