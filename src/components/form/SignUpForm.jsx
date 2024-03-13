"use client"

import React from 'react';
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
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Link from 'next/link';
import GoogleSignInButton from '../GoogleSignInButton';
import { useRouter } from 'next/navigation';
import {useToast} from "@/components/ui/use-toast"
import imageFit from '../../../public/Blank.png'
import Image from 'next/image';
import SignUpButton from '../SignUpButton';


const FormSchema = z
  .object({
    username: z.string().min(1, 'Username is required').max(100),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must have than 8 characters'),
    confirmPassword: z.string().min(1, 'Password confirmation is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Password do not match',
  });

const SignUpForm = () => {
  const router = useRouter();
  const {toast}  = useToast();
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });




  const onSubmit = async (values) => {
    const response = await fetch('/api/user', {
      method: 'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        username: values.username,
        email:values.email,
        password:values.password
      })
    })

    if(response.ok) {
      router.push('/sign-in')
    }else{
      toast({
        title: "Error",
        description:"Something Went Wrong!",
        variant:"destructive",
      })
    }
  };

  return (
    <div className='flex flex-col lg:flex-row min-h-screen'>
      <div className="lg:w-1/2 max-h-screen hidden lg:block">
        <Image src={imageFit} alt="Your Image" />
      </div>
      <div className="lg:w-1/2 p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
            <div className="text-center mb-4">
              <h1 className="text-4xl font-bold		">Welcome!</h1>
              <br />
              <h2 className="text-lg">Please enter your details to create your Account</h2>
            </div>
            <div className='space-y-2'>
              <FormField
                control={form.control}
                name='username'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder='johndoe' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder='mail@example.com' {...field} />
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
              <FormField
                control={form.control}
                name='confirmPassword'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Re-Enter your password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Re-Enter your password'
                        type='password'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* <Button className='w-[340px] mt-6' type='submit'>
              Create Account
            </Button> */}
            <SignUpButton/>
          </form>
          <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
            or
          </div>
          <GoogleSignInButton>Sign up with Google</GoogleSignInButton>
          <p className='text-center text-sm text-gray-600 mt-2'>
            If you don't have an account, please{' '}
            <Link className='text-blue-500 hover:underline' href='/sign-in'>
              Sign in
            </Link>
          </p>
        </Form>
      </div>
    </div>
    
  );
};

export default SignUpForm;



// import React from 'react'

// const SignUpForm = () => {
//   return (
//     <div>SignUpForm</div>
//   )
// }

// export default SignUpForm