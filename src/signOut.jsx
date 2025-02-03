import { auth } from "./firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { AppContext } from "./App";
import { useContext } from "react";

export const SignOut = () => {
  const { setHasLoginBeenClicked } = useContext(AppContext);
  const navigate = useNavigate();

  const signUserOut = async () => {
    await signOut(auth);
    setHasLoginBeenClicked(false);
    navigate("/");
  };

  return (
    <div>
      <button onClick={signUserOut}>Sign Out</button>
    </div>
  );
};
