import React from 'react';
import Home from './src/home';
import {Provider} from 'react-redux';
import configureStore from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import UpdateList from './src/updateList';

const {store, persistor} = configureStore({});
const Stack = createNativeStackNavigator();

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="home">
              <Stack.Screen
                name="home"
                component={Home}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="update"
                component={UpdateList}
                options={{headerShown: false}}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
