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
import LoginForm from "../auth/login-form";

export default function SignInDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Sign In</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <Header header="Sign in" label="Welcome back" />
        </DialogHeader>
        <LoginForm />
        <DialogFooter>
          <Social />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
