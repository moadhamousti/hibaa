"use client"

import React, { useEffect, useState } from 'react';
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
import imageFit from '../../../public/img.svg'
import Image from 'next/image';
import SignUpButton from '../SignInButton';
import { ChevronLeftIcon } from "@radix-ui/react-icons"
import loaderGif from '../../../public/loaderB.gif';


const FormSchema = z.object({
  email: z.string().min(1, 'L\'e-mail est requis').email('L\'Email invalide'),
  password: z
    .string()
    .min(1, 'Mot de passe requis')
    .min(8, 'Le mot de passe doit comporter plus de 8 caractères'),
});




const SignInForm = () => {
  const router = useRouter();
  const {toast}  = useToast();
  const [isLoading, setIsLoading] = useState(false);


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
    setIsLoading(true);
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

   setIsLoading(false);
  };



  return (
    <div className='flex flex-col lg:flex-row min-h-screen '>
      {/* <div className="lg:w-1/2 max-h-screen hidden lg:block  relative"> */}
      <div className="lg:w-1/2 max-h-screen hidden lg:block relative bg-no-repeat" style={{backgroundImage: "url('./img2.svg')" , backgroundSize: '100%', backgroundPosition:'center'}} >
        {/* <div className="flex justify-center items-center w-[750px] h-full">
          <p className="text-[34px] mb-[200px] px-[160px] font-semibold text-[#1E2833]">Bienvenue dans notre communauté de charité. Rejoignez-nous dans le monde de la charité</p>
        </div> */}
      </div>
          
          {/* <Image src={imageFit} alt="Your Image" /> */}
          {/* <p className="absolute bottom-0 mb-10 text-[#2B3D40] px-8 left-0 right-0 text-center text-2xl">Rejoignez-nous. Faites la différence. Connectez-vous <br/> aujourd'hui.</p> */}
      {/* </div> */}
      <div className="lg:w-1/2 p-8 ">
          <Button variant="outline" size="icon" onClick={goBack}>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=' '>
          <div className="text-center mb-4">
            <h1 className="text-4xl font-bold">Bienvenue!</h1>
            <br />
            <h2 className="text-lg">Veuillez saisir vos coordonnées pour créer votre compte</h2>
          </div>
        <div className='space-y-2'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input className='shad-textarea' placeholder='mail@exemple.com' {...field} />
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
          <div>
            <Link href='/forget-password'><p className='mt-2 text-black font-normal text-end text-[16px] hover:text-[--darkishBlue] '>Mot de passe oublié?</p></Link>
          </div>
        </div>
        {/* <Button className='w-full mt-6' type='submit'>
          Sign in
        </Button> */}
        {/* <SignUpButton/> */}
        <div className="w-full mt-6 relative">
            <button className='bg-[--darkishBlue] text-white w-[300px] h-[50px] top-[581px] left-[873px] rounded-[50px] mt-6 block mx-auto' type='submit'
                disabled={isLoading}
              >
                {isLoading ? (
                  <Image src={loaderGif} alt="Loading..." width={50} height={50} className="absolute inset-0 m-auto" />
                ) : (
                  'Se connecter'
                )}
              </button>
        </div>
      </form>
      <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
        ou
      </div>
      <GoogleSignInButton>Connectez-vous avec Google</GoogleSignInButton>
      <p className='text-center text-sm text-gray-600 mt-2'>
      Si vous n'avez pas de compte, s'il vous plaît{' '}
        <Link className='text-blue-500 hover:underline' href='/sign-up'>
          S'inscrire
        </Link>
      </p>
    </Form>
      </div>
    </div>
  );
};

export default SignInForm;
