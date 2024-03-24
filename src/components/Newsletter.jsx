"use client"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormItem, FormLabel, FormDescription, FormMessage, FormField } from './ui/form';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useState } from 'react';
import emailjs from '@emailjs/browser'

const FormSchema = z.object({
  email: z.string().min(1, 'L\'e-mail est requis').email('L\'Email invalide'),
});


const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const serviceId = 'service_sm6v7xb';
    const templateId = 'template_2jpoqcs';
    const publicId = 'lT80kKpGB2b10RVNd';


    const templateParams = {
      from_email: email,
    };

    emailjs.send(serviceId, templateId,templateParams,publicId)
    .then((response) => {
      console.log("Email sent Successfuly", response);
      setEmail('')
    })
    .catch((error) => {
      console.error('Error sending Email:', error)
    })

  };


  // const data = {
  //   service_Id: serviceId,
  //   template_Id: templateId,
  //   user_id: publicId,
  //   templateParams:{
  //     email: email,
  //   }
  // }

  // // emailjs.send(serviceId, templateId,templateParams,publicId
  // try{
  //   const res = await axios.post("https://api.emailjs.com/api/v1.0/email/send". data);
  //   console.log(res.data);
  //   setEmail('')
  // }catch(error) {
  //   console.error(error);
  // }
  


  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
    },
  });


  return (
    <div className="bg-black py-12 text-white mt-[60px] mb-10 shadow-lg">
      <div className="container mx-auto text-center">
        <div className="pl-8 pr-8">
          <h2 className="text-[20px] lg:text-3xl md:text-2xl font-bold mb-8">
          "RESTEZ À JOUR DE NOS DERNIERS EFFORTS POUR PARTAGER DES ÉQUIPEMENTS MÉDICAUX EN VOUS ABONNANT À NOTRE NEWSLETTER"
          </h2>
        </div>
        <div className="max-w-md mx-auto">
          <Form  {...form} >
            <form onSubmit={handleSubmit} >
                <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                    <FormItem>
                        <FormControl>
                        <Input value={email} className='text-black' placeholder='mail@exemple.com' onChange={(e) => setEmail(e.target.value)} {...field} />
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
