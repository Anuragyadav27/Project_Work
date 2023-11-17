import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import SingIn from "./pages/SignIn";
import Profile from "./pages/Profile";
// import Header from "./components/header";
import Protected from "./pages/Protected";
import ChangePassword from "./pages/ChangePassword";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
         {/* adding extra layer of protection for security purpose */}
          <Route element={<Protected />} >
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/update" element={<ChangePassword />} />
          </Route>
         <Route path="/sign-up" element={<Signup />} />
         <Route path="/sign-in" element={<SingIn />} />
      </Routes>
    </BrowserRouter>
  );
}