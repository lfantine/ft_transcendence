'use client'

import { FC, useEffect } from 'react';
import axios from 'axios';
import { QueryClient, QueryClientProvider, useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import Api from '../../../api/api';
import layoutStyle from '../layout.module.css';
import { resetTitleLayout } from '../layout';

interface pageProps {}

const page: FC<pageProps> = ({}) => {

	const { push } = useRouter();

	useEffect(() => {
		resetTitleLayout();
		const is = document.getElementById('C');
		is?.classList.add(layoutStyle.on);
		is?.classList.remove(layoutStyle.title);
	  }, [])

	return (
		<main>
			<div>Contact</div>
		</main>
  )
}

export default page;