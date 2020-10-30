import { Button, Card, CardBody } from "reactstrap";
import React from "react";
import { Link } from "react-router-dom"
import "./need.css";

const Need = ({ need }) => {

    let currentUser = JSON.parse(sessionStorage.getItem('userProfile')).id;

    return (

        <Card style={{ border: "none" }}>
            <div className="nonProfitCard">
                <CardBody>
                    <div>
                        <Link to={`/need/details/${need.id}`}>
                            <Button color="info" className="commentButton">Details</Button>
                        </Link>
                        {(currentUser === need.nonProfit.ownerId) ?
                            <Link to={`/need/edit/${need.id}`}>
                                <Button color="info" className="commentButton">Edit</Button>
                            </Link>
                            : <div></div>}
                        {(currentUser === need.nonProfit.ownerId) ?
                            <Link to={`/need/delete/${need.id}`}>
                                <Button color="danger" className="commentButton">Delete</Button>
                            </Link>
                            : <div></div>}


                    </div>
                    <div><span class="formText">Item: </span> {need.item}</div>
                    <div><span class="formText">Description: </span> {need.description}</div>
                    <div><span class="formText">Quantity: </span> {need.quantity}</div>
                    <div><span class="formText">Location: </span>{need.location}</div>
                    <div><span class="formText">Non-Profit in Need: </span>{need.nonProfit.name}</div>
                    <div><span class="formText">Get More Information on the Non-Profit: </span> {need.nonProfit.website}</div>
                </CardBody>
            </div>
        </Card>
    )
};

export default Need;