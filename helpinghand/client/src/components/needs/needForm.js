import React, { useContext, useRef } from "react";
import { Form, FormGroup, Card, CardBody, Label, Input, Button } from "reactstrap";
import { NeedContext } from "../../providers/NeedProvider";
import { useHistory } from "react-router-dom";

const NeedForm = () => {
    const { addNeed } = useContext(NeedContext);
    const history = useHistory();
    const item = useRef();
    const quantity = useRef();
    const description = useRef();
    const location = useRef();

    const submit = () => {
        const need = {
            item: item.current.value,
            nonProfitId: JSON.parse(sessionStorage.getItem('userProfile')).id,
            quantity: quantity.current.value,
            description: description.current.value,
            location: location.current.value
        };
        if (need.item === "") {
            window.alert("Please add an item")
        }
        if (need.quantity === "") {
            window.alert("Please add a quantity")
        }
        if (need.description === "") {
            window.alert("please give a description")
        }
        if (need.location === "") {
            window.alert("please give us a location")
        }

        if (need.item !== "" && need.location !== "" && need.description !== "" && need.quantity !== "") {
            addNeed(need).then((res) => {
                history.push(`/need`);
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
                                <Label for="item">Item</Label>
                                <Input
                                    id="item"
                                    innerRef={item}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="quantity">Quantity</Label>
                                <Input type="textarea"
                                    rows="1" id="quantity"
                                    innerRef={quantity} />
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
                        </Form>
                        <Button color="info" onClick={submit}>
                            SUBMIT
                        </Button>
                        <Button color="info"
                            onClick={() => { history.push(`/need`) }}>
                            Cancel
                        </Button>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default NeedForm;