import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PostType } from '../../types/post';
import { UserType } from '../../types/user';
import { getDateString } from '../../utils/getDate';

interface UIProps {
	imgUrl: string;
	post: PostType | undefined;
	user: Omit<UserType, 'password'> | undefined;
	getIsLiked: () => boolean;
	handleToggleLike: (body: { postId: string }) => Promise<void>;
	handleNavigateToUserPage: () => void;
}

export function PostUI({
	imgUrl: postImg,
	post,
	user,
	getIsLiked,
	handleToggleLike,
	handleNavigateToUserPage
}: UIProps) {
	return (
		<div className='w-full flex gap-4 px-4 py-2 border-b-[1px] border-gray-500 last:border-b-0 hover:bg-zinc-950 cursor-pointer'>
			<div className={['avatar', !postImg && 'placeholder'].join(' ')}>
				<div className='w-14 h-14 rounded-[50%] border-purple-800 border-4'>
					{postImg ? (
						<img src={postImg} />
					) : (
						<span className='text-md'>
							{user?.firstName[0]}
							{user?.lastName[0]}
						</span>
					)}
				</div>
			</div>
			<div className='flex flex-col text-white gap-2'>
				<p className='flex gap-2 items-center text-lg'>
					<h2
						onClick={(_) => handleNavigateToUserPage()}
						className='cursor-pointer hover:text-gray-300 active:text-gray:300 transition duration-150'
					>
						{user?.firstName} {user?.lastName}
					</h2>
					<h3 className='text-gray-500 font-light'>
						{post && getDateString(`${post?.createdAt}`)}
					</h3>
				</p>
				<p className='text-md'>{post?.post}</p>
				{postImg && (
					<img
						src={postImg}
						alt={post?.post}
						className='rounded-3xl object-cover max-w-[90%] max-h-[500px]'
					/>
				)}
				<div className='flex items-center gap-6'>
					<button className='flex gap-4 items-center font-light text-lg'>
						<FontAwesomeIcon
							icon={faHeart}
							color={getIsLiked() ? 'rgb(107 33 168)' : 'white'}
							onClick={(_) =>
								handleToggleLike({
									postId: String(post?.id)
								})
							}
						/>
						<span>{post?.likedBy?.length}</span>
					</button>
				</div>
			</div>
		</div>
	);
}
