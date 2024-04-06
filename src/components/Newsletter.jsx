// "use client"
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
// import { Form, FormControl, FormItem, FormLabel, FormDescription, FormMessage, FormField } from './ui/form';
// import { Button } from './ui/button';
// import { Input } from './ui/input';
// import { useState } from 'react';
// // import sgMail from "@sendgrid/mail";

// const FormSchema = z.object({
//   email: z.string().min(1, 'L\'e-mail est requis').email('L\'Email invalide'),
// });

// // sgMail.setApiKey(process.env.SENDGRID_NEWSLETTER_API_KEY);
// //   const msg = {
// //     to: 'test@example.com',
// //     from: 'test@example.com', // Use the email address or domain you verified above
// //     subject: 'Sending with Twilio SendGrid is Fun',
// //     text: 'and easy to do anywhere, even with Node.js',
// //     html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// //   };

// const Newsletter = () => {
//   const [email, setEmail] = useState('');

  



//   const form = useForm({
//     resolver: zodResolver(FormSchema),
//     defaultValues: {
//       email: '',
//     },
//   });


//   return (
//     <div className="bg-[#EF507F] py-12 text-white mt-[60px] mb-[50px] shadow-lg" id="contact">
//       <div className="container mx-auto text-center">
//         <div className="pl-8 pr-8">
//           <h2 className="text-[20px] lg:text-3xl md:text-2xl font-bold mb-8">
//           "RESTEZ À JOUR DE NOS DERNIERS EFFORTS POUR PARTAGER DES ÉQUIPEMENTS MÉDICAUX EN VOUS ABONNANT À NOTRE NEWSLETTER"
//           </h2>
//         </div>
//         <div className="max-w-md mx-auto">
//           <Form  {...form} >
//             <form >
//                 <FormField
//                     control={form.control}
//                     name='email'
//                     render={({ field }) => (
//                     <FormItem>
//                         <FormControl>
//                         <Input value={email} className='text-black' placeholder='mail@exemple.com' {...field} />
//                         </FormControl>
//                         <FormMessage />
//                     </FormItem>
//                     )}
//                 />
//                 <Button type="submit" 
//                 className="mt-4 py-2 px-6 bg-white text-black rounded-md hover:bg-gray-100 transition duration-300"
//                 >S'abonner</Button>
//             </form>
//           </Form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Newsletter;



"use client"
import axios from "axios";
import { useState } from "react";
import { RiLoader5Fill } from "react-icons/ri";
import addToMailingList from "../app/api/mailingList/route";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [messageState, setMessageState] = useState("");

  const Subscribe = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await addToMailingList(email);
      setLoading(false);
      setMessageState(response.data.message); // Update message state based on response
    } catch (err) {
      setLoading(false);
      setMessageState(String(err.message)); // Update message state based on error
    }
  };

  return (
    <div className="bg-black py-12 text-white mt-[60px] mb-[50px] shadow-lg" id="contact">
      <div className="container mx-auto text-center">
        <div className="pl-8 pr-8">
          <h2 className="text-[20px] lg:text-3xl text-white md:text-2xl font-bold mb-8">
            "RESTEZ À JOUR DE NOS DERNIERS EFFORTS POUR PARTAGER DES ÉQUIPEMENTS MÉDICAUX EN VOUS ABONNANT À NOTRE NEWSLETTER"
          </h2>
        </div>
      </div> 

      <div className="max-w-md mx-auto">
        <form onSubmit={Subscribe} className="flex flex-col items-center gap-5">
          <input
            type="email"
            className="peer block w-full rounded-md border-gray-300 bg-gray-200 py-3 pl-7 pr-12 text-black focus:border-white focus:ring-white peer-invalid:text-pink-600 dark:border-zinc-500 dark:bg-zinc-900 dark:focus:ring-white sm:text-sm"
            placeholder="Your Email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            disabled={loading}
            type="submit"
            className="mt-4 py-2 px-6 bg-white text-black rounded-md transition duration-300 hover:bg-gray-200 disabled:cursor-not-allowed disabled:bg-opacity-60 md:mt-0 md:w-auto"
          >
            {!loading ? (
              "SUBSCRIBE"
            ) : (
              <div className="flex w-full items-center justify-center ">
                <RiLoader5Fill className="w-8 animate-spin" />
              </div>
            )}
          </button>

          {messageState && (
            <p className={messageState.includes("successfully") ? "mt-2 text-green-400 dark:text-green-400" : "mt-2 text-pink-500 dark:text-pink-500"}>
              {messageState}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Newsletter;
