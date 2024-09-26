'use client';
import React, { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useOutsideClick } from '@/hooks/use-outside-click';
import { Button } from '../ui/button';
import useLoanOffer from '@/hooks/useLoanOffer';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';
import useWallet from '@/hooks/useWallet';
import useLoanRequest from '@/hooks/useLoanRequest';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import dayjs from 'dayjs';
import UserProfileDialog from '../shared/UserProfileDialog';

export function LendersOffer() {
  const { GetLoanOffers } = useLoanOffer();
  const { CreateLoanRequestMutation } = useLoanRequest();
  const createLoanRequest = CreateLoanRequestMutation();
  const { getWalletQuery } = useWallet();
  const [walletId, setWalletId] = useState<string | null>(null);
  const [active, setActive] = useState<any>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 10;
  const [filters, setFilters] = React.useState<{ [key: string]: any }>({});
  const { data, isLoading, error } = GetLoanOffers(
    pageNumber,
    pageSize,
    filters,
  );
  const [openUserProfile, setOpenUserProfile] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();
  const router = useRouter();

  const lendersOffers =
    data?.result?.items?.filter(
      (offer: { type: string }) => offer.type === 'lender',
    ) || [];

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

  useEffect(() => {
    if (getWalletQuery.isSuccess && getWalletQuery.data) {
      const { result } = getWalletQuery.data;
      if (result.length > 0) {
        const firstWallet = result[0];
        setWalletId(firstWallet.id);
      }
    }
  }, [getWalletQuery.isSuccess, getWalletQuery.data]);

  const isLoading1 = createLoanRequest.isPending;

  //handle applying for a loan
  const handleApply = (offer: any) => {
    if (!walletId) {
      toast.error('No wallet found');
      return;
    }
    const loanRequest = {
      loanOfferId: offer.id, //lender's loan offer ID
      walletId, //borrower's wallet ID
      additionalInformation: offer.additionalInformation || '', //additional info from the lender's offer
    };
    createLoanRequest.mutateAsync(loanRequest);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center">
        <Image src={'/Loading.gif'} alt="loading" width={100} height={10} />
        <h1 className="font-bold text-sm">Loading offers...</h1>
      </div>
    );
  }

  if (!data || lendersOffers.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center">
        <Image
          src={'/Withdrawal Receipt.gif'}
          alt="no offer"
          width={100}
          height={10}
        />
        <h1 className="font-bold text-sm">
          No offers available at the moment.
        </h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center">
        <Image src={'/failed.gif'} alt="loading" width={100} height={10} />
        <h1 className="font-bold text-sm">
          Failed to get offers, try again later...
        </h1>
      </div>
    );
  }

  const handleNextPage = () => {
    if (pageNumber * pageSize < data?.result.totalItems!) {
      setPageNumber((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber((prev) => prev - 1);
    }
  };

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
              className="w-full max-w-[500px] h-1/2 md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <div className="overflow-y-auto max-h-[70vh] p-4">
                <div className="flex justify-between items-start">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.id}-${id}`}
                      className="font-bold text-neutral-700 dark:text-neutral-200"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.id}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400 font-bold text-sm"
                    >
                      Loan Amount: {active.amount}
                    </motion.p>
                  </div>

                  <motion.a
                    layoutId={`button-${active.id}-${id}`}
                    href={''}
                    target="_blank"
                    className="px-4 py-3 text-sm rounded-full font-bold text-white"
                  ></motion.a>
                </div>
                <div className="pt-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base pb-10 flex flex-col items-start gap-4 dark:text-neutral-400"
                  >
                    <div className="flex gap-24 text-xs">
                      <div>
                        <p>
                          Interest Rate:
                          <span className="font-bold ml-2">
                            {active.interestRate}
                          </span>
                          %
                        </p>
                        <p>
                          Loan Duration:
                          <span className="font-bold ml-2">
                            {active.loanDurationDays} days
                          </span>
                        </p>
                        <p>
                          Repayment Frequency:
                          <span className="font-bold ml-2">
                            {active.repaymentFrequency}
                          </span>
                        </p>
                        <p>
                          Grace Period:
                          <span className="font-bold ml-2">
                            {active.gracePeriodDays} days
                          </span>
                        </p>
                        <p>
                          Accruing Interest Rate:
                          <span className="font-bold ml-2">
                            {active.accruingInterestRate} %
                          </span>
                        </p>
                        <p>
                          Date created:
                          <span className="font-bold ml-2">
                            {dayjs(active.createdAt).format('MMMM D, YYYY')}
                          </span>
                        </p>
                        <h1 className="mt-1">
                          Offer status:
                          <Button
                            className={
                              active.active
                                ? 'ml-2 bg-green-400 hover:bg-green-500 text-xs w-12 h-5'
                                : 'ml-2 bg-red-400 hover:bg-red-500 text-xs w-12'
                            }
                          >
                            {active.active ? 'ACTIVE' : 'INACTIVE'}
                          </Button>
                        </h1>
                      </div>
                      <div
                        className="text-xs"
                        onClick={() => setOpenUserProfile(true)}
                        style={{ cursor: 'pointer' }}
                      >
                        <Avatar className="w-6 h-6">
                          <AvatarImage src="https://github.com/shadcn.png" />
                          <AvatarFallback>
                            {active?.user?.firstName[0]}
                            {active?.user?.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        {active.user.firstName} {active.user.lastName}
                      </div>
                    </div>
                    <p className="font-medium mt-3 text-xs">
                      {active.additionalInformation}
                    </p>
                    <Button
                      disabled={isLoading1}
                      onClick={() => handleApply(active)}
                      className="bg-blue-400 hover:bg-blue-400 text-sm w-[100px] h-[35px]"
                    >
                      {isLoading1 ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        'Apply Here'
                      )}
                    </Button>
                    <UserProfileDialog
                      open={openUserProfile}
                      setOpen={setOpenUserProfile}
                      userId={active.user.id}
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      {/* <div className="mb-4">
        <AutocompleteHint filters={filters} setFilters={setFilters} />
      </div> */}

      <ul className="max-w-full mx-auto w-full gap-4">
        {lendersOffers?.map((offer: any) => (
          <motion.div
            layoutId={`card-${offer.id}-${id}`}
            key={offer.id}
            onClick={() => setActive(offer)}
            className="shadow-lg bg-blue-50 border mt-6 p-4 flex flex-col md:flex-row justify-between items-center hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
          >
            <div className="flex gap-4 flex-col md:flex-row">
              <div className="">
                <motion.h3
                  layoutId={`title-${offer.id}-${id}`}
                  className="text-neutral-800 dark:text-neutral-200 text-center md:text-left font-bold text-xs"
                >
                  {offer.user.firstName} {offer.user.lastName}
                </motion.h3>
                <motion.p
                  layoutId={`description-${offer.id}-${id}`}
                  className="text-neutral-600 dark:text-neutral-400 text-center md:text-left text-xs"
                >
                  Loan Amount: {offer.amount}
                </motion.p>
              </div>
            </div>
            <motion.button
              layoutId={`button-${offer.id}-${id}`}
              className="px-2 py-2 rounded-full bg-gray-100 hover:bg-blue-400 hover:text-white text-black mt-4 md:mt-0 text-xs"
            >
              See More
            </motion.button>
          </motion.div>
        ))}
      </ul>
      <div className="flex justify-between mt-4 text-xs">
        <Button
          className="text-xs w-14 h-7 bg-blue-500"
          onClick={handlePreviousPage}
          disabled={pageNumber === 1}
        >
          Previous
        </Button>
        <Button
          className="text-xs w-14 h-7 bg-blue-500"
          onClick={handleNextPage}
          disabled={pageNumber * pageSize >= data?.result.totalItems!}
        >
          Next
        </Button>
      </div>
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
