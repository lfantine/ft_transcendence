'use client'

import { FC, useEffect } from 'react';
import axios from 'axios';
import { QueryClient, QueryClientProvider, useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import style from './chatMenu.module.css';
import { CiLogout } from "react-icons/ci";
import Link from 'next/link';

interface pageProps {}

const page: FC<pageProps> = ({}) => {

	const { push } = useRouter();

	useEffect(() => {
		
	  }, [])

	return (
		<main className={style.main}>
			<div className={style.spacer} style={{'--space-need': '30px'}}></div>
			<div className={style.ban}>
				<div className={style.gameTitle}>THE PONG GAME</div>
				<div className={style.out}><Link href="/dashboard" className={style.link}><CiLogout className={style.out}/></Link></div>
			</div>
		</main>
  )
}

export default page;