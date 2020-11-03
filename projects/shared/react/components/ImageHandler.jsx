import clsx from 'clsx'
import PropTypes from 'prop-types'
import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

const setSrcSet = (paths, format = null) =>
  paths
    .reduce((acc, cur, ind) => {
      let result = acc
      let filePath = cur
      if (format === 'webp') {
        filePath = cur.replace(/.\w+$/i, '.webp')
      }
      result += `${filePath} ${ind + 1}x, `
      return result
    }, '')
    .replace(/,\s$/i, '')

const useStyles = makeStyles(theme => ({
  picture: {
    ...theme.custom.setFlex()
  }
}))

export const ImageHandler = ({ asset, styleClass }) => {
  const classes = useStyles()
  const { alt, mimeType, paths } = asset
  return (
    <picture className={clsx(classes.picture, styleClass)}>
      <source srcSet={setSrcSet(paths, 'webp')} type="image/webp" />
      <img
        className={styleClass}
        srcSet={setSrcSet(paths)}
        src={paths[0]}
        alt={alt}
        type={mimeType}
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
