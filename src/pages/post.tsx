import { useQuery } from "@tanstack/react-query";
import { getPost } from "./api/post";
import { getUser } from "./api/user";

export default function Post({ id }: { id: number }) {
  const {
    data: postData,
    isPending: postIsPending,
    isError: postIsError,
    error: postError,
  } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => getPost(id),
  });

  const {
    data: userData,
    isPending: userIsPending,
    isError: userIsError,
  } = useQuery({
    queryKey: ["users", postData?.userId],
    enabled: postData?.userId != null,
    queryFn: () => getUser(postData.userId),
  });

  if (postIsPending) return <h1>Loading Post...</h1>;
  if (postIsError) {
    return <h1>{JSON.stringify(postError)}</h1>;
  }

  return (
    <>
      <h1 className="text-2xl">
        {postData.title} <br />
        <small>
          {userIsPending
            ? "Loading User..."
            : userIsError
            ? "Error Loading User"
            : userData.name}
        </small>
      </h1>
      <p>{postData.body}</p>
    </>
  );
}
