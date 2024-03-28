// "use client"

// import React, { useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '../ui/form';
// import * as z from 'zod';
// import { signIn, useSession } from 'next-auth/react'
// import { zodResolver } from '@hookform/resolvers/zod';
// import { Input } from '../ui/input';
// import { Button } from '../ui/button';
// import Link from 'next/link';
// import GoogleSignInButton from '../GoogleSignInButton';
// import { useRouter } from 'next/navigation';
// import {useToast} from "@/components/ui/use-toast"
// import imageFit from '../../../public/Blank.png'
// import Image from 'next/image';
// import SignUpButton from '../SignInButton';
// import { ChevronLeftIcon } from "@radix-ui/react-icons"

// const FormSchema = z.object({
//   email: z.string().min(1, 'L\'e-mail est requis').email('L\'Email invalide'),
// });




// const ForgetPasswordForm = () => {
//   const router = useRouter();
//   const {toast}  = useToast();

//   const goBack = () => {
//     router.back(); // Navigate to the previous page
//   };

  


// const {data: session, status}= useSession()
// useEffect(() => {
//     if (session && status === 'authenticated') {
//       router.push('/');
//     }
//   }, [session, status, router]);

//   const form = useForm({
//     resolver: zodResolver(FormSchema),
//     defaultValues: {
//       email: '',
//     },
//   });

//   const onSubmit = async (values) => {
//     try {
//       const res = await fetch("/api/forget-password", {
//         method: 'POST',
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           email: values.email,
//         }),
//       });
//       if (res.status === 400) {
//         toast({
//           title: "Error",
//           description: "User with this email is not registered",
//           variant: "destructive",
//         })
//       } else if (res.status === 200) {
//         toast({
//           title: "Success",
//           description: "Password reset email sent",
//           variant: "success",
//           className: "bg-green-500 text-white"
//         });
//         router.push("/sign-in");
//       } else {
//         toast({
//           title: "Error",
//           description: "Unknown error occurred",
//           variant: "destructive",
//         });
//       }
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "An unexpected error occurred",
//         variant: "destructive",
//       });
//       router.push("/sign-in")
//       console.error(error);
//     }
//   };




//   return (
//     <div className='flex flex-col lg:flex-row min-h-screen'>
//       <div className="lg:w-1/2 max-h-screen hidden lg:block">
//         <Image src={imageFit} alt="Your Image" />
//       </div>
//       <div className="lg:w-1/2 p-8">
//           <Button variant="outline" size="icon" onClick={goBack}>
//             <ChevronLeftIcon className="h-4 w-4" />
//           </Button>
//       <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
//           <div className="text-center mb-4">
//             <h1 className="text-4xl font-bold">Mot de passe oublier</h1>
//             <br />
//             <h2 className="text-lg">Veuillez saisir vos coordonnées pour récuperer votre mot de passe</h2>
//           </div>
//         <div className='space-y-2'>
//           <FormField
//             control={form.control}
//             name='email'
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>E-mail</FormLabel>
//                 <FormControl>
//                   <Input className='shad-textarea' placeholder='mail@exemple.com' {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
          
//         </div>
//         <SignUpButton/>
//       </form>
//       <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
//         ou
//       </div>
//       <p className='text-center text-sm text-gray-600 mt-2'>
//       Si vous n'avez pas de compte, s'il vous plaît{' '}
//         <Link className='text-blue-500 hover:underline' href='/sign-in'>
//           S'inscrire
//         </Link>
//       </p>
//     </Form>
//       </div>
//     </div>
//   );
// };

// export default ForgetPasswordForm;