"use client";

import { useEditorStore } from "@/lib/store/store";

export const IOPanel = () => {
  const { showIo, toggleShowIo, output, setInput, executing } =
    useEditorStore();

  return (
    <div
      className={`relative flex w-full overflow-hidden border-white/10 transition-[height] duration-200 ease-in-out ${
        showIo ? "h-72 border-t" : "h-0 border-t-0"
      }`}
    >
      <button
        className="absolute right-4 top-2 z-10 h-8 w-8 rounded-full text-white/60 hover:bg-white/10 hover:text-white"
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
