import { Geist, Geist_Mono } from "next/font/google";
import { useState } from "react";
import PostsList1 from "./postList1";
import PostsList2 from "./postList2";
import Post from "./post";
import { CreatePost } from "./createPost";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const [currentPage, setCurrentPage] = useState(<PostsList1 />);

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <h1 className="text-3xl">React Query</h1>
      <div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 cursor-pointer"
          onClick={() => setCurrentPage(<PostsList1 />)}
        >
          Posts List 1
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 cursor-pointer"
          onClick={() => setCurrentPage(<PostsList2 />)}
        >
          Posts List 2
        </button>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 cursor-pointer"
          onClick={() => setCurrentPage(<Post id={1} />)}
        >
          First Post
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
          onClick={() =>
            setCurrentPage(<CreatePost setCurrentPage={setCurrentPage} />)
          }
        >
          Create Post
        </button>
        <br />
        {currentPage}
      </div>
    </div>
  );
}
