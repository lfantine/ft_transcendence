'use client'

import { FC } from 'react';
import styles from './login.module.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import { type } from 'os';

interface pageProps {}

export type FormInterface = {
	email: string;
	password: string;
}

const page: FC<pageProps> = ({}) => {

	const { register, handleSubmit, formState: { errors } } = useForm<FormInterface>();
	const onSubmit = (data: FormInterface) => {
		console.log(data);
	}
	console.log(errors);

	return (
	<main>
		<div className={styles.categ}>login :</div>
		<div className={styles.form_}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<label className={styles.i_C}>email : <input type='mail' placeholder='username@gmail.com' {...register("email")}></input></label>
				<label className={styles.i_C}>mot de passe : <input type='password' placeholder='your mdp' {...register("password")}></input></label>
				<label className={styles.s_C}><input type='SUBMIT' value="SUBMIT" readOnly></input></label>
			</form>
		</div>
	</main>
  )
}

export default page;