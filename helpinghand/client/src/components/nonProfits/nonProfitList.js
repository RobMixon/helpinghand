import React, { useContext, useEffect, useState, useRef } from "react";
import { PostContext } from "../../providers/PostProvider";
import { useHistory, Link } from "react-router-dom";
import RecommendedPosts from "./RecommendedPosts";

import {
    Button, Table
} from "reactstrap";

const PostList = () => {
    const { posts, getAllPosts } = useContext(PostContext);
    const history = useHistory();

    useEffect(() => {
        getAllPosts();
    }, []);

    return (
        <>
            <div className="recommended_Posts_Div">

                <RecommendedPosts />
            </div>
            <div className="container">
                <div className="row justify-content-left">
                    <Button color="danger"
                        onClick={() => { history.push(`/postForm/`) }}>
                        add post
                    </Button>
                    <Table>

                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Category</th>
                            </tr>
                        </thead>

                        {posts.map((post) => (
                            <tbody key={post.id}>
                                <tr>
                                    <th scope="row">
                                        <Link to={`/posts/${post.id}`}>
                                            {post.title}
                                        </Link>
                                    </th>
                                    <td>
                                        {post.userProfile.firstName} {post.userProfile.lastName}
                                    </td>
                                    <td>{post.category.name}</td>
                                </tr>
                            </tbody>
                        ))}
                    </Table>
                </div>
            </div>
        </>
    );
};

export default PostList;