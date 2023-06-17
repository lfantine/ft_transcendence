class CreateUserDto{
	mail: string;
	username: string;
	password: string;
	level: number;
	pic: Buffer;
	MMR: number;
	desc: string;
}

export default CreateUserDto;
