import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import SettingsPage from './components/SettingsPage';
import SignupPage from './components/SignupPage';

interface PostLink {
  posturl: string
}

function App() {

  let [posts, setPosts] = useState([]);
  let [users, setUsers] = useState([]);

    useEffect(() => {

      const getUsers = async () => {
        await fetch('http://localhost:3002/users', {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(res => res.json())
        .then(data => setUsers(data.users))
      }
      getUsers()

      const getPosts = async () => {
            await fetch("http://localhost:3002/posts/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(res => res.json())
            .then(data => setPosts(data.posts))
        }
        getPosts()
    }, [])


  return (
    <div className="App">
      Pewter
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/settings" element={<SettingsPage />} />
          {/* Map users and posts routes */}
          <Route path="/signup" element={<SignupPage/>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/createpost" element={<></>} />
         </Routes>
      </Router>
    </div>
  );
}

export default App;
