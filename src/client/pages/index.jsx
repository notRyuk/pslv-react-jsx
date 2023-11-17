import React from 'react'
import { selectLoggedInUser } from '@client/components/auth/authSlice'
import Protected from '@client/components/auth/Protected'

const index = () => {
  console.log(selectLoggedInUser)
  return (
    <Protected>
      <div>index</div>
    </Protected>
  )
}

export default index