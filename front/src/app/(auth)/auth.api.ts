import Api from "../api/api";

export interface LoginFormInput{
	mail: string;
	password: string;
}

export interface Login42FormInput{
	token: string;
	refresh_token: string;
}

export interface RegisterFormInput{
	mail: string;
	username: string;
	password: string;
	confirmPassword: string;
}

export interface AuthResponse {
	id: string;
	username: string;
}

interface noForm {}

export const login = async (formInput: LoginFormInput) => {
	try {
		const { data } = await Api.post<AuthResponse | number, LoginFormInput>({
			url: "/auth/login",
			data: formInput,
		});
		return data;
	} catch (error: any) {
		return -1;
	}
}

export const login42 = async (formInput: Login42FormInput) => {
	try {
		console.log('En attente de reponse');
		const { data } = await Api.post<AuthResponse | number, Login42FormInput>({
			url: "/auth/42login",
			data: formInput,
		});
		console.log('reponse a ete recupere');
		return data;
	} catch (e) {
		console.log('error : ' + e);
		return -1;
	}
}

export const register_ = async (formInput: RegisterFormInput) => {
	try {
		const { data } = await Api.post<AuthResponse | number, RegisterFormInput>({
			url: "/auth/register",
			data: formInput,
		});
		return data;
	} catch (error: any) {
		if (error.response)
		{
			return error.response.code;
		}
		else if (error.request){
			return "error while sending request";
		}
		console.log(error);
		return -1;
	}
}

export const isLogin = async () => {
	try {
		const { data } = await Api.get<AuthResponse>("/auth/isLogin");
		if (data.id === undefined)
			return undefined;
		return data;
	}
	catch (error) {
		console.log(error);
		return undefined; 
	}
}

export const logout = async (formInput: noForm) => {
	try {
		const { data } = await Api.post<AuthResponse, noForm>({
			url: "/auth/logout",
			data: formInput,
		});
	} catch (error) {
		console.log(error);
		return undefined; 
	}
}