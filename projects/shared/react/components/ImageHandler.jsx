import clsx from 'clsx'
import PropTypes from 'prop-types'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { setSrcSet, createHashId } from '../helpers'

const useStyles = makeStyles(
  () => ({
    picture: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden'
    },
    image: {
      width: ({ width }) => (width ? width : '100%')
    }
  }),
  {
    name: `ImageHandler-${createHashId()}`
  }
)

export const ImageHandler = ({ asset, pictureClass, imageClass, width }) => {
  if (!asset) return null
  const { alt, mimeType, paths } = asset
  const classes = useStyles({ width })

  return (
    <picture className={clsx(classes.picture, pictureClass)}>
      <source srcSet={setSrcSet(paths, 'webp')} type="image/webp" />
      <img
        srcSet={setSrcSet(paths)}
        src={paths[0]}
        alt={alt}
        type={mimeType}
        className={clsx(classes.image, imageClass)}
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
