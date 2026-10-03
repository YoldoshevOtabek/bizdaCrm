
import MainLayout from '../components/layout/MainLayout'
import useMe from '../features/profiles/hooks/useMe'
import Spinner from '../components/Spinner'
import { useUser } from '../features/auth/context/UserContext'
import { useEffect } from 'react'

export default function ProtectedRoute() {
    const { data, isLoading } = useMe()
    const { setUser } = useUser()

    useEffect(() => {
        if (data) {
            setUser(data?.data)
            localStorage.setItem("bizdacrmuser",JSON.stringify(data?.data))
        }
    }, [data])

    return (
        <>
            {isLoading ? <Spinner /> : <MainLayout />
            }
        </>
    )
}
