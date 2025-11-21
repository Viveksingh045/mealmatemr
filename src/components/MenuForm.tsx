"use client";

import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { FileUpload } from "@/components/ui/file-upload";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

/**
 * Validation schema (zod)
 */
const menuItemSchema = z.object({
  name: z.string().min(2, "Name is required"),
  description: z.string().optional(),
  price: z
    .number({ error: "Price must be a number" })
    .nonnegative("Price must be >= 0"),
  imageUrl: z.string().optional(),
  available: z.boolean().optional(),
});

export type MenuFormValues = z.infer<typeof menuItemSchema>;

/**
 * Props
 * - initial: optional initial values for edit
 * - onSubmit: gets called with the form values AND selected image file (if any)
 */
export default function MenuForm({
  initial,
  onSubmit,
}: {
  initial?: Partial<MenuFormValues> | null;
  onSubmit: (data: MenuFormValues & { imageFile?: File | null }) => void | Promise<void>;
}) {
  const [files, setFiles] = useState<File[]>([]);

  const form = useForm<MenuFormValues>({
    resolver: zodResolver(menuItemSchema),
    mode: "onSubmit",
    defaultValues: {
      name: initial?.name ?? "",
      description: initial?.description ?? "",
      price: initial?.price ?? 0,
      imageUrl: initial?.imageUrl ?? "",
      available: initial?.available ?? true,
    },
  });

  const handleFileChange = (fileList: File[]) => {
    setFiles(fileList);
  };

  const handleSubmit = form.handleSubmit(async (values) => {
    // if a file selected, include it in the payload as imageFile
    const payload = { ...values, imageFile: files?.[0] ?? null };
    await onSubmit(payload);
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
        {/* NAME */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Veg Biryani" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* DESCRIPTION */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Short description of the dish" rows={3} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* PRICE */}
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price (INR)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  {...{
                    ...field,
                    // react-hook-form provides value as number because of zod schema type,
                    // but Input expects string/number so it's okay.
                    value: field.value as unknown as number,
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                      field.onChange(e.target.value === "" ? "" : Number(e.target.value)),
                  }}
                  placeholder="199"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* IMAGE UPLOAD */}
        <FormItem>
          <FormLabel>Image</FormLabel>
          <div className="w-full border rounded-lg p-3">
            <FileUpload onChange={handleFileChange} />
            {/* show existing imageUrl if provided */}
            {form.getValues("imageUrl") ? (
              <div className="mt-2 text-sm text-muted-foreground">Existing image URL will be used unless you upload a new file.</div>
            ) : null}
          </div>
        </FormItem>

        {/* IMAGE URL (optional) */}
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL (optional)</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/dish.jpg" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* AVAILABLE */}
        <FormField
          control={form.control}
          name="available"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Available</FormLabel>
              <FormControl>
                <label className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={Boolean(field.value)}
                    onChange={(e) => field.onChange(Boolean(e.target.checked))}
                  />
                  <span className="small">{field.value ? "Yes" : "No"}</span>
                </label>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Actions */}
        <div className="flex items-center gap-2 justify-end">
          <Button type="submit" className="px-4" >
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
}
