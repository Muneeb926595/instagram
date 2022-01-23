import React, { useContext, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import { Icon, Clickable, Avatar } from "@components";
import StreamingContext from "@contextApi/StreamingContext";

const VideoCall = (props) => {
  const history = useHistory();
  const videoRef = useRef(null);

  const { recieverId } = props?.location?.state || {};

  const userData = useSelector(({ Foodbook }) => Foodbook.auth.user);

  const { stream, openCamera, informUserForStreaming } =
    useContext(StreamingContext);

  const startCall = () => {
    if (recieverId) {
      openCamera();
      informUserForStreaming(
        localStorage.getItem("userId"),
        userData?.userName,
        recieverId,
        true
      );
    } else {
      alert("Unable to start the call please go-back and try again");
    }
  };

  useEffect(() => {
    if (stream && videoRef.current && !videoRef.current.srcObject) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  const handlePlay = () => {
    videoRef.current.play();
  };

  return (
    <div className="w-full h-full bg-gray-800 flex justify-between items-center flex-col ">
      <div className="self-end mt-8 mr-8">
        <Clickable onClick={() => history.push("/messenger")}>
          <Icon type="cross" size="40px" />
        </Clickable>
      </div>
      <div
        className=" mb-20"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar size="150" />
        <video
          style={{
            height: "50vh",
            borderRadius: "40px",
            boxShadow: "0px 0px 20px #dbdbdb",
            marginTop: "2rem",
          }}
          id="localVideo"
          playsInline
          autoPlay
          ref={videoRef}
          onCanPlay={handlePlay}
          muted
        ></video>
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

export default VideoCall;
