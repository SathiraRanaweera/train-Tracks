import React  from 'react';
import {View} from 'react-native';


const CardSection = (props) => {
    return(
        <View style={Styles.ContainerStyle}>

        {props.children}

        </View>


    );




};
const Styles = {
    ContainerStyle:{
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: '#FFFF',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#ddd',
        position: 'relative'
    }



}
export default CardSection;