import { Link, useRouteError, useLocation } from 'react-router-dom'

interface RouteError {
  status: number
  statusText: string
}

const E404 = () => {
  const { pathname } = useLocation()

  const error = useRouteError() as RouteError

  return (
    <div className="-mt-5 grid min-h-screen place-content-center text-center">
      <h2 className="mb-5 text-9xl font-black">{error.status || 'Oops'}</h2>
      <p>{error.statusText || 'An error has occured'}</p>
      <div className="flex justify-center gap-2">
        <Link to={pathname}>
          <button className="btn mt-4">Reload</button>
        </Link>
        <Link to="/">
          <button className="btn mt-4">Back Home</button>
        </Link>
      </div>
    </div>
  )
}

export default E404
