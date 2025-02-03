import { auth, googleProvider, database } from "./firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AppContext } from "./App";
import { doc, getDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
export const SignIn = () => {
  const { setIsSubmitted, setHasLoginBeenClicked, setIsMaidFinderSubmitted } =
    useContext(AppContext);
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider); // Trigger Google sign-in
      setHasLoginBeenClicked(true); // Set login clicked state after successful sign-in
      navigate("/");
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  useEffect(() => {
    const fetchMaidFinderData = async () => {
      if (user && user.uid) {
        const maidFinderDoc = await getDoc(
          doc(database, "maidfinder", user.uid)
        );
        if (maidFinderDoc.exists()) {
          setIsMaidFinderSubmitted(true);
        } else {
          setIsMaidFinderSubmitted(false); // In case the data doesn't exist
        }
      } else {
        console.log("User doesn't exist");
      }
    };

    const fetchIsMaidData = async () => {
      if (user && user.uid) {
        const isMaidDoc = await getDoc(
          doc(database, "iwannabeamaid", user.uid)
        );
        if (isMaidDoc.exists()) {
          setIsSubmitted(true);
        } else {
          setIsSubmitted(false); // In case the data doesn't exist
        }
      } else {
        console.log("User does not exist");
      }
    };

    if (user) {
      fetchIsMaidData();
      fetchMaidFinderData();
    }
  }, [user]);

  return (
    <div>
      <button onClick={signInWithGoogle}>Login To Continue</button>
    </div>
  );
};
