import { boolean } from "joi";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class User42 {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column("text", {unique: true})
	mail: string;

	@Column("text")
	username: string;

	@Column()
	token: string;

	@Column()
	refresh_token: string;

	@Column()
	level: number;
}

export default User42;