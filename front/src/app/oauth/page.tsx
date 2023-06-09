'use client'

import axios, { AxiosInstance } from 'axios';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './oauth.module.css';
import url from 'url';
import { useMutation } from '@tanstack/react-query';
import { AuthResponse, login42 } from '../(auth)/auth.api';
import Api from '../api/api';

export async function Oauth() {
	const { push } = useRouter();
	Api.init();

	const login42Mutation = useMutation(login42, {
		onSuccess: async (data) => {
			if (data === undefined || data === -1){
				console.log('error while login with 4 user');
				push('');
				return ;
			}
			console.log('You are now logged in !');
			localStorage.setItem('log', 'yes');
			push('/dashboard');
		},
	});

	useEffect(() => {
		const takeToken = async () => {
			const { query } = url.parse(window.location.href, true);
			const code = query.code;	
	
			if (code){
				const axiosI: AxiosInstance = axios.create({
					baseURL: '',
				});
				try {
					// login42Mutation.mutate({token: reponse.data.access_token, refresh_token: reponse.data.refresh_token});
					console.log('attente de reponse');
					const rep = await axiosI.post<AuthResponse | number>('http://localhost:4000/auth/42login', {code: code}, { withCredentials: true,});
					console.log('reponse recu !');
					console.log(rep.data);
					if (rep.data !== -1 && rep.data !== undefined)
					{
						console.log('You are now logged in !');
						localStorage.setItem('log', 'yes');
						push('/dashboard');
					}
					else{
						console.log('error');
						push('');
					}
					return ;
				} catch (e) {
					console.log('error');
					push('');
				}
			}
			else
			{
				push('');
			}
		};

		takeToken();
	}, []);

  return (
    <main>
      <div className={styles.title}>Loading ...</div>
    </main>
  );
};

export default Oauth;


// ?client_id=u-s4t2ud-25e6ea53637b7902c95484f73335e7c73358babe3f76497cf11e62f52efae667&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fdashboard&response_type=code