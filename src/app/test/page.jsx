"use client"
import axios from "axios";
import { useState } from "react";
import { RiLoader5Fill } from "react-icons/ri";
import addToMailingList from "../api/mailingList/route";

const Newsletter = () => {
  const [email, setEmail] = useState(""); // Change mail to email
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false); // Initialize success state to false
  const [messageState, setMessageState] = useState("");

  const Subscribe = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await addToMailingList(email); // Pass email to addToMailingList
      setLoading(false);
      setSuccess(true);
      setMessageState(response.data.message);
    } catch (err) {
      setLoading(false);
      setMessageState(String(err.message));
    }
  };

  return (
    <section className="container mx-auto my-10 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid items-center gap-10 bg-black py-[15%] px-[6%] dark:bg-zinc-900 md:p-[6%] lg:grid-cols-2">
        <div>
          <h3 className="text-5xl font-semibold text-white">
            Join my newsletter
          </h3>
          <p className="mt-5 text-lg text-neutral-200">
            Join my newsletter to get new posts before anyone else, I&apos;ll
            send you an email with links to all of the articles.
          </p>
        </div>

        <form onSubmit={Subscribe}>
          <div className="gap-3 md:flex">
            <input
              type="email"
              className="peer block w-full rounded-md border-gray-300 bg-black py-3 pl-7 pr-12 text-white focus:border-white focus:ring-white peer-invalid:text-pink-600 dark:border-zinc-500 dark:bg-zinc-900 dark:focus:ring-white sm:text-sm"
              placeholder="Your Email"
              autoComplete="email"
              value={email} // Add value prop
              onChange={(e) => setEmail(e.target.value)} // Change setMail to setEmail
              required
            />

            <button
              disabled={loading}
              type="submit"
              className="mt-5 w-full rounded-md bg-white py-3 px-5 text-black hover:bg-gray-200 disabled:cursor-not-allowed disabled:bg-opacity-60 md:mt-0 md:w-auto"
            >
              {!loading ? (
                "SUBSCRIBE"
              ) : (
                <div className="flex w-full items-center justify-center ">
                  <RiLoader5Fill className="w-8 animate-spin" />
                </div>
              )}
            </button>
          </div>

          {success ? (
            <p className="mt-2 text-green-400 dark:text-green-400">
              {messageState}
            </p>
          ) : (
            <p className="mt-2 text-pink-500 dark:text-pink-500">
              {messageState}
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
