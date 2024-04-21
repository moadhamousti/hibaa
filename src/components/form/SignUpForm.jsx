"use client"

import React, { useEffect,useState } from 'react';
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
import loaderGif from '../../../public/loaderB.gif'



const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const FormSchema = z
  .object({
    username: z.string().min(1, "Nom d\'utilisateur est nécessaire").max(100),
    email: z
      .string()
      .min(1, "L\'e-mail est requis")
      .email("L\'Email invalide")
      .refine((value) => {
        // Custom validation function to check email domain
        const allowedDomains = ["gmail.com", "hotmail.com", "yahoo.com"];
        const emailParts = value.split("@");
        return allowedDomains.includes(emailParts[emailParts.length - 1]);
      }, "L\'e-mail n\'est pas valide"),
    password: z
      .string()
      .min(8, "Le mot de passe doit comporter au moins 8 caractères")
      .refine((value) => passwordRegex.test(value), {
        message: "Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un symbole.",
      }),
    confirmPassword: z.string().min(1, "Une confirmation du mot de passe est requise"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Le mot de passe ne correspond pas",
  });



const SignUpForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
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
      toast({
        title: "Succès",
        description:"Compte créé avec succès.",
        variant:"success",
        className: "bg-green-500 text-white", 
      })
      router.push('/sign-in')
    }else{
      toast({
        title: "Error",
        description:"Une erreur s'est produite! Veuillez réessayer.",
        variant:"destructive",
      })
    }
    setIsLoading(false);

  };

  return (
    <div className='flex flex-col lg:flex-row min-h-screen'>
      {/* <div className="lg:w-1/2 max-h-screen hidden lg:block bg-gradient-to-t from-[#E7DDDB] to-[#00A4BF] relative"> */}
        {/* <Image src={imageFit} alt="Your Image" /> */}
        {/* <p className="absolute bottom-0 mb-10 text-[#2B3D40] px-8 left-0 right-0 text-center text-2xl">Rejoignez-nous. Faites la différence. Connectez-vous <br/> aujourd'hui.</p> */}
      <div className="lg:w-1/2 max-h-screen hidden lg:block relative bg-no-repeat" style={{backgroundImage: "url('./bg.svg')" , backgroundSize: '100%', backgroundPosition:'center'}} >
        {/* <div className="flex justify-center items-center h-full">
          <p className="text-[34px] mb-[200px] px-[160px] font-semibold text-[#1E2833]">Bienvenue dans notre communauté de charité. Rejoignez-nous dans le monde de la charité</p>
        </div> */}
      </div>
      {/* </div> */}
      <div className="lg:w-1/2 p-8">
          <Button variant="outline" size="icon" onClick={goBack}>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='w-full '>
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
                    <FormLabel>Nom d&apos;utilisateur</FormLabel>
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
            {/* <SignUpButton/> */}
            <div className="w-full mt-6 relative">
            <button className='bg-[--darkishBlue] text-white w-[300px] h-[50px] top-[581px] left-[873px] rounded-[50px] mt-6 block mx-auto' type='submit'
                disabled={isLoading}
              >
                {isLoading ? (
                  <Image src={loaderGif} alt="Loading..." width={50} height={50} className="absolute inset-0 m-auto" />
                ) : (
                  'Créer un compte'
                )}
              </button>
            </div>
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