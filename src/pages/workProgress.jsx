import { Navbar } from "../navbar";
import { getDocs, collection, doc, deleteDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { auth, database } from "../firebase";
import { data, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

const MaidWorkProgress = () => {
  return (
    <div>
      <h1></h1>
    </div>
  );
};

const MaidFinderWorkProgress = () => {
  return (
    <div>
      <h1>Shush</h1>
    </div>
  );
};
