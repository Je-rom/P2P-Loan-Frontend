import React from 'react';
import Image from 'next/image';

const NotificationIcon = () => {
  return (
    <>
      <div className="rounded-full p-2">
        <Image
          src="/notification.png"
          alt="notification"
          width={30}
          height={20}
        />
      </div>
    </>
  );
};

export default NotificationIcon;
