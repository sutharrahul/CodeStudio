import { useEffect, useState } from "react";
import { FetchStatus } from "./useSavedCode";
import { ping } from "../api/executor";

export const useHeartBeat = () => {
  const [fetchStatus, setFetchStatus] = useState<FetchStatus>(FetchStatus.None);

  function requestPing() {
    try {
      void ping().then((success) => {
        if (success) setFetchStatus(FetchStatus.Success);
        else setFetchStatus(FetchStatus.Failed);
      });
    } catch (err) {
      setFetchStatus(FetchStatus.Failed);
    }
    return requestPing;
  }
  useEffect(() => {
    const id = setInterval(requestPing(), 60_000);
    return () => clearInterval(id);
  }, []);
  return fetchStatus;
};
