import React from "react";
import { Fragment } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/client";
import { useRouter } from "next/router";

const MainNavigation = () => {
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
      <div className="flex justify-between items-center bg-black bg-opacity-60 h-10 fixed top-0 w-full">
        <div className="flex justify-between items-center">
          <Link href="/">
            <img
              src="/images/next-movie-logo.png"
              alt="logo"
              className="rounded-full h-7 ml-4 cursor-pointer"
            />
          </Link>
          <div className="ml-10 hover:opacity-50 text-white">
            <Link href="/">Home</Link>
          </div>
          <div className="ml-10 hover:opacity-50 text-white">
            <Link href="/new-movie">Add Movie</Link>
          </div>
          <div className="ml-10 hover:opacity-50 text-white">
            {session ? (
              <button onClick={logOutHandler}>Logout</button>
            ) : (
              <Link href="/authForm">Login</Link>
            )}
          </div>
          {session && (
            <div className="ml-10 text-white hover:opacity-50">
              <Link href={`/my-movies/${session.sub}`}>My List</Link>
            </div>
          )}
        </div>
        {session && (
          <div className="text-white pr-5">Welcome! {session.name}</div>
        )}
      </div>
    </Fragment>
  );
};

export default MainNavigation;
