"use client";

import { useEditorStore } from "@/lib/store/store";

export const IOPanel = () => {
  const { showIo, toggleShowIo, output, setInput, executing } =
    useEditorStore();

  if (!showIo) return null;

  return (
    <div className="flex h-72 w-full border-t border-white/10">
      <button
        className="absolute right-4 z-10 mt-2 h-8 w-8 -translate-y-full rounded-full text-white/60 hover:bg-white/10 hover:text-white"
        onClick={toggleShowIo}
      >
        ╳
      </button>
      <div className="flex w-1/2 flex-col border-r border-white/10">
        <span className="border-b border-white/10 px-3 py-1 text-xs uppercase tracking-wide text-white/40">
          Input
        </span>
        <textarea
          className="h-full w-full resize-none bg-neutral-900 p-3 text-sm text-white/80 outline-none"
          onChange={(event) => setInput(event.target.value)}
        />
      </div>
      <div className="flex w-1/2 flex-col">
        <span className="border-b border-white/10 px-3 py-1 text-xs uppercase tracking-wide text-white/40">
          {executing ? "Running..." : "Output"}
        </span>
        <textarea
          className="h-full w-full resize-none bg-neutral-900 p-3 text-sm text-white/80 outline-none"
          disabled
          value={output}
        />
      </div>
    </div>
  );
};
