import { HttpException, HttpStatus, Injectable, Req, Res } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import CreateUserDto from 'src/user/userCreate.dto';
import * as bcrypt from 'bcrypt';
import PostgresErrorCodes from 'src/database/potgresErrorCodes';
import { Request, Response, response } from 'express';
import { match } from 'assert';
import RequestUser from './interface/RequestUser';
import User from 'src/user/User.entity';
import TokenPayload from './interface/TokenPayload ';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {

	constructor(
		private userService: UserService,
		private jwtService: JwtService,
		private configService: ConfigService
	) {}

	async register({mail, password, username}:CreateUserDto) {

		// here could be the validate email step before reister 

		try{
			const hashedPassword = await bcrypt.hash(password, 12);
			const user = await this.userService.createUser({mail, username, password: hashedPassword});
			user.password = undefined;
			return user;
		} catch (e) {
			if (e?.code === PostgresErrorCodes.UniqueViolation){
				// throw new HttpException('Email already taken !', HttpStatus.CONFLICT);
				return '1';
			}
		}
		throw new HttpException('Something went wrong !', HttpStatus.INTERNAL_SERVER_ERROR);
	}

	async login(@Req() request: RequestUser) {
		const { user } = request;
		const cookie = await this.getCookieJwtToken(user);
		return cookie;
	}

	async getCookieJwtToken(user: User)
	{
		const payload: TokenPayload = {user};
		const token = this.jwtService.sign(payload);
		return `Authentification=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_EXPIRATION_TIME')};`;
	}

	async validateUser(mail: string, password: string) {
		try{
			const user = await this.userService.findByMail(mail);
			await this.comparePassword(password, user.password);
			user.password = undefined;
			return user;
		} catch (error) {

		}
	}
	
	async myValidate(@Req() request: Request){
		const {mail , password}  = request.body;
		try {
			const user = await this.userService.findByMail(mail);
			const err = await this.comparePassword(password, user.password);
			if (err != 0)
				return err;
			user.password = undefined;
			return user;
		} catch (e)
		{
			return '1';
		}
	}
	
	async comparePassword(password: string, hashedPassword: string){
		const passMatching = await bcrypt.compare(password, hashedPassword);
		if (!passMatching){
			// throw new HttpException('bad password !', HttpStatus.BAD_REQUEST);
			return '2';
		}
		return 0;
	}

	async ValidateIsLog(@Req() request: Request){
		try {
            const { user } = this.jwtService.verify(request?.cookies?.Authentification, this.configService.get('JWT_SECRET'));
			user.password = undefined;
			console.log(user);
			return user;
        } catch (error) {
			return undefined;
        }
	}

 	getCookieForLogout()
	{
		return 'Authentification=; HttpOnly; Path=/; Max-Age=0;';
	}
}
