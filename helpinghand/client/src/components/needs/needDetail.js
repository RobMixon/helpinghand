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
                <div className="col-sm-12 col-lg-6">
                    <Card style={{ border: "none" }}>
                        <div className="nonProfitCard">
                            <CardBody>
                                <div>

                                    {(currentUser === need.nonProfit.ownerId) ?
                                        <Link to={`/need/edit/${need.id}`}>
                                            <Button className="commentButton">Edit</Button>
                                        </Link>
                                        : <div></div>}
                                    {(currentUser === need.nonProfit.ownerId) ?
                                        <Link to={`/need/delete/${need.id}`}>
                                            <Button color="danger" className="commentButton">Delete</Button>
                                        </Link>
                                        : <div></div>}

                                </div>
                                <div>{need.description}</div>
                                <div>{need.id} Nonprofit Id</div>
                                <div>{need.item}</div>
                                <div>{need.location}</div>
                                <div>{need.quantity}</div>
                                <div>{need.nonProfit.cause} NON  profit cause</div>
                                <div>{need.nonProfit.description} NON profit description</div>
                                <div>{need.nonProfit.id} NON profit id</div>
                                <div>{need.nonProfit.location} nonprofit location</div>
                                <div>{need.nonProfit.missionStatement}</div>
                                <div>{need.nonProfit.name}</div>
                                <div>{need.nonProfit.ownerId} np owner id</div>
                                <div>{need.nonProfit.website}</div>
                                <Button
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