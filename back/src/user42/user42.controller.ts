import { Controller, Get, Param } from '@nestjs/common';
import { User42Service } from './user42.service';

@Controller('user42')
export class User42Controller {
	constructor(private readonly user42Service: User42Service) {}

	@Get(':id')
	async findOne(@Param('id') id: string) {
		return await this.user42Service.findById(id);
	}
}