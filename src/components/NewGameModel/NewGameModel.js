import React, {Component} from 'react'
import {View,ScrollView,Modal, StyleSheet, Text, TextInput, TouchableOpacity,Alert} from 'react-native'


export default class NewGameModel extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(<Modal
            
            transparent={true}
            onRequestClose={()=>{}}
            visible={this.props.isStartGameModalVisible}
        >
            <ScrollView>
                <View style={styles.modalStyle}>
                    <View style={styles.modalContainer}>
                    <Text style={{color:'#f00',marginBottom:10}}>Red Player Name</Text>
                    <TextInput style={[styles.nameInputStyle,styles.redInputStyle]}
                        onChangeText={this.props.onRedInput}
                    />
                    <Text style={{color:'#ffd520',marginBottom:10}}>Yellow Player Name</Text>
                    <TextInput style={[styles.nameInputStyle,styles.yellowInputStyle]}
                        onChangeText={this.props.onYellowInput}
                    />
                    <Text style={{color:'#0F0',marginBottom:10}}>Green Player Name</Text>
                    <TextInput style={[styles.nameInputStyle,styles.greenInputStyle]}
                        onChangeText={this.props.onGreenInput}
                    />
                    <Text style={{color:'#00f',marginBottom:10}}>Blue Player Name</Text>
                    <TextInput style={[styles.nameInputStyle,styles.blueInputStyle]}
                        onChangeText={this.props.onBlueInput}
                    />
                    <TouchableOpacity style={styles.buttonStyle} onPress={this.props.onCancel}>
                    <Text>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonStyle} onPress={()=>{
                        let minPlayersCount =0;
                        this.props.red.name!=""?minPlayersCount++:undefined;
                        this.props.yellow.name!=""?minPlayersCount++:undefined;
                        this.props.blue.name!=""?minPlayersCount++:undefined;
                        this.props.green.name!=""?minPlayersCount++:undefined;
                        if(minPlayersCount>=2){
                            this.props.onStart();
                        }else{
                            Alert.alert("Minimum 2 Players", "At least 2 players are required to start the game.",
                            [
                                {text:"Ok"}
                            ]
                            );
                        }
                    }}>
                    <Text>New Game</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </Modal>
        )
    }
}

const styles = StyleSheet.create({
    modalStyle:{
        width:"100%",
        height:"100%",
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
    },
    modalContainer:{
        marginTop:20,
        backgroundColor:'#fff',
        width:'70%',
        height:undefined,
        padding:10,
        elevation:5,
        zIndex:5,
        borderRadius:10
    },
    nameInputStyle:{
        marginBottom:20,
        borderWidth:1
    },
    redInputStyle:{
        backgroundColor:'#ffefef',
        borderColor:'#ffcccc'
    },
    yellowInputStyle:{
        backgroundColor:'#ffd',
        borderColor:'#ffd520'
    },
    blueInputStyle:{
        backgroundColor:'#ddf',
        borderColor:'#00f'
    },
    greenInputStyle:{
        backgroundColor:'#dfd',
        borderColor:'#0f0'
    },
    buttonStyle:{
        backgroundColor:'#fff',
        width:200,
        padding:10,
        borderColor:'#ddd',
        borderWidth:2,
        borderRadius:10,
        alignSelf:'center',
        marginTop:20,
        alignItems:'center',
        elevation:4,
    },
  
})























//<Text style={{color:"#f00",marginBottom:10}}>{"Red Player Name"}</Text>
//<TextInput style={[styles.nameInputStyle,styles.redInputStyle]} 
    // onChangeText={onInput}
///>
// nameInputStyle:{
//     marginBottom:20,
//     borderWidth:1
// },
// redInputStyle:{
//     backgroundColor:'#ffefef',
//     borderColor:'#ffcccc',
//   },
//   yellowInputStyle:{
//     backgroundColor:'#ffffef',
//     borderColor:"#ff0",
//   },
//   greenInputStyle:{
//     backgroundColor:'#efffef',
//     borderColor:'#ccffcc',
//   },
//   blueInputStyle:{
//     backgroundColor:'#efefff',
//     borderColor:'#ccccff',
//   },