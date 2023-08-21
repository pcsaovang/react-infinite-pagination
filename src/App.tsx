import { useCallback, useEffect, useRef, useState } from "react";
import { Post } from "./types";
import { PostList } from "./PostList";
import axios from "axios";

const instance = axios.create({
  baseURL: 'http://localhost:3001'
})

const LIMIT = 10

function App() {
  const pageRef = useRef(1)

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false)

  const measureRef = useCallback(
    (node: HTMLDivElement) => {
      if (node) {
        const observer = new IntersectionObserver(
          async ([entry]) => {
            if (entry.isIntersecting) {
              pageRef.current++
              console.log(pageRef.current)
              await loadPost({ page: pageRef.current + 1 })
              observer.disconnect()
            }
          },
          { threshold: 1 }
        );

        observer.observe(node);
      }
    },
    []
  );

  const loadPost = async ({ page }: { page: number }) => {
    try {
      setLoading(true)
      const response = await instance.get<Post[]>('/posts', {
        params: {
          _page: page,
          _limit: LIMIT
        }
      })

      setPosts((prev) => ([...prev, ...response.data]));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    loadPost({ page: 1 });
  }, []);

  if (!posts?.length) {
    return null
  }

  return (
    <div className="container">
      <PostList postList={posts} ref={measureRef} />
      {loading && <div className="loading">Loading...</div>}
    </div>
  );
}

export default App;
