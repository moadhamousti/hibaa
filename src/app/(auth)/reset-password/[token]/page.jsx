"use client";


import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import { useSession } from "next-auth/react";
import imageFit from '../../../../../public/Blank.png'
import loader from '../../../../../public/loader.gif'



const ResetPassword = ({params}) => {

  console.log("token",params.token);
  const router = useRouter();
  const [error, setError] = useState("");
  const { data: session , status: sessionStatus } = useSession();
  const [verified, setVerified ] = useState(false);
  const [user, setUser ] = useState(null);

  const goBack = () => {
    router.back(); // Navigate to the previous page
  };


  useEffect(() =>{
    const verifyToken = async () => {
      try {
        const res = await fetch("/api/verify-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: params.token,
          }),
        });
        if (res.status === 400) {
          setError("Invalid token or has expired");
          setVerified(true);
        } else if (res.status === 200) {
          setError("");
          setVerified(true);
          const userData = await res.json();
          setUser(userData);
        }
      } catch (error) {
        setError("Error, try again");
        console.error("Error occurred while processing forget password request:", error);
      }
    }
    verifyToken();
  },[params.token])


  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/");
    }
  }, [sessionStatus, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const password = e.target[0].value;

    try {
      const res = await fetch("/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password,
          email: user?.email

        }),
      });
      if (res.status === 400) {
        setError("Something went wrong");
      } else if (res.status === 200) {
        setError("");
        router.push("/sign-in");
      }
    } catch (error) {
      setError("Error, try again");
      console.error("Error occurred while processing forget password request:", error);
    }
  };

  if (sessionStatus === "loading" || !verified) {
    return (
      <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50'>
        <Image src={loader} height={50} width={45} alt="" />
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* <div className="lg:w-1/2 max-h-screen hidden lg:block">
        <Image src={imageFit} alt="Your Image" />
      </div> */}
      <div className="lg:w-1/2 max-h-screen hidden lg:block bg-gradient-to-t from-[#E7DDDB] to-[#00A4BF] relative">
          {/* <Image src={imageFit} alt="Your Image" /> */}
          {/* <p className="absolute bottom-0 mb-10 text-[#2B3D40] px-8 left-0 right-0 text-center text-2xl">Rejoignez-nous. Faites la différence. Connectez-vous <br/> aujourd'hui.</p> */}
      </div>
      <div className="lg:w-1/2 p-8">
        <Button variant="outline" size="icon" onClick={goBack}>
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>
        <form onSubmit={handleSubmit}>
          <div className="text-center mb-4">
            <h1 className="text-4xl font-bold">Mot de passe reinitialiser</h1>
            <br />
            <h2 className="text-lg">
              Veuillez saisir votre email pour réinitialiser votre mot de passe
            </h2>
          </div>
          <div className="space-y-2">
            <Input
              type="password"
              className="w-full border border-gray-300 text-white rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
              placeholder="password"
              required
            />
          <p className="text-red-600 text-[16px] mb-4">{error && error}</p>
          </div>
          <button
            type="submit"
            disabled={error.length > 0}
            className='bg-[--darkishBlue] w-[300px] h-[50px] top-[581px] left-[873px] rounded-[50px] mt-6 block mx-auto disabled:bg-[--lightishBlue] disabled:cursor-not-allowed'

          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;

