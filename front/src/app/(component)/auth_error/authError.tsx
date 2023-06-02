import styles from './auth_error.module.css';

export interface IAuthError {
	active: boolean;
	text: string;
	hint: string;
}

export const loginError = async () => {

}

const AuthError: React.FC<IAuthError> = (Content) => {
	// console.log(Content.active);
	if (Content.active)
	{
		return (
			<main>
				<div className={styles.block}>
					<div className={styles.in}>
						<div className={styles.title}>An error occured :</div>
						<div className={styles.name}>{Content.text} :</div>
						<div className={styles.hint}>{Content.hint}</div>
					</div>
				</div>
			</main>
		);
	}
	return (
		<main></main>
	);
}

export default AuthError;