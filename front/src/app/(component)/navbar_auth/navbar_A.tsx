import Link from 'next/link';
import React from 'react'

export interface INavbar {
	navActive: boolean;
	testing: boolean;
}

const NavbarA: React.FC<INavbar> = (Content) => {
	return (
		<div className='navbar'>
			<div className='nav_C one'><Link className='link' href="" rel='acceuil'>ACCUEIL</Link></div>
			<div className='nav_C'><Link className='link' href="/login" rel='login'>CONNECT</Link></div>
			<div className='nav_C logo'>😁</div>
		</div>
	);
}
  
export default NavbarA;
