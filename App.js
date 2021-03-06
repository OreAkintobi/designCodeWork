import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createStore } from "redux";
import { Provider } from "react-redux";
import TabNavigator from "./navigator/TabNavigator";
// import ErrorBoundary from "./components/ErrorBoundary";
import ErrorBoundary from "react-native-error-boundary";

const Stack = createStackNavigator();

const initialState = {
  action: "",
  name: ""
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "OPEN_MENU":
      return { action: "openMenu" };
    case "CLOSE_MENU":
      return { action: "closeMenu" };
    case "UPDATE_NAME":
      return { name: action.name };
    default:
      return state;
  }
};

const store = createStore(reducer);

const App = () => (
  <ErrorBoundary>
    <Provider store={store}>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </Provider>
  </ErrorBoundary>
);

export default App;
