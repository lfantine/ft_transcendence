'use client'

import axios, { AxiosInstance } from 'axios';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Mise à jour de l'importation
import styles from './oauth.module.css';
import url from 'url';
import Api from '../api/api';
import { AuthResponse, Login42FormInput } from '../(auth)/auth.api'; // Mise à jour de l'importation
import { useMutation } from '@tanstack/react-query';

export async function Oauth() {
	const { push } = useRouter();	

	useEffect(() => {
		const takeToken = async () => {
			const { query } = url.parse(window.location.href, true);
			const code = query.code;	
			if (code){
				try {
					const axiosI: AxiosInstance = axios.create({
						baseURL: '',
					});
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
			<div className={styles.title}>Page is Loading</div>
		</main>
	);
};

export default Oauth;


// ?client_id=u-s4t2ud-25e6ea53637b7902c95484f73335e7c73358babe3f76497cf11e62f52efae667&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fdashboard&response_type=code
