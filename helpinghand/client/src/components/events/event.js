import { Button, Card, CardBody } from "reactstrap";
import React from "react";
import { Link } from "react-router-dom"
import "./event.css";
import moment from 'moment';

const Event = ({ event }) => {

    let currentUser = JSON.parse(sessionStorage.getItem('userProfile')).id;

    return (

        <Card style={{ border: "none" }}>
            <div className="nonProfitCard">
                <CardBody>
                    <div>
                        <Link to={`/event/details/${event.id}`}>
                            <Button color="info" className="commentButton">Details</Button>
                        </Link>
                        {(currentUser === event.nonProfit.ownerId) ?
                            <Link to={`/event/edit/${event.id}`}>
                                <Button color="info" className="commentButton">Edit</Button>
                            </Link>
                            : <div></div>}
                        {(currentUser === event.nonProfit.ownerId) ?
                            <Link to={`/event/delete/${event.id}`}>
                                <Button color="danger" className="commentButton">Delete</Button>
                            </Link>
                            : <div></div>}


                    </div>
                    <div><span class="formText">Event: </span> {event.name}</div>
                    <div><span class="formText">Date: </span> {moment(event.createDateTime).format("MMMM Do YYYY, h:mm a")}</div>
                    <div><span class="formText">Location: </span>{event.location}</div>
                    <div><span class="formText">Description: </span> {event.description}</div>
                    <div><span class="formText">Non-Profit in Need: </span>{event.nonProfit.name}</div>
                    <div><span class="formText">Get More Information on the Non-Profit: </span> {event.nonProfit.website}</div>
                </CardBody>
            </div>
        </Card>
    )
};

export default Event;