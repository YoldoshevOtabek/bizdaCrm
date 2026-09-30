import useMe from "../features/auth/hooks/useMe";
import { Spinner } from "../components/ui/Spinner";
import { useUser } from "../features/auth/context/UserContext";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";




export default function ProtectedRoute() {
  const {data, isLoading} = useMe()
  const {setUser} = useUser()

  useEffect(()=> {
    if(data)
    setUser(data?.data)
  },[data])
  return <>
 { isLoading ? <Spinner/> : <Outlet/>}
 </> 
}