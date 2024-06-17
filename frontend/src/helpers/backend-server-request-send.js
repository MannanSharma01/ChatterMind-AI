import axios from "axios";

async function loginRequest(data) {
  let response = await axios.post("/user/login", data);
  return response;
}

async function allUsersRequest() {
  let response = await axios.get("/user");
  return response;
}

async function authStatusRequest() {
  let response = await axios.get("/user/authentication-status");
  return response.data;
}

async function logoutRequest() {
  let response = await axios.get("/user/logout");
  return response;
}

async function signupRequest(data) {
  const response = await axios.post("/user/signup", data);
  return response;
}

async function newChatRequest(data) {
  const response = await axios.post("/chat/new", data);
  return response;
}

async function allChatsRequest() {
  const response = await axios.get("/chat");
  return response;
}

async function deleteChatsRequest() {
  const {status} = await axios.delete("/chat");
  return status;
}

export {
  loginRequest,
  allUsersRequest,
  authStatusRequest,
  logoutRequest,
  signupRequest,
  newChatRequest,
  allChatsRequest,
  deleteChatsRequest
};