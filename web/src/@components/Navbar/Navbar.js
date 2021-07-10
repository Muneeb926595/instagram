import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { Icon, Avatar } from "@components";
import { useEffect } from "react";

const Navbar = () => {
  const history = useHistory();
  const [selectedOption, setSelectedOption] = useState({
    home: true,
    profile: false,
    explore: false,
    igtv: false,
    saved: false,
    settings: false,
  });

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
          explore: false,
          igtv: false,
          saved: false,
          settings: false,
        });
        history.push("/home");
        break;
      case "profile":
        setSelectedOption({
          home: false,
          profile: true,
          explore: false,
          igtv: false,
          saved: false,
          settings: false,
        });
        history.push("/profile");
        break;
      case "explore":
        setSelectedOption({
          home: false,
          profile: false,
          explore: true,
          igtv: false,
          saved: false,
          settings: false,
        });
        history.push("/explore");
        break;
      case "igtv":
        setSelectedOption({
          home: false,
          profile: false,
          explore: false,
          igtv: true,
          saved: false,
          settings: false,
        });
        history.push("/igtv");
        break;
      case "saved":
        setSelectedOption({
          home: false,
          profile: false,
          explore: false,
          igtv: false,
          saved: true,
          settings: false,
        });
        history.push("/saved");
        break;
      case "stats":
        setSelectedOption({
          home: false,
          profile: false,
          explore: false,
          igtv: false,
          saved: false,
          settings: false,
        });
        history.push("/stats");
        break;
      case "settings":
        setSelectedOption({
          home: false,
          profile: false,
          explore: false,
          igtv: false,
          saved: false,
          settings: true,
        });
        history.push("/settings");
        break;
      default:
        setSelectedOption({
          home: true,
          profile: false,
          explore: false,
          igtv: false,
          saved: false,
          settings: false,
        });
        history.push("/home");
        break;
    }
  };
  return (
    <div
      className="flex flex-col py-8 h-screen bg-gray-100"
      style={{ boxShadow: "2px 0 20px #dbdbdb" }}
    >
      <div className="flex items-center justify-center">
        <Icon type="logo" size="30px" marg="0 10px 0 0" />
        <Icon type="instagram" width="auto" height="auto" marg="4px 0 0 0" />
      </div>

      <div className="flex flex-col items-center mt-8">
        <Avatar
          uri="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c2hvcHBpbmd8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
          profile
          size="130"
        />
        <p className="text-gray-700 font-sans font-bold text-lg mt-4">
          Full Name
        </p>
        <p
          className=" font-sans  text-sm"
          style={{
            background:
              "linear-gradient(140deg, rgba(228, 62, 104, 1) 0%,  rgba(250, 164, 73, 1) 100%);",
          }}
        >
          @username
        </p>
      </div>

      <div
        className="flex flex-row items-center justify-between w-3/4 "
        style={{ margin: "0 auto", marginTop: "1.6rem" }}
      >
        <div className="flex flex-col justify-center items-center">
          <p className="text-gray-700 font-sans font-bold text-base">19</p>
          <p className="text-gray-500 font-sans text-sm">Posts</p>
        </div>
        <div style={{ height: "4vh", border: "1px solid #dbdbdb" }}></div>
        <div className="flex flex-col justify-center items-center">
          <p className="text-gray-700 font-sans font-bold text-base ">19.2k</p>
          <p className="text-gray-500 font-sans text-sm">Followers</p>
        </div>
        <div style={{ height: "4vh", border: "1px solid #dbdbdb" }}></div>
        <div className="flex flex-col justify-center items-center">
          <p className="text-gray-700 font-sans font-bold text-base ">2M</p>
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
              selectedOption.home ? "text-pink-500" : "text-gray-500"
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
              selectedOption.profile ? "text-pink-500" : "text-gray-500"
            } font-sans`}
          >
            Profile
          </p>
        </div>

        <div
          className="flex items-center  mb-6 cursor-pointer"
          onClick={() => handleChangeSelectedTab("explore")}
        >
          <Icon
            type={selectedOption.explore ? "explore-active" : "explore"}
            size="24px"
          />
          <p
            className={`text-l ml-4 font-medium ${
              selectedOption.explore ? "text-pink-500" : "text-gray-500"
            } font-sans`}
          >
            Explore
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
              selectedOption.igtv ? "text-pink-500" : "text-gray-500"
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
              selectedOption.saved ? "text-pink-500" : "text-gray-500"
            } font-sans`}
          >
            Saved
          </p>
        </div>

        <div
          className="flex items-center  mb-8 cursor-pointer"
          onClick={() => handleChangeSelectedTab("settings")}
        >
          <Icon
            type={selectedOption.settings ? "settings-active" : "settings"}
            size="24px"
          />
          <p
            className={`text-l ml-4 font-medium ${
              selectedOption.settings ? "text-pink-500" : "text-gray-500"
            } font-sans`}
          >
            Settings
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
