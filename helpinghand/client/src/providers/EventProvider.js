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

    // const getNeedById = (id) =>
    //     getToken().then((token) =>
    //         fetch(`/api/need/${id}`, {
    //             method: "GET",
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         }).then((res) => res.json())
    //     );

    // const getNeedByNonProfitId = (NonProfitId) =>
    //     getToken().then((token) =>
    //         fetch(`/api/need/NPneed/${NonProfitId}`, {
    //             method: "GET",
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         }).then((res) => res.json())
    //     );

    // const addNeed = (need) =>
    //     getToken().then((token) =>
    //         fetch("/api/need", {
    //             method: "POST",
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify(need)
    //         }).then(resp => {
    //             if (resp.ok) {
    //                 return resp.json();
    //             }
    //             throw new Error("Unauthorized");
    //         }));


    // const editNeed = (need) =>
    //     getToken().then((token) =>
    //         fetch(`/api/need/${need.id}`, {
    //             method: "PUT",
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify(need),
    //         }));

    // const deleteNeed = (id) =>
    //     getToken().then((token) =>
    //         fetch(`/api/need/${id}`, {
    //             method: "DELETE",
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         }));

    return (
        <EventContext.Provider value={{ events, getAllEvents }}>
            {props.children}
        </EventContext.Provider>
    );
};