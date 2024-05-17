"use client"

import { ReactNode } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"

import Header from "../auth/header"
import RegisterForm from "../auth/register-form"
import Social from "../auth/social"

interface SignUpDialogProps {
  children?: ReactNode
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
  )
}
