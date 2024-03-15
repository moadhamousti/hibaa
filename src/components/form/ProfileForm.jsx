"use client"
import { useState, useEffect } from "react";
import { useSession, getSession } from "next-auth/react"; // Import getSession to access session data
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
      const response = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedData), // Send form data as JSON string
      });
  
      if (!response.ok) {
        throw new Error("Failed to update profile");
      }
  
      const responseData = await response.json(); // Parse response JSON
      console.log("Profile updated successfully:", responseData);
  
      // Update session data after successful update (if necessary)
      const updatedSession = await getSession(); // Fetch updated session data
      setFormData((prevData) => ({ ...prevData, password: "" }));
  
      // Handle any further actions, such as showing a success message
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
        <Label>
          Current Password:
          <Input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </Label>
        <Button type="submit">Update Profile</Button>
      </Form>
    </div>
  );
};

export default ProfileForm;
