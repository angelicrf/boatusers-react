import BUNavBar from "../FuncComponents/BUNavBar";
import BUWeather from '../HooksComponents/BUWeather';


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
    </div>
  );
}
