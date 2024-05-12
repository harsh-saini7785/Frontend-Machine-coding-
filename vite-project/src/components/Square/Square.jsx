import React from 'react'
import { styles } from './SquareStyles'

const Square = ({value, onClick}) => {
  return (
    <div style={styles.square} onClick={onClick}><h2>{value}</h2></div>
  )
}

export default Square