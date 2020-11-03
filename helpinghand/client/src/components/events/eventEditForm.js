import React, { useState, useContext, useEffect, useRef } from "react";
import { Form, FormGroup, Card, CardBody, Label, Input, Button } from "reactstrap";
import { EventContext } from "../../providers/EventProvider";
import { useHistory, useParams } from "react-router-dom";
import DateTimePicker from 'react-datetime-picker';

const EventEditForm = () => {
    const { editEvent, getEventById } = useContext(EventContext);
    const [events, setEvent] = useState();
    const history = useHistory();
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const name = useRef();
    const location = useRef();
    const comments = useRef();
    const description = useRef();
    const [dateTime, setDateTime] = useState();

    const submit = event => {
        event.preventDefault();
        setIsLoading(true);
        const updatedEvent = {
            id: events.id,
            nonProfitId: events.nonProfitId,
            name: name.current.value,
            createDateTime: dateTime,
            description: description.current.value,
            location: location.current.value,
            comments: comments.current.value
        }

        editEvent(updatedEvent)
            .then(() => history.push(`/event`));
    };

    useEffect(() => {
        getEventById(id).then(setEvent);
    }, []);
    if (!events) {
        return null;
    }

    if (events.nonProfit.ownerId === JSON.parse(sessionStorage.getItem("userProfile")).id) {
        return (
            <div className="container pt-4">
                <div className="row justify-content-center">
                    <Card className="col-sm-12 col-lg-6">
                        <CardBody>
                            <Form>
                                <FormGroup>
                                    <Label for="name">Name</Label>
                                    <Input
                                        id="name"
                                        defaultValue={events.name}
                                        innerRef={name}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <DateTimePicker
                                        format="yyyy-MM-dd h:mm a"
                                        onChange={setDateTime}
                                        value={dateTime}
                                        returnValue="end"
                                        defaultValue={events.createDateTime}
                                        utc={true}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="description">Description</Label>
                                    <Input
                                        id="description"
                                        type="textarea"
                                        rows="5"
                                        defaultValue={events.description}
                                        innerRef={description} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="location">Location</Label>
                                    <Input
                                        id="location"
                                        type="textarea"
                                        rows="1"
                                        defaultValue={events.location}
                                        innerRef={location} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="comments">Comments</Label>
                                    <Input type="textarea"
                                        rows="2" id="comments"
                                        defaultValue={events.location}
                                        innerRef={comments} />
                                </FormGroup>
                            </Form>
                            <Button
                                color="info"
                                style={{ margin: 10 }}
                                disabled={isLoading}
                                onClick={submit}
                            >Submit
                            </Button>
                            <Button color="info"
                                style={{ margin: 10 }}
                                disabled={isLoading}
                                onClick={() => { history.push(`/event`) }}>
                                Cancel
                        </Button>
                        </CardBody>
                    </Card>
                </div>
            </div>
        );
    } else {
        return (
            <h1>You Shouldnt be here</h1>
        )
    }
};

export default EventEditForm;