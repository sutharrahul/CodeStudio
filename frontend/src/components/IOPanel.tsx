"use client";

import { Allotment } from "allotment";
import { ChevronRight } from "lucide-react";

import { useEditorStore } from "@/lib/store/store";

export const IOPanel = () => {
  const { toggleShowIo, output, setInput, executing } = useEditorStore();

  return (
    <div className="relative flex h-full w-full flex-col border-l border-white/10">
      <button
        className="absolute right-3 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full text-white/60 hover:bg-white/10 hover:text-white"
        onClick={toggleShowIo}
      >
        <ChevronRight size={18} />
      </button>
      <Allotment vertical>
        <Allotment.Pane>
          <div className="flex h-full w-full flex-col">
            <span className="border-b border-white/10 px-3 py-1 text-xs uppercase tracking-wide text-white/40">
              Input
            </span>
            <textarea
              className="h-full w-full resize-none bg-neutral-900 p-3 text-sm text-white/80 outline-none"
              onChange={(event) => setInput(event.target.value)}
            />
          </div>
        </Allotment.Pane>
        <Allotment.Pane>
          <div className="flex h-full w-full flex-col">
            <span className="border-b border-white/10 px-3 py-1 text-xs uppercase tracking-wide text-white/40">
              {executing ? "Running..." : "Output"}
            </span>
            <textarea
              className="h-full w-full resize-none bg-neutral-900 p-3 text-sm text-white/80 outline-none"
              disabled
              value={output}
            />
          </div>
        </Allotment.Pane>
      </Allotment>
    </div>
  );
};
