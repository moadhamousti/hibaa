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
import { ChevronLeftIcon } from "@radix-ui/react-icons"
import { useSession } from 'next-auth/react';



const FormSchema = z
  .object({
    username: z.string().min(1, 'Nom d\'utilisateur est nécessaire').max(100),
    email: z.string().min(1, 'L\'e-mail est requis').email('L\'Email invalide'),
    password: z
      .string()
      .min(1, 'Mot de passe requis')
      .min(8, 'Le mot de passe doit comporter plus de 8 caractères'),
    confirmPassword: z.string().min(1, 'Une confirmation du mot de passe est requise'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Le mot de passe ne correspond pas',
  });



const SignUpForm = () => {
  const router = useRouter();
  const {toast}  = useToast();
  const goBack = () => {
    router.back(); // Navigate to the previous page
  };

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });


  const {data: session, status}= useSession()
useEffect(() => {
    if (session && status === 'authenticated') {
      router.push('/');
    }
  }, [session, status, router]);



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
          <Button variant="outline" size="icon" onClick={goBack}>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
            <div className="text-center mb-4">
              <h1 className="text-4xl font-bold		">Bienvenue!</h1>
              <br />
              <h2 className="text-lg">Veuillez saisir vos coordonnées pour créer votre compte</h2>
            </div>
            <div className='space-y-2'>
              <FormField
                control={form.control}
                name='username'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom d'utilisateur</FormLabel>
                    <FormControl>
                      <Input placeholder='utilisateur' {...field} />
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
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input placeholder='mail@exemple.com' {...field} />
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
                    <FormLabel>Mot de passe</FormLabel>
                    <FormControl>
                      <Input
                        type='password'
                        placeholder='Tapez votre mot de passe'
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
                    <FormLabel>Ressaisir votre mot de passe</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Ressaisir votre mot de passe'
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
            ou
          </div>
          <GoogleSignInButton>Connectez-vous avec Google</GoogleSignInButton>
          <p className='text-center text-sm text-gray-600 mt-2'>
            Si vous avez déja un compte, veuillez vous{' '}
            <Link className='text-blue-500 hover:underline' href='/sign-in'>
              Se connecter
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