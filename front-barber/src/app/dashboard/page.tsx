"use client"

import apiBase from '@/api/apiBase';
import ScheduleCalendar from '@/components/Dashboard/ScheduleCalendar';
import Spinner from '@/components/Spinner';
import { useRouter } from 'next/navigation'; // Use 'next/navigation' em vez de 'next/router'
import React, { useEffect, useState } from 'react';


const DashboardPage = () => {
  const router = useRouter()
  const [ isLoading, setIsLoading ] = useState(true)
  const client = localStorage.getItem("@Cliente") || ""
  const token = localStorage.getItem("@Token") || ""

useEffect(()=>{
    const verifyToken = async () => {
      try{
        await apiBase.post("/auth/verificar-token", { token: token})
        setIsLoading(false)
      }catch(err){
        router.push("/")
      }
    }
    
verifyToken()
},[])


return (
    <>
    {isLoading ? <Spinner /> : <ScheduleCalendar/>}
    </>
  );
};

export default DashboardPage;
