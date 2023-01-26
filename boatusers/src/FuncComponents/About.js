import BUNavBar from '../FuncComponents/BUNavBar';
import BUWeather from '../HooksComponents/BUWeather';
import StoreNameData from '../HooksComponents/StoreNameData';

const changeName = (myName) => {
    return myName;
}
export default function About() {

    return (
        <div >
            <header>
                <title>About</title>
            </header>
            <BUNavBar />
            <div>Contact Me</div>
            <BUWeather />
            <StoreNameData />
        </div>
    );
}