'use client'

import { FC, useState } from 'react';
import styles from './register.module.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as Joi from 'joi';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { RegisterFormInput, register_ } from '../auth.api';
import { sleep } from '../login/page';

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

	const { register, handleSubmit, formState: { errors } } = useForm<rFormInterface>();
	const { push } = useRouter();

	const registerMutation = useMutation(register_, {
		onSuccess: async (data) => {
			if (data === 1)
			{
				const p = document.getElementById('panel');
				if (p === null)
					return console.log('Email already taken !');
				console.log('Email already taken');
				p.style.backgroundColor ='#9A3A3A';
				await sleep(200);
				p.style.backgroundColor ='#5A5A5A';
				await sleep(200);
				p.style.backgroundColor ='#9A3A3A';
				await sleep(200);
				p.style.backgroundColor ='#5A5A5A';
				await sleep(200);
				p.style.backgroundColor ='#9A3A3A';
				await sleep(200);
				p.style.backgroundColor ='#5A5A5A';
				return ;
			}
			if (data === 2)
			{
				return console.log('to confirm password you must enter the same password 2 times !');
			}
			console.log('registered !');
			push('/login');
		},
		onError: (error) => {
			console.log('Internal error !');
		}
	});

	const onSubmit: SubmitHandler<rFormInterface> = data => {
		const value = valideForm.validate(data);
		if (value.error)
		{
			console.log(value.error);
		}
		else
		{
			registerMutation.mutate(data);
		}
	}

	return (
		<main>
		<div className={styles.categ}>register :</div>
		<div className={styles.form_}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<label className={styles.i_C}>email : <input type='mail' placeholder='username@gmail.com' {...register("mail")}></input></label>
				<label className={styles.i_C}>username : <input type='text' placeholder='narty' {...register("username")}></input></label>
				<label className={styles.i_C}>mot de passe : <input type='password' placeholder='your mdp' {...register("password")}></input></label>
				<label className={styles.i_C}>confirm mot de passe : <input type='password' placeholder='your mdp' {...register("confirmPassword")}></input></label>
				<label className={styles.s_C}><input type='SUBMIT' value="SUBMIT" readOnly></input></label>
			</form>
		</div>
	</main>
  )
}

export default page;