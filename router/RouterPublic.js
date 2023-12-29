import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../pages/Login/login';
import HomeScreen from '../pages/HomeScreen/HomeScreen';
const Stack = createNativeStackNavigator();

function RouterPublic() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
}
export default RouterPublic;