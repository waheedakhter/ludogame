import React from 'react';
import { View , StyleSheet, Text} from 'react-native';
import { colors } from '../../util/Colors';
import { B10, B11, B12, B13, B6, B7, B8, B9, G1, G14, G15, G16, G17, G18, G2, G3, G4, G5, R1, R14, R15, R16, R17, R18, R2, R3, R4, R5, Y10, Y11, Y12, Y13, Y6, Y7, Y8, Y9 } from '../../util/Constants';
import Dice from '../Dice/Dice';
import CellBox from "../CellBox/CellBox";
import { getCellBackgroundColor } from '../../util/util';
export default HorizontalCellsContainer = ({state,onDiceRoll,onPieceSelection}) =>{
    const renderEmptySpace = () =>{
        return <View style={{flex:3}}/>
    }

    const renderRow = (positionsArray) =>{
        return (
            <View style={{flex:6,flexDirection:'row'}}>
                {positionsArray.map((cellPosition)=>{
                    return (
                        <View style={styles.cellContainer} key={cellPosition}>
                            <CellBox backgroundColor={getCellBackgroundColor(cellPosition)}
                                onPieceSelection={onPieceSelection}
                                state={state}
                                position={cellPosition}
                            />
                        </View>
                    )
                })}
            </View>
        )
    }

    const renderRowsContainer = (array1,array2) =>{
        return (
            <View style={styles.rowsContainer}>
               
                {renderRow(array1)}
                {renderEmptySpace()}
                {renderRow(array2)}
            
             </View>
        )
    }
    return(
        <View style={styles.container}>
            <Dice 
                isRolling = {state.isRolling}
                turn = {state.turn}
                diceNumber = {state.diceNumber}
                onDiceRoll={onDiceRoll}
            />

            {renderRowsContainer([B13,R1,R2,R3,R4,R5],[Y6,Y7,Y8,Y9,Y10,Y11])}

            {renderRowsContainer([B12,R14,R15,R16,R17,R18],[G18,G17,G16,G15,G14,Y12])}
            
            {renderRowsContainer([B11,B10,B9,B8,B7,B6],[G5,G4,G3,G2,G1,Y13])}
            
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 2,
        backgroundColor: colors.white
    },
    rowsContainer:{
        flex:1,
        flexDirection:'row'
    },
    cellContainer:{
        flex:1,
        borderColor:'#000',
        borderWidth:1
    }

})