'use client'

import Image from 'next/image';
import NavbarA from './(component)/navbar_auth/navbar_A';
import { resolve } from 'path';
import { useQuery } from '@tanstack/react-query';
import { title } from 'process';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Api from './api/api';
import { useRouter } from 'next/navigation';
import { checkLogin } from './(utils)/isLogin';
import { AuthResponse } from './(auth)/auth.api';
import styles from './page.module.css';

interface Data {
  userId: number
}

export default function Home() {

  const { push } = useRouter();

//   useEffect(() => {
// 		const localData = localStorage.getItem('log');
// 		if (localData === 'yes'){
// 			push('/dashboard');
// 			console.log('is already logged');
// 			return ;
// 		}
// 		const userData = checkLogin();
// 		userData.then(function(data: AuthResponse | undefined) {
// 			if (data !== undefined){
// 				localStorage.setItem('log', 'yes');
// 				push('/dashboard');
// 				console.log('is already logged');
// 			}
// 			else
// 				localStorage.setItem('log', 'no');
// 		})
// 	}, [])

  return (
    <main>
      <NavbarA navActive={true} testing={true}/>
    </main>
  );
}
