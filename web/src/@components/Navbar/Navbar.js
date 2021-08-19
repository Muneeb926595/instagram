import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { Icon, Avatar } from "@components";

const Navbar = () => {
  const history = useHistory();
  const [selectedOption, setSelectedOption] = useState({
    home: true,
    profile: false,
    igtv: false,
    saved: false,
  });

  const userData = useSelector(({ Foodbook }) => Foodbook.auth);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("access_token");
    history.push("/");
  };
  const handleChangeSelectedTab = (newSelection) => {
    switch (newSelection) {
      case "home":
        setSelectedOption({
          home: true,
          profile: false,
          igtv: false,
          saved: false,
        });
        history.push("/home");
        break;
      case "profile":
        setSelectedOption({
          home: false,
          profile: true,
          igtv: false,
          saved: false,
        });
        history.push("/profile");
        break;
      case "igtv":
        setSelectedOption({
          home: false,
          profile: false,
          igtv: true,
          saved: false,
        });
        history.push("/igtv");
        break;
      case "saved":
        setSelectedOption({
          home: false,
          profile: false,
          igtv: false,
          saved: true,
        });
        history.push("/saved");
        break;
      case "stats":
        setSelectedOption({
          home: false,
          profile: false,
          igtv: false,
          saved: false,
        });
        history.push("/stats");
        break;
      default:
        setSelectedOption({
          home: true,
          profile: false,
          igtv: false,
          saved: false,
        });
        history.push("/home");
        break;
    }
  };
  return (
    <div
      className="flex flex-col py-8 h-screen bg-gray-100 w-1/6"
      style={{
        boxShadow: "2px 0 20px #dbdbdb",
        position: "fixed",
      }}
    >
      <div className="flex items-center justify-center">
        <Icon type="logo" size="30px" marg="0 10px 0 0" />
        <Icon type="instagram" width="auto" height="auto" marg="4px 0 0 0" />
      </div>

      <div className="flex flex-col items-center mt-8">
        <Avatar uri={userData?.user?.image} profile size="130" />
        <p className="text-gray-700 font-sans font-bold text-lg mt-4">
          {userData?.user?.userName}
        </p>
        <p className=" font-sans text-sm gradient-text">
          @{userData?.user?.userName}
        </p>
      </div>

      <div
        className="flex flex-row items-center justify-between w-3/4 "
        style={{ margin: "0 auto", marginTop: "1.6rem" }}
      >
        <div className="flex flex-col justify-center items-center">
          <p className="text-gray-700 font-sans font-bold text-base">
            {userData?.postsCount}
          </p>
          <p className="text-gray-500 font-sans text-sm">Posts</p>
        </div>
        <div style={{ height: "4vh", border: "1px solid #dbdbdb" }}></div>
        <div className="flex flex-col justify-center items-center">
          <p className="text-gray-700 font-sans font-bold text-base ">
            {userData?.followersList?.length}
          </p>
          <p className="text-gray-500 font-sans text-sm">Followers</p>
        </div>
        <div style={{ height: "4vh", border: "1px solid #dbdbdb" }}></div>
        <div className="flex flex-col justify-center items-center">
          <p className="text-gray-700 font-sans font-bold text-base ">
            {userData?.followingList?.length}
          </p>
          <p className="text-gray-500 font-sans text-sm">Followings</p>
        </div>
      </div>

      <div
        className="flex flex-col w-3/4 "
        style={{ margin: "0 auto", marginTop: "1.6rem" }}
      >
        <div
          className="flex items-center  mb-6 cursor-pointer"
          onClick={() => handleChangeSelectedTab("home")}
        >
          <Icon
            type={selectedOption.home ? "home-active" : "home"}
            size="24px"
          />
          <p
            className={`text-l ml-4 font-medium ${
              selectedOption.home ? "gradient-text" : "text-gray-500"
            } font-sans`}
          >
            Feed
          </p>
        </div>
        <div
          className="flex items-center  mb-6 cursor-pointer"
          onClick={() => handleChangeSelectedTab("profile")}
        >
          <Icon
            type={selectedOption.profile ? "profile-active" : "profile"}
            size="24px"
          />
          <p
            className={`text-l ml-4 font-medium ${
              selectedOption.profile ? "gradient-text" : "text-gray-500"
            } font-sans`}
          >
            Profile
          </p>
        </div>

        <div
          className="flex items-center  mb-6 cursor-pointer"
          onClick={() => handleChangeSelectedTab("igtv")}
        >
          <Icon
            type={selectedOption.igtv ? "igtv-active" : "igtv"}
            size="24px"
          />
          <p
            className={`text-l ml-4 font-medium ${
              selectedOption.igtv ? "gradient-text" : "text-gray-500"
            } font-sans`}
          >
            Igtv
          </p>
        </div>

        <div
          className="flex items-center  mb-6 cursor-pointer"
          onClick={() => handleChangeSelectedTab("saved")}
        >
          <Icon
            type={selectedOption.saved ? "saved-active" : "saved"}
            size="24px"
          />
          <p
            className={`text-l ml-4 font-medium ${
              selectedOption.saved ? "gradient-text" : "text-gray-500"
            } font-sans`}
          >
            Saved
          </p>
        </div>

        <div style={{ width: "100%", borderBottom: "1px solid #dbdbdb" }}></div>

        <div
          className="flex items-center  mt-6 mb-6 cursor-pointer"
          onClick={handleLogout}
        >
          <Icon type="logout" size="24px" />
          <p className={`text-l ml-4 font-medium text-gray-500 font-sans`}>
            Logout
          </p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
