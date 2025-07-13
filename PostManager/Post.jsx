import "./index.css";

export const Post = ({ post, removePost, returnPost, isRemoved }) => {
    return (
        <div className={`post ${isRemoved ? "removed" : ""}`}>
            <ul>
                <li>
                    {post.name}
                    {!isRemoved && (
                        <button className="remove-btn" type="button" onClick={() => removePost(post.id)}>
                            Удалить
                        </button>
                    )}
                    {isRemoved && (
                        <button className="return-btn" type="button" onClick={() => returnPost(post.id)}>
                            Вернуть
                        </button>
                    )}
                </li>
            </ul>
        </div>
    );
};