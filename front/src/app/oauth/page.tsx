'use client'

import axios, { AxiosInstance } from 'axios';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './oauth.module.css';
import url from 'url';

export type oauthResponse = {
	token: any;
	code: any;
};

interface sendOauthData {
	grant_type: string,
	client_id: string,
	client_secret: string,
	code: string,
	redirect_uri: string,
}

export async function Oauth() {
	const { push } = useRouter();

	useEffect(() => {
		const takeToken = async () => {
			const { query } = url.parse(window.location.href, true);
			const code = query.code;	
	
			if (code){
				const axiosI: AxiosInstance = axios.create({
					baseURL: 'https://api.intra.42.fr/oauth/token',
				});
				console.log('code = ' + code);
				try {
					const reponse = await axiosI.post<oauthResponse>('', {
						grant_type: 'authorization_code',
						client_id: 'u-s4t2ud-25e6ea53637b7902c95484f73335e7c73358babe3f76497cf11e62f52efae667',
						client_secret: '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',
						code: code,
						redirect_uri: 'http://localhost:3000/oauth',
					});
					console.log(reponse.data);
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
	}, [])

  return (
    <main>
      <div className={styles.title}>Loading ...</div>
    </main>
  );
};

export default Oauth;


// ?client_id=u-s4t2ud-25e6ea53637b7902c95484f73335e7c73358babe3f76497cf11e62f52efae667&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fdashboard&response_type=code