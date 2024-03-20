"use client"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormItem, FormLabel, FormDescription, FormMessage, FormField } from './ui/form';
import { Button } from './ui/button';
import { Input } from './ui/input';

const FormSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
});

const Newsletter = () => {
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
          email: '',
        },
      });

      const onSubmit = async (data) => {
        console.log(data.email + " has subscribed");
        // Perform subscription logic here
    };
  return (
    <div className="bg-black py-12 text-white mt-6 mb-6 shadow-lg">
      <div className="container mx-auto text-center">
        <div className="pl-8 pr-8">
          <h2 className="text-[20px] lg:text-3xl md:text-2xl font-bold mb-8">
            "STAY UPDATED ON OUR LATEST EFFORTS TO SHARE MEDICAL SUPPLIES AND EQUIPMENT SUBSCRIBING TO OUR NEWSLETTER"
          </h2>
        </div>
        <div className="max-w-md mx-auto">
          <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} >
                <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                    <FormItem>
                        <FormControl>
                        <Input className='text-black' placeholder='mail@example.com' {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <Button type="submit" className="mt-4 py-2 px-6 bg-white text-black rounded-md hover:bg-gray-100 transition duration-300">Subscribe</Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
