import React, { useContext, useEffect } from "react";
import { Button } from "reactstrap";
import { NeedContext } from "../../providers/NeedProvider";
import Need from "./need";
import { useHistory, Link } from 'react-router-dom';



const NeedList = () => {
    const { needs, getAllNeeds } = useContext(NeedContext);

    useEffect(() => {
        getAllNeeds();
    }, []);

    return (
        <>
            <div className="container">
                <Link to={`need/needForm`}>
                    <Button className="commentButton">Add Need</Button>
                </Link>
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