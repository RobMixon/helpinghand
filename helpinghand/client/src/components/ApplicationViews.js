import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import NonProfitList from "../components/nonProfits/nonProfitList";
import NonProfitForm from "../components/nonProfits/NonProfitForm";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";

export default function ApplicationViews() {
    const { isLoggedIn } = useContext(UserProfileContext);

    return (
        <main>
            <Switch>
                <Route path="/" exact>
                    {isLoggedIn ? <Hello /> : <Redirect to="/login" />}
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/register">
                    <Register />
                </Route>
                <Route path="/nonProfits">
                    {isLoggedIn ? <NonProfitList /> : <Redirect to="/login" />}
                </Route>
                <Route path="/nonProfitForm">
                    {isLoggedIn ? <NonProfitForm /> : <Redirect to="/login" />}
                </Route>
                <Route path="/nonProfitForm">
                    {isLoggedIn ? <NonProfitForm /> : <Redirect to="/login" />}
                </Route>
                <Route path="/nonProfitForm">
                    {isLoggedIn ? <NonProfitForm /> : <Redirect to="/login" />}
                </Route>

            </Switch>
        </main >
    );
};