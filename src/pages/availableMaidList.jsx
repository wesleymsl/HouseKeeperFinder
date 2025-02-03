import { Navbar } from "../navbar";
import { getDocs, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { useState, useEffect, useContext } from "react";
import { auth, database } from "../firebase";
import { AppContext } from "../App";
import { useNavigate, Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

export const AvailableMaids = () => {
  const [maidList, setMaidList] = useState([]);
  const { setPickedMaid } = useContext(AppContext);
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  useEffect(() => {
    const fetchMaidData = async () => {
      const maidDocs = await getDocs(collection(database, "iwannabeamaid"));
      const maids = maidDocs.docs.map((doc) => ({
        id: doc.id, // Add the document ID to the data
        ...doc.data(), // Spread the rest of the document data
      }));
      setMaidList(maids);
    };

    fetchMaidData();
  }, []);

  const pickMaid = async (maid) => {
    setPickedMaid(maid);

    await setDoc(
      doc(
        database,
        user.uid + "MaidFinderSentApplicationsToMaids",
        user.uid + maid.id + "pickedmaid"
      ),
      {
        id: maid.id,
        firstname: maid.firstname || "",
        lastName: maid.lastName || "",
        pay: maid.pay || "",
        area: maid.area || "",
        city: maid.city || "",
        personalstatement: maid.personalstatement || "",
        type: maid.type || "",
      }
    );

    await setDoc(
      doc(
        database,
        maid.id + "MaidReceivedApplicationsFromMaidFinders",
        user.uid + maid.id + "maidreceivedapplicationsfrommaidfinders"
      ),
      {
        id: user.uid,
        firstname: user.firstname || "",
        lastName: user.lastName || "",
        pay: user.pay || "",
        area: user.area || "",
        city: user.city || "",
        personalstatement: user.personalstatement || "",
        type: user.type || "",
      }
    );
    navigate("/" + maid.id + "pickedMaid");
  };

  const AvailableMaidsList = () => {
    return (
      <div>
        {maidList.map((maid) => (
          <div key={maid.id}>
            <h2>
              {maid.firstname} {maid.lastname}
            </h2>
            <h3>
              {maid.area} {maid.city}
            </h3>
            <h3>{maid.pay}</h3>
            <h3>{maid.personalstatement}</h3>
            <button onClick={() => pickMaid(maid)}>
              Check The House Keeper Out
            </button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <Navbar />
      <AvailableMaidsList />
    </div>
  );
};

export const PickedMaid = () => {
  const { pickedMaid } = useContext(AppContext);
  const [user] = useAuthState(auth);
  const [pickedMaidInfo, setPickedMaidInfo] = useState("");

  useEffect(() => {
    const fetchPickedMaidData = async () => {
      const pickedMaidDoc = await getDoc(
        doc(database, "iwannabeamaid", pickedMaid.id)
      );
      if (pickedMaidDoc.exists()) {
        const pickedMaidData = pickedMaidDoc.data();
        setPickedMaidInfo(pickedMaidData);
      }
    };

    fetchPickedMaidData();
  }, []);

  return (
    <div>
      <Navbar />
      <h2>
        {maidInfo.firstname} {maidInfo.lastname}
      </h2>
      <h3>
        {maidInfo.area} {maidInfo.city || ""}
      </h3>
      <h3>{maidInfo.pay}</h3>
      <br />
      <Link to="/availablemaidlist">
        <button> Go Back </button>
      </Link>
      <Link to="/">
        <button onClick={pickMaid}>Pick This House Keeper Finder</button>
      </Link>
    </div>
  );
};
