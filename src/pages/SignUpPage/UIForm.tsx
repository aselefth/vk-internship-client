import {
	SubmitHandler,
	UseFormHandleSubmit,
	UseFormRegister
} from 'react-hook-form';
import { SignUpType } from '../../types/authTypes';

interface FormProps {
	register: UseFormRegister<SignUpType>;
	handleSubmit: UseFormHandleSubmit<SignUpType>;
	onSubmit: SubmitHandler<SignUpType>;
}

export function UISignUpForm({ register, handleSubmit, onSubmit }: FormProps) {
	return (
		<form
			className='flex flex-col gap-4 items-center w-full pt-2 lg:pt-0'
			onSubmit={handleSubmit(onSubmit)}
		>
			<h1 className='text-xl font-bold'>Регистрация</h1>
			<div className='flex flex-col gap-2 max-w-[1200px]'>
				<input
					placeholder='имя'
					className='input input-bordered input-primary'
					type='text'
					{...register('firstName', {
						required: true,
						minLength: 3,
						maxLength: 20
					})}
				/>
				<input
					placeholder='фамилия'
					className='input input-bordered input-primary'
					type='text'
					{...register('lastName', {
						required: true,
						minLength: 3,
						maxLength: 20
					})}
				/>
				<input
					placeholder='возраст'
					className='input input-bordered input-primary'
					type='number'
					{...register('age', {
						required: true,
						valueAsNumber: true
					})}
				/>
				<input
					placeholder='город'
					className='input input-bordered input-primary'
					type='text'
					{...register('city', { required: true })}
				/>
				<input
					placeholder='университет'
					className='input input-bordered input-primary'
					type='text'
					{...register('university', { required: true })}
				/>
				<input
					placeholder='почта'
					className='input input-bordered input-primary'
					type='text'
					{...register('email', {
						required: true,
						pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
					})}
				/>
				<input
					placeholder='пароль'
					className='input input-bordered input-primary'
					type='password'
					{...register('password', { required: true })}
				/>
			</div>

			<div className=''>
				<button type='submit' className='btn btn-primary'>
					Зарегистрироваться
				</button>
				<p>
					Есть аккаунт?{' '}
					<a href='/signin' className='btn btn-link'>
						Войти
					</a>
				</p>
			</div>
		</form>
	);
}
