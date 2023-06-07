import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function PostLoader() {
	return (
		<div className='w-full flex gap-4 px-4 py-2 border-b-[1px] animate-pulse
        border-gray-500 last:border-b-0 hover:bg-zinc-950 cursor-pointer'>
			<div className='w-14 h-14 rounded-[50%] border-purple-800 border-4'></div>
			<div className='flex flex-col text-white gap-2 w-full'>
				<p className='flex gap-2 items-center text-lg'>
					<span className='cursor-pointer hover:text-gray-300 active:text-gray:300 
                    transition duration-150 w-60 h-12 bg-gray-500 rounded-lg'></span>
					<span className='text-gray-500 font-light bg-gray-400 rounded-lg w-40 h-12'></span>
				</p>
				<p className='text-md w-full px-10 rounded-lg h-20 bg-gray-500'></p>
				<div className='w-full h-60 bg-gray-500 rounded-3xl'></div>
				<div className='flex items-center gap-6'>
					<button className='flex gap-4 items-center font-light text-lg'>
						<FontAwesomeIcon icon={faHeart} color='white' />
						<span></span>
					</button>
				</div>
			</div>
		</div>
	);
}
