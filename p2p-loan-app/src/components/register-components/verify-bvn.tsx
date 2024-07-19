"use client";
import React from "react";
import { useFormStore } from "@/context/FormContext";
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const BVNVerification: React.FC = () => {
  const { formData, nextStep, prevStep, updateFormData } = useFormStore();

  const bvnSchema = z.object({
    bvn: z.string().length(11, {
      message: "BVN must be 11 digits",
    }),
  });

  type BVNFormValues = z.infer<typeof bvnSchema>;

  const form = useForm<BVNFormValues>({
    resolver: zodResolver(bvnSchema),
    defaultValues: {
      bvn: formData.bvnVerification.bvn,
    },
  });

  const onSubmit = (data: BVNFormValues) => {
    updateFormData({ bvnVerification: data });
    nextStep();
  };

  return (
    <div className="md:px-28 py-7">
      <Button type="button" onClick={prevStep}>
        Back
      </Button>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="py-2">
            <FormField
              control={form.control}
              name="bvn"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your BVN"
                      {...field}
                      className="pl-14 py-7 rounded-xl"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="py-2">
            <Button type="submit">Next</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default BVNVerification;
