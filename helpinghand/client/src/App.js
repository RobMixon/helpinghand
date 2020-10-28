import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import { NonProfitProvider } from "./providers/NonProfitProvider";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";

function App() {
  return (
    <Router>
      <UserProfileProvider>
        <NonProfitProvider>
          <div className="container">
            <Header />
            <ApplicationViews />
          </div>
        </NonProfitProvider>
      </UserProfileProvider>
    </Router >
  );
}

export default App;

