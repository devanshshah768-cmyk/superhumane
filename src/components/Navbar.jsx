import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  signOut,
} from "firebase/auth";

import { auth } from "../firebase/auth";

import { useAuth } from "../context/AuthContext";

function Navbar() {

  const {
    user,
  } = useAuth();

  const navigate =
    useNavigate();

  async function handleLogout() {

    try {

      await signOut(auth);

      navigate("/");

    } catch (error) {

      console.error(error);

    }

  }

  return (

    <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 border-b border-gray-200">

      <nav className="max-w-7xl mx-auto h-20 px-6 lg:px-12 flex items-center justify-between">

        {/* LOGO */}
        <Link
          to="/"
          className="text-3xl font-bold text-secondary tracking-tight"
        >

          Pedi
          <span className="text-primary">
            Milestones
          </span>

        </Link>

        {/* CENTER NAVIGATION */}
        <div className="hidden md:flex items-center gap-8 text-gray-600 font-medium">

          <Link
            to="/"
            className="hover:text-primary transition duration-300"
          >

            Home

          </Link>

          <Link
            to="/growth"
            className="hover:text-primary transition duration-300"
          >

            Growth Charts

          </Link>

          <Link
            to="/milestones"
            className="hover:text-primary transition duration-300"
          >

            Milestones

          </Link>

          <Link
            to="/features"
            className="hover:text-primary transition duration-300"
          >

            Features

          </Link>

          <Link
            to="/about"
            className="hover:text-primary transition duration-300"
          >

            About

          </Link>

        </div>

        {/* RIGHT SIDE */}
        <div className="hidden md:flex items-center gap-4">

          {
            user ? (

              <>
                {/* ADD CHILD */}
                <Link
                  to="/add-child"
                  className="
                    px-5
                    py-3
                    rounded-2xl
                    bg-primary
                    text-white
                    font-semibold
                    shadow-soft
                    hover:scale-105
                    transition
                    duration-300
                  "
                >

                  Add Child

                </Link>

                {/* LOGOUT */}
                <button
                  onClick={
                    handleLogout
                  }
                  className="
                    px-5
                    py-3
                    rounded-2xl
                    bg-red-500
                    text-white
                    font-semibold
                    shadow-soft
                    hover:scale-105
                    transition
                    duration-300
                  "
                >

                  Logout

                </button>

              </>

            ) : (

              <>

                {/* LOGIN */}
                <Link
                  to="/login"
                  className="
                    font-medium
                    text-gray-600
                    hover:text-primary
                    transition
                    duration-300
                  "
                >

                  Login

                </Link>

                {/* REGISTER */}
                <Link
                  to="/register"
                  className="
                    px-5
                    py-3
                    rounded-2xl
                    bg-primary
                    text-white
                    font-semibold
                    shadow-soft
                    hover:scale-105
                    transition
                    duration-300
                  "
                >

                  Register

                </Link>

              </>

            )
          }

        </div>

        {/* MOBILE MENU BUTTON */}
        <button className="md:hidden flex items-center justify-center w-12 h-12 rounded-xl bg-gray-100">

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-secondary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >

            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />

          </svg>

        </button>

      </nav>

    </header>

  );

}

export default Navbar;