"use client";

import { signOut } from "next-auth/react";
import { Link } from "lucide-react";
import { Button } from "@mui/material";

const UserAccountnav = () => {
  return (
    <div className=" flex gap-4">
        <Button
          variant="contained"
          href="/create-post"
          
        >
          Publish
        </Button>
        <Button
          variant="outlined"
          onClick={() => signOut({
            redirect: true,
            callbackUrl: `${window.location.origin}/`
          })}
        >
          Log Out
        </Button>
    </div>
  )
}

export default UserAccountnav