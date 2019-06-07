import React from 'react';

import {createStackNavigator,createAppContainer,createDrawerNavigator,DrawerActions} from 'react-navigation';
import LoginForm from './LoginForm';

import HomePage from './HomePage';
import TrainDetails from './TrainDetails';
import SignUp from './SignUp';
import Location from './Location'
import Loading from './Loading'

import firebase from '@firebase/app';
require('firebase/auth');


//...................stackNavigator...............................................................

export default class MainPage extends React.Component{
    
    render(){
        return(
            <AppStackNavigator/>
        )
    }
}

const NavStack = createStackNavigator({
    Loading:Loading,
    Login: LoginForm,
    Home : HomePage,
    SignUp: SignUp,
    Location: Location,
    TrainD:TrainDetails
    
    

})
const NavStack2 = createStackNavigator({
    
    Home : HomePage,
    SignUp: SignUp,
    Location: Location,
    TrainD:TrainDetails
})

const AppStackNavigator = createAppContainer(NavStack);
