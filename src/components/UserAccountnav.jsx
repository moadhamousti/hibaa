"use client";

import { signOut } from "next-auth/react";
import { Link } from "lucide-react";
import { Button } from "@mui/material";
import AccountMenu from "./AccountMenu";

const UserAccountnav = () => {
  return (
    <div className=" flex gap-4">
        <Button
          variant="contained"
          href="/create-post"
          
        >
          Publish
        </Button>
        <AccountMenu />
        {/* <Button
          variant="outlined"
          onClick={() => signOut({
            redirect: true,
            callbackUrl: `${window.location.origin}/`
          })}
        >
          Log Out
        </Button> */}
    </div>
  )
}

export default UserAccountnav