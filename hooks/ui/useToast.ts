'use client'

import { useCallback, useState } from "react";

export interface ToastState {
  message: string;
  type: "success" | "info" | "error";
  isVisible: boolean;
}

export const useToast = () => {
  const [toast, setToast] = useState<ToastState>({
    message: "",
    type: "success",
    isVisible: false,
  });

  const showToast = useCallback(
    (message: string, type: ToastState["type"] = "success") => {
      setToast({ message, type, isVisible: true });
    },
    [],
  );

  const hideToast = useCallback(() => {
    setToast((currentToast) => ({ ...currentToast, isVisible: false }));
  }, []);

  return { toast, showToast, hideToast };
};
