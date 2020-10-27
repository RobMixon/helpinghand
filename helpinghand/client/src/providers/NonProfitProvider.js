import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const PostContext = React.createContext();

export const PostProvider = (props) => {
    const [posts, setPosts] = useState([]);
    const [subscribeePosts, setSubscribeePosts] = useState([])
    const [tagSearchResultPosts, setTagSearchResultPosts] = useState([])
    const { getToken } = useContext(UserProfileContext);



    const getAllPosts = () => {
        getToken().then((token) =>
            fetch(`/api/post/`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => res.json())
                .then(setPosts));
    };