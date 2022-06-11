import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EventsScreen from "./EventsScreen";
import EventDetailsScreen from "./EventsDetailsScreen";

const Stack = createNativeStackNavigator();

export default function EventApp() {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="AllEvents" component={EventsScreen} />
        <Stack.Screen name="EventsDetails" component={EventDetailsScreen} />
      </Stack.Navigator>
    </>
  );
}
