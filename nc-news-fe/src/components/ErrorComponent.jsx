import React from 'react'

function ErrorComponent({ error }) {
  return (
    <p>{error.message}</p>
  )
}

export default ErrorComponent