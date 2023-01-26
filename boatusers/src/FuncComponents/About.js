import BUNavBar from '../FuncComponents/BUNavBar';
import BUWeather from '../HooksComponents/BUWeather';

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
        </div>
    );
}