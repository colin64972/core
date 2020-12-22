import React from 'react'
import ArrowDropDown from '@material-ui/icons/ArrowDropDown'
import ArrowDropUp from '@material-ui/icons/ArrowDropUp'

const ArrowIcon = ({ ...props }) => {
  let icon = <ArrowDropUp />
  if (props.direction === 'down') {
    icon = <ArrowDropDown />
  }
  return icon
}

export default ArrowIcon
