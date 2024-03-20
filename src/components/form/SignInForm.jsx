"use client"

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import * as z from 'zod';
import { signIn, useSession } from 'next-auth/react'
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Link from 'next/link';
import GoogleSignInButton from '../GoogleSignInButton';
import { useRouter } from 'next/navigation';
import {useToast} from "@/components/ui/use-toast"
import imageFit from '../../../public/Blank.png'
import Image from 'next/image';
import SignUpButton from '../SignInButton';
import { ChevronLeftIcon } from "@radix-ui/react-icons"

const FormSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must have than 8 characters'),
});

const SignInForm = () => {
  const router = useRouter();
  const {toast}  = useToast();

  const goBack = () => {
    router.back(); // Navigate to the previous page
  };

  


const {data: session, status}= useSession()
useEffect(() => {
    if (session && status === 'authenticated') {
      router.push('/');
    }
  }, [session, status, router]);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values) => {
   const signInData = await signIn('credentials',{
    email: values.email,
    password: values.password,
    redirect:false,
   })
   if(signInData?.error) {
    toast({
      title: "Error",
      description:"Something Went Wrong!",
      variant:"destructive",
    })
   }else{
    router.refresh();
    router.push('/feed');
   }

  };



  return (
    <div className='flex flex-col lg:flex-row min-h-screen'>
      <div className="lg:w-1/2 max-h-screen hidden lg:block">
        <Image src={imageFit} alt="Your Image" />
      </div>
      <div className="lg:w-1/2 p-8">
          <Button variant="outline" size="icon" onClick={goBack}>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
          <div className="text-center mb-4">
            <h1 className="text-4xl font-bold">Welcome!</h1>
            <br />
            <h2 className="text-lg">Please enter your details to create your Account</h2>
          </div>
        <div className='space-y-2'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input className='shad-textarea' placeholder='mail@example.com' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    placeholder='Enter your password'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* <Button className='w-full mt-6' type='submit'>
          Sign in
        </Button> */}
        <SignUpButton/>
      </form>
      <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
        or
      </div>
      <GoogleSignInButton>Sign in with Google</GoogleSignInButton>
      <p className='text-center text-sm text-gray-600 mt-2'>
        If you don't have an account, please{' '}
        <Link className='text-blue-500 hover:underline' href='/sign-up'>
          Sign up
        </Link>
      </p>
    </Form>
      </div>
    </div>
  );
};

export default SignInForm;
