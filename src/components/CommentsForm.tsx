"use client";
import { Bounded } from "./Bounded";
import { useState } from "react";

export function CommentsForm({
  id,
  uid,
}: {
  id: string;
  uid: string;
}): JSX.Element {
  const [comment, setComment] = useState("");
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await fetch(`/api/comments/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        post_id: id,
        nickname,
        email,
        comment,
        published: true,
        uid,
      }),
    }).then((data) => {
      if (data.status === 500) {
        console.error(data.statusText);
      } else {
        setLoading(false);
        setComment("");
        setEmail("");
        setNickname("");
        setShowConfirmation(true);
        setTimeout(() => {
          setShowConfirmation(false);
      }, 3000);
      }
    });
  };

  return (
    <Bounded>
      <>
        <h2 className="font-bold text-xl">
          Share your thoughts
        </h2>
        {showConfirmation && <div
    className="relative block w-full p-4 mt-4 mb-4 text-base leading-5 text-white bg-green-500 rounded-lg opacity-100 font-regular">
    Comment submitted!
  </div>}
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor="comment" className="mb-2 mt-6 text-lg block">
              Comment
            </label>
            <textarea
              id="comment"
              onChange={(e) => setComment(e.target.value)}
              placeholder="Your comment"
              className="w-full border p-4"
              value={comment}
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-2 mt-6 text-lg block">
              Email
            </label>
            <input
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Your email"
              className="w-full border p-4"
              value={email}
            />
          </div>
          <div>
            <label htmlFor="nickname" className="mb-2 mt-6 text-lg block">
              Nickname
            </label>
            <input
              id="nickname"
              onChange={(e) => setNickname(e.target.value)}
              type="text"
              placeholder="Your nickname"
              className="w-full border p-4"
              value={nickname}
            />
        </div>
          <button
            className="p-4 bg-slate-700 text-white mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
            disabled={loading || !nickname || !comment || !email}
          >
          {loading ? "Loading..." : "Send comment"}
          </button>
        </form>
      </>
    </Bounded>
  );
}