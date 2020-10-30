import React, { useEffect, useContext, useState } from "react";
import { NonProfitContext } from "../../providers/NonProfitProvider";
import { Link, useParams, useHistory } from "react-router-dom";
import { Button, Card, CardBody } from "reactstrap";

const NonProfitDetail = () => {
    const [nonProfit, setNonProfit] = useState(null);
    const { getSingleNonProfit } = useContext(NonProfitContext);
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        getSingleNonProfit(id).then(setNonProfit);
    }, []);
    if (!nonProfit) {
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

                                    {(currentUser === nonProfit.ownerId) ?
                                        <Link to={`/nonProfit/edit/${nonProfit.id}`}>
                                            <Button color="info" className="commentButton">Edit</Button>
                                        </Link>
                                        : <div></div>}
                                    {(currentUser === nonProfit.ownerId) ?
                                        <Link to={`/nonProfit/delete/${nonProfit.id}`}>
                                            <Button color="danger" className="commentButton">Delete</Button>
                                        </Link>
                                        : <div></div>}

                                </div>
                                <div>{nonProfit.id}</div>
                                <div>{nonProfit.name}</div>
                                <div>{nonProfit.ownerId}</div>
                                <div>{nonProfit.location}</div>
                                <div>{nonProfit.cause}</div>
                                <div>{nonProfit.description}</div>
                                <div>{nonProfit.missionStatement}</div>
                                <div>{nonProfit.website}</div>
                                <div>{nonProfit.userProfile.firstName} {nonProfit.userProfile.lastName}</div>
                                <div>{nonProfit.userProfile.displayName}</div>
                                <div>{nonProfit.userProfile.email}</div>
                                <div>{nonProfit.userProfile.fullName}</div>
                                <br></br>
                                <Button
                                    color="info"
                                    onClick={() => {
                                        history.push(`/nonProfit`)
                                    }}
                                >Back
                                </Button>
                            </CardBody>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default NonProfitDetail;