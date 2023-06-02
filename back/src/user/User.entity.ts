import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class User {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column("text", {unique: true})
	mail: string;

	@Column("text")
	username: string;

	@Column()
	password: string;
}

export default User;