import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const EventContext = React.createContext();

export const EventProvider = (props) => {
    const [events, setEvents] = useState([]);
    const { getToken } = useContext(UserProfileContext);



    const getAllEvents = () => {
        getToken().then((token) =>
            fetch(`/api/event`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => res.json())
                .then(setEvents));
    };

    const getEventById = (id) =>
        getToken().then((token) =>
            fetch(`/api/event/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => res.json())
        );

    const getEventByNonProfitId = (NonProfitId) =>
        getToken().then((token) =>
            fetch(`/api/event/NPevent/${NonProfitId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => res.json())
        );

    const addEvent = (event) =>
        getToken().then((token) =>
            fetch("/api/event", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(event)
            }).then(resp => {
                if (resp.ok) {
                    return resp.json();
                }
                throw new Error("Unauthorized");
            }));


    const editEvent = (event) =>
        getToken().then((token) =>
            fetch(`/api/event/${event.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(event),
            }));

    const deleteEvent = (id) =>
        getToken().then((token) =>
            fetch(`/api/event/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }));

    return (
        <EventContext.Provider value={{ events, deleteEvent, addEvent, editEvent, getEventByNonProfitId, getEventById, getAllEvents }}>
            {props.children}
        </EventContext.Provider>
    );
};