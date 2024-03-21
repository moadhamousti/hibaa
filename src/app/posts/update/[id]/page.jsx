"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup } from '@/components/ui/radio-group';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '@/lib/firebase';
import { useSession } from 'next-auth/react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/components/ui/use-toast';
import PageLayout from '@/app/(blog)/layout';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import loader from '../../../../../public/loader.gif';
import whatsapp from '../../../../../public/whatsapp.png';
import uploadIcon from '../../../../../public/Upload.svg';

const FormSchema = z.object({
  title: z.string().min(8, 'Title too short'),
  description: z.string().min(25, 'Description must be more than 25 characters'),
  phone: z.string().max(10, 'The phone must have 10 digits'),
});

const storage = getStorage(app);

const Page = ({ post }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { register, handleSubmit, setValue } = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: post.title || '',
      description: post.desc || '',
      phone: post.phone || '',
    },
  });
  const [file, setFile] = useState(null);
  const [media, setMedia] = useState(post.img || '');
  const [isWhatsapp, setisWhatsapp] = useState(post.isWhatsapp || false);
  const [selectedLocationCategory, setSelectedLocationCategory] = useState(post.location || '');
  const [selectedToolsCategories, setSelectedToolsCategories] = useState(post.category || '');
  const { toast } = useToast();

  useEffect(() => {
    register('title');
    register('description');
    register('phone');
  }, [register]);

  useEffect(() => {
    setValue('title', post.title || '');
    setValue('description', post.desc || '');
    setValue('phone', post.phone || '');
  }, [post, setValue]);

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpdate = async (data) => {
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('desc', data.description);
      formData.append('phone', data.phone);
      formData.append('isWhatsapp', isWhatsapp);
      formData.append('location', selectedLocationCategory);
      formData.append('category', selectedToolsCategories);
      if (file) {
        formData.append('img', file);
      }

      const res = await fetch(`/api/posts/${post.id}`, {
        method: 'PUT',
        body: formData,
      });

      if (res.ok) {
        toast({
          title: 'Success',
          description: 'Post updated successfully',
          variant: 'success',
          className: 'bg-green-500 text-white',
        });
        router.push('/feed');
      } else {
        toast({
          title: 'Error',
          description: 'An error occurred',
          variant: 'error',
          className: 'bg-red-500 text-white',
        });
      }
    } catch (error) {
      console.error('Error updating post:', error);
      toast({
        title: 'Error',
        description: 'An error occurred',
        variant: 'error',
        className: 'bg-red-500 text-white',
      });
    }
  };

  if (status === 'loading') {
    return (
      <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50'>
        <Image src={loader} height={50} width={45} alt='' />
      </div>
    );
  }

  return (
    <PageLayout>
      <Navbar />
      <div className='pt-10 text-center mb-10'>
        <h1 className='text-4xl font-extrabold tracking-normal'>Update Post</h1>
      </div>
      <div className='max-w-md mx-auto'>
        <form onSubmit={handleSubmit(handleUpdate)} className='grid gap-4'>
          <Label htmlFor='title'>Title</Label>
          <Input {...register('title')} id='title' className='bg-gray-200' placeholder='Title' />

          <Label htmlFor='description'>Description</Label>
          <Textarea {...register('description')} id='description' placeholder='Description' className='bg-gray-200 w-full h-32 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500' />

          <Label htmlFor='phone'>Phone</Label>
          <Input {...register('phone')} id='phone' className='bg-gray-200' placeholder='Phone Number' />

          <div className='flex gap-3'>
            <Image src={whatsapp} alt='' width={20} height={20} />
            <span>Is this a WhatsApp Number?</span>
            <RadioGroup
              aria-label='whatsapp-option'
              name='whatsapp-option'
              value={isWhatsapp ? 'yes' : ''}
              onChange={(e) => setisWhatsapp(e.target.value === 'yes')}
            >
              <div className=''>
                <input
                  type='radio'
                  id='whatsapp-yes'
                  value='yes'
                  checked={isWhatsapp}
                  onChange={() => setisWhatsapp(!isWhatsapp)}
                />
                <Label htmlFor='whatsapp-yes' className='ml-2 mb-1'>
                  Yes
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className='flex flex-col items-center justify-center'>
            <label htmlFor='image' className='relative'>
              <input
                type='file'
                id='image'
                accept='image/*'
                onChange={handleImageChange}
                className='hidden'
              />
              {file ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt='Preview'
                  className='w-full h-full object-cover rounded-md border-2 border-gray-300'
                />
              ) : (
                <div
                  className='w-full h-full flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md'
                >
                  <div
                    className='column self-center bg-white px-10 py-10'
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                  >
                    <Image className='mb-6' src={uploadIcon} width={100} height={100} />
                    <p className='text-gray-400'>
                      Drag and drop files here or click to <strong className='text-blue-500 font-bold'>browse</strong>
                    </p>
                  </div>
                </div>
              )}
            </label>
          </div>

          <Button type='submit' className='mt-8'>
            Submit
          </Button>
        </form>
      </div>
      <Footer />
    </PageLayout>
  );
};

export default Page;

