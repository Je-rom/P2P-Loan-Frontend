'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import useLoanRequest from '@/hooks/useLoanRequest';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import AcceptRequestPinDialog from '@/components/shared/acceptPinDialog';

interface LenderOfferCardProps {
  lenderName: string;
  loanAmount: number;
  repaymentOptions: string;
  interestRate: number;
  showButtons: boolean;
  status: string;
  gracePeriod: number;
  loanDuration: number;
  accruingInterestRate: number;
  loanRequestId: string;
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return 'text-yellow-400';
    case 'processing':
      return 'text-amber-500';
    case 'approved':
      return 'text-green-500';
    case 'declined':
      return 'text-red-500';
    case 'failed':
      return 'text-red-800';
    default:
      return 'text-gray-500';
  }
};

const LenderOfferCard: React.FC<LenderOfferCardProps> = ({
  lenderName,
  loanAmount,
  repaymentOptions,
  interestRate,
  showButtons,
  status,
  gracePeriod,
  loanDuration,
  accruingInterestRate,
  loanRequestId,
}) => {
  const { AcceptLoanRequestMutation, DeclineLoanRequestMutation } =
    useLoanRequest();
  const acceptRequest = AcceptLoanRequestMutation();
  const declineRequest = DeclineLoanRequestMutation();

  const [decisionMade, setDecisionMade] = useState<boolean>(false);
  const [pin, setPin] = useState<string>('');
  const [pinDialogOpen, setPinDialogOpen] = useState(false);

  const handleAccept = () => {
    setPinDialogOpen(true);
  };

  const handlePinSubmit = (enteredPin: string) => {
    setPin(enteredPin);
    acceptRequest.mutateAsync({
      loanRequestId,
      pin: { PIN: enteredPin },
    });
  };

  const handleDecline = () => {
    declineRequest.mutateAsync(loanRequestId, {
      onSuccess: () => {
        setDecisionMade(true);
      },
      onError: () => {
        console.error('Failed to decline loan request');
      },
    });
  };
  return (
    <>
      <div className="flex justify-center sm:justify-start mb-4">
        <Card className="w-full max-w-[1250px] shadow-lg bg-gray-100 mx-4 sm:mx-0">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Avatar className="w-6 h-6">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span className="ml-2 text-base">{lenderName}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1 text-xs">
              <p>
                <span className="font-bold">Loan Amount: </span>₦{loanAmount}
              </p>
              <p>
                <span className="font-bold">Interest Rate: </span>
                {interestRate} %
              </p>
              <p>
                <span className="font-bold">Frequency of Repayment: </span>
                {repaymentOptions}
              </p>

              <p>
                <span className="font-bold">Loan Duration: </span>
                {loanDuration} days
              </p>
              <p>
                <span className="font-bold">Accruing Interest Rate: </span>
                {accruingInterestRate} %
              </p>
              <p>
                <span className="font-bold">Grace period: </span>
                {gracePeriod} days
              </p>
              <p className="font-bold">
                <span>Status: </span>
                <span className={getStatusColor(status)}>{status}</span>
              </p>
            </div>
          </CardContent>
          {showButtons &&
            !decisionMade &&
            status.toLowerCase() === 'pending' && (
              <CardFooter className="justify-end gap-8">
                <Button
                  className="w-[60px] h-[30px] bg-green-600 hover:bg-green-700 text-xs"
                  onClick={handleAccept}
                  disabled={acceptRequest.isPending}
                >
                  {acceptRequest.isPending ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    'Accept'
                  )}
                </Button>
                <Button
                  onClick={handleDecline}
                  disabled={declineRequest.isPending}
                  className="w-[60px] h-[30px] bg-red-600 hover:bg-red-700 text-xs"
                >
                  {declineRequest.isPending ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    'Reject'
                  )}
                </Button>
              </CardFooter>
            )}
        </Card>
      </div>
      <AcceptRequestPinDialog
        isOpen={pinDialogOpen}
        onClose={() => setPinDialogOpen(false)}
        onSubmit={handlePinSubmit}
      />
    </>
  );
};

const LoanRequest: React.FC = () => {
  const [view, setView] = useState<'received' | 'sent'>('received');
  const { GetLoanRequest } = useLoanRequest();
  const [pageSize] = useState(2);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const orderBy = 'CreatedAt desc';

  const {
    data: loanRequests,
    error,
    isLoading,
  } = GetLoanRequest(view, pageNumber, pageSize, totalItems, orderBy);

  useEffect(() => {
    if (loanRequests?.result) {
      setTotalItems(loanRequests.result.totalItems);
    }
  }, [loanRequests]);

  const handlePageChange = (newPage: number) => {
    setPageNumber(newPage);
  };

  const totalPages = Math.ceil(totalItems / pageSize);

  if (error) {
    return <div className="text-sm">Error loading loan requests.</div>;
  }

  return (
    <>
      <h1 className="font-bold text-base">Your Loan Requests</h1>
      <div className="flex justify-between items-center mb-3 mt-5">
        <div className="flex space-x-4">
          <h1
            className={`text-xs cursor-pointer ${view === 'received' ? 'text-blue-500' : ''}`}
            onClick={() => setView('received')}
          >
            Received
          </h1>
          <h1
            className={`text-xs cursor-pointer ${view === 'sent' ? 'text-blue-500' : ''}`}
            onClick={() => setView('sent')}
          >
            Sent
          </h1>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col justify-center items-center my-8">
          <Loader2 className="animate-spin text-blue-500" size={48} />
          <p className="text-sm font-semibold">Loading loan requests...</p>
        </div>
      ) : (
        <>
          {view === 'received' && !loanRequests?.result.items.length && (
            <div className="flex flex-col items-center text-center space-y-4">
              <Image
                src={'/no-request.jpg'}
                alt="No loan requests received"
                width={200}
                height={300}
              />
              <p className="text-sm font-semibold text-gray-700">
                You haven't received any loan requests yet
              </p>
              <p className="text-sm text-gray-500">It's coming 😊.</p>
            </div>
          )}

          {view === 'sent' && !loanRequests?.result.items.length && (
            <div className="flex flex-col items-center text-center space-y-4">
              <Image
                src={'/not-sent.jpg'}
                alt="No loan requests sent"
                width={200}
                height={300}
              />
              <p className="text-sm font-semibold text-gray-700">
                You haven't sent any loan requests yet
              </p>
            </div>
          )}

          <div className="mt-8 space-y-4">
            {loanRequests?.result.items.map((offer, index) => {
              const displayName =
                view === 'received'
                  ? `${offer.user.firstName} ${offer.user.lastName}`
                  : `${offer.loanOffer.user.firstName} ${offer.loanOffer.user.lastName}`;

              return (
                <LenderOfferCard
                  key={index}
                  lenderName={displayName}
                  loanAmount={offer.loanOffer.amount}
                  repaymentOptions={offer.loanOffer.repaymentFrequency}
                  interestRate={offer.loanOffer.interestRate}
                  showButtons={view === 'received'}
                  loanDuration={offer.loanOffer.loanDurationDays}
                  gracePeriod={offer.loanOffer.gracePeriodDays}
                  accruingInterestRate={offer.loanOffer.accruingInterestRate}
                  status={offer.status}
                  loanRequestId={offer.id}
                />
              );
            })}
          </div>

          <div className="mt-8 flex justify-center">
            <Pagination>
              <PaginationContent>
                {pageNumber > 1 && (
                  <PaginationItem>
                    <PaginationPrevious
                      className="text-xs"
                      onClick={() => handlePageChange(pageNumber - 1)}
                    />
                  </PaginationItem>
                )}
                {(() => {
                  let startPage = Math.max(1, pageNumber - 1);
                  let endPage = Math.min(totalPages, pageNumber + 1);

                  if (pageNumber === 1) {
                    endPage = Math.min(3, totalPages);
                  } else if (pageNumber === totalPages) {
                    startPage = Math.max(totalPages - 2, 1);
                  }
                  const pages = [];
                  for (let i = startPage; i <= endPage; i++) {
                    pages.push(
                      <PaginationItem key={i}>
                        <PaginationLink
                          className="text-xs"
                          isActive={i === pageNumber}
                          onClick={() => handlePageChange(i)}
                        >
                          {i}
                        </PaginationLink>
                      </PaginationItem>,
                    );
                  }
                  return pages;
                })()}
                {pageNumber < totalPages - 2 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}
                {pageNumber + 1 < totalPages && (
                  <PaginationItem>
                    <PaginationLink
                      className="text-xs"
                      isActive={pageNumber === totalPages}
                      onClick={() => handlePageChange(totalPages)}
                    >
                      {totalPages}
                    </PaginationLink>
                  </PaginationItem>
                )}
                {pageNumber < totalPages && (
                  <PaginationItem>
                    <PaginationNext
                      className="text-xs"
                      onClick={() => handlePageChange(pageNumber + 1)}
                    />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          </div>
        </>
      )}
    </>
  );
};

export default LoanRequest;
