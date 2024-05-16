"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import Header from "../auth/header";
import Social from "../auth/social";
import RegisterForm from "../auth/register-form";
import { ReactNode } from "react";

interface SignUpDialogProps {
  children?: ReactNode;
}

export default function SignUpDialog({ children }: SignUpDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children || <Button variant="default">Sign Up</Button>}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <Header header="Sign Up" label="Create an account" />
        </DialogHeader>
        <RegisterForm />
        <DialogFooter>
          <Social />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
