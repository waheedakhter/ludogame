import React from 'react';
import {View , StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native';
import { colors } from '../../util/Colors';
import { BLUE, GREEN, RED, YELLOW } from '../../util/Constants';

export default CellBox = ({backgroundColor,position, onPieceSelection, state}) =>{


    const [highlighColor,setHighlightColor] = React.useState(backgroundColor);
    const [isAnimating,setIsAnimating] = React.useState(false);
    const [intervalId,setIntervalId] = React.useState(undefined);
    let shouldRenderBackgroundColor = 1;
    const applyAnimationIfNeeded = () =>{
        if(shouldAnimateForSelection()){
            if(!isAnimating){
                setIsAnimating(true);
                setIntervalId(setInterval(()=>{
                    let color = backgroundColor == colors.white? "#999": colors.white;
                    shouldRenderBackgroundColor++;
                    shouldRenderBackgroundColor%2==0?setHighlightColor(backgroundColor):setHighlightColor(color);
                },400));
            }
        }else{
            clearInterval(intervalId);
            if(isAnimating){
                setIsAnimating(false);
                setHighlightColor(backgroundColor);
            }
        }
    }


    const shouldAnimateForSelection = () =>{
        const { red, blue, yellow, green,turn } = state;
        const playerToCheckFor = turn == RED? red: turn ==YELLOW? yellow: turn == GREEN? green: turn == BLUE?blue: undefined;
        return positionMatchesPlayerPosition(playerToCheckFor) && isMovePossibleFromCurrentPosition();
    }

    const positionMatchesPlayerPosition = (playerToCheckFor) =>{
        const { one, two, three, four } = playerToCheckFor.pieces;
        return one.position == position ||
        two.position == position ||
        three.position == position ||
        four.position == position;
    }
    const shouldRenderPiece = ()=>{
        const { red,yellow, blue, green} = state;
        return red.pieces.one.position == position ||
        red.pieces.two.position == position ||
        red.pieces.three.position == position ||
        red.pieces.four.position == position ||

        yellow.pieces.one.position == position ||
        yellow.pieces.two.position == position ||
        yellow.pieces.three.position == position ||
        yellow.pieces.four.position == position ||

        blue.pieces.one.position == position ||
        blue.pieces.two.position == position ||
        blue.pieces.three.position == position ||
        blue.pieces.four.position == position ||

        green.pieces.one.position == position ||
        green.pieces.two.position == position ||
        green.pieces.three.position == position ||
        green.pieces.four.position == position 
    }

    const getPieceColor = () =>{
        const { red, yellow, blue, green } = state;
        let matched = [];
        red.pieces.one.position == position? matched.push(red.pieces.one):undefined;
        red.pieces.two.position == position? matched.push(red.pieces.two):undefined;
        red.pieces.three.position == position? matched.push(red.pieces.three):undefined;
        red.pieces.four.position == position? matched.push(red.pieces.four):undefined;

        yellow.pieces.one.position == position? matched.push(yellow.pieces.one):undefined;
        yellow.pieces.two.position == position? matched.push(yellow.pieces.two):undefined;
        yellow.pieces.three.position == position? matched.push(yellow.pieces.three):undefined;
        yellow.pieces.four.position == position? matched.push(yellow.pieces.four):undefined;

        blue.pieces.one.position == position? matched.push(blue.pieces.one):undefined;
        blue.pieces.two.position == position? matched.push(blue.pieces.two):undefined;
        blue.pieces.three.position == position? matched.push(blue.pieces.three):undefined;
        blue.pieces.four.position == position? matched.push(blue.pieces.four):undefined;

        green.pieces.one.position == position? matched.push(green.pieces.one):undefined;
        green.pieces.two.position == position? matched.push(green.pieces.two):undefined;
        green.pieces.three.position == position? matched.push(green.pieces.three):undefined;
        green.pieces.four.position == position? matched.push(green.pieces.four):undefined;

        let colorToReturn = colors.white;
        let updateTime = 0;

        matched.filter((matchedPiece)=>{
            if(matchedPiece.updateTime>updateTime){
                updateTime = matchedPiece.updateTime;
                colorToReturn=matchedPiece.color==RED?red.color:matchedPiece.color==YELLOW?yellow.color:matchedPiece.color==GREEN?green.color:matchedPiece.color==BLUE?blue.color:undefined;
            }
        })

        return colorToReturn;
    }

    const getPiece  = () =>{
        const { red,yellow,green,blue, turn } = state;
        let playerToCheckFor = turn == RED? red: turn == YELLOW? yellow:  turn == GREEN? green: turn == BLUE? blue: undefined;
        const { one, two, three, four } = playerToCheckFor.pieces;
        switch(position){
            case one.position:
            return one;
            case two.position:
            return two;
            case three.position:
            return three;
            case four.position:
            return four;
            default:
            return undefined;
        }
    }

    const isMovePossibleFromCurrentPosition = () =>{
        let isMovePossible = false;
        let positionTocheckFor = parseInt(position.substring(1,position.length))
        const { moves } = state;
        moves.forEach((move)=>{
            if(!isMovePossible){
               let possiblePossition =  move==1?18: move==2?17: move==3?16: move ==4? 15: move==5? 14: undefined;
               if(possiblePossition){
                   isMovePossible = positionTocheckFor <= possiblePossition;
               }else if(move==6 && positionTocheckFor<14){
                   isMovePossible = true;
               }
            }
        })

        return isMovePossible;
    }
    applyAnimationIfNeeded();
    let color = state.isWaitingForDiceRoll? backgroundColor : highlighColor;
    return(
        <TouchableOpacity style={[styles.container,{backgroundColor: color}]}
            onPress={()=>{
                if(isMovePossibleFromCurrentPosition()){
                    let piece = getPiece();
                    if(piece){
                        onPieceSelection(piece)
                    }
                }
            }}
        >
           {shouldRenderPiece() && <View style={[styles.pieceStyle,{backgroundColor:getPieceColor()}]}/>}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: colors.white,
        justifyContent:'center'
    },
    pieceStyle:{
        width:15,
        height:15,
        borderColor:"#000",
        borderWidth:1,
        borderRadius:8,
        alignSelf:'center'
    }
})