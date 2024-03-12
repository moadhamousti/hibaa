import About from "@/components/About";
import Accordion from "@/components/Questions";
import Features from "@/components/Features";
import Landing from "@/components/Landing";
import Newsletter from "@/components/Newsletter";
import User from "@/components/User";
import { buttonVariants } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import Questions from "@/components/Questions";

export default async function Home () {
  const session = await getServerSession(authOptions);
  return (
    <div className=''>
      {/* <Link className={buttonVariants()} href='/feed'>Explore</Link> */}
      <Landing/>
      <About/>
      <Features/>
      <Questions/>
      <Newsletter/>
      {/* <h2>Client Session</h2>
      <User/>
      <h2>Server Session</h2>
      {JSON.stringify(session)} */}
    </div>
  )
    
}