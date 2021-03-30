import React, { useEffect, useState } from 'react';

import './App.css';

const usePosts = () => {
  const [post, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/posts');
      const data = await res.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);
  return post;
};

function App() {
  const posts = usePosts();

  return (
    <div className='App'>
      {posts.map((post) => (
        <h2 key={post.id}>{post.title}</h2>
      ))}
    </div>
  );
}

export default App;
