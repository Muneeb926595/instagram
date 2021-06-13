import io from "socket.io-client";

const ENDPOINT = process.env.REACT_APP_API_SOCKET_BASE_URL;
export const socket = io(ENDPOINT);
