import React, { useEffect, useContext, useState } from "react";
import { Card, CardBody, Button } from "reactstrap";
import { NeedContext } from "../../providers/NeedProvider";
import { useParams, useHistory } from "react-router-dom";

const NeedDelete = () => {
    const [need, setNeed] = useState();
    const { getNeedById, deleteNeed } = useContext(NeedContext);
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        getNeedById(id).then(setNeed);
    }, []);
    if (!need) {
        return null;
    }
    return (
        <Card className="m-4">

            <h1>Careful now</h1>
            <h2> Are you sure you want to delete "{need.item}"</h2>
            <CardBody>
                <Button color="info"
                    style={{ margin: 10 }}
                    onClick={() => { history.push(`/need`) }}>
                    No, But thanks for asking
                </Button>
                <Button color="danger"
                    style={{ margin: 10 }}
                    onClick={() => {
                        deleteNeed(id)
                            .then(() => {
                                history.push(`/need`)
                            })
                    }
                    }
                >Yes!
                </Button>
            </CardBody>
        </Card>
    );
};


export default NeedDelete;