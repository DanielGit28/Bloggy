"use client";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

export function Comments({
  comments,
}: {
  comments: {
    post_id: any;
    nickname: any;
    payload: any;
    created_at: any;
    id: any;
    published: any;
    email: any;
}[] | null;
}): JSX.Element {

  return (
    <>
        {comments && (
        
        <>
	  <h2 className="font-bold text-3xl">
         What people are saying
        </h2>
    {comments.map((comment, index) => (
      <div className="p-6 border my-4" key={index}>
				<header className="text-sm">
		      {`Posted by ${comment.nickname} on ${new Date(
	          comment.created_at
          ).toLocaleTimeString("en-US", {
	          year: "numeric",
            month: "short",
            day: "numeric",
          })}`}
        </header>
        <p className="mt-4">{comment.payload}</p>
      </div>
    ))}
  </>
    )}
    </>
  );
}