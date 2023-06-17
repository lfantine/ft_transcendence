import { Injectable, Req } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';
import { User42Service } from 'src/user42/user42.service';

@Injectable()
export class DashboardService {
	constructor(
		private userService: UserService,
		private user42Service: User42Service,
		private configService: ConfigService,
		private jwtService: JwtService,
	) {}

	async isAuthVerif(@Req() request: Request) {
		try {
            const user = this.jwtService.verify(request?.cookies?.Authentification, this.configService.get('JWT_SECRET'));
			if ( user.is42 === true)
				return ({id: user.id, is42: true});
			return ({id: user.id, is42: false});
        } catch (error) {
			return undefined;
        }
	}

	async postPic(binaryImg: ArrayBuffer, id: string, is42: boolean) {
		try {
			let user;
			if (is42 === true) {
				user = await this.user42Service.findById(id);
				user.pic = binaryImg;
				console.log('test encore');
				await this.user42Service.updateUser42(user);
			}
			else {
				user = await this.userService.findById(id);
				user.pic = binaryImg;
				await this.userService.updateUser(user);
			}
			return {mess: 'picture upload'};
		} catch (e) {
			console.log('ERROROROR');
			return {mess: 'picture error'};
		}
	}

	async postUsername(newUsername: string, id: string, is42: boolean) {
		try {
			const alreadyUser = await this.userService.findByUsername(newUsername);
			return {mess: 'username already taken in user', err: -2};
		}
		catch (e) {}
		try {
			const alreadyUser = await this.user42Service.findByUsername(newUsername);
			return {mess: 'username already taken in user42', err: -2};
		}
		catch (e) {}
		try {
			let user;
			if (is42 === true) {
				user = await this.user42Service.findById(id);
				user.username = newUsername;
				await this.user42Service.updateUser42(user);
			}
			else {
				user = await this.userService.findById(id);
				user.username = newUsername;
				await this.userService.updateUser(user);
			}
			return {mess: 'username upload', err: 0};
		} catch (e) {
			console.log('ERROROROR');
			return {mess: 'username error', err: -1};
		}
	}

	async postDesc(newDesc: string, id: string, is42: boolean) {
		try {
			let user;
			if (is42 === true) {
				user = await this.user42Service.findById(id);
				user.desc = newDesc;
				await this.user42Service.updateUser42(user);
			}
			else {
				user = await this.userService.findById(id);
				user.desc = newDesc;
				await this.userService.updateUser(user);
			}
			return {mess: 'desc upload', err: 0};
		} catch (e) {
			console.log('ERROROROR');
			return {mess: 'username error', err: -1};
		}
	}
}
