'use client'

import { FC, useEffect, useState } from 'react';
import styles from './login.module.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { AuthResponse, LoginFormInput, login } from '../auth.api';
import * as Joi from 'joi';
import { useRouter } from 'next/navigation';
import { checkLogin } from '@/app/(utils)/isLogin';
import { error } from 'console';


interface loginProps {}

export type FormInterface = {
	mail: string;
	password: string;
}

const valideForm = Joi.object({
	mail: Joi.string()
		.email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'fr'] } }),
	password: Joi.string()
		.pattern(new RegExp('^[a-zA-Z0-9]{5,30}$')),
})

const page: FC<loginProps> = ({}) => {

	const { push } = useRouter();
	const { register, handleSubmit } = useForm<FormInterface>();

	const handleOauth = () => {
		push('https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-25e6ea53637b7902c95484f73335e7c73358babe3f76497cf11e62f52efae667&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Foauth&response_type=code');
	}

	const loginMutation = useMutation(login, {
		onSuccess: async (data) => {
			if (data === -1){
				console.log('Internal error !');
				return ;
			}
			else if (data === 1){
				console.log('bad email !');
				return ;
			}
			else if (data === 2){
				console.log('bad password !');
				return ;
			}
			console.log('You are now logged in !');
			localStorage.setItem('log', 'yes');
			push('/dashboard');
		},
		onError: async () => {
			console.log('Internal error !');
		}
	});

	const handleSub: SubmitHandler<FormInterface> = (data) => {
		const validform = valideForm.validate(data);
		if (validform.error){
			console.log('error : ' + valideForm.error);
		}
		else{
			loginMutation.mutate(data);
		}
	}

	return (
	<main>
		<div className={styles.title}>login with form</div>
			<div className={styles.form}>
				<form onSubmit={handleSubmit(handleSub)}>
					<label className={styles.inp}>Enter your mail : <input type='mail' placeholder='username@gmail.com' {...register("mail")} className={styles.input}></input></label>
					<label className={styles.inp}>Enter your password : <input type='password' placeholder='*****' {...register("password")} className={styles.input}></input></label>
					<input type='submit' value="login" className={styles.sub} readOnly></input>
				</form>
			</div>
		<div className={styles.title}>login with other</div>
		<div className={styles.cont_oAc}>
			<div className={styles.oAc && styles.Oauth} onClick={handleOauth}>42 authorize</div>
		</div>
	</main>
  )
}

export default page;