import {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, useParams } from 'react-router-dom';
import NotFound from './NotFound';

interface IPostDiv {
    posttitle?: string,
    postcontent?: string,
    views?: number,
    dateposted?: Date
}

const createPostDiv = (obj: IPostDiv) => obj;

const PostPage = () => {

    const { posturl } = useParams();
    const [post, setPost] = useState(createPostDiv({}));

    useEffect(() => {

        const getThisPost = async () => {
            await fetch(`http://localhost:3003/posts/${posturl}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(res => res.json())
            .then(data => setPost(data.post))
        }

        getThisPost()

    }, [posturl])

    if (post) {
        return(
            <div>
                <h1>{post.posttitle}</h1>
                <p>
                    {post.postcontent}
                </p>
                <p>Date: {post.dateposted}</p>
                
            </div>
        )
    } else {
        return(
            <NotFound />
        )
    }
}

export default PostPage;