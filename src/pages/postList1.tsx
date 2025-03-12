import { useQuery } from "@tanstack/react-query";
import { getPosts } from "./api/post";

export default function PostsList1() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    placeholderData: [{ id: 1, title: "Data will Load here" }],
  });

  if (isPending) return <h1>Loading...</h1>;
  if (isError) {
    return <h1>{JSON.stringify(error)}</h1>;
  }

  return (
    <div className="mt-4 ">
      <h2 className="text-2xl">Post List 1</h2>
      <ol>
        {data.map((post: { id: number; title: string }) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ol>
    </div>
  );
}
