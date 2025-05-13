import { View, Text, Image, StyleSheet } from 'react-native';

export default function Item(props) {
  return (
    <View style={[styles.wrapper, props.style]}>
      <Image source={props.iconSrc} style={[styles.icon, { tintColor: props.iconColor }]} alt={props.iconAlt} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.description}>{props.description}</Text>
      </View>
      <Image source={props.actionImage} style={[styles.actionIcon, { tintColor: props.actionColor }]} alt={props.actionAlt} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#eee',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  description: {
    color: '#555',
  },
  actionIcon: {
    width: 20,
    height: 20,
  },
});
