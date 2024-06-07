import { Link, Outlet } from "react-router-dom";
import { LanguageSelector } from "./shared/components/LanguageSelector";
import { Navbar } from "./shared/components/Navbar";
function App() {
  return (
    <>
      <Navbar />
      <div className="container mt-3">
        {/* <div>
          <Link to="/user/1">User 1</Link>
        </div>
        <div>
          <Link to="/user/2">User 2</Link>
        </div>
        <div>
          <Link to="/activation/1">Activation 1</Link>
        </div>
        <div>
          <Link to="/activation/2">Activation 2</Link> */}
        <Outlet />
        <LanguageSelector />
      </div>
    </>
  );
}

export default App;
