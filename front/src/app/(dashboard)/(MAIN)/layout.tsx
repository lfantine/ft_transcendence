'use client'
import { useRouter } from 'next/navigation';
import { checkLogin } from '@/app/(utils)/isLogin';
import { useEffect } from 'react';
import Api from '../../api/api';
import { AuthResponse, logout } from '../../(auth)/auth.api';
import style from './layout.module.css';
import { FaDoorOpen } from "react-icons/fa";
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';

interface logoutForm {
}

export const resetTitleLayout = () => {
	const H = document.getElementById('H');
	H?.classList.remove(style.on);
	H?.classList.add(style.title);
	const Pl = document.getElementById('Pl');
	Pl?.classList.remove(style.on);
	Pl?.classList.add(style.title);
	const L = document.getElementById('L');
	L?.classList.remove(style.on);
	L?.classList.add(style.title);
	const C = document.getElementById('C');
	C?.classList.remove(style.on);
	C?.classList.add(style.title);
	const P = document.getElementById('P');
	P?.classList.remove(style.on);
	P?.classList.add(style.title);
}

export default function DashLayout({
  children,
}: {
  children: React.ReactNode
}) {

	const { push } = useRouter();

	const logoutMutation = useMutation(logout, {
		onSuccess: () => {
			console.log('logout !');
			localStorage.setItem('log', 'no');
			return push('/logout');
		}
	});

	const handleOut = (data: logoutForm) => {
		logoutMutation.mutate(data);
	}

  return (
	<main className={style.main}>
		<div className={style.ban}>
			<div className={style.logo}><img src='logo1.png' className={style.imgLogo}></img></div>
			<div className={style.allTitle}>
				<div className={style.title} id='H'><Link className={style.link} href='/dashboard'>Home</Link></div>
				<div className={style.title} id='Pl'><Link className={style.link} href='/Play'>Play</Link></div>
				<div className={style.title} id='L'><Link className={style.link} href='/Leaderboard'>Leaderboard</Link></div>
				<div className={style.title} id='C'><Link className={style.link} href='/Contact'>Contact</Link></div>
				<div className={style.title} id='P'><Link className={style.link} href='/Profil'>Profil</Link></div>
				<div className={style.title} onClick={handleOut}><FaDoorOpen /></div>
			</div>
		</div>
		<div className={style.spacing}></div>
		{children}
	</main>
  );
}