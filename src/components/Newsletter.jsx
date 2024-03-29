"use client"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormItem, FormLabel, FormDescription, FormMessage, FormField } from './ui/form';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useState } from 'react';
import emailjs from '@emailjs/browser'
import axios from 'axios';

const FormSchema = z.object({
  email: z.string().min(1, 'L\'e-mail est requis').email('L\'Email invalide'),
});


const Newsletter = () => {
  const [email, setEmail] = useState('');




  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
    },
  });


  return (
    <div className="bg-[#EF507F] py-12 text-white mt-[60px] mb-10 shadow-lg">
      <div className="container mx-auto text-center">
        <div className="pl-8 pr-8">
          <h2 className="text-[20px] lg:text-3xl md:text-2xl font-bold mb-8">
          "RESTEZ À JOUR DE NOS DERNIERS EFFORTS POUR PARTAGER DES ÉQUIPEMENTS MÉDICAUX EN VOUS ABONNANT À NOTRE NEWSLETTER"
          </h2>
        </div>
        <div className="max-w-md mx-auto">
          <Form  {...form} >
            <form >
                <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                    <FormItem>
                        <FormControl>
                        <Input value={email} className='text-black' placeholder='mail@exemple.com' {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <Button type="submit" 
                className="mt-4 py-2 px-6 bg-white text-black rounded-md hover:bg-gray-100 transition duration-300"
                >S'abonner</Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
