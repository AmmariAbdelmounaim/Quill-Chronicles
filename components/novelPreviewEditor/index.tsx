"use client";

import { EditorContent, EditorRoot, JSONContent } from "novel";
import { ImageResizer } from "novel/extensions";
import { defaultExtensions } from "../novelEditor/extensions";

interface NovelPreviewEditorProps {
  content: JSONContent;
}

export default function NovelPreviewEditor({
  content,
}: NovelPreviewEditorProps) {
  const extensions = [...defaultExtensions];

  return (
    <div className="relative w-full max-w-screen-lg ">
      {content && (
        <EditorRoot>
          <EditorContent
            initialContent={content}
            className="relative min-h-[500px] w-full max-w-screen-lg  bg-background sm:mb-3 sm:rounded-lg  "
            extensions={extensions}
            slotAfter={<ImageResizer />}
            editorProps={{
              attributes: {
                class: `prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full`,
              },
            }}
            editable={false}
          ></EditorContent>
        </EditorRoot>
      )}
    </div>
  );
}
