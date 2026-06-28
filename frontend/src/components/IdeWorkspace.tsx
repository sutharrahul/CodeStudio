"use client";

import { CodeEditor } from "@/components/CodeEditor";
import { IOPanel } from "@/components/IOPanel";
import { NotificationBar } from "@/components/NotificationBar";
import { Toolbar } from "@/components/Toolbar";

type Props = {
  codeId?: string;
};

export const IdeWorkspace = ({ codeId }: Props) => {
  return (
    <div className="flex h-screen w-full flex-col bg-neutral-900">
      <NotificationBar />
      <Toolbar />
      <main className="min-h-0 flex-1">
        <CodeEditor codeId={codeId} />
      </main>
      <IOPanel />
    </div>
  );
};
