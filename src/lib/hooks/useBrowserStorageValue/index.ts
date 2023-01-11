import { useCallback, useEffect, useState } from "react";

function useBrowserStorageValue<ValueType = unknown>(
  key: string,
  initialValue: ValueType | null,
  storageType: "session" | "local"
): [value: ValueType | null, setValue: (val: ValueType | null) => void] {
  const [value, setValue] = useState<ValueType | null>(initialValue);

  useEffect(() => {
    const storage = storageType === "local" ? localStorage : sessionStorage;
    if (!storage) return;
    const rawVal = storage.getItem(key);
    if (!rawVal) return;
    try {
      const parsedVal = JSON.parse(rawVal) as ValueType;
      setValue(parsedVal);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const setter = useCallback(
    (val: ValueType | null) => {
      const storage = storageType === "local" ? localStorage : sessionStorage;
      if (!storage || !val) return;
      storage.setItem(key, JSON.stringify(val));
      setValue(val);
    },
    [key, setValue, storageType]
  );

  return [value, setter];
}

export function useLocalStorageValue<ValueType = unknown>(
  key: string,
  initialValue: ValueType | null
): [value: ValueType | null, setValue: (val: ValueType | null) => void] {
  return useBrowserStorageValue<ValueType>(key, initialValue, "local");
}

export function useSessionStorageValue<ValueType = unknown>(
  key: string,
  initialValue: ValueType | null
): [value: ValueType | null, setValue: (val: ValueType | null) => void] {
  return useBrowserStorageValue<ValueType>(key, initialValue, "session");
}
