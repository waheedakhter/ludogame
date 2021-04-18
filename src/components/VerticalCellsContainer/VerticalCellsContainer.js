import React from 'react';
import {View, StyleSheet,Text} from 'react-native';
import { colors } from '../../util/Colors';
import { B1, B14, B15, B16, B17, B18, B2, B3, B4, B5, G10, G11, G12, G13, G6, G7, G8, G9, R10, R11, R12, R13, R6, R7, R8, R9, TOP_VERTICAL, Y1, Y14, Y15, Y16, Y17, Y18, Y2, Y3, Y4, Y5 } from '../../util/Constants';
import { getCellBackgroundColor } from '../../util/util';
import CellBox from "../CellBox/CellBox";
export default VerticalCellsContainer = ({position,onPieceSelection,state}) =>{

    const column1 = position == TOP_VERTICAL? [R11,R10,R9,R8,R7,R6]:[B5,B4,B3,B2,B1,G13];
    const column2 = position == TOP_VERTICAL? [R12 ,Y14,Y15,Y16,Y17,Y18]:[B18,B17,B16,B15,B14,G12];
    const column3 = position == TOP_VERTICAL? [R13,Y1,Y2,Y3,Y4,Y5]:[G6,G7,G8,G9,G10,G11];

    const renderColumn = (positionsArray) =>{
        return(
            <View style={styles.columnContainer}>
            {positionsArray.map((cellPosition)=>{
                return(
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
    return (
        <View style={styles.container}>
            {renderColumn(column1)}
            {renderColumn(column2)}
            {renderColumn(column3)}
            
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:2,
        backgroundColor:colors.white,
        flexDirection:'row'
    },
    columnContainer:{
        flex:1,
    },
    cellContainer:{
        flex:1, 
        borderColor:'#000',
        borderWidth:1
    }
})