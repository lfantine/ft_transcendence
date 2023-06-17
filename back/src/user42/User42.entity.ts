import { boolean } from "joi";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class User42 {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column("text", {unique: true})
	mail: string;

	@Column("text", {unique: true})
	username: string;

	@Column()
	is42: boolean;

	@Column()
	token: string;

	@Column()
	refresh_token: string;

	@Column({type: 'bytea'})
	pic: Buffer;

	@Column()
	desc: string;

	@Column()
	level: number;

	@Column()
	MMR: number;
}

export default User42;