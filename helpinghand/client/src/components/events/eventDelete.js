import React, { useEffect, useContext, useState } from "react";
import { Card, CardBody, Button } from "reactstrap";
import { EventContext } from "../../providers/EventProvider";
import { useParams, useHistory } from "react-router-dom";

const EventDelete = () => {
    const [event, setEvent] = useState();
    const { getEventById, deleteEvent } = useContext(EventContext);
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        getEventById(id).then(setEvent);
    }, []);
    if (!event) {
        return null;
    }
    return (
        <Card className="m-4">

            <h1>Careful now</h1>
            <h2> Are you sure you want to delete "{event.name}"</h2>
            <CardBody>
                <Button color="info"
                    style={{ margin: 10 }}
                    onClick={() => { history.push(`/event`) }}>
                    No, But thanks for asking
                </Button>
                <Button color="danger"
                    style={{ margin: 10 }}
                    onClick={() => {
                        deleteEvent(id)
                            .then(() => {
                                history.push(`/event`)
                            })
                    }
                    }
                >Yes!
                </Button>
            </CardBody>
        </Card>
    );
};


export default EventDelete;