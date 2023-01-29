import BUNavBar from "../FuncComponents/BUNavBar";
import BUWeather from '../HooksComponents/BUWeather';
import StoreNameData from "../HooksComponents/StoreNameData";
import { useSelector } from 'react-redux'
import SignIn from "./SignIn";

const changeName = (myName) => {
  return myName;
}
export default function App() {
  const isLoggedIn = useSelector(state => state.isLoggedIn)

  return (
    (isLoggedIn) ?
      <div>
        <header>
          <title>BoatUser</title>
        </header>
        <BUNavBar />
        <div>Welcome BoatUsersAppPage user is logged in: {String(isLoggedIn)}</div>
        <BUWeather name={changeName("Angy")} />
        <StoreNameData buData="BUSERS" />

      </div>
      :
      <SignIn />
  );
}
