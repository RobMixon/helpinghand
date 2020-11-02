import { Button, Card, CardBody } from "reactstrap";
import React from "react";
import { Link } from "react-router-dom";
import "./nonProfit.css";


const NonProfit = ({ nonProfit }) => {

    let currentUser = JSON.parse(sessionStorage.getItem('userProfile')).id;

    return (

        <Card style={{ border: "none" }}>
            <div className="nonProfitCard">
                <CardBody>
                    <div>
                        <Link to={`nonprofit/${nonProfit.id}/need`}>
                            <Button color="info" className="commentButton">Needs</Button>
                        </Link>
                        <Link to={`nonProfit/${nonProfit.id}/event`}>
                            <Button color="info" className="commentButton">Events</Button>
                        </Link>
                        <Link to={`nonProfit/details/${nonProfit.id}`}>
                            <Button color="info" className="commentButton">Details</Button>
                        </Link>
                        {(currentUser === nonProfit.ownerId) ?
                            <Link to={`nonProfit/edit/${nonProfit.id}`}>
                                <Button color="info" className="commentButton">Edit</Button>
                            </Link>
                            : <div></div>}
                        {(currentUser === nonProfit.ownerId) ?
                            <Link to={`nonProfit/delete/${nonProfit.id}`}>
                                <Button color="danger" className="commentButton">Delete</Button>
                            </Link>
                            : <div></div>}

                    </div>
                    <div><span class="formText">Name: </span>{nonProfit.name}</div>
                    <div><span class="formText">Location: </span>{nonProfit.location}</div>
                    <div><span class="formText">Cause: </span>{nonProfit.cause}</div>
                    <div><span class="formText">Description: </span>{nonProfit.description}</div>
                    <div><span class="formText">Mission: </span>{nonProfit.missionStatement}</div>
                    <div><span class="formText">Website: </span>{nonProfit.website}</div>
                </CardBody>
            </div>
        </Card>
    )
};

export default NonProfit;