import { useContext } from "react";
import { LoadingContext, LoadingContextType } from "../services/LoadingContext";

// Хук для использования контекста
export const useLoading = (): LoadingContextType => {
  const context = useContext(LoadingContext);

  // Проверка на undefined
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }

  return context;
};
