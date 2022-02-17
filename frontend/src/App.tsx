import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import SettingsPage from './components/SettingsPage';
import SignupPage from './components/SignupPage';
import UserProfilePage from './components/UserProfilePage';
import NotFound from './components/NotFound';

interface IPost {
  id: number,
}

interface IUser {
  id: number,
  username: string
}


function App() {

  let [posts, setPosts] = useState(Array<IPost>());
  let [users, setUsers] = useState(Array<IUser>());

    useEffect(() => {

      const getUsers = async () => {
        await fetch('http://localhost:3003/users', {
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
            await fetch("http://localhost:3003/posts/", {
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
          <Route path="/settings" element={<SettingsPage />} />
          {/* Map users and posts routes */}
          <Route path="/user">
            <Route path="/user/:username" element={<UserProfilePage />} />
          </Route>
          <Route path="/signup" element={<SignupPage/>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/createpost" element={<></>} />
          <Route path="/" element={<HomePage/>} />
          <Route path="/*" element={<NotFound />} />
         </Routes>
      </Router>
    </div>
  );
}

export default App;
