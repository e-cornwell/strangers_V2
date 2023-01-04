import ReactDOM from 'react-dom/client';
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Posts from './components/Posts';
import CreatePost from './components/CreatePost';
import Search from './components/Search';
// import EditPost from './components/EditPost';
import Messages from './components/Messages';


const App = ()=> {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const [token, setToken] = useState(null);
  const [messages, setMessages] = useState({});

  const userId = user._id;

  console.log(user.messages)

  
   

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
    console.log(json.data)
      
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
        const messages = result.data.messages
        setMessages(messages);
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
      
      <nav className='mainNav'>
        <h1>Strangers Things</h1>
        {
          user._id ? 
            <div>Welcome { user.username } <button onClick={ logout }>Logout</button>
          </div> : null
        }
      </nav>

      <div className='search'>
        <Search /> 
      </div>

      <div className='allPosts'>
          
        <div className='createPostDiv'>
          {
            user._id ? 
              <CreatePost token={token} posts={ posts } setPosts={ setPosts } fetchPosts={fetchPosts}/>
              : null
          }
          
          {
            user._id ? <Messages user={user} posts={ posts } messages={messages} /> : null
          }
        </div>

        {
          !user._id ? (
          <div className='login'>
            <Register />
            <Login exchangeTokenForUser={ exchangeTokenForUser }/>
          </div>) : null
        }
        
        <div className='justPosts'>
            <h1>Posts</h1>
            <div className='innerScroll'>
              <Posts posts={ posts } setPosts={ setPosts } token={token} fetchPosts={fetchPosts} userId={userId} />
            </div>
        </div>

      </div>  
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
