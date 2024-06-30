import { Outlet } from "react-router-dom";
import { LanguageSelector } from "./shared/components/LanguageSelector";
import { Navbar } from "./shared/components/Navbar";
function App() {
  return (
    // <AuthenticationContext>
    <Provider store={store}>
      <Navbar />
      <div className="container mt-3">
        <Outlet />
        <LanguageSelector />
      </div>
    </Provider>
    // </AuthenticationContext>
  );
}

export default App;
