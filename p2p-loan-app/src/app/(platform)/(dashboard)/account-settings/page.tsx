'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { IoChevronForward } from 'react-icons/io5';
import { AiOutlinePoweroff } from 'react-icons/ai';
import { Switch } from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import Button from '@mui/material/Button';

const ProfileSettings = () => {
  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    gender: '',
    dateOfBirth: '',
  });

  const [contactInfo, setContactInfo] = useState({
    phoneNumber: '',
    email: '',
    cityTown: '',
    state: '',
    zipCode: '',
  });

  const [security, setSecurity] = useState({
    pin: '',
    password: '',
  });

  const [notifications, setNotifications] = useState({
    emailNotification: true,
    smsNotification: false,
  });

  useEffect(() => {
    const fetchSettingData = async () => {
      try {
        const response = await axios.get('');
        const data = response.data();

        setPersonalInfo(data.personalInfo);
        setContactInfo(data.contactInfo);
        setSecurity(data.security);
        setNotifications(data.notifications);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };
    fetchSettingData();
  }, []);

  // Handlers for Editing (you can implement your own logic for handling changes)
  const handleEditPersonalInfo = () => {
    // Logic for editing personal info (e.g., open a modal to edit)
  };

  const handleEditContactInfo = () => {
    // Logic for editing contact info (e.g., open a modal to edit)
  };

  const handleChangePin = () => {
    // Logic for changing pin (e.g., open a modal to change)
  };

  const handleChangePassword = () => {
    // Logic for changing password (e.g., open a modal to change)
  };
  const toggleEmailNotification = () => {
    setNotifications((prev) => ({
      ...prev,
      emailNotification: !prev.emailNotification,
    }));
  };

  const toggleSmsNotification = () => {
    setNotifications((prev) => ({
      ...prev,
      smsNotification: !prev.smsNotification,
    }));
  };

  return (
    <div className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
      <div className="">
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

        {/* Personal Information */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold mb-1">Personal Information</h2>
            <Button
              variant="outlined"
              color="primary"
              size="small"
              startIcon={<EditIcon />}
              sx={{
                minWidth: 'auto',
                padding: '2px 4px',
                fontSize: '0.75rem',
                textTransform: 'none',
              }}
            >
              Edit
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="mb-2">
              <span className="font-medium">First Name: </span> Veronica
            </div>
            <div className="mb-2">
              <span className="font-medium">Middle Name: </span> Rhiana
            </div>
            <div className="mb-2">
              <span className="font-medium">Last Name: </span> Smith
            </div>
            <div className="mb-2">
              <span className="font-medium">Gender: </span> Female
            </div>
            <div className="mb-2">
              <span className="font-medium">Date of Birth: </span> 23-09-1960
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold mb-1">Contact Information</h2>
            <Button
              variant="outlined"
              color="primary"
              size="small"
              startIcon={<EditIcon />}
              sx={{
                minWidth: 'auto',
                padding: '2px 4px',
                fontSize: '0.75rem',
                textTransform: 'none',
              }}
            >
              Edit
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="mb-2">
              <span className="font-medium">Phone Number: </span> +234 709854278
            </div>
            <div className="mb-2">
              <span className="font-medium">Email: </span> veronica256@yahoo.com
            </div>
            <div className="mb-2">
              <span className="font-medium">City/Town: </span> Lekki
            </div>
            <div className="mb-2">
              <span className="font-medium">State: </span> Lagos
            </div>
            <div className="mb-2">
              <span className="font-medium">Zip Code: </span> 23348
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Security</h2>
          <div className="border-t border-gray-300 py-2 flex items-center justify-between">
            <span>Change Pin</span>
            <IoChevronForward
              size={20}
              className="text-blue-500"
              onClick={handleChangePin}
            />
          </div>
          <div className="border-t border-gray-300 py-2 flex items-center justify-between">
            <span>Change Password</span>
            <IoChevronForward
              size={20}
              className="text-blue-500"
              onClick={handleChangePassword}
            />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Notification</h2>
          <div className="flex items-center mb-2">
            <span className="text-lg flex-grow">Email Notification</span>
            <Switch
              checked={notifications.emailNotification}
              onChange={toggleEmailNotification}
              className="MuiSwitch-root"
              color="primary"
            />
          </div>
          <div className="flex items-center mb-2">
            <span className="text-lg flex-grow">SMS Notification</span>
            <Switch
              checked={notifications.smsNotification}
              onChange={toggleSmsNotification}
              className="MuiSwitch-root"
              color="primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
