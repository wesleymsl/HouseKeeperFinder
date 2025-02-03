import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { database, auth } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import { Navbar } from "../navbar";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../App";

export const MaidFinder = () => {
  const { isSubmitted } = useContext(AppContext);
  const [maidNavbarLink, setMaidNavbarLink] = useState("");
  const [maidNavbarText, setMaidNavbarText] = useState("");

  // Update state when `isSubmitted` changes
  useEffect(() => {
    if (isSubmitted) {
      setMaidNavbarLink("/maidlookingforwork");
      setMaidNavbarText("Resume Your House Keeper Finding Search");
    } else {
      setMaidNavbarLink("/iwannabeamaid");
      setMaidNavbarText("I wanna be a House Keeper");
    }
  }, [isSubmitted]); // Dependency ensures this effect runs only when `isSubmitted` changes

  return (
    <div>
      <Navbar otherComponent={maidNavbarText} otherLink={maidNavbarLink} />
      <h1>
        Are You Looking For A Maid? Well fill in your credentials and we can
        make it happen
      </h1>
      <CreateMaidFinderForm />
    </div>
  );
};

// Create Maid form
const CreateMaidFinderForm = () => {
  const { setIsMaidFinderSubmitted } = useContext(AppContext);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const schema = yup.object().shape({
    firstname: yup.string().required("Enter Your first name"),
    lastName: yup.string().required("Enter You first name"),
    pay: yup.string().required("Enter How Much are you willing to pay"),
    city: yup.string().required("What area of uganda do you live in"),
    area: yup.string(),
    type: yup
      .string()
      .required("Are You a tourist or are you a resident of uganda"),
  });

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = async (data) => {
    await setDoc(doc(database, "maidfinder", user.uid), {
      ...data,
      id: user.uid,
    });
    await setDoc(doc(database, user.uid, user.uid), {
      ...data,
      id: user.uid,
    });
    navigate("/availablemaidlist");
    setIsMaidFinderSubmitted(true);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <h2>Enter Your First Name</h2>
      <input placeholder="Enter Your First Name" {...register("firstname")} />
      <h2>Enter Your Last Name</h2>
      <input placeholder="Enter Your last Name" {...register("lastName")} />
      <h2>Enter How Much You Are Willing to pay - In UGX Per Month</h2>
      <input
        placeholder="Enter How Much You Are Willing to pay"
        {...register("pay")}
      />
      <h2>Enter Your city/town/village</h2>
      <input placeholder="Enter Your city/town/village" {...register("city")} />
      <h2>Enter The Area Of the city you live in - Optional</h2>
      <input
        placeholder="Enter The Area Of the city you live in"
        {...register("area")}
      />
      <h2>Are You a tourist or are you a resident of uganda</h2>
      <input
        placeholder="Are You a tourist or are you a resident of uganda"
        {...register("type")}
      />
      <br />
      <br />
      <button> Submit </button>
    </form>
  );
};
