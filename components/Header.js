import { useRouter } from "next/router";
import React from "react";

function Header() {
  const router = useRouter();

  return (
    <header className="header">
      <div>
        <img
          height={30}
          width={40}
          src={"/static/images/hamburger.png"}
          className="App-logo"
          alt="logo"
        />
      </div>
      <div>
        <img
          height={80}
          width={100}
          src={"/static/images/icon.png"}
          className="App-logo"
          alt="logo"
        />
      </div>
      <div onClick={() => router.push("/FriendsScreen")}>
        <img
          height={40}
          width={40}
          src={"/static/images/profile.png"}
          className="App-logo"
          alt="logo"
        />
      </div>
    </header>
  );
}

export default Header;
