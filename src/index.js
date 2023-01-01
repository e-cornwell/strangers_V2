import ReactDOM from 'react-dom/client';
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Posts from './components/Posts';
import CreatePost from './components/CreatePost';


const App = ()=> {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const [token, setToken] = useState(null);
   

  const fetchPosts = async () => {
    const response = await fetch('https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/posts',
     {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })
    const json = await response.json();
    setPosts(json.data.posts)
      
  };

  const exchangeTokenForUser = () => {
    const token = window.localStorage.getItem('token');

    if(token){
      fetch('https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/users/me', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ token }`
        },
      })
      .then(response => response.json())
      .then(result => {
        const user = result.data;
        setUser(user);
        setToken(token);
      })
      .catch(err => console.log(err));
    }
  };

  useEffect(()=> {
    exchangeTokenForUser();
    fetchPosts();
  }, [token]);

  const logout = () => {
    window.localStorage.removeItem('token');
    setUser({});
  }

  return (
    <div>
      <h1>Strangers Things V2</h1>

      {
        user._id ? 
          <div>Welcome { user.username } <button onClick={ logout }>Logout</button>
          <CreatePost token={token} posts={ posts } setPosts={ setPosts } fetchPosts={fetchPosts}/>
        </div> : null
      }

      {
        !user._id ? (
        <div>
          <Register />
          <Login exchangeTokenForUser={ exchangeTokenForUser }/>
        </div>) : null
      }
      
       
      <Posts posts={ posts } setPosts={ setPosts } token={token} fetchPosts={fetchPosts}/>

    </div>
  );
};

      {/* <nav>
        <Link to='/posts'>Posts ({posts.length})</Link>
        <Link to='/login'>Login</Link>
        <Link to='/register'>Register</Link>
      </nav>
      <Routes>
        <Route path='/posts' element= { <div>Posts</div>}/>} />
        <Route path='/login' element={ <div>Login</div>} />} />
        <Route path='/register' element={ <div>Register</div>} />} />
      </Routes>  */}

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<HashRouter><App /></HashRouter>);
