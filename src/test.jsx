// signIn
// Use useEffect to fetch user data after successful sign-in
useEffect(() => {
  if (user) {
    // Once the user is logged in, we fetch user data
    const fetchUserData = async () => {
      try {
        const docSnap = await getDoc(doc(database, "maidcollection", user.uid));
        if (docSnap.exists()) {
          setUserData(docSnap.data());

          // Check user data and navigate accordingly
          if (userData.isMaid == true && userData.isMaidFinder == false) {
            setIsSubmitted(true);
            setIsMaidFinderSubmitted(true);
          } else if (
            userData.isMaid == false &&
            userData.isMaidFinder == true
          ) {
            setIsSubmitted(false);
            setIsMaidFinderSubmitted(true);
          } else if (
            userData.isMaid == true &&
            userData.isMaidFinder == false
          ) {
            setIsSubmitted(true);
            setIsMaidFinderSubmitted(false);
          }
          // Navigate to the main page
          navigate("/");
        } else {
          // Handle case where the user document doesn't exist
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData(); // Fetch user data once user is available
  }
}, [user, setIsSubmitted, setIsMaidFinderSubmitted, navigate]); // Dependencies to re-run when user changes
