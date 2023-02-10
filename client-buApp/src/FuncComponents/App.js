import BUNavBar from "../FuncComponents/BUNavBar";
import UserName from "../FuncComponents/UserName";
import React from "react";
import { useSelector } from "react-redux";
import SignIn from "./SignIn";

export default function App() {
  const isLoggedIn = useSelector((state) => state.userReducer.isLoggedIn);

  return isLoggedIn ? (
    <div>
      <header>
        <title>BoatUser</title>
      </header>
      <BUNavBar />
      <UserName />
    </div>
  ) : (
    <>
      <SignIn />
    </>
  );
}
