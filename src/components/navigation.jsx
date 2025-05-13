import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { View, Image, Text } from 'react-native';

import Corridas from '../screens/corridas.jsx';
import Desempenho from '../screens/desempenho.jsx';
import Mais from '../screens/mais.jsx';
import Nutricao from '../screens/nutricao.jsx';

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <NavigationContainer
      style={{
        borderTop: 10,
        borderTopColor: '#000',
      }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            let iconPath;

            switch (route.name) {
              case 'Desempenho':
                iconPath = require('../assets/cronometro.png');
                break;
              case 'Nutrição':
                iconPath = require('../assets/cronometro.png');
                break;
              case 'Corridas':
                iconPath = require('../assets/cronometro.png');
                break;
              case 'Mais':
                iconPath = require('../assets/cronometro.png');
                break;
            }
          },
          tabBarStyle: {
            flex: 1,
            maxHeight: 80,
            paddingBottom: 5,
            paddingTop: 5,
            justifyContent: 'space-between',
            borderTopWidth: 4,
            borderStyle: 'solid',
            borderColor: '#bbb',
          },
          tabBarLabelStyle: {
            fontSize: 20,
          },
        })}
      >
        <Tab.Screen name="Desempenho" component={Desempenho} options={{
          tabBarIcon: ({ focused }) => (
            <View style={{
              backgroundColor: focused ? '#DAF03D' : 'transparent',
              borderRadius: 80,
              paddingHorizontal: 15,
              paddingVertical: 5,
            }}>
              <Image
                source={require('../assets/cronometro.png')}
                style={{
                  width: 30,
                  height: 30,
                  tintColor: '#F27F0C',
                }}
              />
            </View>
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: 'red', fontSize: 15, marginTop: 3, fontWeight: 'bold' }}>
              Desempenho
            </Text>
          ),
        }} />
        <Tab.Screen name="Nutrição" component={Nutricao} options={{
          tabBarIcon: ({ focused }) => (
            <View style={{
              backgroundColor: focused ? '#DAF03D' : 'transparent',
              borderRadius: 80,
              paddingHorizontal: 15,
              paddingVertical: 5,
            }}>
              <Image
                source={require('../assets/cronometro.png')}
                style={{
                  width: 30,
                  height: 30,
                  tintColor: '#F27F0C',
                }}
              />
            </View>
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: 'red', fontSize: 15, marginTop: 3, fontWeight: 'bold' }}>
              Nutrição
            </Text>
          ),
        }} />
        <Tab.Screen name="Corridas" component={Corridas} options={{
          tabBarIcon: ({ focused }) => (
            <View style={{
              backgroundColor: focused ? '#DAF03D' : 'transparent',
              borderRadius: 80,
              paddingHorizontal: 15,
              paddingVertical: 5,
            }}>
              <Image
                source={require('../assets/cronometro.png')}
                style={{
                  width: 30,
                  height: 30,
                  tintColor: '#F27F0C',
                }}
              />
            </View>
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: 'red', fontSize: 15, marginTop: 3, fontWeight: 'bold' }}>
              Corridas
            </Text>
          ),
        }} />
        <Tab.Screen
          name="Mais"
          component={Mais}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{
                backgroundColor: focused ? '#DAF03D' : 'transparent',
                borderRadius: 80,
                paddingHorizontal: 15,
                paddingVertical: 5,
              }}>
                <Image
                  source={require('../assets/cronometro.png')}
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: '#F27F0C',
                  }}
                />
              </View>
            ),
            tabBarLabel: ({ focused }) => (
              <Text style={{ color: 'red', fontSize: 15, marginTop: 3, fontWeight: 'bold' }}>
                Mais
              </Text>
            ),
          }}
        />

      </Tab.Navigator>
    </NavigationContainer>
  );
}