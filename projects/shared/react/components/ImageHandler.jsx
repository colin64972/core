import clsx from 'clsx'
import PropTypes from 'prop-types'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { setSrcSet } from '../helpers'

const classes = makeStyles(() => ({
  picture: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  }
}))

export const ImageHandler = ({ asset, outerClass, height }) => {
  if (!asset) return null
  const { alt, mimeType, paths } = asset

  return (
    <picture className={clsx(classes.picture, outerClass)}>
      <source srcSet={setSrcSet(paths, 'webp')} type="image/webp" />
      <img
        srcSet={setSrcSet(paths)}
        src={paths[0]}
        alt={alt}
        type={mimeType}
        height={height}
      />
    </picture>
  )
}

ImageHandler.propTypes = {
  asset: PropTypes.shape({
    alt: PropTypes.string,
    mimeType: PropTypes.string,
    paths: PropTypes.arrayOf(PropTypes.string)
  }),
  styleClass: PropTypes.string
}
