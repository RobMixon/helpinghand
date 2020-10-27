import React, { useState, useContext, useEffect, useRef } from "react";
import { Form, FormGroup, Card, CardBody, Label, Input, Button, InputGroup, InputGroupAddon, InputGroupText, Alert } from "reactstrap";
import { NonProfitContext } from "../../providers/NonProfitProvider";
import { useHistory } from "react-router-dom";

const NonProfitForm = () => {
    const { addNonProfit } = useContext(NonProfitContext);
    const history = useHistory();
    const name = useRef();
    const location = useRef();
    const cause = useRef();
    const description = useRef();
    const missionStatement = useRef();
    const website = useRef();

    const submit = () => {
        const nonProfit = {
            name: name.current.value,
            ownerId: JSON.parse(sessionStorage.getItem('userProfile')).id,
            location: location.current.value,
            cause: cause.current.value,
            description: description.current.value,
            missionStatement: missionStatement.current.value,
            website: website.current.value
        };
        if (nonProfit.name === "") {
            window.alert("Please add a name")
        }
        if (nonProfit.location === "") {
            window.alert("what is the location of the Non-Profit?")
        }
        if (nonProfit.cause === "") {
            window.alert("please tell us what cause the Non-Profit is driven by?")
        }
        if (nonProfit.description === "") {
            window.alert("please give us a description")
        }
        if (nonProfit.missionStatement === "") {
            window.alert("please tell us your Non-Profit's mission statement?")
        }
        if (nonProfit.website === "") {
            window.alert("please tell us the website of your Non-Profit?")
        }

        if (nonProfit.name !== "" && nonProfit.location !== "" && nonProfit.cause !== "" &&
            nonProfit.description !== "" && nonProfit.missionStatement !== "" && nonProfit.website !== "") {
            addNonProfit(nonProfit).then((res) => {
                history.push(`/nonProfits/`);
                // history.push(`/nonProfit/${res.id}`);
            });
        }

    };

    return (
        <div className="container pt-4">
            <div className="row justify-content-center">
                <Card className="col-sm-12 col-lg-6">
                    <CardBody>
                        <Form encType="multipart/form-data">
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input
                                    id="name"
                                    innerRef={name}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="location">Location</Label>
                                <Input type="textarea"
                                    rows="1" id="location"
                                    innerRef={location} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="cause">Cause</Label>
                                <Input type="textarea"
                                    rows="2" id="cause"
                                    innerRef={cause} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="description">Description</Label>
                                <Input type="textarea"
                                    rows="10" id="description"
                                    innerRef={description} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="missionStatement">Mission Statement</Label>
                                <Input type="textarea"
                                    rows="2" id="missionStatement"
                                    innerRef={missionStatement} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="website">Website</Label>
                                <Input type="website"
                                    rows="1" id="website"
                                    innerRef={website} />
                            </FormGroup>
                        </Form>
                        <Button color="info" onClick={submit}>
                            SUBMIT
                        </Button>
                        <Button color="info"
                            onClick={() => { history.push(`/nonProfits/`) }}>
                            Cancel
                        </Button>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default NonProfitForm;