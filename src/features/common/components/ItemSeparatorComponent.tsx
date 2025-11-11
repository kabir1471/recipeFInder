import React from 'react'
import { StyleSheet, View } from 'react-native'

const ItemSeparatorComponent = () => {
  return (
	<View style={styles.separator} />
  )
}

const styles = StyleSheet.create({
	separator: {
		width: 16,
	},
})

export default ItemSeparatorComponent
