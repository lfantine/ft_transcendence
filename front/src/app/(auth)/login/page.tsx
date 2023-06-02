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
import AuthError from '@/app/(component)/auth_error/authError';


interface loginProps {}

export const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

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
	const [badPassError, setbadPassError] = useState(false);
	const [badMailError, setbadMailError] = useState(false);

	const loginMutation = useMutation(login, {
		onSuccess: async (data) => {
			if (data === -1){
				return console.log('Internal error !');
			}
			if (data === 1){
				setbadMailError(true);
				console.log('Bad email !');
				await sleep(3000);
				return setbadMailError(false);
			}
			if (data === 2){
				setbadPassError(true);
				console.log('Bad password !');
				await sleep(3000);
				return setbadPassError(false);
			}
			console.log('Logged in !');
			push('/dashboard');
		},
		onError: (error) => {
			console.log('Internal error !');
		}
	});

	const { register, handleSubmit } = useForm<FormInterface>();

	const onSubmit: SubmitHandler<FormInterface> = data => {
		const value = valideForm.validate(data);
		if (value.error)
		{
			console.log(value.error);
		}
		else
		{
			loginMutation.mutate(data);
		}
	}

	return (
	<main>
		<div className={styles.categ}>login :</div>
		<div className={styles.form_}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<label className={styles.i_C}>email : <input type='mail' placeholder='username@gmail.com' {...register("mail")}></input></label>
				<label className={styles.i_C}>mot de passe : <input type='password' placeholder='your mdp' {...register("password")}></input></label>
				<label className={styles.s_C}><input type='SUBMIT' value="SUBMIT" readOnly></input></label>
			</form>
		</div>
		<AuthError text='Bad Password' active={badPassError} hint='try an other password'/>
		<AuthError text='No User with this email ...' active={badMailError} hint='try an other email'/>
	</main>
  )
}

export default page;