import Link from 'next/link';
import react from 'react';

const Footer = () => {
  return (
    <footer className="bg-blue-600  text-white py-4">
      <div className="container mx-auto text-center">
        <p>
          <Link
            href="/privacy-policy"
            className="text-blue-400 hover:underline"
          >
            Privacy Policy
          </Link>
          {' | '}
          <Link
            href="/terms-of-service"
            className="text-blue-400 hover:underline"
          >
            Terms of Service
          </Link>
          {' | '}
          <Link href="/contact-us" className="text-blue-400 hover:underline">
            Contact Us
          </Link>
        </p>
        <p>© {new Date().getFullYear()} BorrowPointe. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
