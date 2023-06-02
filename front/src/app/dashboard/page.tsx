'use client'

import { FC, useEffect } from 'react';
import axios from 'axios';
import { QueryClient, QueryClientProvider, useMutation } from '@tanstack/react-query';
import { checkLogin } from '../(utils)/isLogin';
import { AuthResponse, logout } from '../(auth)/auth.api';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { rFormInterface } from '../(auth)/register/page';

interface pageProps {}

interface logoutForm {
}

const page: FC<pageProps> = ({}) => {

	const { register, handleSubmit, formState: { errors } } = useForm<logoutForm>();
	const { push } = useRouter();

	useEffect(() => {
		const localData = localStorage.getItem('log');
		if (localData === 'no'){
			push('/');
			console.log('not allowed');
			return ;
		}
		const userData = checkLogin();
		userData.then(function(data: AuthResponse | undefined) {
			if (data === undefined){
				localStorage.setItem('log', 'no');
				push('/');
				console.log('not allowed');
			}
			else
				localStorage.setItem('log', 'yes');
		})
	}, [])

	const logoutMutation = useMutation(logout, {
		onSuccess: () => {
			console.log('logout !');
			localStorage.setItem('log', 'no');
			push('');
		}
	})

	const onSubmit: SubmitHandler<logoutForm> = data => {
		logoutMutation.mutate(data);
	}

	return (
		<main>
			<div>DashBoard</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<label className='none'><input type='SUBMIT' value="logout" readOnly></input></label>
			</form>
		</main>
  )
}

export default page;