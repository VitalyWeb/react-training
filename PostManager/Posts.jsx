import { Post } from "./Post";
import "./index.css";

export const Posts = (props) => {
    const { posts, removePost, returnPost, isRemoved } = props;
    return (
        <div className={`posts-section ${isRemoved ? "removed-posts" : "active-posts"}`}>
            {posts.map((post) => (
                <Post 
                    key={post.id} 
                    post={post} 
                    removePost={removePost} 
                    returnPost={returnPost} 
                    isRemoved={isRemoved} 
                />
            ))}
        </div>
    );
};