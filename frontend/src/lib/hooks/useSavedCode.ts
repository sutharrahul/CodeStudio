import { useEffect, useState } from "react";
import { getCode } from "../api/saveCode";

type Props = {
  codeId: string | undefined;
};

export enum FetchStatus {
  Fetching,
  Success,
  Failed,
  None,
}

export const useSavedCode = ({ codeId }: Props) => {
  const [fetchStatus, setFetchStatus] = useState<FetchStatus>(FetchStatus.None);
  const [lang, setLang] = useState<string | undefined>();
  const [code, setCode] = useState<string | undefined>();

  useEffect(() => {
    async function fetchData(): Promise<void> {
      try {
        if (codeId === undefined) {
          setFetchStatus(FetchStatus.None);
          return;
        } else if (isNaN(Number(codeId))) {
          setFetchStatus(FetchStatus.Failed);
          return;
        }
        setFetchStatus(FetchStatus.Fetching);
        const res = await getCode(Number(codeId));
        if (res?.success && res?.data !== undefined) {
          const data = res?.data;
          setLang(data?.lang);
          setCode(data?.code);
          setFetchStatus(FetchStatus.Success);
        } else {
          setFetchStatus(FetchStatus.Failed);
        }
      } catch (error) {
        setFetchStatus(FetchStatus.Failed);
      }
    }
    void fetchData();
  }, [codeId]);

  return {
    fetchStatus,
    lang,
    code,
  };
};
