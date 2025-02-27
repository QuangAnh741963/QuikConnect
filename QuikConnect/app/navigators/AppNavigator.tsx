import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native"
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack"
import { observer } from "mobx-react-lite"
import React from "react"
import { useColorScheme } from "react-native"
import Config from "../config"
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"
import * as Screens from "app/screens"
import RoomChatHeader from "./components/RoomChatHeader"

export type AppStackParamList = {
  Start: undefined
  Home: undefined
  RoomChat: undefined
  OptionChat: undefined
}

const exitRoutes = Config.exitRoutes

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>

export type AppNavigationProps = NativeStackNavigationProp<AppStackParamList>

const Stack = createNativeStackNavigator<AppStackParamList>()

const AppStack = observer(function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Screens.HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Start" component={Screens.StartScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="RoomChat"
        component={Screens.RoomChatScreen}
        options={() => ({
          header: () => <RoomChatHeader />,
        })}
      />
      <Stack.Screen
        name="OptionChat"
        component={Screens.OptionChatScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
})

export interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = observer(function AppNavigator(props: NavigationProps) {
  const colorScheme = useColorScheme()

  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      <AppStack />
    </NavigationContainer>
  )
})
