"use client";

import { useEffect } from "react";

import { useEditorStore } from "@/lib/store/store";
import { NotificationType } from "@/lib/store/typings";

const STYLE_BY_TYPE: Record<NotificationType, string> = {
  [NotificationType.None]: "hidden",
  [NotificationType.Success]: "bg-emerald-600",
  [NotificationType.Error]: "bg-red-600",
  [NotificationType.Warning]: "bg-amber-600",
};

export const NotificationBar = () => {
  const { notification, clearNotification } = useEditorStore();

  useEffect(() => {
    if (!notification) return;
    const id = setTimeout(clearNotification, 4000);
    return () => clearTimeout(id);
  }, [notification, clearNotification]);

  if (!notification) return null;

  return (
    <div
      className={`fixed left-1/2 top-4 z-50 -translate-x-1/2 rounded-md px-4 py-2 text-sm text-white shadow-lg ${STYLE_BY_TYPE[notification.type]}`}
    >
      {notification.message}
    </div>
  );
};
