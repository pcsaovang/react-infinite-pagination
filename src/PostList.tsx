import { forwardRef } from "react";
import { Post } from "./types";

type Props = {
    postList: Post[];
};

export const PostList = forwardRef<HTMLDivElement, Props>(({ postList = [] }, ref) => {
    return (
        <>
            {postList.map((post, index) => {
                const isLastPost = index === postList.length - 1

                return (
                    <div
                        key={`${index}-${post.id}`}
                        className="item"
                        data-id={isLastPost}
                        ref={isLastPost ? ref : null}
                    >
                        <strong>{post.title}</strong>
                        <p>{post.body}</p>
                    </div>
                );
            })}
        </>
    );
})
