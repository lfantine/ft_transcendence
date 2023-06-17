'use client'
import { useRouter } from 'next/navigation';
import { checkLogin } from '@/app/(utils)/isLogin';
import { useEffect } from 'react';
import Api from '../api/api';
import { AuthResponse } from '../(auth)/auth.api';
import style from './globalIn.module.css';

export default function GlobalInLayout({
  children,
}: {
  children: React.ReactNode
}) {

	const { push } = useRouter();
	Api.init();

	useEffect(() => {

		const check = async () => {
			const localData = localStorage.getItem('log');
			if (localData === 'no'){
				push('/');
				console.log('not allowed coz no');
				return ;
			}
			const userData = checkLogin();
			userData.then(function(data: AuthResponse | undefined) {
				if (data === undefined){
					localStorage.setItem('log', 'no');
					push('/login');
					console.log('not allowed');
					return ;
				}
				else
					localStorage.setItem('log', 'yes');
			});
		};

		check();
	}, []);

  return (
	<main className={style.main}>
		{children}
	</main>
  );
}