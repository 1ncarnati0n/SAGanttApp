"use client";

import { Toaster as Sonner } from "sonner";

export function Toaster() {
  return (
    <Sonner
      position="top-right"
      toastOptions={{
        classNames: {
          toast:
            "bg-white dark:bg-primary-900 border-primary-200 dark:border-primary-800 text-primary-900 dark:text-primary-100",
          title: "text-primary-900 dark:text-primary-100",
          description: "text-primary-600 dark:text-primary-400",
          actionButton: "bg-primary-900 text-white dark:bg-primary-100 dark:text-black",
          cancelButton: "bg-primary-200 text-primary-900 dark:bg-primary-800 dark:text-primary-100",
        },
      }}
    />
  );
}

