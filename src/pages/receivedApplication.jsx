import { Navbar } from "../navbar";
import { getDocs, collection, doc, deleteDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { auth, database } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

export const MaidReceivedAppicationsFromMaidFinders = () => {
  const [maidReceivedMaidApplications, setMaidReceivedApplications] =
    useState("");
  const [user] = useAuthState(auth);
  const navigate = useNavigate()
  useEffect(() => {
    const fetchMaidReceivedApplicationsFromMaidFinders = async () => {
      const maidFinderApplicationsCollection = await getDocs(
        collection(
          database,
          user.uid.toLocaleLowerCase() +
            "maidreceivedapplicationsfrommaidfinders"
        )
      );
      const maidFinderApplicationList =
        maidFinderApplicationsCollection.docs.map(doc, {
          id: doc.id,
          ...doc.data(),
        });
      setMaidReceivedApplications(maidFinderApplicationList);
    };

    fetchMaidReceivedApplicationsFromMaidFinders();
  });

  const RemoveApplication = async (applicant) => {
    await deleteDoc(
      doc(
        database,
        user.uid + "maidreceivedapplicationsfrommaidfinders",
        user.uid + applicant.id + "maidreceivedapplicationsfrommaidfinders"
      )
    );
    await deleteDoc(
      doc(
        database,
        applicant.id + "maidfindersentapplicationstomaids",
        applicant.uid + user.uid + "maidfindersentapplicationstomaids"
      )
    );
  };

  const AcceptApplication = async (application) => {
    await deleteDoc(doc(database, "iwannabeamaid", user.uid));
    await deleteDoc(doc(database, "maidfinder", application.id));
  };

  const ApplicationList = () => {
    return (
      <div>
        {maidReceivedMaidApplications.map((maidFinder) => (
          <div key={maidFinder.id}>
            <h2>
              {maidFinder.firstname} {maidFinder.lastName}
            </h2>
            <h3>
              {maidFinder.area} {maidFinder.city}
            </h3>
            <h3>{maidFinder.pay}</h3>
            <h3>{maidFinder.personalstatement}</h3>
            <button onClick={() => RemoveApplication(maidFinder)}>
              Withdraw Application
            </button>
            <button onClick={() => AcceptApplication(maidFinder)}>
              Accept Application
            </button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <ApplicationList />
    </div>
  );
};

export const MaidFinderReceivedApplicationsFromMaids = () => {
  return (
    <div>
      <h1>Shushss</h1>
    </div>
  );
};
