import React, { Fragment, useEffect, type ReactNode } from "react"
import { EditorBubble, useEditor } from "novel"

import { AISelector } from "./ai-selector"

import "novel/plugins"

import { removeAIHighlight } from "novel/extensions"

import { Button } from "@/components/ui/button"
import Magic from "@/components/ui/icons/magic"

interface GenerativeMenuSwitchProps {
  children: ReactNode
  open: boolean
  onOpenChange: (open: boolean) => void
}
const GenerativeMenuSwitch = ({
  children,
  open,
  onOpenChange,
}: GenerativeMenuSwitchProps) => {
  const { editor } = useEditor()

  useEffect(() => {
    if (!open) removeAIHighlight(editor!)
  }, [open])
  return (
    <EditorBubble
      tippyOptions={{
        placement: open ? "bottom-start" : "top",
        onHidden: () => {
          onOpenChange(false)
          editor!.chain().unsetHighlight().run()
        },
      }}
      className="flex w-fit max-w-[90vw] overflow-hidden rounded-md border border-muted bg-background shadow-xl"
    >
      {/* {open && <AISelector open={open} onOpenChange={onOpenChange} />} */}
      {!open && (
        <Fragment>
          <Button
            className="gap-1 rounded-none text-gray-500"
            variant="ghost"
            onClick={() => onOpenChange(true)}
            size="sm"
            disabled
          >
            <Magic className="h-5 w-5" />
            Ask AI
          </Button>
          {children}
        </Fragment>
      )}
    </EditorBubble>
  )
}

export default GenerativeMenuSwitch
