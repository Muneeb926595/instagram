import React, { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { Icon, Clickable, Avatar } from "@components";
import StreamingContext from "@contextApi/StreamingContext";

const AudioCall = (props) => {
  const history = useHistory();

  const { recieverId } = props?.location?.state || {};

  const userData = useSelector(({ Foodbook }) => Foodbook.auth.user);

  const { stream, openCamera, informUserForStreaming } =
    useContext(StreamingContext);

  const startCall = () => {
    if (recieverId) {
      openCamera(true);
      informUserForStreaming(
        localStorage.getItem("userId"),
        userData?.userName,
        recieverId,
        false
      );
    } else {
      alert("Unable to start the call please go-back and try again");
    }
  };

  useEffect(() => {
    if (stream) {
      let remoteAudio = document.getElementById("audioPlayer");
      if (remoteAudio) {
        remoteAudio.remove();
      }
      remoteAudio = document.createElement("audio");
      remoteAudio.id = "audioPlayer";
      remoteAudio.autoplay = true;
      remoteAudio.srcObject = stream;
      remoteAudio.style.height = "561px";
      remoteAudio.style.borderRadius = "10px";
      remoteAudio.style.width = "766px";
    }
  }, [stream]);

  return (
    <div className="w-full h-full bg-gray-800 flex justify-between items-center flex-col ">
      <div className="self-end mt-8 mr-8">
        <Clickable onClick={() => history.push("/messenger")}>
          <Icon type="cross" size="40px" />
        </Clickable>
      </div>
      <div className="mb-40">
        <Avatar size="150" />
      </div>
      <div
        className="w-80 h-20 z-2 rounded-lg mb-20 flex justify-center items-center"
        style={{
          background: "rgba(255,255,255,0.4)",
          border: "1px solid rgba(255,255,255,0.2)",
          backdropFilter: "blur(5px)",
        }}
      >
        {stream ? (
          <>
            <div className="rounded-full w-14 h-14 bg-red-600 flex justify-center items-center mr-4">
              <Icon type="end-call" size="30px" />
            </div>
            <div className="rounded-full w-14 h-14 bg-white flex justify-center items-center">
              <Icon type="mute" size="30px" />
            </div>
          </>
        ) : (
          <Clickable onClick={startCall}>
            <div className="rounded-full w-14 h-14 bg-green-400 flex justify-center items-center mr-4">
              <Icon type="start-call" size="30px" />
            </div>
          </Clickable>
        )}
      </div>
    </div>
  );
};

export default AudioCall;
