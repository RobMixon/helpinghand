import React, { useContext, useEffect, useState } from "react";
import { Button } from "reactstrap";
import { EventContext } from "../../providers/EventProvider";
import { NonProfitContext } from "../../providers/NonProfitProvider";
import Event from "./event";
import { Link } from 'react-router-dom';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import "./event.css";

const EventList = () => {
    const { events, getAllEvents } = useContext(EventContext);
    const { nonProfits, getAllNonProfits } = useContext(NonProfitContext);
    const [nonProfit, setNonProfit] = useState();

    useEffect(() => {
        getAllEvents();
        getAllNonProfits();
    }, []);

    const handleSelect = (e) => {
        let filter = parseInt(e);
        filter === 0 ? setNonProfit(events) : setNonProfit(events.filter(event => event.nonProfitId === filter))
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <Link to={`event/eventForm`}>
                        <Button color="info" className="commentButton">Add Event</Button>
                    </Link>
                    <DropdownButton
                        title="Filter by NonProfit"
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
                            nonProfit.map((event) =>
                                <Event key={event.id} event={event}
                                />
                            )
                            :
                            events.map((event) =>
                                <Event key={event.id} event={event}
                                />
                            )}
                    </div>
                </div>
            </div>
        </>
    )
};

export default EventList;