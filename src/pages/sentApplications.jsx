import { Navbar } from "../navbar";
import { getDocs, collection, doc, deleteDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { auth, database } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

export const MaidFinderSentApplicationsToMaids = () => {
  const [pickedMaids, setPickedMaids] = useState("");
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPickedMaidsList = async () => {
      const pickedMaidsListCollection = await getDocs(
        collection(database, user.uid + "pickedmaids")
      );
      const pickedMaidsDoc = pickedMaidsListCollection.docs.map(doc, {
        id: doc.id,
        ...doc.data(),
      });
      setPickedMaids(pickedMaidsDoc);
    };
    fetchPickedMaidsList();
  });

  const DeleteMaid = async (maid) => {
    await deleteDoc(
      doc(database, user.uid + "pickedmaids", user.uid + maid.id + "pickedmaid")
    );
    navigate(
      "/" + user?.uid.toLocaleLowerCase() + "maidfindersentapplicationstomaids"
    );
  };

  const PickedMaidsList = () => {
    return (
      <div>
        {pickedMaids.map((maid) => (
          <div key={maid.id}>
            <h2>
              {maid.firstname} {maid.lastName}
            </h2>
            <h3>
              {maid.area} {maid.city}
            </h3>
            <h3>{maid.pay}</h3>
            <h3>{maid.personalstatement}</h3>
            <button onClick={() => DeleteMaid(maid)}>
              Withdraw Application
            </button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <Navbar otherComponent={null} otherLink={null} />
      <PickedMaidsList />
    </div>
  );
};

export const MaidSentApplicationsToMaidFinders = () => {
  const [pickedMaidFinders, setPickedMaidFinders] = useState("");
  const [user] = useAuthState(auth);

  useEffect(() => {
    const fetchPickedMaidFinders = async () => {
      const pickedMaidFinderListCollection = await getDocs(
        collection(database, user.uid.toLocaleLowerCase() + "pickedMaidFinders")
      );
      const maidFinderListDoc = pickedMaidFinderListCollection.docs.map(doc, {
        id: doc.id,
        ...doc.data(),
      });
      setPickedMaidFinders(maidFinderListDoc);
    };

    fetchPickedMaidFinders();
  });

  const DeleteMaidFinder = async (maidFinder) => {
    await deleteDoc(
      doc(
        database,
        user.uid + "pickedmaidfinders",
        user.uid + maidFinder.id + "pickedmaidfinder"
      )
    );
    navigate(
      "/" + user?.uid.toLocaleLowerCase() + "maidsentapplicationstomaidfinders"
    );
  };

  const PickedMaidFindersList = () => {
    return (
      <div>
        {pickedMaidFinders.map((maidFinder) => (
          <div key={maidFinder.id}>
            <h2>
              {maidFinder.firstname} {maidFinder.lastName}
            </h2>
            <h3>
              {maidFinder.area} {maidFinder.city}
            </h3>
            <h3>{maidFinder.pay}</h3>
            <h3>{maidFinder.personalstatement}</h3>
            <button onClick={() => DeleteMaidFinder(maidFinder)}>
              Withdraw Application
            </button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <PickedMaidFindersList />
    </div>
  );
};
