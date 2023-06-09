import { Body, Controller, HttpCode, Post, Get, UseGuards, Req, Res, HttpException, HttpStatus} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { LocalAuthGuard } from './localAuthGuard';
import { request } from 'http';
import RequestUser from './interface/RequestUser';
import { MyAuthGuard } from './myAuthGuard';
import { VerifGuard } from './verifGuard';
import Request42User from './interface/Request42User';
import axios, { AxiosInstance } from 'axios';

export type oauthResponse = {
	access_token: any;
	refresh_token: any;
	code: any;
};

@Controller('auth')
export class AuthController {

	constructor(private readonly authService: AuthService) {}

	@Post('register')
	async register(@Body('mail') mail: string, @Body('password') password: string, @Body('username') username: string, @Body('confirmPassword') confirmPassword: string, @Res() response: Response){
		if (password != confirmPassword)
		{throw new HttpException('Please enter 2 times the same password', HttpStatus.BAD_REQUEST);}
		const data = await this.authService.register({mail, password, username, level: 0});
		return response.send(data);
	}

	@Post('42login')
	async login42(@Body('code') code: string, @Res() response: Response, @Req() request: Request){
		try {
			const axiosI: AxiosInstance = axios.create({
				baseURL: '',
			});
			const reponse = await axiosI.post<oauthResponse>('https://api.intra.42.fr/oauth/token', {
				grant_type: 'authorization_code',
				client_id: 'u-s4t2ud-25e6ea53637b7902c95484f73335e7c73358babe3f76497cf11e62f52efae667',
				client_secret: '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',
				code: code,
				redirect_uri: 'http://localhost:3000/oauth',
			});
			const data = await this.authService.login42(reponse.data.access_token, reponse.data.refresh_token);
			const cookie = await this.authService.getCookieJwtToken(data);
			// console.log(cookie);
			request.body = data;
			request.res.setHeader('Set-Cookie', cookie);
			return response.send(request.body);
		} catch (e) {
			return response.send(undefined);
		}
	}

	@HttpCode(200)
	@Post('login')
	@UseGuards(MyAuthGuard)
	async login(@Req() request: RequestUser, @Res() response: Response){
		const { err } = request;
		if (err === '1' || err === '2')
			return response.send(err);
		const cookie = await this.authService.login(request);
		request.res.setHeader('Set-Cookie', cookie);
		return response.send(request.user);
	}

	@HttpCode(200)
	@Get('isLogin')
	@UseGuards(VerifGuard)
	async isLogin(@Req() request: RequestUser | Request42User, @Res() response: Response){
		if (request.user === undefined){
			console.log('User is not okay for isLogin :');
			console.log(request.user);
			return response.send({id: undefined});
		}
		return response.send(request.user);
	}

	@HttpCode(200)
	@Post('logout')
	@UseGuards(VerifGuard)
	async logout(@Req() request: RequestUser, @Res() response: Response){
		response.setHeader('Set-Cookie', this.authService.getCookieForLogout());
		response.send();
	}
}
