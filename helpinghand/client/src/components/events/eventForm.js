import React, { useContext, useRef, useEffect, useState } from "react";
import { Form, FormGroup, Card, CardBody, Label, Input, Button } from "reactstrap";
import { EventContext } from "../../providers/EventProvider";
import { NonProfitContext } from "../../providers/NonProfitProvider";
import { useHistory } from "react-router-dom";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

const EventForm = () => {
    const { addEvent } = useContext(EventContext);
    const { getNonProfitByOwnerId } = useContext(NonProfitContext);
    const [nonProfit, setNonProfit] = useState();
    const history = useHistory();
    const name = useRef();
    const createDateTime = useRef();
    const description = useRef();
    const comments = useRef();
    const location = useRef();
    const [NPID, setNPID] = useState();

    const currentUser = JSON.parse(sessionStorage.getItem("userProfile")).id;

    useEffect(() => {
        getNonProfitByOwnerId(currentUser).then(setNonProfit);
    }, []);
    if (!nonProfit) {
        return null;
    }

    const submit = () => {
        const event = {
            name: name.current.value,
            nonProfitId: NPID,
            createDateTime: createDateTime.current.value,
            description: description.current.value,
            location: location.current.value,
            comments: comments.current.value
        };

        console.log(event, "event");
        if (event.name === "") {
            window.alert("Please add an item")
        }
        if (event.createDateTime === "") {
            window.alert("Please add a quantity")
        }
        if (event.description === "") {
            window.alert("please give a description")
        }
        if (event.location === "") {
            window.alert("please give us a location")
        }
        if (event.nonProfitId === "") {
            window.alert("please select one of your nonProfits")
        }
        if (event.comments === "") {
            window.alert("please enter in a comment")
        }

        if (event.item !== "" && event.location !== "" && event.description !== "" && event.quantity !== "") {
            addEvent(event).then((res) => {
                history.push(`/event`);
            });
        }
    };

    const handleSelect = (e) => {
        let selected = nonProfit.filter(nonProfit => nonProfit.name === e)
        setNPID(selected[0].id)
    }

    console.log(NPID, "setting ID")
    console.log(nonProfit, "blue")

    return (
        <div className="container pt-4">
            <div className="row justify-content-center">
                <Card className="col-sm-12 col-lg-6">
                    <CardBody>
                        <Form encType="multipart/form-data">
                            <DropdownButton
                                title="NonProfits"
                                color="info"
                                id="dropdown-menu"
                                className="nonProfit_Dropdown_menu"
                                onSelect={handleSelect}>
                                <div className="dropDown_box">
                                    {nonProfit.map((np) =>
                                        <Dropdown.Item
                                            className="dropDown_item"
                                            key={np.id}
                                            eventKey={np.name}>{np.name}</Dropdown.Item>)}
                                </div>
                            </DropdownButton>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input
                                    id="name"
                                    innerRef={name}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="createDateTime">Date</Label>
                                <Input type="textarea"
                                    rows="1" id="createDateTime"
                                    innerRef={createDateTime} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="description">Description</Label>
                                <Input type="textarea"
                                    rows="5" id="description"
                                    innerRef={description} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="location">Location</Label>
                                <Input type="textarea"
                                    rows="2" id="location"
                                    innerRef={location} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="comments">Comments</Label>
                                <Input type="textarea"
                                    rows="2" id="comments"
                                    innerRef={comments} />
                            </FormGroup>
                        </Form>
                        <Button
                            onClick={submit}
                            color="info">
                            SUBMIT
                        </Button>
                        <Button
                            color="info"
                            onClick={() => { history.push(`/event`) }}>
                            Cancel
                        </Button>
                    </CardBody>
                </Card>
            </div>
        </div >
    );
};

export default EventForm;