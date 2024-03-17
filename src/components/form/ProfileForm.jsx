"use client"

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Form } from "../ui/form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2).max(100),
  username: z.string().min(2).max(20),
  email: z.string().email(),
  password: z.string().min(6),
});

const ProfileForm = () => {
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (session?.user) {
      const { name, username, email } = session.user;
      setFormData({ name: name || "", username: username || "", email: email || "", password: "" });
    }
  }, [session]);

  const avatarSrc = session?.user?.image || "https://github.com/shadcn.png";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAvatarClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const validatedData = schema.parse(formData);
      const formData = new FormData();
      formData.append("name", validatedData.name);
      formData.append("username", validatedData.username);
      formData.append("email", validatedData.email);
      formData.append("password", validatedData.password);

      const response = await fetch("/api/profile/updateProfile", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error("Failed to update profile");
      }
  
      const responseData = await response.json();
      console.log("Profile updated successfully:", responseData);
  
      // Update session data after successful update
      // You can also consider updating the local state with the new data if necessary
  
    } catch (error) {
      console.error("Update error:", error);
      // Handle error, such as displaying an error message to the user
    }
  };
  

  if (status === "loading") return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center">
      <h1>{session?.user?.username ? session.user.username : session?.user?.name} Profile</h1>
      <Button
        variant="ghost"
        className="relative h-10 w-10 rounded-full"
        onClick={handleAvatarClick}
        height={40}
        width={40}
      >
        <Avatar className="h-10 w-10 rounded-full">
          <AvatarImage src={avatarSrc} alt="" />
          <AvatarFallback>
            {session?.user?.username ? session.user.username[0] : session?.user?.name[0]}
          </AvatarFallback>
        </Avatar>
        <input id="fileInput" type="file" className="hidden" />
      </Button>
      <Form className="mt-4 w-full max-w-xs" onSubmit={handleSubmit}>
        <Label>
          Name:
          <Input type="text" name="name" value={formData.name} onChange={handleChange} />
        </Label>
        <Label>
          Username:
          <Input type="text" name="username" value={formData.username} onChange={handleChange} />
        </Label>
        <Label>
          Email:
          <Input type="email" name="email" value={formData.email} onChange={handleChange} />
        </Label>
        {session?.user?.password && (
          <Label>
            Current Password:
            <Input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </Label>
        )}
        <Button type="submit" onClick={handleSubmit}>Update Profile</Button>
      </Form>
    </div>
  );
};

export default ProfileForm;

