import { Outlet } from "react-router-dom";
import { LanguageSelector } from "./shared/components/LanguageSelector";
import { AuthenticationContext } from "./shared/state/context";
import { Navbar } from "./shared/components/Navbar";
function App() {
  return (
    <AuthenticationContext>
      <Navbar />
      <div className="container mt-3">
        <Outlet />
        <LanguageSelector />
      </div>
    </AuthenticationContext>
  );
}

export default App;
