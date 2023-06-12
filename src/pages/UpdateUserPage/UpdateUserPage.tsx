import { useGetMeQuery, useUpdateMeMutation } from '../../store/Api/usersSlice';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UpdateUserUI } from './UpdateUserUI';

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
		console.log('UPDATE ME')
		try {
			const { ok } = await updateMe(data).unwrap();
			if (!ok) {
				console.log('couldnt update user');
				return;
			}

			if (file === null) {
				navigate(`/${me?.id}/posts`);
				return;
			}
			if (me?.filePath) {
				await fetch(import.meta.env.VITE_API_URL + '/api/files/', {
					method: 'DELETE',
					credentials: 'include',
					mode: 'cors',
					body: JSON.stringify({ filePath: me?.filePath }),
					headers: {
						'Content-Type': 'application/json'
					}
				});
			}

			const res = await fetch(import.meta.env.VITE_API_URL + '/api/files/users', {
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
				navigate(`/${me?.id}/posts`);
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

	return <UpdateUserUI handleUpdateMe={handleUpdateMe} data={data} setData={setData} setFile={setFile} id={me?.id}/>
}
