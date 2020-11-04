import React, { useContext, useEffect, useState } from "react";
import { Button } from "reactstrap";
import { NeedContext } from "../../providers/NeedProvider";
import { NonProfitContext } from "../../providers/NonProfitProvider";
import Need from "./need";
import { Link } from 'react-router-dom';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import "./need.css";

const NeedList = () => {
    const { needs, getAllNeeds } = useContext(NeedContext);
    const { nonProfits, getAllNonProfits } = useContext(NonProfitContext);
    const [nonProfit, setNonProfit] = useState();

    useEffect(() => {
        getAllNeeds();
        getAllNonProfits();
    }, []);

    const handleSelect = (e) => {
        let event = parseInt(e);
        event === 0 ? setNonProfit(needs) : setNonProfit(needs.filter(need => need.nonProfitId === event))
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <Link to={`need/needForm`}>
                        <Button color="info" className="commentButton">Add Need</Button>
                    </Link>
                    <DropdownButton
                        title="Search by NonProfit"
                        id="dropdown-menu"
                        className="nonProfit_Dropdown_menu"
                        onSelect={handleSelect}>
                        <div className="dropDown_box">
                            <Dropdown.Item className="dropDown_item" eventKey="0">All NonProfits</Dropdown.Item>
                            {nonProfits.map((nonProfit) =>
                                <Dropdown.Item
                                    className="dropDown_item"
                                    key={nonProfit.id}
                                    eventKey={nonProfit.id}>{nonProfit.name}</Dropdown.Item>)}
                        </div>
                    </DropdownButton>
                </div>
                <div className="row justify-content-left">
                    <div className="cards-column">
                        {(nonProfit !== undefined)
                            ?
                            nonProfit.map(need =>
                                <Need key={need.id} need={need}
                                />
                            )
                            :
                            needs.map((need) =>
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