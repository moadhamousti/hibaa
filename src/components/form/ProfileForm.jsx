"use client"

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Form } from "../ui/form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const ProfileForm = () => {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    name: session?.user?.name || '',
    username: session?.user?.username || '',
    email: session?.user?.email || '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your form submission logic here
  };

  return (
    <div className="flex flex-col items-center">
      <h1>{session?.user?.username ? session.user.username : session?.user?.name} Profile</h1>
      <Button
        variant="ghost"
        className="relative h-10 w-10 rounded-full"
        onClick=''
        height={40}
        width={40}
      >
        <Avatar className="h-10 w-10 rounded-full">
          <AvatarImage src=' ' alt="" />
          <AvatarFallback>
          </AvatarFallback>
        </Avatar>
        <input id="fileInput" type="file" className="hidden" />
      </Button>
      <Form className="mt-4 w-full max-w-xs" onSubmit={handleSubmit}>
        <Label>
          Name:
          <Input type="text" name="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
        </Label>
        <Label>
          Username:
          <Input type="text" name="username" value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
        </Label>
        <Label>
          Email:
          <Input type="email" name="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
        </Label>
        {session?.user?.password && (
          <Label>
            Current Password:
            <Input type="password" name="password"  required />
          </Label>
        )}
        <Button type="submit" onClick={handleSubmit}>Update Profile</Button>
      </Form>
    </div>
  );
};

export default ProfileForm;
