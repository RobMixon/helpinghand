import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const NeedContext = React.createContext();

export const NeedProvider = (props) => {
    const [needs, setNeeds] = useState([]);
    const { getToken } = useContext(UserProfileContext);



    const getAllNeeds = () => {
        getToken().then((token) =>
            fetch(`/api/need`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => res.json())
                .then(setNeeds));
    };

    const getNeedById = (id) =>
        getToken().then((token) =>
            fetch(`/api/need/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => res.json())
        );

    const getNeedByNonProfitId = (NonProfitId) =>
        getToken().then((token) =>
            fetch(`/api/need/need/a${NonProfitId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => res.json())
        );

    const addNeed = (need) =>
        getToken().then((token) =>
            fetch("/api/need", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(need)
            }).then(resp => {
                if (resp.ok) {
                    return resp.json();
                }
                throw new Error("Unauthorized");
            }));


    const editNeed = (need) =>
        getToken().then((token) =>
            fetch(`/api/need/${need.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(need),
            }));

    const deleteNeed = (id) =>
        getToken().then((token) =>
            fetch(`/api/need/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }));

    return (
        <NeedContext.Provider value={{ needs, getAllNeeds, deleteNeed, editNeed, addNeed, getNeedById, getNeedByNonProfitId }}>
            {props.children}
        </NeedContext.Provider>
    );
};