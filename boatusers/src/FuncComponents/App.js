import BUNavBar from "../FuncComponents/BUNavBar";
import BUWeather from '../HooksComponents/BUWeather';
import StoreNameData from "../HooksComponents/StoreNameData";
import { useSelector } from 'react-redux'
import SignIn from "./SignIn";
import { useMemo, useState } from "react";

const changeName = (myName) => {
  return myName;
}
export default function App() {
  const isLoggedIn = useSelector(state => state.isLoggedIn)
  //const [buLoggedIn, setBuLoggedIn] = useState(false)

  /*   useMemo(() => {
      setBuLoggedIn(isLoggedIn)
    }, [buLoggedIn]) */

  return (
    (isLoggedIn) ?
      <div>
        <header>
          <title>BoatUser</title>
        </header>
        <BUNavBar />
        <div>Welcome BoatUsersAppPage user is logged in: {String(isLoggedIn)}</div>
        <BUWeather name={changeName("Angy")} />
        <StoreNameData buData="Angy" />
      </div>
      :
      <SignIn />
  );
}
