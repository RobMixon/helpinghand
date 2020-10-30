import React, { useContext, useRef, useEffect, useState } from "react";
import { Form, FormGroup, Card, CardBody, Label, Input, Button } from "reactstrap";
import { NeedContext } from "../../providers/NeedProvider";
import { NonProfitContext } from "../../providers/NonProfitProvider";
import { useHistory } from "react-router-dom";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

const NeedForm = () => {
    const { addNeed } = useContext(NeedContext);
    const { getNonProfitByOwnerId } = useContext(NonProfitContext);
    const [nonProfit, setNonProfit] = useState();
    const history = useHistory();
    const item = useRef();
    const quantity = useRef();
    const description = useRef();
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
        const need = {
            item: item.current.value,
            nonProfitId: NPID,
            quantity: quantity.current.value,
            description: description.current.value,
            location: location.current.value
        };

        console.log(need, "need");
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
        if (need.nonProfitId === "") {
            window.alert("please select one of your nonProfits")
        }

        if (need.item !== "" && need.location !== "" && need.description !== "" && need.quantity !== "") {
            addNeed(need).then((res) => {
                history.push(`/need`);
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
                        <Button
                            onClick={submit}
                            color="info">
                            SUBMIT
                        </Button>
                        <Button
                            color="info"
                            onClick={() => { history.push(`/need`) }}>
                            Cancel
                        </Button>
                    </CardBody>
                </Card>
            </div>
        </div >
    );
};

export default NeedForm;