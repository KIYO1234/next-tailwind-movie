import React from "react";
import { Fragment } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/client";
import { useRouter } from "next/router";
import useWindowScroll from "@react-hook/window-scroll";

const MainNavigation = () => {
  const scrollY = useWindowScroll(60);

  const router = useRouter();
  const [session, loading] = useSession();
  console.log("⭐️ session, loading: ", session, loading);

  const logOutHandler = () => {
    if (confirm("Are you sure you want to signOut?")) {
      signOut();
      alert("Good Bye!");
      router.push("/");
    } else {
      alert("Canceled");
    }
  };

  return (
    <Fragment>
      <div
        className={
          scrollY === 0
            ? "flex justify-between items-center bg-black text-white h-10 fixed top-0 w-full transition duration-300"
            : "flex justify-between items-center bg-white text-black h-10 fixed top-0 w-full transition duration-300"
        }
      >
        <div className="flex justify-between items-center">
          <Link href="/">
            <img
              src="/images/next-movie-logo.png"
              alt="logo"
              className="rounded-full h-7 ml-4 cursor-pointer"
            />
          </Link>
          <div className="ml-10 hover:opacity-50">
            <Link href="/">
              <a>Home</a>
            </Link>
          </div>
          {session && (
            <div className="ml-10 hover:opacity-50">
              <Link href="/new-movie">
                <a>Add Movie</a>
              </Link>
            </div>
          )}
          <div className="ml-10 hover:opacity-50">
            {session ? (
              <button onClick={logOutHandler}>Logout</button>
            ) : (
              <Link href="/authForm">
                <a>Login</a>
              </Link>
            )}
          </div>
          {session && (
            <div className="ml-10 hover:opacity-50">
              <Link href={`/my-movies/${session.sub}`}>
                <a>My List</a>
              </Link>
            </div>
          )}
        </div>
        {session && scrollY === 0 && (
          <div className="text-white pr-5">Welcome! {session.name}</div>
        )}
        {session && scrollY !== 0 && (
          <div className="text-black pr-5">Welcome! {session.name}</div>
        )}
      </div>
    </Fragment>
  );
};

export default MainNavigation;
