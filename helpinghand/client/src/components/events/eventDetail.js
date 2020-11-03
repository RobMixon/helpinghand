import React, { useEffect, useContext, useState } from "react";
import { EventContext } from "../../providers/EventProvider";
import { Link, useParams, useHistory } from "react-router-dom";
import { Button, Card, CardBody } from "reactstrap";

const EventDetail = () => {
    const [event, setEvent] = useState();
    const { getEventById } = useContext(EventContext);
    const { id } = useParams();
    const history = useHistory();


    useEffect(() => {
        getEventById(id).then(setEvent);
    }, []);
    if (!event) {
        return null;
    }

    const currentUser = JSON.parse(sessionStorage.getItem('userProfile')).id;

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-sm-20 col-lg-8">
                    <Card style={{ border: "none" }}>
                        <div className="nonProfitCard">
                            <CardBody>
                                <div>

                                    {(currentUser === event.nonProfit.ownerId) ?
                                        <Link to={`/event/edit/${event.id}`}>
                                            <Button className="commentButton" color="info">Edit</Button>
                                        </Link>
                                        : <div></div>}
                                    {(currentUser === event.nonProfit.ownerId) ?
                                        <Link to={`/event/delete/${event.id}`}>
                                            <Button color="danger" className="commentButton">Delete</Button>
                                        </Link>
                                        : <div></div>}

                                </div>
                                <br></br>
                                <div><span class="formText">Item: </span>{event.name}</div>
                                <div><span class="formText">Description: </span>{event.description}</div>
                                <div><span class="formText">Quantity: </span> {event.createDateTime}</div>
                                <div><span class="formText">Location: </span>{event.location}</div>
                                <div><span class="formText">Non-Profit in event: </span>{event.nonProfit.name}</div>
                                <div><span class="formText">Location of the Non-Profit: </span>{event.nonProfit.location} nonprofit location</div>
                                <div><span class="formText">Get More Information on the Non-Profit: </span>{event.nonProfit.website}</div>
                                <br></br>
                                <Button
                                    color="info"
                                    onClick={() => {
                                        history.push(`/event`)
                                    }}
                                >Back
                                </Button>
                            </CardBody>
                        </div>
                    </Card>
                </div>
            </div>
        </div >
    );
};

export default EventDetail;