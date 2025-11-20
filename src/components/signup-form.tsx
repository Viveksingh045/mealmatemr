"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter} from 'next/navigation';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { SignUpInput, signUpSchema } from "@/schema/signupSchema"
import { indianStatesAndUTs } from "@/data/indian_states"
import { country } from "@/data/country"
import axios, { AxiosError } from "axios"
import { toast } from "sonner"

export function SignupForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      cnfpassword: "",
      role: "MERCHANT",
      addressline1: "",
      addressline2: "",
      pincode: "000000",
      city: "",
      state: "select",
      country: "select",
    },
  })

const onSubmit = async (data: SignUpInput) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post("/api/user/register",data, { withCredentials: true }) ///api/v1/users/register
      toast.success("You are Successfully Registered",{
        description: response.data.message
      })
      router.replace("/merchant/register/verification");
      setIsSubmitting(false)
    } catch (error) {
      console.error("error in signup",error);
      const axiosError = error as AxiosError;
      console.log("JI : ",axiosError);
      const errorMessage = (axiosError as {message : string})?.message  ?? "Error in Sign up";
      toast.error("Registeration Failed",{
        description: errorMessage,
      });
      setIsSubmitting(false);
    console.log("Final Signup Data:", data)
  }
};

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="w-full text-center space-y-0">
  <h1 className="text-2xl font-bold leading-tight">
    Create the restaurant account
  </h1>
  <p className="text-muted-foreground text-sm">
    Fill in the form below to create your restaurant account
  </p>
</div>

        {/* STEP 1 — NON ADDRESS INFO */}
        {step === 1 && (
          <>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Restaurant Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Bakery Delight" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Email</FormLabel>
                  <FormControl>
                    <Input placeholder="mail@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cnfpassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="button"
              onClick={() => setStep(2)}
              className="w-full mt-4"
            >
              Next
            </Button>
          </>
        )}

        {/* STEP 2 — ADDRESS INFO */}
        {step === 2 && (
          <>
          <div className="w-full text-center space-y-0">
  <h2 className="text-lg font-semibold leading-tight">
    Restaurant Address Information
  </h2>
</div>

            <FormField
              control={form.control}
              name="addressline1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address Line 1</FormLabel>
                  <FormControl>
                    <Input placeholder="Street / Locality" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="addressline2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address Line 2</FormLabel>
                  <FormControl>
                    <Input placeholder="Landmark / Area" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="City" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pincode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pincode</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="282002" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* STATE SELECT */}
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select State" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="select">Select</SelectItem>
                      {indianStatesAndUTs.map((st) => (
                        <SelectItem key={st} value={st}>
                          {st}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* COUNTRY SELECT */}
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger  className="w-full">
                        <SelectValue placeholder="Select Country" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="select">Select</SelectItem>
                      {country.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
        <div className="grid grid-cols-3 gap-3 mt-4">
          <Button type="button" onClick={() => setStep(1)} variant="outline" className="col-span-1">
            Back
          </Button>

          <Button type="submit" className="col-span-2">
            Create Your Account
          </Button>
        </div>
          </>
        )}
      </form>
    </Form>
  )
}
