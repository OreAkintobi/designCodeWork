import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import SectionScreen from "../screens/SectionScreen";
import { Ionicons } from "@expo/vector-icons";

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen
      options={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons
            name="ios-home"
            size={30}
            color={focused ? "#4775f2" : "#b8bece"}
          />
        )
      })}
      name="Home"
      component={HomeScreen}
    />
    <Tab.Screen
      options={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons
            name="ios-settings"
            size={30}
            color={focused ? "#4775f2" : "#b8bece"}
          />
        )
      })}
      name="Section"
      component={SectionScreen}
    />
  </Tab.Navigator>
);

export default TabNavigator;
