import React from 'react';
import {View,StyleSheet, TouchableOpacity} from 'react-native';
import { colors } from '../../util/Colors';
import { HOME } from '../../util/Constants';
export default PlayerBox = ({color,customStyle,one,two,three,four,onPieceSelection,animateForSelection}) =>{

    const [isAnimating,setIsAnimating] = React.useState(false);
    const [backgroundColor,setBackgroundColor] = React.useState(color);
    const [intervalId,setIntervalId] = React.useState(undefined);
    let shouldRenderBackgroundColor = 1;
    const applyAnimationIfNeeded = () =>{
        if(animateForSelection){
            if(!isAnimating){
                setIsAnimating(true);
                setIntervalId(setInterval(()=>{
                    shouldRenderBackgroundColor++;
                    shouldRenderBackgroundColor%2==0?setBackgroundColor(color):setBackgroundColor(colors.white);
                },400));
            }
        }else{
            clearInterval(intervalId);
            if(isAnimating){
                setIsAnimating(false);
                setBackgroundColor(color);
            }
        }
        
    }
    const renderPiece = (piece) =>{
        if(piece.position==HOME){
            return(
                <TouchableOpacity style={{flex:1}} onPress={()=>{onPieceSelection(piece)}}>
                <View style={[styles.pieceStyle,{backgroundColor:backgroundColor}]}/>
                </TouchableOpacity>
            );
        }
        return(
            <TouchableOpacity style={{flex:1}}>
            <View style={[styles.pieceStyle,{backgroundColor:colors.white}]}/>
            </TouchableOpacity>
        );
    }
    applyAnimationIfNeeded();
    return(
        <View style={[{backgroundColor:color,flex:3},customStyle]}>
            <View style={styles.innerContainer}>
            <View style={styles.piecesContainer}>
            {renderPiece(one)}
            {renderPiece(two)}
            </View>
            <View style={styles.piecesContainer}>
            {renderPiece(three)}
            {renderPiece(four)}
            </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    innerContainer:{
        flex:1,
        backgroundColor:'#fff',
        margin:20,
        borderRadius:20
    },
    piecesContainer:{
        flexDirection:'row',
        flex:1
    },
    pieceStyle:{
        flex:1,
        margin:5,
        borderRadius:25,
        borderWidth:2,
        borderColor: "#000"
    }
})