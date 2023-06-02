import { isLogin } from "../(auth)/auth.api";
import Api from "../api/api";

export async function checkLogin() {
	Api.init();
	let data = await isLogin();
	return data;
}