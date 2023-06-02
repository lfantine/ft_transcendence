'use client'

import Image from 'next/image'
import * as styles from './page.module.css'
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

interface Data {
  userId: number
}

export default function Home() {

  const { push } = useRouter();

  useEffect(() => {
		const localData = localStorage.getItem('log');
		if (localData === 'yes'){
			push('/dashboard');
			console.log('is already logged');
			return ;
		}
		const userData = checkLogin();
		userData.then(function(data: AuthResponse | undefined) {
			if (data !== undefined){
				localStorage.setItem('log', 'yes');
				push('/dashboard');
				console.log('is already logged');
			}
			else
				localStorage.setItem('log', 'no');
		})
	}, [])

  return (
    <main>
      <NavbarA navActive={true} testing={true}/>
      <h1 className='title'>Accueil du Site de ft_transcendance :3</h1>
      <section className='site_desc'>
        <h2>ft_transcendance be like :</h2>
        <div className='photo'>
          <img className='game_img' src='/img_acceuil_game.jpg' alt='game_img'/>
        </div>
        <h2>NONE</h2>
      </section>
    </main>
  );
}
