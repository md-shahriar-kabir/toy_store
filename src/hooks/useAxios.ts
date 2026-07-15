"use client";

import { useCallback, useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import type { AxiosError } from "axios";


type ApiError = {
  message?: string;
};

type UseAxiosOptions = {
  enabled?: boolean;
};

export function useAxios<T = unknown>(
  url: string,
  options?: UseAxiosOptions
) {
  const { enabled = true } = options || {};

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<number | null>(null);

  const fetchData = useCallback(async () => {
    if (!url) return;

    try {
      setLoading(true);
      setError(null);

      const response = await axiosInstance.get<T>(url);

      setData(response.data);
      setStatus(response.status);
    } catch (err: unknown) {
      const axiosError = err as AxiosError<ApiError>;

      setError(
        axiosError.response?.data?.message ??
          axiosError.message ??
          "Something went wrong"
      );

      setStatus(axiosError.response?.status ?? 500);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    if (enabled) {
      fetchData();
    }
  }, [fetchData, enabled]);

  return {
    data,
    loading,
    error,
    status,
    refetch: fetchData,
  };
}
