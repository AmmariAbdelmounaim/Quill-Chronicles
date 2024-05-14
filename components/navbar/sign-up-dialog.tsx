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

export default function SignUpDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Sign Up</Button>
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
