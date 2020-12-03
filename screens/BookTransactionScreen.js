import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity,TextInput, Image } from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';
import AppHeader from '../screens/AppHeader'




export default class TransactionScreen extends React.Component{

    constructor(){
        super();
        this.state={
            hasCameraPermissios: null,
            scanned: false,
            scannedBookId:'',
            buttonState:'normal',
            scannedStudentId:''
        }
    }

    getCameraPermissions=async(id)=>{
        const {status}=await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            //status==="granted" is true when the user has granted the permission
            hasCameraPermissios: status==="granted",
            buttonState: id,
            scanned:false
        })

    }

    handleBarCodeScanned=async({type, data})=>{
        const {buttonState}=this.state
        if(buttonState==='BookId'){
            this.setState({
                scanned:true,
                scannedBookId:data,
                buttonState:'normal'
            })
        }
        else if(buttonState==='StudentId'){
            this.setState({
                scanned:true,
                scannedStudentId:data,
                buttonState:'normal'
            })
        }
    }


    render(){

        const hasCameraPermissios=this.setState.hasCameraPermissios;
        const scanned= this.state.scanned;
        const buttonState=this.state.buttonState

        if(buttonState!=="normal"&&hasCameraPermissios){
            return(
                <BarCodeScanner
                onBarCodeScanned={scanned?undefined:this.handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
                />
            )
        }
        else if(buttonState==="normal"){
            return(
                
                <View style={styles.container}>
                    <AppHeader/>
                    <View style= {{backgroundColor:'pink'}}>
                    

                    
                    </View>

                    <View style={styles.inputView}>
                        <TextInput
                        style={styles.inputBox}
                        placeholder="Author Name"
                        
                        />

                        

                    </View>

                    <View style={styles.inputView}>
                        <TextInput
                        style={styles.inputBox}
                        placeholder="Story Title"
                        
                        />

                        

                    </View>

                    <View style={styles.inputView}>
                        <TextInput
                        multiline
                        style={styles.vv}
                        placeholder="Your Story Goes Like...."
                        
                        />

                        

                    </View>

                    <View style={styles.inputView}>
                        <TouchableOpacity style={styles.ff}>Submit</TouchableOpacity>

                        

                    </View>
                    
                </View>
            )
        }
    }
}

const styles=StyleSheet.create({

    container:{
     flex:1,
     justifyContent:"center",
     alignItems: 'center'
    },

    displayText:{
        fontSize:15,
        textDecorationLine:'underline',

    },
    scannedButton:{
        backgroundColor:'green',
        padding:10,
        margin:10,

    },

    buttonText:{
        fontSize:20,
        textAlign:'center',
        marginTop:10,

    },

    inputView:{
        flexDirection:'row',
        margin:20,
        
    },

    inputBox:{
        width:350,
        height:40,
        borderWidth:1.5,
        fontSize:25,
        color:'pink'
    },
    scanButton:{
        backgroundColor:'green',
        width:50,
        borderWidth:1.5,
        borderLeftWidth:0
    },
    vv:{
        width:350,
        height:300,
        borderWidth:1.5,
        fontSize:25,
        color:'pink',
        
    },
    ff:{
        width: 110,
        height:60,
        backgroundColor: 'pink',
        color: 'black',
        fontWeight:'bold',
        fontSize:30,
        justifyContent:'center',
        alignItems: 'center',
        alignSelf:'center',
        borderRadius:100,
        borderWidth:1.5
    }
})