'use client';
import React, { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useOutsideClick } from '@/hooks/use-outside-click';
import { Button } from '@/components/ui/button';
import useLoanOffer from '@/hooks/useLoanOffer';

export function BorrowerOffer() {
  const { GetLoanOffers } = useLoanOffer();
  const [active, setActive] = useState<any>(null);
  const { data, isLoading, error } = GetLoanOffers();
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  const borrowerOffers = data?.result.items.filter(
    (offer: { type: string }) => offer.type === 'borrower',
  );

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setActive(false);
      }
    }

    if (active && typeof active === 'object') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading offers.</div>;
  }

  return (
    <>
      <AnimatePresence>
        {active && typeof active === 'object' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === 'object' ? (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.id}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.id}-${id}`}
              ref={ref}
              className="w-full max-w-[500px] h-1/2 md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl"
            >
              <div>
                <div className="flex justify-between items-start p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.id}-${id}`}
                      className="font-bold text-neutral-700 dark:text-neutral-200"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.id}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400"
                    >
                      {active.additionalInformation}
                    </motion.p>
                  </div>

                  <motion.a
                    layoutId={`button-${active.id}-${id}`}
                    href={''}
                    target="_blank"
                    className="px-4 py-3 text-sm rounded-full font-bold text-white"
                  ></motion.a>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 dark:text-neutral-400"
                  >
                    <p>Amount: ${active.amount}</p>
                    <p>Interest Rate: {active.interestRate}%</p>
                    <p>Loan Duration: {active.loanDurationDays} days</p>
                    <Button>Apply here</Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="max-w-full mx-auto w-full gap-4">
        {borrowerOffers?.map((offer: any) => (
          <motion.div
            layoutId={`card-${offer.id}-${id}`}
            key={offer.id}
            onClick={() => setActive(offer)}
            className="shadow-lg bg-gray-100 border mt-6 p-4 flex flex-col md:flex-row justify-between items-center hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
          >
            <div className="flex gap-4 flex-col md:flex-row">
              <div className="">
                <motion.h3
                  layoutId={`title-${offer.id}-${id}`}
                  className="text-neutral-800 dark:text-neutral-200 text-center md:text-left font-bold"
                >
                  {offer.user.firstName} {offer.user.lastName}
                </motion.h3>
                <motion.p
                  layoutId={`description-${offer.id}-${id}`}
                  className="text-neutral-600 dark:text-neutral-400 text-center md:text-left"
                >
                  {offer.additionalInformation}
                </motion.p>
              </div>
            </div>
            <motion.button
              layoutId={`button-${offer.id}-${id}`}
              className="px-4 py-2 text-sm rounded-full font-bold bg-gray-100 hover:bg-blue-400 hover:text-white text-black mt-4 md:mt-0"
            >
              See More
            </motion.button>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

// 'use client';
// import React, { useEffect, useId, useRef, useState } from 'react';
// import { AnimatePresence, motion } from 'framer-motion';
// import { useOutsideClick } from '@/hooks/use-outside-click';
// import { Button } from '@/components/ui/button';

// export function BorrowerOffer() {
//   const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(
//     null,
//   );
//   const ref = useRef<HTMLDivElement>(null);
//   const id = useId();

//   useEffect(() => {
//     function onKeyDown(event: KeyboardEvent) {
//       if (event.key === 'Escape') {
//         setActive(false);
//       }
//     }

//     if (active && typeof active === 'object') {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'auto';
//     }

//     window.addEventListener('keydown', onKeyDown);
//     return () => window.removeEventListener('keydown', onKeyDown);
//   }, [active]);

//   useOutsideClick(ref, () => setActive(null));

//   return (
//     <>
//       <AnimatePresence>
//         {active && typeof active === 'object' && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/20 h-full w-full z-10"
//           />
//         )}
//       </AnimatePresence>
//       <AnimatePresence>
//         {active && typeof active === 'object' ? (
//           <div className="fixed inset-0  grid place-items-center z-[100]">
//             <motion.button
//               key={`button-${active.title}-${id}`}
//               layout
//               initial={{
//                 opacity: 0,
//               }}
//               animate={{
//                 opacity: 1,
//               }}
//               exit={{
//                 opacity: 0,
//                 transition: {
//                   duration: 0.05,
//                 },
//               }}
//               className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
//               onClick={() => setActive(null)}
//             >
//               <CloseIcon />
//             </motion.button>
//             <motion.div
//               layoutId={`card-${active.title}-${id}`}
//               ref={ref}
//               className="w-full max-w-[500px] h-1/2 md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl"
//             >
//               <motion.div layoutId={`image-${active.title}-${id}`}></motion.div>

//               <div>
//                 <div className="flex justify-between items-start p-4">
//                   <div className="">
//                     <motion.h3
//                       layoutId={`title-${active.title}-${id}`}
//                       className="font-bold text-neutral-700 dark:text-neutral-200"
//                     >
//                       {active.title}
//                     </motion.h3>
//                     <motion.p
//                       layoutId={`description-${active.description}-${id}`}
//                       className="text-neutral-600 dark:text-neutral-400"
//                     >
//                       {active.description}
//                     </motion.p>
//                   </div>

//                   <motion.a
//                     layoutId={`button-${active.title}-${id}`}
//                     href={''}
//                     target="_blank"
//                     className="px-4 py-3 text-sm rounded-full font-bold text-white"
//                   ></motion.a>
//                 </div>
//                 <div className="pt-4 relative px-4">
//                   <motion.div
//                     layout
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4  dark:text-neutral-400 "
//                   >
//                     {typeof active.content === 'function'
//                       ? active.content()
//                       : active.content}
//                     <Button>Apply here</Button>
//                   </motion.div>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         ) : null}
//       </AnimatePresence>
//       <ul className="max-w-full mx-auto w-full gap-4">
//         {cards.map((card, index) => (
//           <motion.div
//             layoutId={`card-${card.title}-${id}`}
//             key={`card-${card.title}-${id}`}
//             onClick={() => setActive(card)}
//             className="shadow-lg bg-gray-100 border mt-6 p-4 flex flex-col md:flex-row justify-between items-center hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
//           >
//             <div className="flex gap-4 flex-col md:flex-row">
//               <motion.div layoutId={`image-${card.title}-${id}`}></motion.div>
//               <div className="">
//                 <motion.h3
//                   layoutId={`title-${card.title}-${id}`}
//                   className="text-neutral-800 dark:text-neutral-200 text-center md:text-left font-bold"
//                 >
//                   {card.title}
//                 </motion.h3>
//                 <motion.p
//                   layoutId={`description-${card.description}-${id}`}
//                   className="text-neutral-600 dark:text-neutral-400 text-center md:text-left"
//                 >
//                   {card.description}
//                 </motion.p>
//               </div>
//             </div>
//             <motion.button
//               layoutId={`button-${card.title}-${id}`}
//               className="px-4 py-2 text-sm rounded-full font-bold bg-gray-100 hover:bg-blue-400 hover:text-white text-black mt-4 md:mt-0"
//             >
//               {card.ctaText}
//             </motion.button>
//           </motion.div>
//         ))}
//       </ul>
//     </>
//   );
// }

// export const CloseIcon = () => {
//   return (
//     <motion.svg
//       initial={{
//         opacity: 0,
//       }}
//       animate={{
//         opacity: 1,
//       }}
//       exit={{
//         opacity: 0,
//         transition: {
//           duration: 0.05,
//         },
//       }}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       className="h-4 w-4 text-black"
//     >
//       <path stroke="none" d="M0 0h24v24H0z" fill="none" />
//       <path d="M18 6l-12 12" />
//       <path d="M6 6l12 12" />
//     </motion.svg>
//   );
// };

// const cards = [
//   {
//     description: 'Competitive interest rates and flexible repayment options.',
//     title: 'Personal Loan',
//     ctaText: 'See More',
//     content: () => {
//       return (
//         <div>
//           <p>
//             I am seeking a personal loan to cover various needs, such as
//             consolidating debt, funding a major purchase, or covering unexpected
//             expenses. I am looking for a loan with competitive interest rates
//             and flexible repayment terms to suit my financial situation.
//           </p>
//           <ul className="mt-4">
//             <li>
//               <strong>Loan Amount:</strong> Up to $50,000
//             </li>
//             <li>
//               <strong>Accruing interestRate:</strong> Personal expenses
//             </li>
//             <li>
//               <strong>Grace Period:</strong> Unsecured
//             </li>
//             <li>
//               <strong>Loan Duration:</strong> 1 to 5 years
//             </li>
//             <li>
//               <strong>Interest Rate:</strong> 5.99% to 15.99% APR
//             </li>
//             <li>
//               <strong>Frequency of Repayment:</strong> Monthly
//             </li>
//           </ul>
//         </div>
//       );
//     },
//   },
//   {
//     description: 'Finance your dream home with ease.',
//     title: 'Home Loan',
//     ctaText: 'See More',
//     content: () => {
//       return (
//         <div>
//           <p>
//             I am looking for a home loan to purchase or refinance my dream home.
//             I need a loan with competitive interest rates, an easy application
//             process, and expert guidance to make my home buying journey smooth
//             and hassle-free.
//           </p>
//           <ul className="mt-4">
//             <li>
//               <strong>Loan Amount:</strong> Up to $500,000
//             </li>
//             <li>
//               <strong>Loan Purpose:</strong> Home purchase or refinance
//             </li>
//             <li>
//               <strong>Loan Category:</strong> Secured
//             </li>
//             <li>
//               <strong>Loan Duration:</strong> 15 to 30 years
//             </li>
//             <li>
//               <strong>Interest Rate:</strong> 3.5% to 5% APR
//             </li>
//             <li>
//               <strong>Frequency of Repayment:</strong> Monthly
//             </li>
//           </ul>
//         </div>
//       );
//     },
//   },
//   {
//     description: 'Upgrade your business with our support.',
//     title: 'Business Loan',
//     ctaText: 'See More',
//     content: () => {
//       return (
//         <div>
//           <p>
//             I am in need of a business loan to help grow and expand my business.
//             Whether it's to purchase new equipment, hire staff, or manage cash
//             flow, I am looking for funds with favorable terms to support my
//             business goals.
//           </p>
//           <ul className="mt-4">
//             <li>
//               <strong>Loan Amount:</strong> Up to $100,000
//             </li>
//             <li>
//               <strong>Loan Purpose:</strong> Business expansion
//             </li>
//             <li>
//               <strong>Loan Category:</strong> Unsecured or secured
//             </li>
//             <li>
//               <strong>Loan Duration:</strong> 1 to 10 years
//             </li>
//             <li>
//               <strong>Interest Rate:</strong> 6% to 12% APR
//             </li>
//             <li>
//               <strong>Frequency of Repayment:</strong> Monthly
//             </li>
//           </ul>
//         </div>
//       );
//     },
//   },
//   {
//     description: 'Secure the funds for your educational goals.',
//     title: 'Student Loan',
//     ctaText: 'See More',
//     content: () => {
//       return (
//         <div>
//           <p>
//             I am seeking a student loan to cover tuition fees, books, and other
//             educational expenses. I need a loan with competitive rates, flexible
//             repayment options, and a simple application process to achieve my
//             academic goals.
//           </p>
//           <ul className="mt-4">
//             <li>
//               <strong>Loan Amount:</strong> Up to $30,000
//             </li>
//             <li>
//               <strong>Loan Purpose:</strong> Education expenses
//             </li>
//             <li>
//               <strong>Loan Category:</strong> Unsecured
//             </li>
//             <li>
//               <strong>Loan Duration:</strong> 5 to 15 years
//             </li>
//             <li>
//               <strong>Interest Rate:</strong> 4% to 8% APR
//             </li>
//             <li>
//               <strong>Frequency of Repayment:</strong> Monthly
//             </li>
//           </ul>
//         </div>
//       );
//     },
//   },
//   {
//     description: 'Get the funds to purchase your dream car.',
//     title: 'Auto Loan',
//     ctaText: 'See More',
//     content: () => {
//       return (
//         <div>
//           <p>
//             I am looking for an auto loan to purchase a new or used vehicle. I
//             need a loan with competitive interest rates, flexible terms, and a
//             straightforward application process to get me on the road quickly
//             and easily.
//           </p>
//           <ul className="mt-4">
//             <li>
//               <strong>Loan Amount:</strong> Up to $40,000
//             </li>
//             <li>
//               <strong>Loan Purpose:</strong> Vehicle purchase
//             </li>
//             <li>
//               <strong>Loan Category:</strong> Secured
//             </li>
//             <li>
//               <strong>Loan Duration:</strong> 2 to 7 years
//             </li>
//             <li>
//               <strong>Interest Rate:</strong> 3.99% to 7.99% APR
//             </li>
//             <li>
//               <strong>Frequency of Repayment:</strong> Monthly
//             </li>
//           </ul>
//         </div>
//       );
//     },
//   },
// ];
