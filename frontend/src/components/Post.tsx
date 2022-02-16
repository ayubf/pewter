import {useState, useEffect} from 'react';

const PostPage = (posturl: string) => {

    const [post, setPost] = useState({});

    useEffect(() => {

        const getThisPost = async (url: string) => {
            await fetch(`http://localhost:3001/posts/${url}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(res => res.json())
            .then(data => setPost(data.post))
        }

        getThisPost(posturl)

    }, [post, setPost, posturl])

    console.log(post)

    return(
        <div>
            <h1>Post Page</h1>
        </div>
    )
}

export default PostPage;