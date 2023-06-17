'use client'

import { FC, useState } from 'react';
import styles from './register.module.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as Joi from 'joi';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { RegisterFormInput, register_ } from '../auth.api';
import { AiTwotoneMail, AiTwotoneLock, AiOutlineUser } from "react-icons/ai";

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

	const registerMutation = useMutation(register_, {
		onSuccess: async (data) => {
			console.log('data : ' + data);
			if (data === -1)
			{
				console.log('internal error !');
				return ;
			}
			else if (data === 1)
			{
				console.log('Email or Password already taken !');
				return ;
			}
			else if (data === 2)
			{
				return console.log('To confirm password please enter it two times the same password !');
			}
			console.log('you are now registered !');
			push('/login');
		},
		onError: (error) => {
			console.log('Internal error !!');
		}
	});

	const onSubmit: SubmitHandler<rFormInterface> = data => {
		const validform = valideForm.validate(data);
		if (validform.error){
			console.log('error : ' + valideForm.error);
		}
		else{
			registerMutation.mutate(data);
		}
	}

	return (
	<main>
		<div className={styles.title}>Register</div>
		<div className={styles.form}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<label className={styles.inp}><input type='mail' placeholder='Email' {...register("mail")} className={styles.input}></input><AiTwotoneMail /></label>
				<label className={styles.inp}><input type='text' placeholder='Username' {...register("username")} className={styles.input}></input><AiOutlineUser /></label>
				<label className={styles.inp}><input type='password' placeholder='Password' {...register("password")} className={styles.input}></input><AiTwotoneLock /></label>
				<label className={styles.inp}><input type='password' placeholder='Confirm Password' {...register("confirmPassword")} className={styles.input}></input><AiTwotoneLock /></label>
				<input type='submit' value="register" className={styles.sub} readOnly></input>
			</form>
		</div>
	</main>
  )
}

export default page;