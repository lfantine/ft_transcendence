import { Body, Controller, HttpCode, Post, Get, UseGuards, Req, Res, HttpException, HttpStatus} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import RequestUser from './interface/RequestUser';
import { MyAuthGuard } from './myAuthGuard';
import { VerifGuard } from './verifGuard';
import Request42User from './interface/Request42User';
import axios, { AxiosInstance } from 'axios';
import { ConfigService } from '@nestjs/config';
import RequestLog from './interface/RequestLog';

export type oauthResponse = {
	access_token: any;
	refresh_token: any;
	code: any;
};

@Controller('auth')
export class AuthController {

	constructor(private readonly authService: AuthService, private configService: ConfigService) {}

	@Post('register')
	async register(@Body('mail') mail: string, @Body('password') password: string, @Body('username') username: string, @Body('confirmPassword') confirmPassword: string, @Res() response: Response){
		if (password != confirmPassword)
		{throw new HttpException('Please enter 2 times the same password', HttpStatus.BAD_REQUEST);}
		const ImgData: Buffer = Buffer.alloc(0);
		const data = await this.authService.register({mail, password, username, level: 0, pic: ImgData, desc: 'A new player', MMR: 0});
		if (data !== '1' && data !== '2')
			return response.send(data.username);
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
				client_id: this.configService.get('42_CLIENT_ID'),
				client_secret: this.configService.get('42_CLIENT_SECRET'),
				code: code,
				redirect_uri: 'http://localhost:3000/oauth',
			});
			const data = await this.authService.login42(reponse.data.access_token, reponse.data.refresh_token);
			const cookie = await this.authService.getCookieJwtToken(data);
			request.body = data.username;
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
	async isLogin(@Req() request: RequestLog, @Res() response: Response){
		if (request.id === undefined){
			console.log('User is not okay for isLogin :');
			console.log(request.user);
			return response.send({id: undefined});
		}
		return response.send({id: request.id});
	}

	@HttpCode(200)
	@Post('logout')
	@UseGuards(VerifGuard)
	async logout(@Req() request: RequestUser, @Res() response: Response){
		response.setHeader('Set-Cookie', this.authService.getCookieForLogout());
		response.send();
	}
}
