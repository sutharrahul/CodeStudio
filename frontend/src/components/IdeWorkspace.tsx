"use client";

import { Allotment } from "allotment";
import "allotment/dist/style.css";

import { CodeEditor } from "@/components/CodeEditor";
import { IOPanel } from "@/components/IOPanel";
import { NotificationBar } from "@/components/NotificationBar";
import { Toolbar } from "@/components/Toolbar";
import { useEditorStore } from "@/lib/store/store";

type Props = {
  codeId?: string;
};

export const IdeWorkspace = ({ codeId }: Props) => {
  const { showIo } = useEditorStore();

  return (
    <div className="flex h-screen w-full flex-col bg-neutral-900">
      <NotificationBar />
      <Toolbar />
      <main className="min-h-0 flex-1">
        <Allotment>
          <Allotment.Pane>
            <CodeEditor codeId={codeId} />
          </Allotment.Pane>
          <Allotment.Pane visible={showIo} preferredSize={380} minSize={280}>
            <IOPanel />
          </Allotment.Pane>
        </Allotment>
      </main>
    </div>
  );
};
