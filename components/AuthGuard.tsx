import { useSession } from "next-auth/react"
import Router, { useRouter } from "next/router"
import { ReactNode, useEffect } from "react"


const AuthGuard = ({ children }: { children: ReactNode }) => {
    const { status } = useSession()

    const router = useRouter()

    useEffect(() => {
        console.log(status)
        if (status === "unauthenticated") {
            router.push("/login")
        }

    }, [status, router])

    if (status === "loading") {
        return <p>Loading...</p>
    }

    return (
        <>
            {children}
        </>
    )

}

export default AuthGuard;