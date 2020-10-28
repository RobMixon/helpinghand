import React, { useEffect, useContext, useState } from "react";
import { Card, CardBody, Button } from "reactstrap";
import { NonProfitContext } from "../../providers/NonProfitProvider";
import { useParams, useHistory } from "react-router-dom";

const NonProfitDelete = () => {
    const [nonProfit, setNonProfit] = useState();
    const { getSingleNonProfit, deleteNonProfit } = useContext(NonProfitContext);
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        getSingleNonProfit(id).then(setNonProfit);
    }, []);
    if (!nonProfit) {
        return null;
    }

    if (nonProfit.ownerId === JSON.parse(sessionStorage.getItem("userProfile")).id) {

        return (
            <Card className="m-4">
                
                <h1>Careful now</h1>
                <h2> Are you sure you want to delete "{nonProfit.name}"</h2>
                <CardBody>
                    <Button color="info"
                    style={{margin: 10}}
                        onClick={() => { history.push(`/nonProfit`) }}>
                        No, But thanks for asking
                </Button>
                    <Button color="danger"
                    style={{margin: 10}}
                        onClick={() => {
                            deleteNonProfit(id)
                                .then(() => {
                                    history.push(`/nonProfit`)
                                })
                        }
                        }
                    >Yes!
                </Button>
                </CardBody>
            </Card>
        );
    } else {
        return (
            <h1>Hmmm... I don't think you should be here..</h1>
        )
    }
};


export default NonProfitDelete;