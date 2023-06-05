'use client'

import { FC, useState } from 'react';
import styles from './register.module.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as Joi from 'joi';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { RegisterFormInput, register_ } from '../auth.api';

interface pageProps {}

export type rFormInterface = {
	mail: string;
	username: string;
	password: string;
	confirmPassword: string;
}

const valideForm = Joi.object({
	mail: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'fr'] } }),
	username: Joi.string()
		.alphanum()
		.min(3)
		.max(30)
		.required(),
	password: Joi.string()
		.pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')),
	confirmPassword: Joi.ref('password'),
})

const page: FC<pageProps> = ({}) => {

	const { push } = useRouter();
	const { register, handleSubmit } = useForm<rFormInterface>();

	const onSubmit: SubmitHandler<rFormInterface> = data => {
		console.log(data);
	}

	return (
	<main>
		<div className={styles.title}>Register</div>
		<div className={styles.form}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<label className={styles.inp}>Enter your mail : <input type='mail' placeholder='username@gmail.com' {...register("mail")} className={styles.input}></input></label>
				<label className={styles.inp}>Enter your username : <input type='text' placeholder='azerty' {...register("username")} className={styles.input}></input></label>
				<label className={styles.inp}>Enter your password : <input type='password' placeholder='*****' {...register("password")} className={styles.input}></input></label>
				<label className={styles.inp}>Confirm your password : <input type='password' placeholder='*****' {...register("confirmPassword")} className={styles.input}></input></label>
				<input type='submit' value="register" className={styles.sub} readOnly></input>
			</form>
		</div>
	</main>
  )
}

export default page;