"use client";


import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { useSession } from "next-auth/react";
import imageFit from '../../../../public/Blank.png'
import loader from '../../../../public/loader.gif'



const ForgetPassword = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const { data: session , status: sessionStatus } = useSession();

  const goBack = () => {
    router.back(); // Navigate to the previous page
  };


  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/");
    }
  }, [sessionStatus, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;

    try {
      const res = await fetch("/api/forget-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });
      if (res.status === 400) {
        setError("User with this email is not registered");
      } else if (res.status === 200) {
        setError("");
        router.push("/sign-in");
      }
    } catch (error) {
      setError("Error, try again");
      console.error("Error occurred while processing forget password request:", error);
    }
  };

  if (sessionStatus === "loading") {
    return (
      <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50'>
        <Image src={loader} height={50} width={45} alt="" />
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <div className="lg:w-1/2 max-h-screen hidden lg:block">
        <Image src={imageFit} alt="Your Image" />
      </div>
      <div className="lg:w-1/2 p-8">
        <Button variant="outline" size="icon" onClick={goBack}>
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>
        <form onSubmit={handleSubmit}>
          <div className="text-center mb-4">
            <h1 className="text-4xl font-bold">Mot de passe oublier</h1>
            <br />
            <h2 className="text-lg">
              Veuillez saisir votre email pour réinitialiser votre mot de passe
            </h2>
          </div>
          <div className="space-y-2">
            <Input
              type="email"
              className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
              placeholder='mail@exemple.com'
              required
            />
          <p className="text-red-600 text-[16px] mb-4">{error && error}</p>
          </div>
          <button
            type="submit"
            className='bg-[#38867D87] w-[300px] h-[50px] top-[581px] left-[873px] rounded-[50px] mt-6 block mx-auto'
          >
            Submit
          </button>
        </form>
        <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
          ou
        </div>
        <p className="text-center text-sm text-gray-600 mt-2">
          connectez-vous avec un compte existant{" "}
          <Link className="text-blue-500 hover:underline" href="/sign-in">
            connecter
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgetPassword;

