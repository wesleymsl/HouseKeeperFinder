import "./styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home";
import { IWantToBeAMaid } from "./pages/IWannaBeAMaid";
import {
  MaidLookingForWork,
  PickedMaidFinder,
} from "./pages/maidLookingForWork";
import { useState, createContext } from "react";
import { MaidFinder } from "./pages/maidFinder";
import { AvailableMaids, PickedMaid } from "./pages/availableMaidList";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import { MaidFinderSentApplicationsToMaids } from "./pages/sentApplications";

export const AppContext = createContext();

export default function App() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasLoginBeenClicked, setHasLoginBeenClicked] = useState(false);
  const [isMaidFinderSubmitted, setIsMaidFinderSubmitted] = useState(false);
  const [pickedMaid, setPickedMaid] = useState("");
  const [pickedMaidFinder, setPickedMaidFinder] = useState("");
  const [maidHasFoundWork, setMaidHasFoundWork] = useState(false);
  const [maidFinderhasFoundWork, setMaidFinderHasFoundWork] = useState(false);
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <AppContext.Provider
        value={{
          isSubmitted,
          setIsSubmitted,
          hasLoginBeenClicked,
          setHasLoginBeenClicked,
          isMaidFinderSubmitted,
          setIsMaidFinderSubmitted,
          pickedMaidFinder,
          setPickedMaidFinder,
          pickedMaid,
          setPickedMaid,
          maidHasFoundWork,
          setMaidHasFoundWork,
          maidFinderhasFoundWork,
          setMaidFinderHasFoundWork,
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/iwanttobeamaid" element={<IWantToBeAMaid />} />
            <Route
              path="/maidlookingforwork"
              element={<MaidLookingForWork />}
            />
            <Route path="/maidfinder" element={<MaidFinder />} />
            <Route path="/availablemaidlist" element={<AvailableMaids />} />
            <Route
              path={"/" + pickedMaid.id + "pickedmaid"}
              element={<PickedMaid />}
            />
            <Route
              path={"/" + pickedMaidFinder + "pickedmaidfinder"}
              element={<PickedMaidFinder />}
            />
            <Route
              path={
                "/" +
                user?.uid.toLocaleLowerCase() +
                "maidfindersentapplicationstomaids"
              }
              element={<MaidFinderSentApplicationsToMaids />}
            />
          </Routes>
        </BrowserRouter>
      </AppContext.Provider>
    </div>
  );
}
