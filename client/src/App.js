import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';

import './App.css';

// const usePosts = () => {
//   const [post, setPosts] = useState([]);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       const res = await fetch('/api/posts');
//       const data = await res.json();
//       setPosts(data);
//     };
//     fetchPosts();
//   }, []);
//   return post;
// };

// function App() {
//   const posts = usePosts();

//   return (
//     <div className='App'>
//       {posts.map((post) => (
//         <h2 key={post.id}>{post.title}</h2>
//       ))}
//     </div>
//   );
// }
const App = () => {
  return (
    <BrowserRouter>
      <div className='App-header'>
        <Switch>
          <Route path='/' exact component={Login} />
          <Route path='/signup' exact component={Signup} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};
export default App;
