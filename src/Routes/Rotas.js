import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';

import Produto from '../Components/Produto';
import TelaCadastro from '../Pages/TelaCadastro';
import LoginScreen from '../Pages/TelaLogin';
import Sobre from '../Pages/Sobre';
import Perfil from '../Pages/Perfil';
import TelaFaculdade from '../Pages/TelaFaculdade';





const Tab = createBottomTabNavigator();

export default function Rotas() {

    const { logado, cadastro, setCadastro } = useContext(AuthContext);


    if (!logado && !cadastro ) {
        return (<LoginScreen setCadastro={setCadastro} />)
    }

    if( !logado && cadastro ) {
        return( <TelaCadastro setCadastro={setCadastro} /> )
    }

  

    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        backgroundColor: '#20164d',
                    },
                    tabBarActiveTintColor: "white"
                }}
            >
              
               
                 <Tab.Screen
                    name="Sobre"
                    component={Sobre}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="account-group-outline" color={color} size={size} />
                        ),
                    }}
                />
                 <Tab.Screen
                    name="TelaFaculade"
                    component={TelaFaculdade}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="school-outline" color={color} size={size} />
                        ),
                    }}
                />
               
                <Tab.Screen
                    name="Perfil"
                    component={Perfil}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="account" color={color} size={size} />
                        ),
                    }}
                />
                 
               
            </Tab.Navigator>
        </NavigationContainer>
    )
}