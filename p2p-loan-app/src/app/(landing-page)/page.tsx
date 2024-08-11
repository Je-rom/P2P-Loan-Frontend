import WordRotate from "@/components/magicui/word-rotate";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import Image from "next/image"
import React from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

const LandingPage=()=>{
    return (
      <>
          <div className="flex flex-col items-center justify-center bg-gray-50 p-4">
              <div className="text-center mt-14">
                  <h1 className="text-4xl font-semibold md:text-5xl sm:text-2xl">Welcome to BorrowPointe</h1>
                  <WordRotate
                    className="text-2xl text-gray-600 dark:text-white md:text-xl sm:text-lg"
                    words={['Connecting lenders and borrowers directly', 'Flexible terms tailored to your needs', 'Your trust, our priority']}
                  />
              </div>
              <div className="w-full px-8">
                  <HoverEffect items={loanInfo} />
              </div>
          </div>
          {/*<div className="mt-8 flex flex-col md:flex-row justify-center items-center gap-6 md:gap-10 p-4 md:p-10">*/}
          {/*    <Image className="rounded-lg w-full md:w-auto" src={"/about-us1.jpg"} alt="about us" width={500}*/}
          {/*           height={400}/>*/}
          {/*    <div className="text-center md:text-left mt-6 md:mt-0">*/}
          {/*        <h1 className="font-bold text-xl md:text-2xl">About Us</h1>*/}
          {/*        <p className="mt-4 md:mt-10 text-sm md:text-base">*/}
          {/*            At Borrow Pointe, we empower individuals with quick and accessible micro-loans to meet their*/}
          {/*            immediate financial needs. Our platform connects borrowers and lenders directly, making the loan*/}
          {/*            process simple, transparent, and secure. Join us to experience a new way of borrowing and*/}
          {/*            lending that puts people first.*/}
          {/*        </p>*/}
          {/*    </div>*/}
          {/*</div>*/}
          <div
            className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-12 p-4 sm:p-6 md:p-10">
              <Image className="rounded-lg w-full sm:w-1/2 md:w-auto" src={'/about-us1.jpg'} alt="about us"
                     width={500} height={400} />
              <div className="text-center sm:text-left mt-6 sm:mt-0 max-w-md">
                  <h1 className="font-bold text-xl sm:text-2xl">About Us</h1>
                  <p className="mt-4 sm:mt-6 text-sm sm:text-base">
                      At Borrow Pointe, we empower individuals with quick and accessible micro-loans to meet their
                      immediate financial needs. Our platform connects borrowers and lenders directly, making the loan
                      process simple, transparent, and secure. Join us to experience a new way of borrowing and
                      lending that puts people first.
                  </p>
              </div>
          </div>
          <div
            className="h-[40rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
              <InfiniteMovingCards
                items={testimonials}
                direction="right"
                speed="slow"
              />
          </div>
      </>
    )
}

const testimonials = [
    {
        quote:
          "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.",
        name: "Charles Dickens",
        title: "A Tale of Two Cities",
    },
    {
        quote:
          "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
        name: "William Shakespeare",
        title: "Hamlet",
    },
    {
        quote: "All that we see or seem is but a dream within a dream.",
        name: "Edgar Allan Poe",
        title: "A Dream Within a Dream",
    },
    {
        quote:
          "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
        name: "Jane Austen",
        title: "Pride and Prejudice",
    },
    {
        quote:
          "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
        name: "Herman Melville",
        title: "Moby-Dick",
    },
];

const loanInfo = [
    {
        title: 'Personal Loans',
        description:
          'Flexible loans designed to help you achieve your personal goals, from home improvements to unexpected expenses.',
        image: '/personal-loan.png',
        backgroundColor: '#e3e6e8',
        imageHeight: "190px",
    },
    {
        title: "Student Loans",
        description:
            "Support for your educational journey with tailored loan options that help manage tuition fees and other expenses.",
        image: "/school-loan.png",
        backgroundColor: "#f0f0f0",
        imageHeight: "190px",
    },
    {
        title: "Business Loans",
        description:
            "Funding solutions to help you start or grow your business, with flexible terms and competitive rates, to get your business running",
        image: "/business-loan.png",
        backgroundColor: "#e1e8f5",
        imageHeight: "190px",
    },
    {
        title: "Peer-to-Peer Lending",
        description:
            "Direct lending between individuals, offering competitive rates and personalized terms without traditional bank intermediaries.",
        image: "/p2p-loan.png",
        backgroundColor: "#f5e1e4",
        imageHeight: "190px",
    },
];

export default LandingPage