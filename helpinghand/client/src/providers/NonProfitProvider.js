import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const NonProfitContext = React.createContext();

export const NonProfitProvider = (props) => {
    const [nonProfits, setNonProfits] = useState([]);
    const { getToken } = useContext(UserProfileContext);



    const getAllNonProfits = () => {
        getToken().then((token) =>
            fetch(`/api/NonProfit`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => res.json())
                .then(setNonProfits));
    };
    const getSingleNonProfit = (id) =>
        getToken().then((token) =>
            fetch(`/api/NonProfit/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => res.json())
        );

    const getNonProfitByOwnerId = (id) =>
        getToken().then((token) =>
            fetch(`/api/NonProfit/NonProfit/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => res.json())
        );

    const addNonProfit = (nonProfit) =>
        getToken().then((token) =>
            fetch("/api/NonProfit", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(nonProfit)
            }).then(resp => {
                if (resp.ok) {
                    return resp.json();
                }
                throw new Error("Unauthorized");
            }));


    const editNonProfit = (nonProfit) =>
        getToken().then((token) =>
            fetch(`/api/NonProfit/${nonProfit.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(nonProfit),
            }));

    const deleteNonProfit = (id) =>
        getToken().then((token) =>
            fetch(`/api/NonProfit/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }));

    return (
        <NonProfitContext.Provider value={{ nonProfits, getNonProfitByOwnerId, getAllNonProfits, getSingleNonProfit, addNonProfit, deleteNonProfit, editNonProfit }}>
            {props.children}
        </NonProfitContext.Provider>
    );
};