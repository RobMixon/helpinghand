import React, { useEffect, useContext, useState } from "react";
import { Button } from "reactstrap";
import { EventContext } from "../../providers/EventProvider";
import Event from "../events/event";
import { Link, useParams, useHistory } from "react-router-dom";



const EventsOfNonProfit = () => {
    const { getEventByNonProfitId } = useContext(EventContext);
    const { id } = useParams();
    const [events, setEvent] = useState();
    const history = useHistory();

    useEffect(() => {
        getEventByNonProfitId(id).then(setEvent);
    }, []);
    if (!events) {
        return null;
    }

    return (
        <>
            <div className="container">
                <div className="row justify-content-left">
                    <div className="cards-column">
                        {events.map((event) =>
                            <Event key={event.id} event={event}
                            />
                        )}
                        <Button
                            color="info"
                            onClick={() => {
                                history.push(`/nonProfit`)
                            }}
                        >Back
                            </Button>
                    </div>
                </div>
            </div>
        </>
    )

};

export default EventsOfNonProfit;