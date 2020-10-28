import { Button, Card, CardBody } from "reactstrap";
import React from "react";
import { Link } from "react-router-dom"

const Need = ({ need }) => {

    let currentUser = JSON.parse(sessionStorage.getItem('userProfile')).id;

    return (

        <Card style={{ border: "none" }}>
            <div className="nonProfitCard">
                <CardBody>
                    <div>
                        {(currentUser === need.nonProfit.ownerId) ?
                            <Link to={`need/edit/${need.id}`}>
                                <Button className="commentButton">Edit</Button>
                            </Link>
                            : <div></div>}
                        {(currentUser === need.nonProfit.ownerId) ?
                            <Link to={`need/delete/${need.id}`}>
                                <Button color="danger" className="commentButton">Delete</Button>
                            </Link>
                            : <div></div>}
                        {(currentUser === need.nonProfit.ownerId) ?
                            <Link to={`need/needForm`}>
                                <Button className="commentButton">Add Need</Button>
                            </Link>
                            : <div></div>}
                        <Link to={`need/details/${need.id}`}>
                            <Button className="commentButton">Details</Button>
                        </Link>


                    </div>
                    <div>{need.description}</div>
                    <div>{need.id}</div>
                    <div>{need.item}</div>
                    <div>{need.location}</div>
                    <div>{need.quantity}</div>
                    <div>{need.nonProfit.cause} NON  profit cause</div>
                    <div>{need.nonProfit.description} NON profit description</div>
                    <div>{need.nonProfit.id} NON profit id</div>
                    <div>{need.nonProfit.location} nonprofit location</div>
                    <div>{need.nonProfit.missionStatement}</div>
                    <div>{need.nonProfit.name}</div>
                    <div>{need.nonProfit.ownerId} np owner id</div>
                    <div>{need.nonProfit.website}</div>
                </CardBody>
            </div>
        </Card>
    )
};

export default Need;