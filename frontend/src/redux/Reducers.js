import Home from "./Home/Reducer";

import Notification from "./Notification/Reducer";

// Auth Reducers
import Login from "./Login/Reducer";
import Register from "./Register/Reducer";
import ChangePassword from "./ChangePassword/Reducer";

import MainLayout from "./MainLayout/Reducer";

export default {
  // Common Reducers
  Home,
  Notification,
  MainLayout,
  // Auth Reducers
  Login,
  Register,
  ChangePassword,

}