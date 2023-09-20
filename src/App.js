import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { NextUIProvider } from "@nextui-org/react";

import Dashboard from "./pages/dashboard/Dashboard";
import Header from "./components/header/Header";

function App() {
    return (
        <div className="App">
            <NextUIProvider>
                <Header />
                <Dashboard />
            </NextUIProvider>
        </div>
    );
}

export default App;
