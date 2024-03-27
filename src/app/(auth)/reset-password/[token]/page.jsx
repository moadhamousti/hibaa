"use client"

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../../../components/ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../../../../components/ui/input';
import { Button } from '../../../../components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import imageFit from '../../../../../public/Blank.png';
import Image from 'next/image';
import SignUpButton from '../../../../components/SignInButton';
import { ChevronLeftIcon } from '@radix-ui/react-icons';
import ResetPasswordButton from '@/components/ResetPasswordButton';
import { useDataGridProps } from '@mui/x-data-grid/DataGrid/useDataGridProps';
import { useSession } from 'next-auth/react';

const FormSchema = z.object({
  password: z.string().min(1, 'Mot de passe requis').min(8, 'Le mot de passe doit comporter plus de 8 caractères'),
});

const ResetPassword = ({ params }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [verified, setVerified] = useState(false);
  const [user, setUser] = useState(null);

  const goBack = () => {
    router.back(); // Navigate to the previous page
  };

  const { data: session, status } = useSession();

  // useEffect(() => {
  //   if (session && status === 'authenticated') {
  //     router.push('/');
  //   }
  // }, [session, status, router]);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: '',
    },
  });

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await fetch('/api/verify-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token: params.token,
          }),
        });
        if (res.status === 400) {
          toast({
            title: 'Error',
            description: 'Invalid Token or has Expired',
            variant: 'destructive',
          });
        } else if (res.status === 200) {
          setVerified(true);
          const userData = await res.json();
          setUser(userData);
        } else {
        }
      } catch (error) {
        console.error(error);
      }
    };
    verifyToken();
  }, [params.token]);



  const onSubmit = async ( e) => {
    e.preventDefault()
    const password = e.target[0].value;
    try {
      const res = await fetch("/api/reset-password", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: user?.email,
          password,
        }),
      });
  
      if (res.status === 200) {
        toast({
          title: "Success",
          description: "Password reset successfully",
          variant: "success",
          className: "bg-green-500 text-white"
        });
        router.push("/sign-in");
      } else {
        const errorData = await res.json();
      }
    } catch (error) {
      console.error(error);
    }
  };
  



  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <div className="lg:w-1/2 max-h-screen hidden lg:block">
        <Image src={imageFit} alt="Your Image" />
      </div>
      <div className="lg:w-1/2 p-8">
        <Button variant="outline" size="icon" onClick={goBack}>
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>
        <Form {...form} onSubmit={form.handleSubmit(onSubmit)}>
          <form className="w-full">
            <div className="text-center mb-4">
              <h1 className="text-4xl font-bold">Mot de passe réinitialisé</h1>
              <br />
              <h2 className="text-lg">Veuillez saisir vos coordonnées pour récupérer votre mot de passe</h2>
            </div>
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mot de passe</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Tapez votre mot de passe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <button
              className="bg-[#38867D87] w-[300px] h-[50px] top-[581px] left-[873px] rounded-[50px] mt-6 block mx-auto disabled:bg-[#6edacd87]"
              type="submit"
              disabled={!verified} // Disable button if token is not verified
            >
              Réinitialiser le mot de passe
            </button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;




// disabled={toast.length > 0}