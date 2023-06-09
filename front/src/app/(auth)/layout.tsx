'use client'
import NavbarA from '../(component)/navbar_auth/navbar_A';
import '../globals.css';
import styles from './choose.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { checkLogin } from '@/app/(utils)/isLogin';
import { AuthResponse } from './auth.api';
import { useEffect } from 'react';
import Api from '../api/api';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {

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
		<div className={styles.choose}>
			<div className={styles.selection}>
				<img src='./parchem1.png' className={styles.parchemin}></img>
				<div className={styles.select_C}><Link className={styles.link} href="/login" as="login"><div>L</div><div>O</div><div>G</div><div>I</div><div>N</div></Link></div>
				<div className={styles.select_C}><Link className={styles.link} href="/register" as="register"><div>R</div><div>E</div><div>G</div><div>I</div><div>S</div><div>T</div><div>E</div><div>R</div></Link></div>
			</div>
				<img src='./parchem2_.png' className={styles.parchem2}></img>
				<div className={styles.child} id='panel'>
					{children}
				</div>
			<div className={styles.balanced}></div>
		</div>
	</main>
  );
}
