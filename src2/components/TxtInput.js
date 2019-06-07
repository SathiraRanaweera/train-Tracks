import React  from 'react';
import {View,Text,TextInput} from 'react-native';


const TxtInput = (props) => {
    return(
        <View style={styles.containerStyles}>
            <Text style={styles.labelStyles}>
                {props.label}
            </Text>
            <TextInput
                secureTextEntry={props.sTe}
                placeholder = {props.placeholder}
                style = {styles.inputStyles}
                value = {props.value}
                onChangeText = {props.onChangeText}
                //style = {{height:40, width:100}}
            />
        </View>
    )
};
const styles ={
     inputStyles:{
      color:'#000',
      paddingRight: 5,
      paddingLeft: 5,
      fontSize: 18,
      lineHeight: 23,
      flex: 2
     }, 
     labelStyles:{      
      fontSize: 18,
      paddingLeft: 20,
      flex: 1

     },
     containerStyles:{
         height:40,
         flex: 1,
         flexDirection: 'row',
         alignItems: 'center'

     }

}
export default TxtInput;