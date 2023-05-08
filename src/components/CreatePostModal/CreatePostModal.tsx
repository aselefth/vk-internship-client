import { useState } from "react";
import styles from './CreatePostModal.module.scss';
import { useCreatePostMutation } from "../../store/Api/postsSlice";
import { PostType } from "../../types/post";
import { useAppSelector } from "../../hooks/redux";

export function CreatePostModal () {
    const [post, setPost] = useState('');
    const [addPost] = useCreatePostMutation();
    const currentUserId = useAppSelector(state => state.userSlice.id);

    async function handleCreatePost(postBody: Pick<PostType, 'post' | 'userId'>) {
        try {
            await addPost(postBody);
            setPost('');
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <form className={styles.form} onSubmit={e => {
            e.preventDefault();
            handleCreatePost({post, userId: String(currentUserId)});
        }}>
            <label >Есть, чем поделиться? Поделитесь здесь</label>
            <textarea name="" value={post} onChange={e => setPost(e.target.value)}/>
            <button type="submit">добавить</button>
        </form>
    )
}