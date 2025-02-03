import { Link } from "react-router-dom";
import { SignIn } from "../signIn";
import { useContext } from "react";
import { AppContext } from "../App";
import { SignOut } from "../signOut";

export const Home = () => {
  const {
    isSubmitted,
    hasLoginBeenClicked,
    isMaidFinderSubmitted,
    maidHasFoundWork,
    maidFinderhasFoundWork,
  } = useContext(AppContext);
  const WhichComponent = () => {
    if (isSubmitted && hasLoginBeenClicked && !isMaidFinderSubmitted) {
      return (
        <div>
          <SignOut />
          <br></br>
          <Link to={"/maidfinder"}>
            <button>Click This If You are looking for a House Keeper</button>
          </Link>
          <Link to="/maidreceivedapplicationsfrommaidfinders">
            <button>Check Received House Keeper Finder Applications </button>
          </Link>
          <Link to="/maidlookingforwork">
            <button>Click Here To See The House Keeper Job Postings</button>
          </Link>
        </div>
      );
    } else if (!isSubmitted && hasLoginBeenClicked && !isMaidFinderSubmitted) {
      return (
        <div>
          <SignOut />
          <br></br>
          <Link to={"/maidfinder"}>
            <button>Click This If You are looking for a House Keeper</button>
          </Link>
          <Link to="/iwanttobeamaid">
            <button>Click Here If You Want To Be A House Keeper</button>
          </Link>
        </div>
      );
    } else if (isSubmitted && hasLoginBeenClicked && isMaidFinderSubmitted) {
      return (
        <div>
          <SignOut />
          <br></br>
          <Link to={"/availablemaidlist"}>
            <button>
              Click This To resume you House Keeper finding adventure
            </button>
          </Link>
          <Link to="/maidfinderreceivedapplicationsfrommaids">
            <button>Check House Keeper Applications</button>
          </Link>
          <Link to="/maidlookingforwork">
            <button>Click Here To Find Job Postings</button>
          </Link>
          <Link to="/maidreceivedapplicationsfrommaidfinders">
            <button>Check House Keeper Finder Applications</button>
          </Link>
        </div>
      );
    } else if (!isSubmitted && hasLoginBeenClicked && isMaidFinderSubmitted) {
      return (
        <div>
          <SignOut />
          <br></br>
          <Link to={"/maidfinder"}>
            <button>Click This If You are looking for a House Keeper</button>
          </Link>
          <Link to="/maidlookingforwork">
            <button>Click To Find Available House Keeper Finders</button>
          </Link>
          <Link to="/maidreceivedapplicationsfrommaidfinders">
            <button>Check House Keeper Finder Applications</button>
          </Link>
        </div>
      );
    } else if (!hasLoginBeenClicked) {
      return <SignIn />;
    } else if(maidFinderhasFoundWork){
      return (
        <div>
          <SignOut/>
          <br></br>
          <Link>
             <button>Resume Maid Communications</button>
          </Link>
        </div>
      )
    } else if(maidHasFoundWork){
      return (
        <div>
          <SignOut/>
          <br></br>
          <Link>
             <button>Resume Maid Finder Communications</button>
          </Link>
        </div>
      )
    }
  };

  return (
    <div>
      <h1>Welcome To House Keeper Finder</h1>
      <WhichComponent />
    </div>
  );
};
