import React from 'react'
import { TopNav } from './TopNav'

export const NotFound: React.FC = () => (
  <div>
    <TopNav />
    <h1>ERROR {process.env.APP_NAME}</h1>
    <p>Dolor aliquyam et diam dolor eirmod sea stet ea clita,.</p>
  </div>
)
