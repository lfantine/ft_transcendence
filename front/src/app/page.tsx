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

  return (
    <main>
      <NavbarA navActive={true} testing={true}/>
    </main>
  );
}
