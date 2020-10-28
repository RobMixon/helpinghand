import React, { useState, useContext, useEffect, useRef } from "react";
import { Form, FormGroup, Card, CardBody, Label, Input, Button, InputGroup, InputGroupAddon, InputGroupText, Alert } from "reactstrap";
import { NonProfitContext } from "../../providers/NonProfitProvider";
import { useHistory, useParams } from "react-router-dom";

const NonProfitEditForm = () => {
    const { editNonProfit, getSingleNonProfit } = useContext(NonProfitContext);
    const [nonProfit, setNonProfit] = useState();
    const history = useHistory();
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const name = useRef();
    const location = useRef();
    const cause = useRef();
    const description = useRef();
    const missionStatement = useRef();
    const website = useRef();

    const submit = event => {
        event.preventDefault();
        setIsLoading(true);
        const updatedNonProfit = {
            id: nonProfit.id,
            name: name.current.value,
            ownerId: JSON.parse(sessionStorage.getItem('userProfile')).id,
            location: location.current.value,
            cause: cause.current.value,
            description: description.current.value,
            missionStatement: missionStatement.current.value,
            website: website.current.value
        }
        console.log(updatedNonProfit, "blue")

        if (updatedNonProfit.name === "") {
            updatedNonProfit.name = nonProfit.name
        }

        editNonProfit(updatedNonProfit)
            .then(() => history.push(`/nonProfit`));
    };

    useEffect(() => {
        getSingleNonProfit(id).then(setNonProfit);
    }, []);
    if (!nonProfit) {
        return null;
    }

    if (!nonProfit) {
        return null;
    }

    if (nonProfit.ownerId === JSON.parse(sessionStorage.getItem("userProfile")).id) {
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
                                        defaultValue={nonProfit.name}
                                        innerRef={name}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="location">Location</Label>
                                    <Input
                                        id="location"
                                        type="textarea"
                                        rows="1"
                                        defaultValue={nonProfit.location}
                                        innerRef={location} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="cause">Cause</Label>
                                    <Input
                                        id="cause"
                                        type="textarea"
                                        rows="1"
                                        defaultValue={nonProfit.cause}
                                        innerRef={cause} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="description">Description</Label>
                                    <Input
                                        id="description"
                                        type="textarea"
                                        rows="5"
                                        defaultValue={nonProfit.description}
                                        innerRef={description} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="missionStatement">Mission Statement</Label>
                                    <Input
                                        id="missionStatement"
                                        type="textarea"
                                        rows="1"
                                        defaultValue={nonProfit.missionStatement}
                                        innerRef={missionStatement} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="website">Website</Label>
                                    <Input
                                        id="website"
                                        type="textarea"
                                        rows="1"
                                        defaultValue={nonProfit.website}
                                        innerRef={website} />
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
                                onClick={() => { history.push(`/nonProfit`) }}>
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

export default NonProfitEditForm;