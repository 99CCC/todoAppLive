import React, { useRef, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Todo from "./Todo/Todo";
import { authController } from "../auth/authController";

function MainComponent() {
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    async function fetchToken() {
      const username = "admin";
      const password = "admin";
      const fetchedToken = await authController(username, password);
      setToken(fetchedToken || "");
    }

    fetchToken();
  }, []); 

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={token ? <Todo userId={0} userName={"Admin"} token={token} /> : <p>Loading...</p>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default MainComponent;
