import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import { NonProfitProvider } from "./providers/NonProfitProvider";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import { NeedProvider } from './providers/NeedProvider';
import { EventProvider } from './providers/EventProvider';

function App() {
  return (
    <Router>
      <UserProfileProvider>
        <NonProfitProvider>
          <EventProvider>
            <NeedProvider>
              <div className="container">
                <Header />
                <ApplicationViews />
              </div>
            </NeedProvider>
          </EventProvider>
        </NonProfitProvider>
      </UserProfileProvider>
    </Router >
  );
}

export default App;

