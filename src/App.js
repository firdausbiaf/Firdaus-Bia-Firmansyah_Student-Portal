import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Routes/Home";
import AddStudent from "./Routes/AddStudent";
import EditStudent from "./Routes/EditStudent";
import Student from "./Routes/Student";
import NotFound from "./Routes/NotFound";
import NavBar from "./components/Navbar";
import '../src/style.css';

const App = () => {
    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/add" element={<AddStudent />} />
                <Route path="/student" element={<Student />} />
                <Route path="/student/:id" element={<EditStudent />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
};

export default App;
