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

export const IWantToBeAMaid = () => {
  const { isMaidFinderSubmitted } = useContext(AppContext);
  const [maidFinderLink, setMaidFinderLink] = useState("");
  const [maidFinderText, setMaidFinderText] = useState("");

  useEffect(() => {
    if (isMaidFinderSubmitted) {
      setMaidFinderLink("/maidfinderjoblist");
      setMaidFinderText("Resume Your Maid Finding Search");
    } else {
      setMaidFinderLink("/maidfinder");
      setMaidFinderText("Im Looking for a maid");
    }
  }, [isMaidFinderSubmitted]);

  return (
    <div>
      <Navbar otherComponent={maidFinderText} otherLink={maidFinderLink} />
      <h1>
        You Want To Be A House Keeper? Well fill in your credentials and we can
        make it happen
      </h1>
      <CreateMaidForm />
    </div>
  );
};

// Create Maid form
const CreateMaidForm = () => {
  const { setIsSubmitted } = useContext(AppContext);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const schema = yup.object().shape({
    firstname: yup.string().required("Enter Your first name"),
    lastName: yup.string().required("Enter You first name"),
    pay: yup.string().required("Enter How Much you want to be paid"),
    city: yup.string().required("What area of uganda do you live in"),
    area: yup.string(),
    type: yup
      .string()
      .required(
        "Are You Looking for Long Term or short term work like working with tourists"
      ),
    personalstatement: yup.string().required("Whats your years of experience"),
  });

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = async (data) => {
    await setDoc(doc(database, "iwannabeamaid", user.uid), {
      ...data,
      id: user.uid,
    });
    await setDoc(doc(database, user.uid, user.uid), {
      ...data,
      id: user.uid,
    });
    navigate("/maidlookingforwork");
    setIsSubmitted(true);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <h2>Enter Your First Name</h2>
      <input placeholder="Enter Your First Name" {...register("firstname")} />
      <h2>Enter Your Last Name</h2>
      <input placeholder="Enter Your last Name" {...register("lastName")} />
      <h2>Enter The Pay You want - In UGX Per Month</h2>
      <input placeholder="Enter The Pay You want" {...register("pay")} />
      <h2>Enter Your city/town/village</h2>
      <input placeholder="Enter Your city/town/village" {...register("city")} />
      <h2>Enter The Area Of the city you live in - Optional</h2>
      <input
        placeholder="Enter The Area Of the city you live in"
        {...register("area")}
      />
      <h2>
        Are You Looking for Long Term or short term work like working with
        tourists
      </h2>
      <input
        placeholder="Are You Looking for Long Term or short term work like working with tourists"
        {...register("type")}
      />
      <h2>
        Write A personal Statement Describing Who You Are and why you make a
        good House Keeper
      </h2>
      <input
        placeholder="Write a personal statement"
        {...register("personalstatement")}
      />
      <br />
      <br />
      <button> Submit </button>
    </form>
  );
};
