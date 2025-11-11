import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';

type SearchRecipeCardProps = {
  title: string;
  tag?: string;
  image: string;
  isFavourite?: boolean;
  onToggleFavourite?: () => void;
  onPress?: () => void;
  testID?: string;
};

export const SearchRecipeCard: React.FC<SearchRecipeCardProps> = ({
  title,
  tag,
  image,
  isFavourite = false,
  onToggleFavourite,
  onPress,
  testID,
}) => (
  <TouchableOpacity style={styles.container} onPress={onPress} testID={testID}>
    <Image source={{ uri: image }} style={styles.image} />
    <View style={styles.textContainer}>
      {tag ? <Text style={styles.tag}>{tag.toUpperCase()}</Text> : null}
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
    </View>
    <TouchableOpacity
      style={[styles.heartButton, isFavourite && styles.heartButtonActive]}
      onPress={onToggleFavourite}
      accessibilityRole="button"
      testID={testID ? `${testID}-favourite-toggle` : undefined}
    >
      <Ionicons name={isFavourite ? 'heart' : 'heart-outline'} size={18} color="#000" />
    </TouchableOpacity>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 18,
    marginBottom: 12,
  },
  image: {
    width: 62,
    height: 62,
    borderRadius: 20,
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
  },
  tag: {
    color: '#7ED957',
    fontSize: 12,
    fontWeight: '700',
  },
  title: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
  },
  heartButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartButtonActive: {
    backgroundColor: '#fff',
  },
});
