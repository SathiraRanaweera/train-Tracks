//import libraries for making a component
import React from 'react';
import {Text, View} from 'react-native';


//making the component
const Header = (props) =>{
  
    
    return ( <View style= {styles.viewStyle}>
        <Text style= {styles.textStyle}>{props.headerText}</Text>
        </View> 
        );
    



};

const styles = {
    viewStyle:{
        backgroundColor : '#F1F1F1',
        justifyContent  : 'center',
        alignItems      : 'center',
        height          : 60,
        paddingTop      : 15,
        shadowColor     :'#000',
        shadowOffset    : {width: 0, height: 2},
        shadowOpacity   : 0.2,
        elevation       : 2,
        position        : 'relative'


    },
    textStyle:{
        fontSize: 30
        
    }

};



//making it available
export default Header;

