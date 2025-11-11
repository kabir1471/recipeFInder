import Ionicons from '@react-native-vector-icons/ionicons';
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

interface RecipeCardProps {
  title: string;
  tag?: string;
  image: string;
  isFavourite?: boolean;
  onToggleFavourite?: () => void;
  onPress?: () => void;
  testID?: string;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  title,
  tag,
  image,
  isFavourite = false,
  onToggleFavourite,
  onPress,
  testID,
}) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      testID={testID}
      accessibilityRole="button"
      accessibilityLabel={`${title} card`}
    >
      <Image source={{ uri: image }} style={styles.image} />
      <TouchableOpacity
        style={styles.heartContainer}
        onPress={onToggleFavourite}
        accessibilityRole="button"
        accessibilityLabel={`Toggle favourite for ${title}`}
        testID={testID ? `${testID}-favourite-toggle` : undefined}
      >
        {isFavourite && (
          <View style={styles.heartActive}>
			      <Ionicons name="heart" color={'#6EDC87'} size={16} />
          </View>
      )}
      </TouchableOpacity>
      {tag && <Text style={styles.tag}>{tag}</Text>}
      <Text numberOfLines={2} style={styles.title}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
	width: 150,
    borderRadius: 16,
    backgroundColor: '#efefef',
    overflow: 'hidden',
    marginRight: 16,
	marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 16,
  },
  heartContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  heartBackground: {
    backgroundColor: '#D1F6AC',
    borderRadius: 20,
    padding: 6,
  },
  heartActive: {
    backgroundColor: '#64B313',
  },
  tag: {
    color: '#64B313',
    fontWeight: '600',
    marginTop: 8,
    marginLeft: 8,
    textTransform: 'uppercase',
    fontSize: 12,
  },
  title: {
    color: '#0A0B0A',
    fontWeight: '800',
    marginTop: 2,
    marginLeft: 8,
    marginBottom: 12,
    fontSize: 16,
  },
});
