import { useIdleTimer } from 'react-idle-timer'
import { Outlet, useNavigate } from 'react-router-dom'

export function App () {

    const navigate = useNavigate()

    useIdleTimer({
        timeout: 5000,
        onIdle: () => {
            navigate('/')
        },
    })

    return (
        <Outlet />
    )
}
