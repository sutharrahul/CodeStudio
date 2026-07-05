"use client";

import { useRouter } from "next/navigation";

import { Dropdown } from "@/components/ui/Dropdown";
import { execute } from "@/lib/api/executor";
import { saveCode } from "@/lib/api/saveCode";
import { useEditorStore } from "@/lib/store/store";
import { getTemplate } from "@/lib/editor/constant";
import { languagetoText } from "@/lib/utils/mapper";
import { Languages, Themes } from "@/lib/editor/typings";
import { useHeartBeat } from "@/lib/hooks/useHeartBeat";
import { FetchStatus } from "@/lib/hooks/useSavedCode";

const LANGUAGE_OPTIONS: { label: string; value: Languages }[] = [
  { label: "C++", value: Languages.Cpp },
  { label: "Java", value: Languages.Java },
  { label: "JavaScript", value: Languages.JavaScript },
  { label: "Python", value: Languages.Python },
];

const THEME_OPTIONS: { label: string; value: Themes }[] = [
  { label: "Nord", value: Themes.Nord },
  { label: "Material Dark", value: Themes.MaterialDark },
];

const HEART_BEAT_LABEL: Record<FetchStatus, string> = {
  [FetchStatus.None]: "connecting to server",
  [FetchStatus.Fetching]: "connecting to server",
  [FetchStatus.Success]: "server is up",
  [FetchStatus.Failed]: "server is down",
};

const HEART_BEAT_COLOR: Record<FetchStatus, string> = {
  [FetchStatus.None]: "bg-amber-400",
  [FetchStatus.Fetching]: "bg-amber-400",
  [FetchStatus.Success]: "bg-emerald-500",
  [FetchStatus.Failed]: "bg-red-600",
};

export const Toolbar = () => {
  const {
    toggleShowIo,
    setLanguage,
    setCode,
    view,
    input,
    setOutput,
    language,
    setShowIo,
    theme,
    setTheme,
    setExecuting,
    executing,
    setErrorNotification,
  } = useEditorStore();

  const heartBeat = useHeartBeat();
  const router = useRouter();

  const saveCodeToServer = async () => {
    try {
      const code = view?.state?.doc?.toString();
      const res = await saveCode({
        lang: languagetoText(language),
        code,
      });
      if (res?.success && res?.data?.id) {
        router.push(`/${res.data.id}`);
      } else {
        setErrorNotification(res?.errorMessage || "Something went wrong 😶‍🌫️");
      }
    } catch (err) {
      setErrorNotification("Something went wrong! Try again later");
    }
  };

  const langChangeHandler = (lang: Languages) => {
    setLanguage(lang);
    setCode(getTemplate(lang));
  };

  const runCodeHandler = async () => {
    try {
      setOutput("");
      setExecuting(true);
      const code = view?.state?.doc?.toString() || "";
      const data = await execute({
        lang: languagetoText(language),
        code,
        input,
      });

      if (data?.success) {
        setOutput(data?.data?.output || "");
      } else {
        setErrorNotification(data?.errorMessage || "Something went wrong");
      }
      setShowIo(true);
    } catch (err) {
      setErrorNotification("Something went wrong! Try again later");
    } finally {
      setExecuting(false);
    }
  };

  return (
    <header className="flex items-center justify-between border-b border-white/10 bg-neutral-950 px-4 py-3">
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold tracking-wide text-white">
          CodeStudio
        </span>
        <span
          className="flex min-w-[130px] items-center gap-2 text-xs text-white/50"
          title={HEART_BEAT_LABEL[heartBeat]}
        >
          <span className={`h-2 w-2 shrink-0 rounded-full ${HEART_BEAT_COLOR[heartBeat]}`} />
          {HEART_BEAT_LABEL[heartBeat]}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Dropdown
          className="w-28"
          value={language}
          options={LANGUAGE_OPTIONS}
          onChange={langChangeHandler}
        />

        <Dropdown
          className="w-36"
          value={theme}
          options={THEME_OPTIONS}
          onChange={setTheme}
        />

        <button
          className="rounded-md border border-white/10 px-3 py-1 text-sm text-white hover:bg-white/10"
          onClick={() => toggleShowIo()}
        >
          Input / Output
        </button>

        <button
          className="rounded-md border border-white/10 px-3 py-1 text-sm text-white hover:bg-white/10"
          onClick={() => void saveCodeToServer()}
        >
          Save
        </button>

        <button
          disabled={executing}
          className="w-24 rounded-md bg-emerald-600 px-4 py-1 text-sm font-medium text-white hover:bg-emerald-500 disabled:opacity-50"
          onClick={() => void runCodeHandler()}
        >
          {executing ? "Running..." : "Run"}
        </button>
      </div>
    </header>
  );
};
