"use client";

import { EditorView } from "codemirror";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import { useEditorStore } from "@/lib/store/store";
import { FetchStatus, useSavedCode } from "@/lib/hooks/useSavedCode";
import { textToLanguage } from "@/lib/utils/mapper";
import {
  extensions,
  getLanguageExtention,
  getThemeExtention,
} from "@/lib/editor/extensions";

type Props = {
  codeId?: string;
};

export const CodeEditor = ({ codeId }: Props) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const {
    fetchStatus,
    code: fetchedCode,
    lang: fetchedLang,
  } = useSavedCode({ codeId });

  const {
    language,
    setView,
    setLanguage,
    setCode,
    code,
    theme,
    setErrorNotification,
    setSuccessNotification,
  } = useEditorStore();

  useEffect(() => {
    if (editorRef.current === null) return;

    const view = new EditorView({
      parent: editorRef.current,
      doc: code,
      extensions: [
        ...extensions,
        getThemeExtention(theme),
        getLanguageExtention(language),
      ],
    });
    setView(view);
    return () => {
      view.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, language, theme]);

  useEffect(() => {
    if (codeId === undefined) return;
    if (fetchStatus === FetchStatus.Success && fetchedCode && fetchedLang) {
      setCode(fetchedCode);
      setLanguage(textToLanguage(fetchedLang));
      setSuccessNotification("Code loaded successfully! 🤩");
    } else if (fetchStatus === FetchStatus.Failed) {
      setErrorNotification("Failed to fetch code from server 😶‍🌫️");
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchStatus]);

  return <div ref={editorRef} className="h-full w-full overflow-hidden" />;
};
