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
import { User42Service } from 'src/user42/user42.service';
import Request42User from './interface/Request42User';
import axios, { AxiosInstance } from 'axios';
import User42 from 'src/user42/User42.entity';

@Injectable()
export class AuthService {

	constructor(
		private userService: UserService,
		private user42Service: User42Service,
		private jwtService: JwtService,
		private configService: ConfigService
	) {}

	async register({mail, password, username, level}:CreateUserDto) {

		// here could be the validate email step before reister 

		try{
			const hashedPassword = await bcrypt.hash(password, 12);
			const user = await this.userService.createUser({mail, username, password: hashedPassword, level});
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

	async getCookieJwtToken(user: User | User42)
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
			if (user.password)
				user.password = undefined;
			// console.log('-----------------');
			// console.log(user);
			// console.log('-----------------');
			return user;
        } catch (error) {
			return undefined;
        }
	}

 	getCookieForLogout()
	{
		return 'Authentification=; HttpOnly; Path=/; Max-Age=0;';
	}

	async login42(token: string, refresh_token: string){
		// console.log('token : ' + token + ' and refresh_token is ' + refresh_token);
		const axiosInstance: AxiosInstance = axios.create({
			baseURL: 'https://api.intra.42.fr/v2',
		});
		try{
			const headers = {
				'Authorization': `Bearer ${token}`,
			};
			const { data } = await axiosInstance.get('/me', {headers});
			const { email, login } = data;
			// console.log('mail : ' + email + ' and login is ' + login);

			try {
				const user = await this.user42Service.findByMail(email);
				user.token = token;
				user.refresh_token = refresh_token;
				return await this.user42Service.updateUser42(user);
			} catch ( e ) {
				console.log('user not found go creating one');
			}
			const newUser = await this.user42Service.createUser({token, refresh_token, mail: email, username: login, level: 0});
			return newUser;
		} catch (error) {
			console.log('an error occure during user42 creation');
			console.log('error is : ' + error);
		}
		
		return undefined;
	}
}
