import { isLogin } from "../(auth)/auth.api";
import Api from "../api/api";

export async function checkLogin() {
	let data = await isLogin();
	return data;
}