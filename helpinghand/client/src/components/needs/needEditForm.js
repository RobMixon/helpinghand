import React, { useState, useContext, useEffect, useRef } from "react";
import { Form, FormGroup, Card, CardBody, Label, Input, Button } from "reactstrap";
import { NeedContext } from "../../providers/NeedProvider";
import { useHistory, useParams } from "react-router-dom";

const NeedEditForm = () => {
    const { editNeed, getNeedById } = useContext(NeedContext);
    const [need, setNeed] = useState();
    const history = useHistory();
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const item = useRef();
    const location = useRef();
    const quantity = useRef();
    const description = useRef();

    const submit = event => {
        event.preventDefault();
        setIsLoading(true);
        const updatedNeed = {
            id: need.id,
            nonProfitId: need.nonProfitId,
            item: item.current.value,
            quantity: quantity.current.value,
            description: description.current.value,
            location: location.current.value
        }

        editNeed(updatedNeed)
            .then(() => history.push(`/need`));
    };

    useEffect(() => {
        getNeedById(id).then(setNeed);
    }, []);
    if (!need) {
        return null;
    }

    if (need.nonProfit.ownerId === JSON.parse(sessionStorage.getItem("userProfile")).id) {
        return (
            <div className="container pt-4">
                <div className="row justify-content-center">
                    <Card className="col-sm-12 col-lg-6">
                        <CardBody>
                            <Form>
                                <FormGroup>
                                    <Label for="item">Item</Label>
                                    <Input
                                        id="item"
                                        defaultValue={need.item}
                                        innerRef={item}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="quantity">Quantity</Label>
                                    <Input
                                        id="quantity"
                                        type="textarea"
                                        rows="1"
                                        defaultValue={need.quantity}
                                        innerRef={quantity} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="description">Description</Label>
                                    <Input
                                        id="description"
                                        type="textarea"
                                        rows="5"
                                        defaultValue={need.description}
                                        innerRef={description} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="location">Location</Label>
                                    <Input
                                        id="location"
                                        type="textarea"
                                        rows="1"
                                        defaultValue={need.location}
                                        innerRef={location} />
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
                                onClick={() => { history.push(`/need`) }}>
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

export default NeedEditForm;