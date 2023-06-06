import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetMeQuery, useUpdateMeMutation } from '../../store/Api/usersSlice';
import styles from './UpdateUserPage.module.scss';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export type UpdateUserDto = {
	email: string;
	firstName: string;
	lastName: string;
	city: string;
	university: string;
	age: number;
};

export function UpdateUserPage() {
	const { data: me } = useGetMeQuery(undefined);
	const [data, setData] = useState<UpdateUserDto>({
		email: '',
		firstName: '',
		lastName: '',
		city: '',
		university: '',
		age: 0
	});
	const [file, setFile] = useState<File | null>(null);
	const [updateMe] = useUpdateMeMutation();
	const navigate = useNavigate();

	async function handleUpdateMe() {
		try {
			const { ok } = await updateMe(data).unwrap();
			if (!ok) {
				console.log('couldnt update user');
				return;
			}

			if (file === null) {
				navigate('/account');
				return;
			}
			if (me?.filePath) {
				console.log('FILE PATH', me?.filePath)
				await fetch('http://localhost:3001/api/files/', {
					method: 'DELETE',
					credentials: 'include',
					mode: 'cors',
					body: JSON.stringify({ filePath: me?.filePath }),
					headers: {
						'Content-Type': 'application/json'
					}
				});
			}

			const res = await fetch('http://localhost:3001/api/files/users', {
				method: 'POST',
				body: (() => {
					const form = new FormData();
					form.append('file', file!);
					form.append('userId', me?.id as string);
					return form;
				})()
			});

			const { ok: isFileUploaded }: { ok: boolean } = await res.json();

			if (isFileUploaded) {
				navigate('/account');
			}
		} catch (e) {
			console.log(e);
		}
	}

	useEffect(() => {
		if (me) {
			setData({
				email: me.email,
				firstName: me.firstName,
				lastName: me.lastName,
				city: me.city,
				age: me.age,
				university: me.university
			});
		}
	}, [me]);

	return (
		<section className={styles.userInfo}>
			<h1>Изменить данные</h1>
			<table>
				<tbody>
					<tr>
						<td>Имя</td>
						<td>
							<input
								type='text'
								value={data?.firstName}
								onChange={(e) =>
									setData((prev) => ({
										...prev,
										firstName: e.target.value
									}))
								}
							/>
						</td>
					</tr>
					<tr>
						<td>Фамилия</td>
						<td>
							<input
								type='text'
								value={data?.lastName}
								onChange={(e) =>
									setData((prev) => ({
										...prev,
										lastName: e.target.value
									}))
								}
							/>
						</td>
					</tr>
					<tr>
						<td>Почта</td>
						<td>
							<input
								type='text'
								value={data?.email}
								onChange={(e) =>
									setData((prev) => ({
										...prev,
										email: e.target.value
									}))
								}
							/>
						</td>
					</tr>
					<tr>
						<td>Возраст</td>
						<td>
							<input
								type='number'
								value={data?.age}
								onChange={(e) =>
									setData((prev) => ({
										...prev,
										age: Number(e.target.value)
									}))
								}
							/>
						</td>
					</tr>
					<tr>
						<td>Город</td>
						<td>
							<input
								type='text'
								value={data?.city}
								onChange={(e) =>
									setData((prev) => ({
										...prev,
										city: e.target.value
									}))
								}
							/>
						</td>
					</tr>
					<tr>
						<td>Университет</td>
						<td>
							<input
								type='text'
								value={data?.university}
								onChange={(e) =>
									setData((prev) => ({
										...prev,
										university: e.target.value
									}))
								}
							/>
						</td>
					</tr>
					<tr>
						<td>Изображение</td>
						<td>
							<input
								type='file'
								onChange={(e) => setFile(e.target?.files![0])}
							/>
						</td>
					</tr>
				</tbody>
			</table>
			<div className={styles.buttonsSection}>
				<button
					className={styles.alertBtn}
					onClick={() => navigate('/account')}
				>
					<span>Отменить</span>
					<FontAwesomeIcon icon={faXmark} />
				</button>
				<button className={styles.linkBtn} onClick={handleUpdateMe}>
					<span>Сохранить</span>
					<FontAwesomeIcon icon={faCheck} />
				</button>
			</div>
		</section>
	);
}
