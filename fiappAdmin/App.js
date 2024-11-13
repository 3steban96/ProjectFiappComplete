
import Login from './src/Screens/Login/Login';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from './src/Screens/SignUp/SignUp.jsx';
import AddProduct from './src/Screens/AddProduct/AddProduct.jsx';
import Tabs from './Tabs.js';
import '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';
import AddCustomer from './src/Screens/AddCustomer/AddCustomer.jsx';
import DetailsCustomer from './src/Screens/DetailsCustomer/DetailsCustomer.jsx';
import CreatePromotions  from './src/Screens/CreatePromotions/CreatePromotions.jsx';
import CreateCombo from './src/Screens/CreateCombos/CreateCombo.jsx';
import RecordPurchase from './src/Screens/RecordPurchase/RecordPurchase.jsx';
import { UserProvider } from './src/UserContext/UserContext.js';
import QRScannerScreen from './src/Screens/Components/QrScanner/QRScanner.jsx';
import FabButtondProfile from './src/Screens/Components/FabButtonsProfile/FabButtonsProfile.jsx';
import ForgotPassword from './src/Screens/ForgotPassword/ForgotPassword.jsx';
import CodeVerification from './src/Screens/CodeVerification/CodeVerification.jsx';
import ResetPassword from './src/Screens/ResetPassword/ResetPassword.jsx';

const Stack = createStackNavigator();

export default function App() {
 return (
  <UserProvider>
    <NavigationContainer >
      <Stack.Navigator>
        <Stack.Screen name="Login" options={{ headerShown: false }} component={Login} />
        <Stack.Screen name="SignIn" options={{ headerShown: false }} component={SignIn} />
        <Stack.Screen name="ForgotPassword" options={{ headerShown: false }} component={ForgotPassword} />
        <Stack.Screen name="CodeVerification" options={{ headerShown: false }} component={CodeVerification} />
        <Stack.Screen name="ResetPassword" options={{ headerShown: false }} component={ResetPassword} />
        <Stack.Screen name="AddProduct" options={{ headerShown: false }} component={AddProduct} />
        <Stack.Screen name="AddCustomer" options={{ headerShown: false }} component={AddCustomer} />
        <Stack.Screen name="DetailsCustomer" options={{ headerShown: false }} component={DetailsCustomer} />
        <Stack.Screen name="CreatePromotion" options={{ headerShown: false }} component={CreatePromotions} />
        <Stack.Screen name="CreateCombo" options={{ headerShown: false }} component={CreateCombo} />
        <Stack.Screen name="RecordPurchase" options={{ headerShown: false }} component={RecordPurchase} />
        <Stack.Screen name="QRScaneer" options={{ headerShown: false }} component={QRScannerScreen} />
        <Stack.Screen name="FabButtonsProfile" options={{ headerShown: false }} component={FabButtondProfile} />
        <Stack.Screen name="Tabs" options={{ headerShown: false }} component={Tabs} /> 
      </Stack.Navigator>    
    </NavigationContainer>
  </UserProvider>
  );
}


