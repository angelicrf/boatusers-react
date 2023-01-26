import BUNavBar from "../FuncComponents/BUNavBar";
import BUWeather from '../HooksComponents/BUWeather';
import StoreNameData from "../HooksComponents/StoreNameData";


const changeName = (myName) => {
  return myName;
}
export default function App() {
  return (
    <div>
      <header>
        <title>BoatUser</title>
      </header>
      <BUNavBar />
      <div>Welcome BoatUsersApp</div>
      <BUWeather name={changeName("Angy")} />
      <StoreNameData buData="Angy" />
    </div>
  );
}
