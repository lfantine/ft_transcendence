import User from "src/user/User.entity";
import User42 from "src/user42/User42.entity";


interface TokenPayload{
	// user: User | User42;
	id: string;
	mail: string;
	username: string;
	is42: boolean;
}

export default TokenPayload;