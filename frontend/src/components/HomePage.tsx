import {useState, useEffect} from 'react';


const HomePage = () => {

    let [posts, setPosts] = useState([]);

    useEffect(() => {
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

    return(
        <div>
            <h1>Home Page</h1>
            {
                posts.map(({posttitle, userid, posturl, postcontent}) => {
                    return(
                        <div className="postDiv" key={posttitle}>
                            <h4>
                                <a href={`http://localhost:3002/posts/${posturl}`}>{posttitle}</a>
                            </h4>
                            <h5>{userid}</h5>
                            <p>
                                    {postcontent}
                            </p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default HomePage;