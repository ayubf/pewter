import {BrowserRouter as  Routes, Router, useParams} from "react-router-dom";
const UserProfilePage = () => {
    let { username } = useParams();
    return(
        <div>
            User Profile Page
            {username}
        </div>
    )
}

export default UserProfilePage;
