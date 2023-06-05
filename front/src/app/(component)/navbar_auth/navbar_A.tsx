import Link from 'next/link';
import React, { useState } from 'react';
import styles from './navbar_A.module.css';

export interface INavbar {
	navActive: boolean;
	testing: boolean;
}

export const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

const NavbarA: React.FC<INavbar> = (Content) => {

const [activeBand, setActiveBand] = useState(true);
const [activeMusic, setActiveMusic] = useState(false);
// const [music, setmusic] = useState(new Audio('vinil_music.mp3'));

const handleNav = async (e: any) => {
	e.preventDefault();
	if (activeBand === false)
	{
		setActiveBand(!activeBand);
		await sleep(10);
		const nav = document.getElementById('nav');
		if (nav === null)
			console.log('null');
		nav?.classList.remove(styles['close']);
		nav?.classList.add(styles['open']);
	}
	else
	{
		const nav = document.getElementById('nav');
		nav?.classList.remove(styles['open']);
		nav?.classList.add(styles['close']);
		setActiveBand(!activeBand);
	}
}

const handleMusic = async (e: any) => {
	e.preventDefault();
	setActiveMusic(!activeMusic);
	await sleep(10);
	const el = document.getElementById('music');
	const o = document.getElementById('odio');
	const aud = o as HTMLAudioElement;
	if (!activeMusic)
	{
		el?.classList.add(styles['tourne']);
		aud.play();
	}
	else
	{
		el?.classList.remove(styles['tourne']);
		aud.pause();
	}
}

	return (
		<main>
			<div className={styles.bar}>
				<img src='lanterne.png' className={styles.lant} onClick={handleNav}></img>
				<div className={styles.cont_band}>
					<div className={styles.band} id='nav'>
						<div className={styles.link}><Link href="" className={styles.L}>HOME</Link></div>
						<div className={styles.link}><Link href="/login" className={styles.L}>CONNECTION</Link></div>
					</div>
				</div>
				<div className={styles.music} onClick={handleMusic}><img src='vinil.png' className={styles.vinil} id='music'></img><audio src='vinil_music.mp3' id='odio'></audio></div>
			</div>
		</main>
	);
}
  
export default NavbarA;
