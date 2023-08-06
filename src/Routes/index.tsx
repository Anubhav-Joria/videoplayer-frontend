import React from "react";
import Authentication from "../Components/Authentication";
import CardArea from "../Components/PrivateComponents/components/CardArea";
import Add from "../Components/PrivateComponents/components/Add";
import Edit from "../Components/PrivateComponents/components/Edit";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Navbar from "../Components/PrivateComponents/components/Navbar";

function Router() {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<CardArea />} />
        <Route path="/add" element={<Add />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Route>
      <Route path="/auth" element={<Authentication />} />
    </Routes>
  );
}

export default Router;
