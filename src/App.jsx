import React from 'react';
import {BrowserRouter , Routes , Route} from "react-router-dom";
import Index from "./pages/index.jsx";
import Questions from "./pages/questions.jsx";

const App = () => {
    return (<BrowserRouter>
        <Routes>
            <Route path="/" element={<Index/>} />
            <Route path="/quiz" element={<Questions/>} />
        </Routes>
    </BrowserRouter>);
};

export default App;