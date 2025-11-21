// Path of uploaded original file: /mnt/data/CreateStore.tsx
"use client";

import { FileUpload } from "@/components/ui/file-upload";
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { indianStatesAndUTs } from "@/data/indian_states";
import { country } from "@/data/country";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

/**
 * Schema (same as before)
 */
const createStoreSchema = z.object({
  name: z.string().min(2, "Store name is required"),
  description: z.string().optional(),
  imageUrl: z.string().optional(), // will be filled by backend file upload if needed

  addressline1: z.string().min(3, "Address line 1 is required"),
  addressline2: z.string().optional(),
  city: z.string().min(2, "City is required"),
  pincode: z.string().min(3).max(12),
  state: z.string().min(2),
  country: z.string().min(2),
});

export type CreateStoreInput = z.infer<typeof createStoreSchema>;

export default function CreateStoreDialog() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const form = useForm<CreateStoreInput>({
    resolver: zodResolver(createStoreSchema),
    defaultValues: {
      name: "",
      description: "",
      imageUrl: "",
      addressline1: "",
      addressline2: "",
      city: "",
      pincode: "",
      state: "select",
      country: "select",
    },
  });

  /**
   * Handle File Upload (store locally before final form submission)
   */
  const handleFileUpload = (fileList: File[]) => {
    setFiles(fileList);
    console.log("Selected store image:", fileList);
  };

  /**
   * SUBMIT: Send EVERYTHING in a single FormData (same as VideoSecondary.tsx)
   */
  const onSubmit = async (values: CreateStoreInput) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();

      // Append text fields
      formData.append("name", values.name);
      formData.append("description", values.description || "");
      formData.append("addressline1", values.addressline1);
      formData.append("addressline2", values.addressline2 || "");
      formData.append("city", values.city);
      formData.append("pincode", values.pincode);
      formData.append("state", values.state);
      formData.append("country", values.country);

      // Append file
      if (files.length > 0) {
        formData.append("storeImage", files[0]); 
      }

      // Send to backend
      const response = await axios.post("/api/store/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      toast.success("Store created successfully!", {
        description: response.data.message,
      });

      router.refresh();
      router.push("/dashboard");
    } catch (error) {
      const err = error as AxiosError;
      toast.error("Store creation failed", {
        description:
          (err.response?.data as any)?.message || err.message || "Error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitFromAction = () => form.handleSubmit(onSubmit)();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="default">➕ Create New Store</Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="max-w-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Create New Store</AlertDialogTitle>
          <AlertDialogDescription>
            Fill out store details and upload a store image.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* FORM */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 max-h-[60vh] overflow-y-auto pr-2"
          >
            {/* STORE INFO */}
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Store Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Bakery Delight" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Short description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* File Upload */}
              <FormItem>
                <FormLabel>Store Image</FormLabel>
                <div className="w-full border rounded-lg p-3">
                  <FileUpload onChange={handleFileUpload} />
                </div>
              </FormItem>
            </div>

            {/* ADDRESS BLOCK */}
            <div className="space-y-2">
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
                      <Input placeholder="Landmark / Area (optional)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-3 gap-3">
                <FormField
                  control={form.control}
                  name="pincode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pincode</FormLabel>
                      <FormControl>
                        <Input placeholder="560001" {...field} />
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

                <div />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Select
                          defaultValue={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="select">Select</SelectItem>
                            {indianStatesAndUTs.map((st) => (
                              <SelectItem key={st} value={st}>
                                {st}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Select
                          defaultValue={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="select">Select</SelectItem>
                            {country.map((c) => (
                              <SelectItem key={c} value={c}>
                                {c}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Hidden submit */}
            <button type="submit" className="hidden" />
          </form>
        </Form>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleSubmitFromAction}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create Store"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
