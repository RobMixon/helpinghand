import React, { useContext, useEffect } from "react";
import { Button } from "reactstrap";
import { EventContext } from "../../providers/EventProvider";
import Event from "./event";
import { useHistory, Link } from 'react-router-dom';



const EventList = () => {
    const { events, getAllEvents } = useContext(EventContext);

    useEffect(() => {
        getAllEvents();
    }, []);

    console.log(events, "eventsList")

    return (
        <>
            <div className="container">
                <Link to={`event/eventForm`}>
                    <Button color="info" className="commentButton">Add Event</Button>
                </Link>
                <div className="row justify-content-left">
                    <div className="cards-column">
                        {events.map((event) =>
                            <Event key={event.id} event={event}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    )
};

export default EventList;