import React, { useContext, useEffect } from "react";
import { Button } from "reactstrap";
import { NonProfitContext } from "../../providers/NonProfitProvider";
import NonProfit from "./nonProfit";
import { useHistory } from 'react-router-dom';



const NonProfitList = () => {
    const { nonProfits, getAllNonProfits } = useContext(NonProfitContext);
    const history = useHistory();

    useEffect(() => {
        getAllNonProfits();
    }, []);

    return (
        <>
            <div className="container">
                <Button
                    color="info"
                    onClick={() => { history.push(`/nonProfitForm`) }}>
                    Create A Non-Profit
                    </Button>
                <div className="row justify-content-left">
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