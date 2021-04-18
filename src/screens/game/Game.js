import React,{Component} from 'react';
import {View,Text,StyleSheet, Dimensions, ToastAndroid, Alert} from 'react-native';
import { colors } from '../../util/Colors';
import PlayerBox from '../../components/PlayerBox/PlayerBox'
import VerticalCellsContainer from '../../components/VerticalCellsContainer/VerticalCellsContainer';
import HorizontalCellsContainer from '../../components/HorizontalCellsContainer/HorizontalCellsContainer';

import { FINISHED,BLUE, BOTTOM_VERTICAL, FOUR, GREEN, HOME, ONE, RED, THREE, TOP_VERTICAL, TWO, YELLOW, R1, Y1, Y9, G1, G9, B1, B9, R9, R2, R3, R4, R5, Y2, Y3, Y5 } from '../../util/Constants';
export default class Game extends Component{
    constructor(props){
        super(props);
        const { red, blue, yellow, green } = colors;
        const {redName,blueName,yellowName,greenName} = props;
        this.state={
            red:this.initPlayer(RED,red),
            yellow:this.initPlayer(YELLOW,yellow),
            green:this.initPlayer(GREEN,green),
            blue:this.initPlayer(BLUE,blue),
            isRolling: false,
            diceNumber: 4,
            moves:[],
            bonusCount: 0,
            animateForSelection:false,
            isWaitingForDiceRoll:true,
            turn: redName!==""? RED: yellowName!==""? YELLOW:greenName!==""?GREEN:blueName!==""?BLUE:undefined,
            diceRollTestData:[1,2,3,4,5,6],
            diceRollTestDataIndex:0,
        }
    }

    initPlayer(playerType,color){
        return{
            pieces:this.initPieces(playerType),
            color:color,
            player:playerType
        }
    }

    initPieces(playerColor){
        let time = new Date().getTime();
        return {
            one:{position:HOME,name:ONE,color:playerColor,updateTime:time},
            two:{position:HOME,name:TWO,color:playerColor,updateTime:time},
            three:{position:HOME,name:THREE,color:playerColor,updateTime:time},
            four:{position:HOME,name:FOUR,color:playerColor,updateTime:time}
        }
    }

    initRedPieces(playerColor){
        let time = new Date().getTime();
        return {
            one:{position:R1,name:ONE,color:playerColor,updateTime:time},
            two:{position:R2,name:TWO,color:playerColor,updateTime:time},
            three:{position:R3,name:THREE,color:playerColor,updateTime:time},
            four:{position:R4,name:FOUR,color:playerColor,updateTime:time}
        }
    }
    initYellowPieces(playerColor){
        let time = new Date().getTime();
        return {
            one:{position:Y1,name:ONE,color:playerColor,updateTime:time},
            two:{position:Y2,name:TWO,color:playerColor,updateTime:time},
            three:{position:Y3,name:THREE,color:playerColor,updateTime:time},
            four:{position:Y5,name:FOUR,color:playerColor,updateTime:time}
        }
    }
    render(){
        return (
            <View style={styles.container}>
                <View style={styles.gameContainer}>
                <View style={styles.twoPlayersContainer}>
                {this.renderPlayerBox(this.state.red,{borderTopLeftRadius:20})}
                <VerticalCellsContainer position={TOP_VERTICAL}
                    state={this.state}
                    onPieceSelection = {(selectedPiece)=>{
                        this.onPieceSelection(selectedPiece);
                    }}
                />
                {this.renderPlayerBox(this.state.yellow,{borderTopRightRadius:20})}
                </View>
                <HorizontalCellsContainer state ={this.state}
                    onDiceRoll={()=>{this.onDiceRoll()}}
                    state={this.state}
                    onPieceSelection = {(selectedPiece)=>{
                        this.onPieceSelection(selectedPiece);
                    }}
                />
                <View style={styles.twoPlayersContainer}>
                {this.renderPlayerBox(this.state.blue,{borderBottomLeftRadius:20})}
                <VerticalCellsContainer position={BOTTOM_VERTICAL}
                    state={this.state}
                    onPieceSelection = {(selectedPiece)=>{
                        this.onPieceSelection(selectedPiece);
                    }}
                />
                {this.renderPlayerBox(this.state.green,{borderBottomRightRadius:20})}
                </View>
                </View>
            </View>
        )
    }

    onDiceRoll(){
        const { diceRollTestDataIndex ,diceRollTestData, animateForSelection} =this.state;
        if(animateForSelection){
            return;
        }
        let updatedDiceRollTestDataIndex = diceRollTestDataIndex + 1;
        if(updatedDiceRollTestDataIndex>=diceRollTestData.length){
            updatedDiceRollTestDataIndex = 0;
        }
        this.setState({isRolling:true,diceNumber:this.getRandomInt(),diceRollTestDataIndex:updatedDiceRollTestDataIndex})
        setTimeout(()=>{
            const { moves, diceNumber, turn } = this.state;
            moves.push(diceNumber);
            if(diceNumber==6){
                if(moves.length==3){
                    this.setState({isRolling:false,moves:[],turn:this.getNextTurn()})
                }else{
                    this.setState({isRolling:false,moves:moves});
                }
            }else{
                this.setState({isRolling:false,moves:moves,isWaitingForDiceRoll:false},()=>{
                    this.updatePlayerPieces(this.state[turn])
                });
            }
            
        },100)
    }

    isPlayerFinished(player){
        const { one,two,three,four} = player.pieces;
        return one.position === FINISHED && two.position === FINISHED && three.position === FINISHED && four.position=== FINISHED;
    }
    getNextTurn(){
        const { turn,yellow,red,green,blue } = this.state;
        const { yellowName,blueName,greenName,redName } = this.props;
        this.setState({isWaitingForDiceRoll:true})
        let isYellowNext = yellowName!= "" && !this.isPlayerFinished(yellow);
        let isGreenNext = greenName!= "" && !this.isPlayerFinished(green);
        let isBlueNext = blueName!= "" && !this.isPlayerFinished(blue);
        let isRedNext = redName!= "" && !this.isPlayerFinished(red);
        if(this.state.bonusCount>0){
            this.setState({bonusCount:this.state.bonusCount-1});
            if(this.isPlayerFinished(this.state[turn])){
                return turn;
            }
        }
        switch(turn){
            case RED:
            return isYellowNext? YELLOW: isGreenNext? GREEN: isBlueNext? BLUE: undefined;
            case YELLOW:
            return isGreenNext? GREEN: isBlueNext? BLUE: isRedNext? RED: undefined;
            case GREEN: 
            return isBlueNext? BLUE: isRedNext? RED: isYellowNext? YELLOW: undefined;
            case BLUE:
            return isRedNext? RED: isYellowNext? YELLOW: isGreenNext? GREEN: undefined;
            default:
                return turn;
        }
    }

    playerHasSingleUnfinishedPiece(player){
        const { one, two, three, four} = player.pieces;
        let countOfUnfinishedPieces = 0;
        one.position!=FINISHED? countOfUnfinishedPieces++ : undefined;
        two.position!=FINISHED? countOfUnfinishedPieces++ : undefined;
        three.position!=FINISHED? countOfUnfinishedPieces++ : undefined;
        four.position!=FINISHED? countOfUnfinishedPieces++ : undefined;
        return countOfUnfinishedPieces == 1;
    }


    playerHasOptionsForMoves(player){
        let countMoveOptions = this.getCountMoveOptions(player);
        return countMoveOptions>1;
    }

    playerHasSinglePossibleMove(player){
        let countMoveOptions = this.getCountMoveOptions(player);
        return countMoveOptions==1;
    }
    
    getCountMoveOptions(player){
        const { one, two , three, four } = player.pieces;
        const { moves } = this.state;
        let hasSix = moves.filter(move=>move==6).length>0

        const isMovePossibleForPosition = (position) =>{
            if(position===FINISHED){
                return false;
            }
            if(position === HOME){
                if(hasSix){
                    return true;
                }
                return false;
            }

            let isMovePossible = false;
            let positionTocheckFor = parseInt(position.substring(1,position.length))
    
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
        let countOfOptions = 0;
        isMovePossibleForPosition(one.position)? countOfOptions++ : undefined;
        isMovePossibleForPosition(two.position)? countOfOptions++ : undefined;
        isMovePossibleForPosition(three.position)? countOfOptions++ : undefined;
        isMovePossibleForPosition(four.position)? countOfOptions++ : undefined;
        return countOfOptions;
    }

    getSinglePossibleMove(player){
        const { one, two , three, four } = player.pieces;
        const { moves } = this.state;
        let hasSix = moves.filter(move=>move==6).length>0

        let possibleMove = undefined;
        const isMovePossibleForPosition = (position) =>{
            if(position===FINISHED){
                return false;
            }
            if(position === HOME){
                if(hasSix){
                    return true;
                }
                return false;
            }

            let isMovePossible = false;
            let positionTocheckFor = parseInt(position.substring(1,position.length))
            
            moves.forEach((move)=>{
                if(!isMovePossible){
                   let possiblePossition =  move==1?18: move==2?17: move==3?16: move ==4? 15: move==5? 14: undefined;
                   if(possiblePossition){
                       isMovePossible = positionTocheckFor <= possiblePossition;
                       isMovePossible? possibleMove = move: undefined;
                   }else if(move==6 && positionTocheckFor<14){
                       isMovePossible = true;
                       possibleMove = moves;
                   }
                }
            })

            return isMovePossible;
        }
        
        if(isMovePossibleForPosition(one.position)){
            return {
                move: possibleMove,
                piece: one
            }
        }
        if(isMovePossibleForPosition(two.position)){
            return {
                move: possibleMove,
                piece: two
            }
        }
        if(isMovePossibleForPosition(three.position)){
            return {
                move: possibleMove,
                piece: three
            }
        }
        if(isMovePossibleForPosition(four.position)){
            return {
                move: possibleMove,
                piece: four
            }
        }
        return undefined;
    }

    getPieceWithPossileMove(player){
        const { one, two , three, four } = player.pieces;
        const { moves } = this.state;
        let hasSix = moves.filter(move=>move==6).length>0

        const isMovePossibleForPosition = (position) =>{
            if(position===FINISHED){
                return false;
            }
            if(position === HOME){
                if(hasSix){
                    return true;
                }
                return false;
            }

            let isMovePossible = false;
            let positionTocheckFor = parseInt(position.substring(1,position.length))
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
        
        if(isMovePossibleForPosition(one.position)){
            return one;
        }
        if(isMovePossibleForPosition(two.position)){
            return two;
        }
        if(isMovePossibleForPosition(three.position)){
            return three;
        }
        if(isMovePossibleForPosition(four.position)){
            return four;
        }
        return undefined;
    }

    movePieceByPosition(piece, move){
        let newPosition = "";
        let position = parseInt(piece.position.substring(1,piece.position.length));
        let cellAreaIndicator = piece.position.substring(0,1);

        if(piece.position==HOME && move==6){
            newPosition = piece.color == RED?R1: piece.color==YELLOW ?Y1: piece.color == GREEN? G1: piece.color==BLUE? B1: undefined;
        }else if(position <=13){
            if( (cellAreaIndicator == "B" && piece.color == RED) ||
                (cellAreaIndicator == "R" && piece.color == YELLOW) ||
                (cellAreaIndicator == "Y" && piece.color == GREEN) ||
                (cellAreaIndicator == "G" && piece.color == BLUE) 
            ){
                if(position + move<=12){
                    newPosition = cellAreaIndicator + (position+move);
                }else{
                    let updatedPosition = (position + move + 1);
                    if(updatedPosition == 19){
                        newPosition = FINISHED;
                    }else{
                       let updatedCellAreaIndicator = cellAreaIndicator == "R" ? "Y" : cellAreaIndicator == "Y"? "G" : cellAreaIndicator == "G"? "B": cellAreaIndicator == "B"? "R": undefined;
                       newPosition = updatedCellAreaIndicator + updatedPosition;
                    }
                }
            }else{
                if(position + move<=13){
                    newPosition = cellAreaIndicator + (position+move);
                }else{
                    let nextPosition = (position + move ) - 13
                    let updatedCellAreaIndicator = cellAreaIndicator == "R" ? "Y" : cellAreaIndicator == "Y"? "G" : cellAreaIndicator == "G"? "B": cellAreaIndicator == "B"? "R": undefined;
                    newPosition = updatedCellAreaIndicator + nextPosition;
                }
            }
        }else{
            if(position+move<=19){
                if(position+move==19){
                    newPosition = FINISHED;
                }else{
                    newPosition = cellAreaIndicator + (position + move);
                }
            }
        }
        if(newPosition!=""){
            piece.position = newPosition;
            piece.updateTime = new Date().getTime();
        }

        if(this.didGetBonusWithNewPosition(piece) && !this.isPlayerFinished(this.state[piece.color])){
            let count = this.state.bonusCount+1;
            this.setState({bonusCount:count},()=>{
                let player = this.state[piece.color]
                if(this.state.moves.length==1){
                    this.updatePlayerPieces(player)
                }else if(this.state.moves.length==0 || this.isPlayerFinished(player)){
                    this.setState({animateForSelection:false,moves:[], turn: this.getNextTurn()})
                }
            })
        }else{
            this.setState(this.state,()=>{
                let player = this.state[piece.color]
                if(this.state.moves.length==1){
                    this.updatePlayerPieces(player)
                }else if(this.state.moves.length==0 || this.isPlayerFinished(player)){
                    this.setState({animateForSelection:false,moves:[], turn: this.getNextTurn()})
                }
            })
    
        }
        
    }

    didGetBonusWithNewPosition(piece){
        if(piece.position==FINISHED){
            return true;
        }
        if(piece.position == R1 || piece.position == R9 || piece.position == Y1 || piece.position == Y9 || piece.position == G1 || piece.position == G9 || piece.position == B1 || piece.position == B9){
            return false;
        } 

        const checkIfPositionMatchesExistingPiece = (piece, player) =>{
            const { one, two, three,four } = player.pieces;
            let positionMatched = false;
            if(piece.position==one.position){
                one.position = HOME;
                positionMatched = true;
            }
            if(piece.position==two.position){
                two.position = HOME;
                positionMatched = true;
            }
            if(piece.position==three.position){
                three.position = HOME;
                positionMatched = true;
            }
            if(piece.position==four.position){
                four.position = HOME;
                positionMatched = true;
            }
            return positionMatched;
        }
        const { red, blue, yellow, green} = this.state;
        if(piece.color !=red.player && checkIfPositionMatchesExistingPiece(piece,red)){
            return true;
        }

        if(piece.color !=yellow.player && checkIfPositionMatchesExistingPiece(piece,yellow)){
            return true;
        }

        if(piece.color !=green.player && checkIfPositionMatchesExistingPiece(piece,green)){
            return true;
        }

        if(piece.color !=blue.player && checkIfPositionMatchesExistingPiece(piece,blue)){
            return true;
        }
        return false;
    }

    updatePlayerPieces(player){
        const { moves } = this.state;
        if(moves.length>=1){
            if(!this.isPlayerFinished(player)){
                if(this.playerHasOptionsForMoves(player)){
                    this.setState({animateForSelection:true});
                }else if(this.playerHasSinglePossibleMove(player)){
                    if(this.playerHasSingleUnfinishedPiece(player)){
                        let singlePossibleMove = this.getSinglePossibleMove(player);
                        if(singlePossibleMove){
                            const indexOf = moves.indexOf(singlePossibleMove.move);
                            if(indexOf>-1){
                                moves.splice(indexOf,1);
                            }
                            this.movePieceByPosition(singlePossibleMove.piece,singlePossibleMove.move);
                        }
                    }else{
                        if(moves.length==1){
                            let piece = this.getPieceWithPossileMove(player);
                            this.movePieceByPosition(piece,moves.shift());
                        }else{
                            this.setState({animateForSelection:true})
                        }
                    }
                }else{
                    this.setState({turn:this.getNextTurn(),moves:[],animateForSelection:false})        
                }
            }else{
                this.setState({turn:this.getNextTurn(),moves:[],animateForSelection:false})    
            }
        }else{
            this.setState({turn:this.getNextTurn(),animateForSelection:false})
        }
    }
    getRandomInt(){
        let randomInt = Math.floor(Math.random() * Math.floor(6));
        return randomInt + 1;
        // const {diceRollTestData,diceRollTestDataIndex} = this.state;
        // return diceRollTestData[diceRollTestDataIndex];
    }
    renderPlayerBox(player,customStyle){
        const {one,two,three,four} = player.pieces;
        customStyle.opacity = this.state.turn == player.player? 1:0.6;
        let hasSix = this.state.moves.filter((move)=>move==6).length>0;
        return(
            <PlayerBox color={player.color}
                animateForSelection={this.state.animateForSelection && this.state.turn == player.player && hasSix}
                one={one}
                two={two}
                three={three}
                four={four}
                customStyle={customStyle}
                onPieceSelection = {(selectedPiece)=>{
                    if(this.state.turn == player.player){
                        this.onPieceSelection(selectedPiece);
                    }
                }}
            />
        )
    }

    onPieceSelection = (selectedPiece) =>{
        if(this.state.isWaitingForDiceRoll){
            return;    
        }

        const { moves } = this.state;
        const player = this.state[selectedPiece.color];
        const { one, two, three, four } = player.pieces;

        if(moves.length==1){
            if(selectedPiece.position == HOME && moves[0]!=6){
                return;
            }
            this.movePieceByPosition(selectedPiece,moves.shift());
        }else if(moves.length>1){
            if(selectedPiece.position==HOME){
                moves.shift();
                selectedPiece.position = selectedPiece.color== RED? R1 : selectedPiece.color== YELLOW ? Y1 : selectedPiece.position == GREEN ? G1 : selectedPiece.position == BLUE? B1: undefined;
                selectedPiece.updateTime = new Date().getTime();
                this.setState(this.state,()=>{
                    if(moves.length==1){
                        if(!this.playerHasOptionsForMoves(player)){
                            this.movePieceByPosition(selectedPiece,moves.shift());
                        }else{
                            const isActivePiece = (piece) => piece.position!=HOME && piece.position!=FINISHED;
                            let activePieces = [];
                            isActivePiece(one)?activePieces.push(one): undefined;
                            isActivePiece(two)?activePieces.push(two): undefined;
                            isActivePiece(three)?activePieces.push(three):undefined;
                            isActivePiece(four)?activePieces.push(four):undefined;
                            let isSamePositionForAllActivePieces = activePieces.every((activePiece)=>activePiece.position==activePieces[0].position);
                            if(isSamePositionForAllActivePieces){
                                this.movePieceByPosition(selectedPiece,moves.shift());
                            }
                        }  
                    }
                })
            }else{
                const onMoveSelected = (selectedMove)=>{
                    if(this.isMovePossibleForPosition(selectedPiece.position,selectedMove)){
                        const index = moves.indexOf(parseInt(selectedMove));
                        if(index>-1){
                            moves.splice(index,1);
                        }
                        this.movePieceByPosition(selectedPiece,selectedMove);
                    }else{
                        ToastAndroid.show("Move not possible",ToastAndroid.LONG);
                    }
                }
                let moveOptions =[];
                let optionOne  = moves[0].toString();
                moveOptions.push({text:optionOne,onPress:()=>{onMoveSelected(optionOne)}});
                let optionTwo = moves.length>1? moves[1].toString(): undefined;
                optionTwo? moveOptions.push({text:optionTwo,onPress:()=>{onMoveSelected(optionTwo)}}):undefined;
                let optionThree = moves.length>2? moves[2].toString(): undefined;
                optionThree? moveOptions.push({text:optionThree,onPress:()=>{onMoveSelected(optionThree)}}):undefined;
                Alert.alert("Select your move","",moveOptions,{cancelable:true});

            }
        }
    }

    isMovePossibleForPosition = (position,move) =>{
        let isMovePossible = false;
        let positionTocheckFor = parseInt(position.substring(1,position.length))

        let possiblePossition =  move==1?18: move==2?17: move==3?16: move ==4? 15: move==5? 14: undefined;
        if(possiblePossition){
            isMovePossible = positionTocheckFor <= possiblePossition;
        }else if(move==6 && positionTocheckFor<14){
            isMovePossible = true;
        }
        
        return isMovePossible;
    }
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        backgroundColor:'#ff0',
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center'
    },
    gameContainer:{
        width:Dimensions.get('screen').width,
        height:Dimensions.get('screen').width,
        borderWidth:2,
        borderColor:'#999',
        borderRadius:20,
        elevation:5,
        backgroundColor:'#fff',
        alignSelf:'center'
    },
    twoPlayersContainer:{
        flex:3,
        flexDirection:'row'
    },
    horizontalCellsContainer:{
        flex:2,
        backgroundColor:'#fff'
    }
})