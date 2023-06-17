'use client'

import { FC, useEffect, useState } from 'react';
import axios, { AxiosInstance } from 'axios';
import { QueryClient, QueryClientProvider, useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form'
import layoutStyle from '../layout.module.css';
import { resetTitleLayout } from '../layout';
import style from './profil.module.css';
import { RxCrossCircled, RxCheck } from "react-icons/rx";
import { sleep } from '@/app/(component)/navbar_auth/navbar_A';

interface pageProps {}

interface basicReturnEdit {
	mess: string;
	err: number;
}

const page: FC<pageProps> = ({}) => {

	const { push } = useRouter();
	const axiosI: AxiosInstance = axios.create({
		baseURL: 'http://localhost:4000/dashboard',
	});
	const [imageSrc, setImageSrc] = useState('./noUser.jpg');
	const [username, setUsername] = useState('noUsername');
	const [desc, setDesc] = useState('no desc');
	const [mail, setMail] = useState('noMail');
	const [level, setLevel] = useState(0);
	const [lvlP, setLvlP] = useState(0);
	const lvlBarP = {
		width: `${lvlP}%`,
	};

	const [editpptxt, seteditpptxt] = useState('edit');
	const [editUntxt, seteditUntxt] = useState('edit');
	const [editDctxt, seteditDctxt] = useState('edit');

	const handlePPedit = async () => {
		const input = document.getElementById('ppChangeInput');
		if (input?.classList.contains(style.hide)){
			// met en mode edit
			input?.classList.remove(style.hide);
			seteditpptxt('confirm');
			return ;
		}
		seteditpptxt('edit');
		if (input instanceof HTMLInputElement && (input.files?.length === undefined || input.files?.length === 0)) {
			// remet em mode affichage
			input?.classList.add(style.hide);
			return ;
		}
		else if (input instanceof HTMLInputElement){
			input?.classList.add(style.hide);
			const reader = new FileReader();
			reader.onloadend = async () => {
				const base64String = reader.result as string;
     			const base64 = base64String.split(',')[1]; // Supprimer le préfixe "data:image/jpeg;base64,"
				await axios.post('http://localhost:4000/dashboard/pic', {'image': base64}, { withCredentials: true});
				await sleep(1000);
				getInfo();
			};
			if (input.files !== null) {
				console.log(input.files[0]);
				reader.readAsDataURL(input.files[0]);
			}
			input.value = '';
		}
	};

	const handleUnedit = async () => {
		const input = document.getElementById('unChangeInput');
		const val = document.getElementById('unChangeVal');
		if (input?.classList.contains(style.hide)){
			// met en mode edit
			input?.classList.remove(style.hide);
			val?.classList.add(style.hide);
			seteditUntxt('confirm');
			return ;
		}
		if (input instanceof HTMLInputElement && input.value.trim().length > 0) {
			const newUsername = input.value.trim();
			const { data } = await axios.post('http://localhost:4000/dashboard/username', {'username': newUsername}, { withCredentials: true});
			console.log(data);
			if (data.err === -2){
				console.log('username already taken :(');
			}
			else {
				await sleep(500);
				getInfo();
			}
			input.value = '';
		}
		else if (input instanceof HTMLInputElement) {
			input.value = '';
		}
		input?.classList.add(style.hide);
		val?.classList.remove(style.hide);
		seteditUntxt('edit');
	}

	const handleDcedit = async () => {
		const input = document.getElementById('dcChangeInput');
		const val = document.getElementById('dcChangeVal');
		if (input?.classList.contains(style.hide)){
			// met en mode edit
			input?.classList.remove(style.hide);
			val?.classList.add(style.hide);
			seteditDctxt('confirm');
			return ;
		}
		input?.classList.add(style.hide);
		val?.classList.remove(style.hide);
		seteditDctxt('edit');
	}

	async function getInfo() {
		try {
			const res = await axiosI.get('/info', {withCredentials: true});
			console.log(res.data);
			const binImg = res.data.pic;
			if (binImg.data.length > 0)
			{
				const binaryImg = new Uint8Array(binImg.data);
				let base64Img = '';
				binaryImg.forEach(byte => {
					base64Img += String.fromCharCode(byte); // Convertir chaque octet en caractère
				});
				const imageUrl = `data:image/jpeg;base64,${btoa(base64Img)}`; // Convertir la représentation base64
				setImageSrc(imageUrl);
			}
			else
				setImageSrc('./noUser.jpg');

			setUsername(res.data.username);
			setDesc(res.data.desc);
			setMail(res.data.mail);
			setLevel(res.data.level / 100);
			setLvlP(res.data.level % 100);
		} catch (e) {
			console.log('get info error');
		}
	};

	useEffect(() => {
		const desc = document.getElementById('dcChangeInput');
		desc?.classList.add(style.descChangeInput);
		resetTitleLayout();
		const is = document.getElementById('P');
		is?.classList.add(layoutStyle.on);
		is?.classList.remove(layoutStyle.title);
		getInfo();
	  }, []);

	return (
		<main className={style.main}>
			<div className={style.back}>
				<div className={style.infos}>
					<div className={style.ppcont}><div className={style.pp}><img src={`${imageSrc}`} className={style.ppimg}></img></div><input type='file' id='ppChangeInput' className={style.hide} accept="image/jpeg" maxLength={10000000}></input><input className={style.buttonEdit} type='button' value={`${editpptxt}`} onClick={handlePPedit}></input></div>
					<div className={style.info}>
						<div className={style.oneInfo}><div className={style.catName}>Username :</div><input type='text' id='unChangeInput' className={style.hide} placeholder={`${username}`} maxLength={25}></input><div className={style.catValue} id='unChangeVal'>{username}</div><input className={style.buttonEdit} type='button' value={`${editUntxt}`} onClick={handleUnedit}></input></div>
						<div className={style.oneInfo}><div className={style.catName}>Email :</div><div className={style.catValue}>{mail}</div></div>
						<div className={style.oneInfoDesc}><div className={style.catName}>Description :</div><div className={style.desc} id='dcChangeVal'>{desc}</div><textarea rows={3} placeholder={`${desc}`} id='dcChangeInput' className={style.hide}></textarea><input className={style.buttonEdit} type='button' value={`${editDctxt}`} onClick={handleDcedit}></input></div>
					</div>
				</div>
				<div className={style.levelbar}>
					<div className={style.levelT}>Level : {level}</div>
					<div className={style.lvlbarEx}><div className={style.lvlbarIn} style={lvlBarP}></div></div>
				</div>
				<div className={style.successTitle}>Success</div>
				<div className={style.success}>

				</div>
			</div>
		</main>
  )
}

export default page;

// const imgBlob = new Blob([binImg], { type: 'image/jpeg' });
// 					const imageUrl = URL.createObjectURL(imgBlob);