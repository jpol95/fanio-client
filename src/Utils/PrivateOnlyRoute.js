import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export default function PrivateRoute({ component, ...props }) {
  const Component = component
  return (
    <Route
      {...props}
      render={componentProps => {
        const userId = Number(componentProps.match.params.userId)
        const {loggedInUser} = props
        // console.log(loggedInUser)
        return (userId === loggedInUser
          ? <Component {...componentProps} />
          : <Redirect
              to={{
                pathname: '/login',
                state: { from: componentProps.location }
              }}
            />)
            }}
    />
  )
}
