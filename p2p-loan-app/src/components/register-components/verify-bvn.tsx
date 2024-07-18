"use client";

import React, { useContext, useState } from "react";
import { FormContext } from "@/context/FormContext";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";

const bvnSchema = z.object({
  bvn: z
    .string()
    .length(11, { message: "Your BVN should be exactly 11 digits" })
    .regex(/^\d+$/, { message: "Your BVN should only contain digits" }),
});

type BvnFormValues = z.infer<typeof bvnSchema>;

const VerifyBVN: React.FC = () => {
  const { formData, nextStep, prevStep, updateFormData } =
    useContext(FormContext);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<BvnFormValues>({
    resolver: zodResolver(bvnSchema),
    defaultValues: {
      bvn: formData.bvnVerification?.bvn || "",
    },
  });

  const onSubmit: SubmitHandler<BvnFormValues> = async (data) => {
    setIsLoading(true);
    updateFormData({ bvnVerification: { bvn: data.bvn } });
    nextStep();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="py-2">
          <FormField
            control={form.control}
            name="bvn"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Input
                      type="text"
                      disabled={isLoading}
                      placeholder="Enter your BVN"
                      {...field}
                      className="pl-14 py-7 rounded-xl"
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
};

export default VerifyBVN;
