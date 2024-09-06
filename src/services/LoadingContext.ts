import { createContext, Dispatch, SetStateAction } from "react";

// Определяем интерфейс для значения контекста
export interface LoadingContextType {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

// Создаем контекст с начальным значением
export const LoadingContext = createContext<LoadingContextType | undefined>(
  undefined
);
