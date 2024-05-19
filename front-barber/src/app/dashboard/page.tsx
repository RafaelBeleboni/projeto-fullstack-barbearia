'use client'
import apiBase from '@/api/apiBase';
import ScheduleCalendar from '@/components/Dashboard/ScheduleCalendar';
import Spinner from '@/components/Spinner';
import { useRouter } from 'next/navigation'; // Use 'next/navigation' em vez de 'next/router'
import React, { useEffect, useState } from 'react';

const DashboardPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const client = typeof window !== 'undefined' ? localStorage.getItem("@Cliente") || "" : "";
    const token = typeof window !== 'undefined' ? localStorage.getItem("@Token") || "" : "";

    const verifyToken = async () => {
      try {
        if (token) {
          await apiBase.post("/auth/verificar-token", { token: token });
          setIsLoading(false);
        } else {
          router.push("/");
        }
      } catch (err) {
        router.push("/");
      }
    };

    verifyToken();
  }, [router]);

  return (
    <>
      {isLoading ? <Spinner /> : <ScheduleCalendar />}
    </>
  );
};

export default DashboardPage;
