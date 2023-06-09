import User from "src/user/User.entity";
import User42 from "src/user42/User42.entity";


interface TokenPayload{
	user: User | User42;
}

export default TokenPayload;