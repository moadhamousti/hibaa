"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

const UserAccountnav = () => {
  return (
    <Button variant="destructive" onClick={() => signOut({
        redirect: true,
        callbackUrl:`${window.location.origin}/`
    }
    )}>Log Out</Button>
  )
}

export default UserAccountnav