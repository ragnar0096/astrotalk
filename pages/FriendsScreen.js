import React from "react";
import FriendsTabs from "../components/Tabs";
function FriendsScreen() {
  return (
    <div>
      <header className="friends-header">
        <img
          height={50}
          width={50}
          src={"/static/images/icon.png"}
          className="App-logo"
          alt="logo"
        />
      </header>
      <FriendsTabs />
    </div>
  );
}

export default FriendsScreen;
