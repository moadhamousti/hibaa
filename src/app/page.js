import About from "@/components/About";
import Questions from "@/components/FAQ/Questions";
import Accordion from "@/components/FAQ/Questions";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Landing from "@/components/Landing";
import Navbar from "@/components/Navbar";
import Newsletter from "@/components/Newsletter";
import TopLoadingBar from "@/components/TopBar";
import User from "@/components/User";
import { buttonVariants } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Home () {
  const session = await getServerSession(authOptions);



  return (
    <>
    <div className='min-h-screen bg-bg text-textColor'>
      <div className='max-w-screen-xl mx-auto px-8'>
        <Navbar />
        <Landing/>
        <About/>
        <Features/>
        <Questions/>
        {/* <Footer/> */}

      </div>
      <Newsletter/>
      <div className='max-w-screen-xl mx-auto px-8'>
        <Footer/>

      </div>
    </div>
  </>
  )
    
}









