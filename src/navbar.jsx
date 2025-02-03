import { Link } from "react-router-dom";
import { SignOut } from "./signOut";

export const Navbar = ({ otherComponent, otherLink }) => {
  return (
    <div className="">
      <Link to={"/"}>
        <p>Home</p>
      </Link>
      <Link to={otherLink}>
        <p>{otherComponent}</p>
      </Link>
      <SignOut />
    </div>
  );
};
