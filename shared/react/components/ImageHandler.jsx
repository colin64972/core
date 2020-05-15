import React from 'react'

const setSrcSet = paths =>
  paths
    .reduce((acc, cur, ind) => {
      let temp = acc
      temp += `${cur} ${ind + 1}x, `
      return temp
    }, '')
    .replace(/,\s$/i, '')

export const ImageHandler = ({ asset, styleClass }) => {
  return (
    <img
      className={styleClass}
      srcSet={setSrcSet(asset.paths)}
      src={asset.paths[0]}
      alt={asset.alt}
    />
  )
}
