import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import PortalFooter from "./portal/footer/PortalFooter";
import PortalNavbar from "./portal/navbar/PortalNavbar";

import { PrimeReactProvider } from "primereact/api";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkUserToken = () => {
    const userToken = localStorage.getItem("user-token");
    if (!userToken || userToken === "undefined") {
      setIsLoggedIn(false);
    }
    setIsLoggedIn(true);
  };

  useEffect(() => {
    checkUserToken();
  }, [isLoggedIn]);

  return (
    <PrimeReactProvider>
      <React.Fragment>
        {isLoggedIn && <PortalNavbar />}
        <Outlet />
        {isLoggedIn && <PortalFooter />}
      </React.Fragment>
    </PrimeReactProvider>
  );
}

export default App;
