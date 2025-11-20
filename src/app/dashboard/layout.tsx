"use client"
import { SidebarProvider} from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Toaster } from "@/components/ui/sonner"
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
} from "@/components/ui/alert-dialog"
import { LogOut } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import axios from '@/lib/axios';
import { toast } from "sonner";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isSubmiting,setIsSubmitting] = useState(false);
  const router = useRouter();
  const logoutFn = async () => {
    setIsSubmitting(true);
    try {
      const response = await axios.post("/api/users/logout") ///api/v1/users/register
      toast.success("You are Successfully Logged OUT",{
        description: response.data.message
      })
      router.replace("/login");
      setIsSubmitting(false)
    } catch (error) {
      console.error("Error In Logut",error)
      const axiosError = error as AxiosError;
      const errorMessage = (axiosError.response?.data as {message : string})?.message ?? "Logging out Failed";
      toast.error("Logging Out Failed",{
        description: errorMessage,
      });
      setIsSubmitting(false);
    }
  }
  return (
    <>
    <SidebarProvider className="top-0">
      <AppSidebar/>
      <main>
        <div id='logoutbutton' className="top-0 fixed right-0 p-3">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="default"><LogOut />Logout</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will log you out from your session.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={logoutFn} disabled={isSubmiting}>
                {isSubmiting ? "Logging out..." : "Logout"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

      </div>
        <div id="bodyDashboards" className="mt-6">
        {children}
        </div>
        <Toaster richColors/>
      </main>
    </SidebarProvider>
    </>
  )
}