import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import TokenService from '../Services/token-service'

export default function PrivateRoute({ component, ...props }) {
  console.log(props)
  const Component = component
  return (
    <Route
      {...props}
      render={componentProps => {
        const userId = Number(componentProps.match.params.userId)
        const {loggedInUser} = props
        console.log(componentProps)
        console.log(userId)
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
