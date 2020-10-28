import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import NonProfitList from "../components/nonProfits/nonProfitList";
import NonProfitForm from "../components/nonProfits/NonProfitForm";
import NonProfitDetail from "../components/nonProfits/nonProfitDetail";
import NonProfitEditForm from "../components/nonProfits/nonProfitEditForm";
import NonProfitDelete from "../components/nonProfits/nonProfitDelete";
import NeedList from "../components/needs/needList";
import NeedForm from "../components/needs/needForm";
import NeedDetail from "../components/needs/needDetail";
import NeedDelete from "../components/needs/needDelete";
import NeedEditForm from "../components/needs/needEditForm";
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
                <Route path="/nonProfit" exact>
                    {isLoggedIn ? <NonProfitList /> : <Redirect to="/login" />}
                </Route>
                <Route path="/nonProfitForm" exact>
                    {isLoggedIn ? <NonProfitForm /> : <Redirect to="/login" />}
                </Route>
                <Route path="/nonProfit/details/:id" exact>
                    {isLoggedIn ? <NonProfitDetail /> : <Redirect to="/login" />}
                </Route>
                <Route path="/nonProfit/edit/:id" exact>
                    {isLoggedIn ? <NonProfitEditForm /> : <Redirect to="/login" />}
                </Route>
                <Route path="/nonProfit/delete/:id" exact>
                    {isLoggedIn ? <NonProfitDelete /> : <Redirect to="/login" />}
                </Route>
                <Route path="/need" exact>
                    {isLoggedIn ? <NeedList /> : <Redirect to="/login" />}
                </Route>
                <Route path="/need/needForm" exact>
                    {isLoggedIn ? <NeedForm /> : <Redirect to="/login" />}
                </Route>
                <Route path="/need/details/:id" exact>
                    {isLoggedIn ? <NeedDetail /> : <Redirect to="/login" />}
                </Route>
                <Route path="/need/edit/:id" exact>
                    {isLoggedIn ? <NeedEditForm /> : <Redirect to="/login" />}
                </Route>
                <Route path="/need/delete/:id" exact>
                    {isLoggedIn ? <NeedDelete /> : <Redirect to="/login" />}
                </Route>

            </Switch>
        </main >
    );
};