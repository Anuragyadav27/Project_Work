import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import SingIn from "./pages/SingIn";
import Profile from "./pages/Profile";
import Header from "./components/header";
import Protected from "./pages/Protected";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Protected/>}>
          {/* <Header /> */}
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          </Route>

        <Route path="/sign-up" element={<Signup />} />
        <Route path="/sign-in" element={<SingIn />} />
      </Routes>
    </BrowserRouter>
  );
}
