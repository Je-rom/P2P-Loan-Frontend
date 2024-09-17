'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import ChangePinDialog from '@/components/shared/change-pin-dialog';
import ChangePasswordDialog from '@/components/shared/change-password-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import useProfile from '@/hooks/useProfile';
import dayjs from 'dayjs';
import ChatModal from "../../(others)/chatModal";



const AccountSettings = () => {
  const [isChangePinDialogOpen, setIsChangePinDialogOpen] = useState(false);
  const [isChangePasswordDialogOpen, setIsChangePasswordDialogOpen] =
    useState(false);

  const { GetCurrentUser } = useProfile();
  const { data: userProfile, isLoading, error } = GetCurrentUser();

  const handleChangePin = () => {
    setIsChangePinDialogOpen(true);
  };

  const handleChangePassword = () => {
    setIsChangePasswordDialogOpen(true);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading profile</div>;
  }

  if (!userProfile) {
    return <div>No profile data available</div>;
  }

  const userType = localStorage.getItem('user_type');

  const { firstName, lastName, email, pinCreated, createdAt } = userProfile;

  return (
    <div className="">
      <div className="flex items-center">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <div className="ml-4">
          <h1 className="text-base font-bold">{`${firstName} ${lastName}`}</h1>
          <p className="text-sm text-gray-600">
            {userType === 'lender' ? 'Lender' : 'Borrower'}
          </p>
        </div>
      </div>

      <div className="mt-5">
        <div className="flex justify-between items-center">
          <h2 className="text-base font-semibold">Personal Information</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          <div className="text-sm">
            <span className="font-medium">First Name: </span> {firstName}
          </div>

          <div className="text-sm">
            <span className="font-medium">Last Name: </span> {lastName}
          </div>
          <div className="text-sm">
            <span className="font-medium">Email: </span> {email}
          </div>
          <div className="text-sm">
            <span className="font-medium">Pin created: </span>
            {pinCreated ? 'Yes' : 'No'}
          </div>
          <div className="text-sm">
            <span className="font-medium">Account created: </span>
            {dayjs(createdAt).format('MMMM D, YYYY')}
          </div>
        </div>
      </div>

      <div className="mt-5">
        <h2 className="text-base font-semibold mb-2">Security</h2>
        <p className="text-sm text-gray-600 mb-4">
          Keeping your account secure is a priority. Regularly updating your PIN
          and password helps protect your personal data from unauthorized
          access. Use the options below to manage your security settings.
        </p>
        <div className="flex flex-col space-y-4">
          <Button
            onClick={handleChangePin}
            className="text-sm w-1/2 bg-blue-500 hover:bg-blue-500"
          >
            Change Pin
          </Button>
          <Button
            onClick={handleChangePassword}
            className="text-sm w-1/2 bg-blue-500 hover:bg-blue-500"
          >
            Change Password
          </Button>
        </div>
      </div>

      <ChangePinDialog
        isDialogOpen={isChangePinDialogOpen}
        setIsDialogOpen={setIsChangePinDialogOpen}
      />
      <ChangePasswordDialog
        isDialogOpen={isChangePasswordDialogOpen}
        setIsDialogOpen={setIsChangePasswordDialogOpen}
      />
    </div>
  );

}


export default AccountSettings;
