import React, { useContext, useEffect } from "react";
import { Button, Card, CardBody } from "reactstrap";
import { NonProfitContext } from "../../providers/NonProfitProvider";
import NonProfit from "./nonProfit";
import { useParams, useHistory, Link } from 'react-router-dom';



const NonProfitList = () => {
    const { nonProfits, getAllNonProfits } = useContext(NonProfitContext);
    const history = useHistory();

    useEffect(() => {
        getAllNonProfits();
    }, []);

    return (
        <>

            <div className="container">
                <Button color="danger"
                    onClick={() => { history.push(`/nonProfitForm/`) }}>
                    Create A Non-Profit
                    </Button>
                <div className="row justify-content-center">
                    <div className="cards-column">
                        {nonProfits.map((nonProfit) =>
                            <NonProfit key={nonProfit.id} nonProfit={nonProfit}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    )

};

export default NonProfitList;