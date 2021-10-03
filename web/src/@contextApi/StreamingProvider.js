import React from "react";
import StreamingContext from "./StreamingContext";
import { socket } from "@helpers/sockets";

const config = {
  transportPolicy: "relay",
  iceServers: [
    { urls: ["stun:ss-turn2.xirsys.com"] },
    {
      username:
        "xR1Sb3-GrIK067wvB2mDWEw8MTcsOa_-1SXpds8mpz2YkCQB_zLUyGefnqWJ74b-AAAAAGB_3pBNdW5lZWJOZXNsaXQ=",
      credential: "65c4f662-a279-11eb-89a9-0242ac140004",
      urls: [
        "turn:ss-turn2.xirsys.com:80?transport=udp",
        "turn:ss-turn2.xirsys.com:3478?transport=udp",
        "turn:ss-turn2.xirsys.com:80?transport=tcp",
        "turn:ss-turn2.xirsys.com:3478?transport=tcp",
        "turns:ss-turn2.xirsys.com:443?transport=tcp",
        "turns:ss-turn2.xirsys.com:5349?transport=tcp",
      ],
    },
  ],
};

class ContextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stream: null,
      hostId: null,
    };
  }

  peerConnection = null;
  audioVideoRef = null;

  componentDidMount() {
    this.connectSocket();
  }

  connectSocket = async () => {
    socket.on("candidate", (id, candidate) => {
      this.peerConnection
        .addIceCandidate(candidate)
        .catch((e) => console.error(e));
    });

    //2. below function is for host when guest accept the host call socket
    //   will be called and host will recieve here and create peer connection for the guest
    socket.on("call-accepted", async (hostId, guestId) => {
      this.peerConnection = new RTCPeerConnection(config);

      this.peerConnection.addStream(this.state.stream);

      this.peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit("candidate", hostId, guestId, event.candidate);
        }
      };

      this.peerConnection
        .createOffer({ OfferToReceiveAudio: true })
        .then((sdp) => this.peerConnection.setLocalDescription(sdp))
        .then(() => {
          socket.emit(
            "webrtc-offer",
            hostId,
            guestId,
            this.peerConnection.localDescription
          );
        });
    });

    //3. now the below one is for the guest
    socket.on("webrtc-offer", (hostId, description) => {
      this.setState({ hostId }); //this is for guest to let him know that who is the host
      this.peerConnection = new RTCPeerConnection(config);

      this.peerConnection
        .setRemoteDescription(description)
        .then(() => this.peerConnection.createAnswer())
        .then((sdp) => this.peerConnection.setLocalDescription(sdp))
        .then(() => {
          socket.emit(
            "webrtc-answer",
            hostId,
            localStorage.getItem("userId"),
            this.peerConnection.localDescription
          );
        });

      this.peerConnection.onaddstream = (event) => {
        this.setState({ stream: event.stream });
      };
      this.peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit(
            "candidate",
            hostId,
            localStorage.getItem("userId"),
            event.candidate
          );
        }
      };
    });
    socket.on("webrtc-answer", (id, description) => {
      this.peerConnection.setRemoteDescription(description);
    });
  };

  openCamera = async (isAudioCall) => {
    if (this.state.stream) return;
    navigator.mediaDevices
      .getUserMedia({
        audio: {
          sampleSize: 8,
          echoCancellation: true,
        },
        video: !isAudioCall
          ? {
              width: 1280,
              height: 720,
            }
          : false,
      })
      .then((stream) => {
        console.log(stream);
        this.setState({ stream });
      })
      .catch((error) => {
        // Log error
      });
  };

  //1. below function will be called by host to start the streaming process
  informUserForStreaming = (hostId, hostName, guestId) => {
    this.setState({ hostId }); //this is for host to let him know that who is the host
    socket.emit("stream-inform-event", {
      hostId: hostId,
      hostName: hostName,
      guestId: guestId,
    });
  };

  render() {
    return (
      <StreamingContext.Provider
        value={{
          openCamera: this.openCamera,
          informUserForStreaming: this.informUserForStreaming,
          connectSocket: this.connectSocket,
          stream: this.state.stream,
          hostId: this.state.hostId,
        }}
      >
        {this.props.children}
      </StreamingContext.Provider>
    );
  }
}

export default ContextProvider;