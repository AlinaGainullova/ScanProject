import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import AuthPage from "./pages/AuthPage/AuthPage";
import ResultsPage from "./pages/ResultsPage/ResultsPage";
import RequestPage from "./pages/RequestPage/RequestPage";
import Page404 from "./pages/Page404/Page404";
import CheckTokenWithoutNavigate from "./components/CheckTokenWithoutNavigate";

function App() {
    return (
        <>
            <CheckTokenWithoutNavigate />
            <BrowserRouter basemname={`/${process.env.PUBLIC_URL}`}>
                <Routes>
                    <Route path="/*" element={<Page404 /> } />
                    <Route path="/" element={<MainPage />} />
                    <Route path="/auth" exact element={<AuthPage />} />
                    <Route path="/results" exact element={<ResultsPage />} />
                    <Route path="/search" exact element={<RequestPage />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;