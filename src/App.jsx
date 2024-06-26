import { Link, Outlet } from "react-router-dom";
import { LanguageSelector } from "./shared/components/LanguageSelector";
import { Navbar } from "./shared/components/Navbar";
import { useState } from "react";
function App() {
  return (
    <>
      <Navbar />
      <div className="container mt-3">
        {/* <Login onLoginSuccess={onLoginSuccess} /> */}
        <Outlet />
        <LanguageSelector />
      </div>
    </>
  );
}

export default App;
