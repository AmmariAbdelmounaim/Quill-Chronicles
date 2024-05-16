import { useEffect, useState } from "react";

const useLocalStorage = <T,>(
  key: string,
  initialValue?: T
): [T, (value: T) => void] => {
  // Initialize state with value from localStorage or initialValue
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.warn(error);
    }
  }, [key]);

  return [storedValue, setValue];
};

export default useLocalStorage;
