import React, { useEffect, useContext, useState } from "react";
import { NeedContext } from "../../providers/NeedProvider";
import { Link, useParams, useHistory } from "react-router-dom";
import { Button, Card, CardBody } from "reactstrap";

const NeedDetail = () => {
    const [need, setNeed] = useState(null);
    const { getNeedById } = useContext(NeedContext);
    const { id } = useParams();
    const history = useHistory();


    useEffect(() => {
        getNeedById(id).then(setNeed);
    }, []);
    if (!need) {
        return null;
    }

    const currentUser = JSON.parse(sessionStorage.getItem('userProfile')).id;

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-sm-20 col-lg-8">
                    <Card style={{ border: "none" }}>
                        <div className="nonProfitCard">
                            <CardBody>
                                <div>

                                    {(currentUser === need.nonProfit.ownerId) ?
                                        <Link to={`/need/edit/${need.id}`}>
                                            <Button className="commentButton" color="info">Edit</Button>
                                        </Link>
                                        : <div></div>}
                                    {(currentUser === need.nonProfit.ownerId) ?
                                        <Link to={`/need/delete/${need.id}`}>
                                            <Button color="danger" className="commentButton">Delete</Button>
                                        </Link>
                                        : <div></div>}

                                </div>
                                <br></br>
                                <div><span class="formText">Item: </span>{need.item}</div>
                                <div><span class="formText">Description: </span>{need.description}</div>
                                <div><span class="formText">Quantity: </span> {need.quantity}</div>
                                <div><span class="formText">Location: </span>{need.location}</div>
                                <div><span class="formText">Non-Profit in Need: </span>{need.nonProfit.name}</div>
                                <div><span class="formText">Location of the Non-Profit: </span>{need.nonProfit.location} nonprofit location</div>
                                <div><span class="formText">Get More Information on the Non-Profit: </span>{need.nonProfit.website}</div>
                                <br></br>
                                <Button
                                    color="info"
                                    onClick={() => {
                                        history.push(`/need`)
                                    }}
                                >Back
                                </Button>
                            </CardBody>
                        </div>
                    </Card>
                </div>
            </div>
        </div >
    );
};

export default NeedDetail;