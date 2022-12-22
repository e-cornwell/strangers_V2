import ReactDOM from 'react-dom/client';
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link} from 'react-router-dom';


const App = ()=> {
  const [posts, setPosts] = useState([]);
  

  
  useEffect(()=> {
  }, [])
  return (
    <div>
      <h1>Strangers Things V2</h1>
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
      <form>
        <input placeholder='username' />
        <input placeholder='password' />
        <button>Register</button>
      </form>
      <form>
        <input placeholder='username' />
        <input placeholder='password' />
        <button>Login</button>
      </form>
    </div>

  );
};
const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<HashRouter><App /></HashRouter>);
