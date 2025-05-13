import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Item from './src/components/item.jsx';

export default function Corridas() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgb(255, 0, 0)', 'rgba(252, 176, 69, 1)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={StyleSheet.absoluteFillObject}
      />

      <View style={styles.content}>
        <Text style={styles.title}>Suas Corridas</Text>

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.month}>Abril</Text>
          <Item
            iconSrc={require('./src/assets/cronometro.png')}
            iconAlt="Ícone cronômetro"
            title="Corrida 97"
            description="5.41 quilômetros percorridos"
            actionImage={require('./src/assets/pin.png')}
            actionAlt="Ícone pin"
          />

          <Text style={styles.month}>Março</Text>
          <Item
            iconSrc={require('./src/assets/cronometro.png')}
            iconAlt="Ícone cronômetro"
            title="Corrida 96"
            description="2.69 quilômetros percorridos"
            actionImage={require('./src/assets/pin.png')}
            actionAlt="Ícone pin"
          />
          <Item
            iconSrc={require('./src/assets/cronometro.png')}
            iconAlt="Ícone cronômetro"
            title="Corrida 95"
            description="2.69 quilômetros percorridos"
            actionImage={require('./src/assets/pin.png')}
            actionAlt="Ícone pin"
          />
          <Item
            iconSrc={require('./src/assets/cronometro.png')}
            iconAlt="Ícone cronômetro"
            title="Corrida 94"
            description="3.71 quilômetros percorridos"
            actionImage={require('./src/assets/pin.png')}
            actionAlt="Ícone pin"
          />
          <Item
            iconSrc={require('./src/assets/cronometro.png')}
            iconAlt="Ícone cronômetro"
            title="Corrida 93"
            description="4.65 quilômetros percorridos"
            actionImage={require('./src/assets/pin.png')}
            actionAlt="Ícone pin"
          />
          <Item
            iconSrc={require('./src/assets/cronometro.png')}
            iconAlt="Ícone cronômetro"
            title="Corrida 92"
            description="4.29 quilômetros percorridos"
            actionImage={require('./src/assets/pin.png')}
            actionAlt="Ícone pin"
          />
        </ScrollView>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Nova Corrida</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    flex: 1,
    paddingTop: 60,
  },

  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    marginLeft: 20,
  },
  scrollContainer: {
    flex: 1,
    paddingBottom: 80,
    paddingHorizontal: 20,
    borderRadius: 40,
    backgroundColor: '#fff',
    width: '100%',
    marginTop: 20,
  },
  month: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#ff8c00',
    marginTop: 20,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#f0b300',
    paddingVertical: 15,
    borderRadius: 20,
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
