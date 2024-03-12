"use client";

import { signOut } from "next-auth/react";
import { Button, buttonVariants } from "./ui/button";
import { Link } from "lucide-react";

const UserAccountnav = () => {
  return (
    <div className="gap-0 pl-3">
      <Button className={buttonVariants()} href='/create-post'>Publish</Button>
      <Button 
        variant="destructive" 
        onClick={() => signOut({
          redirect: true,
          callbackUrl:`${window.location.origin}/`
        })}>Log Out
      </Button>
      
    </div>
  )
}

export default UserAccountnav