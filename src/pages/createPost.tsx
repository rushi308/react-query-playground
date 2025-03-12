import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { createPost } from "./api/post";
import Post from "./post";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function CreatePost({ setCurrentPage }: { setCurrentPage: any }) {
  const titleRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const { isPending, isError, error, mutate } = useMutation({
    mutationFn: createPost,
    onSuccess: (data) => {
      queryClient.setQueryData(["posts", data.id], data);
      queryClient.invalidateQueries({ queryKey: ["posts"], exact: true });
      setCurrentPage(<Post id={data.id} />);
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleSubmit(e: any) {
    e.preventDefault();
    mutate({
      title: titleRef.current?.value || "",
      body: bodyRef.current?.value || "",
    });
  }

  return (
    <div className="mt-4">
      {isError && JSON.stringify(error)}
      <h1 className="text-2xl">Create Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            ref={titleRef}
          />
        </div>
        <div>
          <label htmlFor="body">Body</label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id="body"
            ref={bodyRef}
          />
        </div>
        <button
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 cursor-pointer"
          disabled={isPending}
        >
          {isPending ? "Loading..." : "Create"}
        </button>
      </form>
    </div>
  );
}
