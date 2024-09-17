'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import ChangePin from '@/services/accountSettingsService';
import { IoChevronForward } from 'react-icons/io5';
import { Switch } from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { Input } from '@/components/ui/input';
import useAccountSettings from '@/hooks/useAccount';
import { Form, FormField, FormItem, FormMessage, FormControl, FormLabel } from '@/components/ui/form';
import { toast } from 'sonner';


const AccountSettings = () => {

  const [showChangePinForm, setShowChangePinForm] = useState(false);
  const [showEditContactForm, setShowEditContactForm] = useState(false);

  const EditContactSchema = z.object({
    phone_number: z.string().min(10, 'Phone number must be at least 10 digits'),
    email: z.string().email('Invalid email address'),
    state: z.string().min(2, 'State must be at least 2 characters'),
});
 
   const ChangePinSchema= z.object({
      oldPin: z.string().min(4, "Old PIN must be 4 digits"),
      newPin: z.string().min(4, "New PIN must be 4 digits"),
      confirmNewPin: z.string().min(4, "Confirm PIN must be 4 digits"),
    }).refine(data => data.newPin === data.confirmNewPin, {
      message: "New PIN and confirm PIN must match",
      path: ["confirmNewPin"],
    });

  type ChangePinFormValues = z.infer<typeof ChangePinSchema>;
  type EditContactFormValues = z.infer<typeof EditContactSchema>;

  const changePinForm = useForm<ChangePinFormValues>({
    resolver: zodResolver(ChangePinSchema),
    defaultValues: {
        oldPin: '',
        newPin: '',
        confirmNewPin: '',
    },
});

const editContactForm = useForm<EditContactFormValues>({
    resolver: zodResolver(EditContactSchema),
    defaultValues: {
        phone_number: '',
        email: '',
        state: '',
    },
});

  const form = useForm<ChangePinFormValues>({
    resolver: zodResolver(ChangePinSchema),
    defaultValues: {
      oldPin: '',
      newPin: '',
      confirmNewPin: '',
    },
  });
  

  const { changePin, editContactInfo, isLoading, changePinStatus, editContactInfoStatus, changePinError, editContactInfoError } = useAccountSettings();

  const onSubmit =async (data: ChangePinFormValues) => {
    if (data.newPin !== data.confirmNewPin) {
        toast.error('New PIN and confirm PIN do not match.');
        return;
    }
    changePin(data);
};

const handleEditContactInfo = (data: EditContactFormValues) => {
  editContactInfo(data);
}

  return (
    <div className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
      <div className="w-full">
        {/* Header */}
        <div className="flex items-center mb-6">
          <div className="relative w-20 h-20 rounded-full overflow-hidden mr-4">
            <Image src="" alt="pics" layout="fill" objectFit="cover" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Veronica R. Smith</h1>
            <p className="text-gray-600">Developer</p>
            <p className="text-gray-600">11, Thomas street, Lekki Lagos</p>
          </div>
        </div>
        {/* Contact Information */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold mt-8 mb-4">Edit Contact Information</h2>
            <button
              className="text-blue-500 text-2xl flex items-center justify-center"
              onClick={() => setShowEditContactForm(!showEditContactForm)}
            >
              <IoChevronForward />
            </button>
          </div>

          {/* Conditionally render the contact edit form */}
          {showEditContactForm && (
            <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-8 hover:bg-gray-200 cursor-pointer transition duration-200">
              <form onSubmit={editContactForm.handleSubmit(handleEditContactInfo)} className="space-y-4">
                <div>
                  <Input
                    {...editContactForm.register('phone_number')}
                    placeholder="Phone Number"
                    className="py-2 px-4 rounded-lg border w-full"
                  />
                  {editContactForm.formState.errors.phone_number && <p>{editContactForm.formState.errors.phone_number.message}</p>}
                </div>
                <div>
                  <Input
                    {...editContactForm.register('email')}
                    placeholder="Email Address"
                    className="py-2 px-4 rounded-lg border w-full"
                  />
                  {editContactForm.formState.errors.email && <p>{editContactForm.formState.errors.email.message}</p>}
                </div>
                <div>
                  <Input
                    {...editContactForm.register('state')}
                    placeholder="State"
                    className="py-2 px-4 rounded-lg border w-full"
                  />
                  {editContactForm.formState.errors.state && <p>{editContactForm.formState.errors.state.message}</p>}
                </div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full max-w-[400px] rounded-xl bg-blue-500 hover:bg-blue-700"
                >
                  {isLoading && (editContactInfoStatus === 'pending') ? 'Updating Contact...' : 'Update Contact Information'}
                </Button>
                {editContactInfoError && <div>Error: {editContactInfoError.message}</div>}
              </form>
            </div>
          )}
        </div>

        {/* Change PIN */}
      <div className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div className="w-full">
            {/* Change PIN Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Change PIN</h2>
              <button 
                className="text-blue-500 text-2xl flex items-center justify-center"
                onClick={() => setShowChangePinForm(!showChangePinForm)} // Toggle form visibility
              >
                <IoChevronForward />
              </button>
            </div>
        
        {/* Conditionally render the form */}
        {showChangePinForm && (
          <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-8 hover:bg-gray-200 cursor-pointer transition duration-200">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Input 
                  {...form.register('oldPin')} 
                  placeholder="Old PIN" 
                  type="password" 
                  className="py-2 px-4 rounded-lg border w-full"
                />
                {form.formState.errors.oldPin && <p className="text-red-500 text-sm">{form.formState.errors.oldPin.message}</p>}
              </div>
              <div>
                <Input 
                  {...form.register('newPin')} 
                  placeholder="New PIN" 
                  type="password" 
                  className="py-2 px-4 rounded-lg border w-full"
                />
                {form.formState.errors.newPin && <p className="text-red-500 text-sm">{form.formState.errors.newPin.message}</p>}
              </div>
              <div>
                <Input 
                  {...form.register('confirmNewPin')} 
                  placeholder="Confirm New PIN" 
                  type="password" 
                  className="py-2 px-4 rounded-lg border w-full"
                />
                {form.formState.errors.confirmNewPin && <p className="text-red-500 text-sm">{form.formState.errors.confirmNewPin.message}</p>}
              </div>
              <div className="flex justify-center mt-4">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full max-w-xs rounded-xl bg-blue-500 hover:bg-blue-700 text-white py-2 font-semibold transition duration-200"
                >
                  {isLoading ? 'Changing...' : 'Change PIN'}
                </Button>
              </div>
              {changePinError && <div className="text-red-500 mt-2">{changePinError.message}</div>}
            </form>
          </div>
        )}
      </div>
    </div>
    </div>
   </div>

  );

}


export default AccountSettings;
