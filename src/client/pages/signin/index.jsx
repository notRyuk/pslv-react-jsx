import React from 'react'
import SignIn from '@client/components/auth/signin'

const index = () => {
  return (
    <SignIn />
  )
}

export const layout = {
  hasFooter: false,
  hasHeader: false
}

export default index