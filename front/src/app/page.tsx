import Image from 'next/image'
import styles from './page.module.css'
import NavbarA from './(component)/navbar_auth/navbar_A';
import { resolve } from 'path';
import { useQuery } from '@tanstack/react-query';
import { title } from 'process';

export default function Home() {
  return (
    <main>
      <NavbarA navActive={true} testing={true}/>
      <h1 className='title'>Accueil du Site de ft_transcendance :3</h1>
      <section className='site_desc'>
        <h2>ft_transcendance be like :</h2>
        <div className='photo'>
          <img className='game_img' src='/img_acceuil_game.jpg' alt='game_img'/>
        </div>
      </section>
    </main>
  );
}
