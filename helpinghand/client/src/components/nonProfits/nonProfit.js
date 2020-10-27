import { Button, Card, CardBody } from "reactstrap";
import { NonProfitContext } from "../../providers/NonProfitProvider";
import React, { useContext, useState } from "react";
import { useHistory, Link, useParams } from "react-router-dom"
//import "./nonProfit.css"


const NonProfit = ({ nonProfit }) => {
    //const { deleteComment } = useContext(CommentContext)
    //const { postId, commentId } = useParams();
    const currentUser = JSON.parse(sessionStorage.getItem('userProfile')).id;
    // const submit = () => {
    //     deleteComment(comment.id).then(() => {
    //         history.push("/");
    //     })


    return (

        <Card style={{ border: "none" }}>
            <div className="nonProfitCard">
                <CardBody>
                    <div>{nonProfit.name}</div>
                    <div>{nonProfit.ownerId}</div>
                    <div>{nonProfit.location}</div>
                    <div>{nonProfit.cause}</div>
                    <div>{nonProfit.description}</div>
                    <div>{nonProfit.missionStatement}</div>
                    <div>{nonProfit.website}</div>
                    <div>{nonProfit.userProfile.firstName} {nonProfit.userProfile.lastName}</div>
                    <div>{nonProfit.userProfile.displayName}</div>
                    <div>{nonProfit.userProfile.email}</div>
                    <div>{nonProfit.userProfile.fullName}</div>
                </CardBody>
            </div>
        </Card>
    )
};

export default NonProfit;