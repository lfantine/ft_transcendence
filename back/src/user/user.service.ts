import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from './User.entity';
import { Repository } from 'typeorm';
import CreateUserDto from './userCreate.dto';

@Injectable()
export class UserService {
	constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

	async findById(id: string): Promise<User>{
		const user = await this.userRepository.findOneBy({id});
		if (user) {
			return user;
		}
		throw new HttpException('User with this id does not exist !', HttpStatus.NOT_FOUND);
	}

	async findByMail(mail: string): Promise<User>{
		const user = await this.userRepository.findOneBy({mail});
		if (user) {
			return user;
		}
		throw new HttpException('User with this id does not exist !', HttpStatus.NOT_FOUND);
	}

	async createUser(userData: CreateUserDto) {
		const newUser = await this.userRepository.create(userData);
		await this.userRepository.save(newUser);
		return newUser;
	}

	async removeUser(id: number): Promise<void>{
		await this.userRepository.delete(id);
	}
}
