import PropTypes from 'prop-types'
import React from 'react'

import { TopNav } from './TopNav'

type Props = {
  name: string
  size: number
}

export const Home: React.FC<Props> = ({ name, size }) => {
  return (
    <div>
      <TopNav />
      <h1>{process.env.APP_NAME}</h1>
      <p>
        Nonumy magna lorem erat at eirmod et. Labore ut no diam accusam aliquyam
        amet sit, sanctus nonumy labore no sea aliquyam erat ea. Dolor sit diam
        accusam erat, kasd nonumy eos aliquyam invidunt. Vero tempor amet vero
        aliquyam invidunt consetetur est est sed. Invidunt diam sanctus sea amet
        invidunt labore.
      </p>
      <p>
        <strong>Name</strong>
        &nbsp;
        {name}
      </p>
      <p>
        <strong>Size</strong>
        &nbsp;
        {size}
      </p>
    </div>
  )
}

Home.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired
}
