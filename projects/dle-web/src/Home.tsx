import React from 'react'
import { TopNav } from './TopNav'

export const Home: React.FC = () => (
  <div>
    <TopNav />
    <h1>{process.env.APP_NAME}</h1>
    <p>
      Dolores sed amet aliquyam duo diam et et amet, amet sadipscing lorem
      accusam duo voluptua, invidunt rebum eirmod et amet rebum, labore sea sed
      sea aliquyam magna stet et erat. Magna labore at magna amet dolor dolor.
      Kasd accusam aliquyam rebum magna voluptua aliquyam sed diam, justo nonumy
      ut rebum.
    </p>
  </div>
)
