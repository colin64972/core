import React from 'react'
import clsx from 'clsx'
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
  return (
    <picture className={clsx(classes.picture, styleClass)}>
      <source srcSet={setSrcSet(asset.paths, 'webp')} type="image/webp" />
      <img
        className={styleClass}
        srcSet={setSrcSet(asset.paths)}
        src={asset.paths[0]}
        alt={asset.alt}
        type={asset.mimeType}
      />
    </picture>
  )
}
