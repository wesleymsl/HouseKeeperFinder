import { Navbar } from "../navbar";
import {
  getDocs,
  collection,
  doc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { useState, useEffect, useContext } from "react";
import { database } from "../firebase";
import { AppContext } from "../App";
import { useNavigate, Link } from "react-router-dom";

export const MaidLookingForWork = () => {
  const [maidFinderList, setMaidFinderList] = useState([]);
  const { setPickedMaidFinder } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMaidData = async () => {
      const maidFinderDocs = await getDocs(collection(database, "maidfinder"));
      const maidFinder = maidFinderDocs.docs.map((doc) => ({
        id: doc.id, // Add the document ID to the data
        ...doc.data(), // Spread the rest of the document data
      }));
      setMaidFinderList(maidFinder);
    };

    fetchMaidData();
  }, []);

  const pickMaidFinder = (maidFinder) => {
    setPickedMaidFinder(maidFinder);
    navigate("/pickedmaidfinder");
  };

  const AvailableMaidFindersList = () => {
    return (
      <div>
        {maidFinderList.map((maidFinder) => (
          <div key={maidFinder.id}>
            <h2>
              {maidFinder.firstname} {maidFinder.lastname}
            </h2>
            <h3>
              {maidFinder.area} {maidFinder.city}
            </h3>
            <h3>{maidFinder.pay}</h3>
            <button onClick={() => pickMaidFinder(maidFinder.id)}>
              Check The House Keeper Finder Out
            </button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <Navbar />
      <AvailableMaidFindersList />
    </div>
  );
};

export const PickedMaidFinder = () => {
  const { pickedMaidFinder } = useContext(AppContext);
  const [maidFinderInfo, setMaidFinderInfo] = useState("");

  useEffect(() => {
    const fetchPickedMaidFinderData = async () => {
      const pickedMaidFinderDoc = await getDoc(
        doc(database, "maidfinder", pickedMaidFinder)
      );
      if (pickedMaidFinderDoc.exists()) {
        const pickedMaidFinderData = pickedMaidFinderDoc.data();
        setMaidFinderInfo(pickedMaidFinderData);
      }
    };

    fetchPickedMaidFinderData();
  }, []);

  const pickMaidFinder = async () => {
    const pickedDeleteDoc = doc(database, "maidfinder", pickedMaidFinder);
    await deleteDoc(pickedDeleteDoc);
  };

  return (
    <div>
      <Navbar />
      <h2>
        {maidFinderInfo.firstname} {maidFinderInfo.lastname}
      </h2>
      <h3>
        {maidFinderInfo.area} {maidFinderInfo.city}
      </h3>
      <h3>{maidFinderInfo.pay}</h3>
      <br />
      <Link to="/maidlookingforwork">
        <button> Go Back </button>
      </Link>
      <Link to="/">
        <button onClick={pickMaidFinder}>Pick This House Keeper Finder</button>
      </Link>
    </div>
  );
};
