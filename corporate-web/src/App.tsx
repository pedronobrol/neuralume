import React, { Suspense } from "react";

import "./i18n";

import logo from "./logo.svg";
import NebulaView from "./views/Nebula";
import AboutView from "./views/About";
import LegalView from "./views/Legal";
import PreOrderView from "./views/PreOrder";
import PurchaseCompletedView from "./views/PurchaseCompleted";

import {
    Route,
    Switch,
    BrowserRouter as Router,
    Redirect,
    BrowserRouter,
} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import AnalyticsTracking from "./components/AnalyticsTracking";

function App() {
    return (
        <Suspense fallback="">
            <Router>
                <ScrollToTop />
                <AnalyticsTracking />
                <Switch>
                    <Route
                        path="/nebula/preorder/completed"
                        component={PurchaseCompletedView}
                    />
                    <Route path="/nebula/preorder/cancelled">
                        <PreOrderView cancelled />
                    </Route>
                    <Route path="/nebula/preorder" component={PreOrderView} />
                    <Route path="/nebula" component={NebulaView} />
                    <Route path="/about" component={AboutView} />
                    <Route path="/legal" component={LegalView} />
                    <Route path="/">
                        <Redirect to="/nebula" />
                    </Route>
                </Switch>
            </Router>
        </Suspense>
    );
}

export default App;
