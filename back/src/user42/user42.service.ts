import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User42 from './User42.entity';
import { Repository } from 'typeorm';
import CreateUser42Dto from './user42Create.dto';

@Injectable()
export class User42Service {
	constructor(@InjectRepository(User42) private user42Repository: Repository<User42>) {}

	async findById(id: string): Promise<User42>{
		const user = await this.user42Repository.findOneBy({id});
		if (user) {
			return user;
		}
		throw new HttpException('User with this id does not exist !', HttpStatus.NOT_FOUND);
	}

	async findByToken(token: string): Promise<User42>{
		const user = await this.user42Repository.findOneBy({token});
		if (user) {
			return user;
		}
		throw new HttpException('User with this token does not exist !', HttpStatus.NOT_FOUND);
	}

	async findByMail(mail: string): Promise<User42>{
		const user = await this.user42Repository.findOneBy({mail});
		if (user) {
			return user;
		}
		throw new HttpException('User with this mail does not exist !', HttpStatus.NOT_FOUND);
	}

	async updateUser42(newUser: Partial<User42>): Promise<User42>{
		try {
			const { mail } = newUser;
			const user = await this.user42Repository.findOneBy({mail});
			const updateUser = Object.assign(user, newUser);
			this.user42Repository.save(updateUser);
			return updateUser;
		} catch (e) {
			return undefined;
		}
	}

	async createUser(userData: CreateUser42Dto) {
		const newUser = await this.user42Repository.create(userData);
		await this.user42Repository.save(newUser);
		return newUser;
	}

	async removeUser(id: number): Promise<void>{
		await this.user42Repository.delete(id);
	}
}