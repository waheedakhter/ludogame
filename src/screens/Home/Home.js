import React from 'react';
import {View,Text,StyleSheet,TouchableOpacity,Image} from 'react-native';
import NewGameModel from '../../components/NewGameModel/NewGameModel'
export default Home = ({
    isStartGameModalVisible,
    onNewGameButtonPress,
    onCancel,
    onRedInput,
    onYellowInput,
    onBlueInput,
    onGreenInput,
    red,
    yellow,
    green,
    blue,
    onStart
}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.logoStyle}>Ludo Classic</Text>
            <TouchableOpacity style={styles.newGameButton} onPress={onNewGameButtonPress}>
                <Text >New Game</Text>
            </TouchableOpacity>
            <Image source={require('../../images/ludo.png')} style={styles.imageStyle} />
            <NewGameModel
                isStartGameModalVisible={isStartGameModalVisible}
                onCancel={onCancel}
                onRedInput={onRedInput}
                onYellowInput={onYellowInput}
                onBlueInput={onBlueInput}
                onGreenInput={onGreenInput}
                red={red}
                yellow={yellow}
                green={green}
                blue={blue}
                onStart={onStart}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#ff0',
    },
    logoStyle:{
        color:'#f00',
        fontSize:40,
        alignSelf:'center',
        marginTop:100,
        fontWeight:'bold'
    },
    newGameButton:{
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
    imageStyle:{
        width:'70%',
        height:'70%',
        resizeMode:'contain',
        alignSelf:'center'
    }
})


















