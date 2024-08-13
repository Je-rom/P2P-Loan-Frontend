import React from "react";
import { useFormStore } from "@/context/FormContext";

const steps = [
  { number: 1, label: 'Basic Info' },
  { number: 2, label: 'Verify BVN' },
  { number: 3, label: 'Verify Email ' },
  { number: 4, label: 'Wallet' },
];

const StepIndicator: React.FC = () => {
  const { step } = useFormStore();

  return (
    <div className="flex items-center justify-between w-full mb-8 text-xs">
      {steps.map((s, index) => (
        <React.Fragment key={s.number}>
          <div className="flex flex-col items-center text-xs md:text-xs">
            <div
              className={`flex items-center justify-center w-4 h-4 text-xs rounded-full ${
                step >= s.number
                  ? "bg-black text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
            >
              {s.number}
            </div>
            <div
              className={`mt-2 text-xs md:text-base ${
                step >= s.number ? "text-black" : "text-gray-700"
              }`}
            >
              {s.label}
            </div>
          </div>
          {index < steps.length - 1 && (
            <div className="flex-1 h-px mx-1 bg-gray-300"></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StepIndicator;
