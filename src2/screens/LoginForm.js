import React, {Component}from 'react';
import { Text,View } from 'react-native';
import firebase from '@firebase/app';
require('firebase/auth');
require('@firebase/database');
require("firebase/firestore");
import Button from '../components/Button';
import Card from '../components/Card';
import CardSection from '../components/CardSection';
import TxtInput from '../components/TxtInput';
import Spinner from '../components/Spinner';
import SignButton from '../components/SignButton';



class LoginForm extends Component{

    
   

    static navigationOptions = {
        
        headerTitle:'Sign In',
        headerTintColor: '#5DA0BA',
        headerStyle: {
            backgroundColor:'black'
        },
        headerLeft: null

    }
    constructor(props){
        super(props);
        this.state={ email:'',
            password:'',
            text:'',
            error:'',
            loading:false,
            user:''

    };
}
    userLog (){
       
        var user = firebase.auth().currentUser;
        if (user!= null) {
            
            this.props.navigation.navigate('Home');
        }
    }
    spinner (){
        if(this.state.loading==true){
            return(<Spinner/>)
        }else{
            return(
            <Button onPress={this.signingIn}>
                Log IN
            </Button>)
        }
    }
    //firebase connection
    signingIn=()=>{
        this.setState({loading:true})
        firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password)
        .then(this.onLoginSuccess)
        .catch( function(error){
            this.setState({loading:false})
            alert(error.message);
            
        }.bind(this)
        );
    }
    signUp=()=>{
        this.props.navigation.navigate('SignUp');
    }
    
    onLoginSuccess=()=>{
        this.setState({email:'',
                        password:'',
                        loading:false
    
        })
        this.props.navigation.navigate('Home');
    }
 
    render(){
        
        
        return(
            <Card>
                <CardSection>
                    <TxtInput 
                    
                    placeholder = '123@gmail.com'
                    label = 'Email :'
                    value={this.state.email}
                    onChangeText={(oCemail) =>this.setState({email: oCemail})}
                    
                    />
                </CardSection>
                <CardSection>
                <TxtInput 
                    sTe = {true} //secureTextEntry
                    placeholder = '123'
                    label = 'Psswrd :'
                    value={this.state.password}
                    onChangeText={(oCpass) =>this.setState({password: oCpass})}
                    
                    />

                </CardSection>

                <Text style={{fontSize:20, alignSelf:'center',color:'red'}}></Text>

                <CardSection>
                   {this.spinner()}
                </CardSection>
                <CardSection>
                    <Button onPress={this.signUp}>
                        Sign up
                    </Button>
                </CardSection>
            </Card>
        )
    }
}
export default LoginForm;