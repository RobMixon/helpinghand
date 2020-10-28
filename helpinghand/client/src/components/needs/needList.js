import React, { useContext, useEffect } from "react";
import { Button } from "reactstrap";
import { NeedContext } from "../../providers/NeedProvider";
import Need from "./need";
import { useHistory } from 'react-router-dom';



const NeedList = () => {
    const { needs, getAllNeeds } = useContext(NeedContext);
    const history = useHistory();

    useEffect(() => {
        getAllNeeds();
    }, []);

    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="cards-column">
                        {needs.map((need) =>
                            <Need key={need.id} need={need}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    )
};

export default NeedList;