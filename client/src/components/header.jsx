import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Header() {
  //checking if user is logged in
  const { currentUser } = useSelector((state) => state.user);

  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Welcome</span>
            <span className="text-slate-700">Developer</span>
          </h1>
        </Link>
        <ul className="flex gap-4">
            {/* if no user redirect t home page */}
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              Home
            </li>
          </Link>
          {/* if user exist show them setting */}
          {currentUser ? (
            <Link to="/update">
              <li className="hidden sm:inline text-slate-700 hover:underline">
                setting
              </li>
            </Link>
          ) : (
            <Link to="/sign-up">
              <li className="hidden sm:inline text-slate-700 hover:underline">
                sign-up
              </li>
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
}
