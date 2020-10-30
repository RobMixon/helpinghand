import React, { useEffect, useContext, useState } from "react";
import { Button } from "reactstrap";
import { NeedContext } from "../../providers/NeedProvider";
import Need from "../needs/need";
import { Link, useParams, useHistory } from "react-router-dom";



const NeedsOfNonProfit = () => {
    const { getNeedByNonProfitId } = useContext(NeedContext);
    const { id } = useParams();
    const [needs, setNeed] = useState();
    const history = useHistory();

    useEffect(() => {
        getNeedByNonProfitId(id).then(setNeed);
        console.log(needs, "needs")
    }, []);
    if (!needs) {
        return null;
    }

    return (
        <>
            <div className="container">
                <div className="row justify-content-left">
                    <div className="cards-column">
                        {needs.map((need) =>
                            <Need key={need.id} need={need}
                            />
                        )}
                        <Button
                            color="info"
                            onClick={() => {
                                history.push(`/nonProfit`)
                            }}
                        >Back
                            </Button>
                    </div>
                </div>
            </div>
        </>
    )

};

export default NeedsOfNonProfit;