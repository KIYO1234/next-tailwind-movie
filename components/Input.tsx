import { useRouter } from "next/dist/client/router";
import React, { useRef } from "react";
import { Fragment } from "react";
import { NewMovie } from "../Types";
import { useSession } from "next-auth/client";

const Input = () => {
  const [session, loading] = useSession();
  // console.log('session.sub: ', session.sub);

  const titleRef = useRef(null);
  const imageRef = useRef(null);
  const authorRef = useRef(null);
  const descRef = useRef(null);
  const router = useRouter();

  const addMovieHandler = async (event) => {
    event.preventDefault();
    const enteredTitle:string = titleRef.current.value;
    const enteredImage:string = imageRef.current.value;
    const enteredAuthor:string = authorRef.current.value;
    const enteredDesc:string = descRef.current.value;

    const newMovie: NewMovie = {
      id: session.sub,
      title: enteredTitle,
      image: enteredImage,
      author: enteredAuthor,
      description: enteredDesc,
    };

    const response = await fetch("/api/movies/addMovie", {
      method: "POST",
      body: JSON.stringify(newMovie),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    // console.log("⭐️ data: ", data);
    // router.push('/');
  };

  return (
    <Fragment>
      <form onSubmit={addMovieHandler}>
        <div className="w-1/2 mx-auto text-center relative mt-20">
          <div className="mb-5">
            <span className="w-28 inline-block align-top">Title</span>
            <input className="border-2 w-60 mb-3" ref={titleRef} required />
          </div>
          <div className="mb-5">
            <span className="w-28 inline-block align-top">imageURL</span>
            <input className="border-2 w-60 mb-3" ref={imageRef} />
          </div>
          <div className="mb-5">
            <span className="w-28 inline-block align-top">Author</span>
            <input className="border-2 w-60 mb-3" ref={authorRef} />
          </div>
          <div>
            <span className="w-28 inline-block align-top">Description</span>
            <textarea rows={10} className="border-2 w-60 mb-3" ref={descRef} />
          </div>
          <button className="bg-blue-500 hover:bg-blue-300 text-white rounded p-0.5 pl-10 pr-10 absolute right-0">
            ADD
          </button>
        </div>
      </form>
    </Fragment>
  );
};

export default Input;
