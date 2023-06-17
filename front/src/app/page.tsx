'use client'

import NavbarA from './(component)/navbar_auth/navbar_A';
import { useEffect, useState } from 'react';
import Api from './api/api';
import { useRouter } from 'next/navigation';
import { checkLogin } from './(utils)/isLogin';
import { AuthResponse } from './(auth)/auth.api';

interface Data {
  userId: number
}

export default function Home() {

	const { push } = useRouter();

	Api.init();

	useEffect(() => {
		const localData = localStorage.getItem('log');
		if (localData === 'no'){
			return ;
		}
		const userData = checkLogin();
		userData.then(function(data: AuthResponse | undefined) {
			if (data === undefined){
				localStorage.setItem('log', 'no');
			}
			else
			{
				localStorage.setItem('log', 'yes');
				push('/dashboard');
			}
		})
	}, []);

  return (
    <main>
      <NavbarA navActive={true} testing={true}/>
    </main>
  );
}
