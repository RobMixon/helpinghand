import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";

function App() {
  return (
    <Router>
      <UserProfileProvider>
        <div className="container">
          <Header />
          <ApplicationViews />
        </div>
      </UserProfileProvider>
    </Router >
  );
}

export default App;

