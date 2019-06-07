import React  from 'react';
import {View,Text,TouchableOpacity} from 'react-native';


const SignButton = (props) => {
    return (
        <TouchableOpacity 
            onPress={props.onPress}
            style={styles.buttonStyle}
            >
        <Text style={styles.textStyle   }>{props.children}</Text>
        </TouchableOpacity>

    )

}
const styles={
    buttonStyle: {
        flex: 1, //expand to fill much content as can
        alignSelf: 'stretch', //stretch to fill the container
        // borderRadius: 5,
        // borderWidth: 1,
        // borderColor: '#fff',
        marginLeft: 5,
        marginRight: 5
    },
    textStyle :{
        alignSelf: 'center',
        color : '#fff',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10

    }
}
export default SignButton;