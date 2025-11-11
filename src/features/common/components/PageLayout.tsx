import React, { FC, PropsWithChildren } from 'react'
import { StyleSheet, View } from 'react-native'

const PageLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
	<View style={styles.container}>
	  {children}
	</View>
  )
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingVertical: 16,
		paddingHorizontal: 20,
		backgroundColor: '#fff',
	}
})

export default PageLayout
