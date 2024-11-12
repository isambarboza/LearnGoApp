import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

export default function DropDown({ data, label, setId, selecionado }) {
    const[ faculdadeNome, setFaculdadeNome ] = useState("");

    useEffect( () => {
        if( selecionado > 0 && data.length > 0 ) {
            const faculdade = data.filter( item => ( item.faculdadeId == selecionado ) );
            if( faculdade ) {
                setFaculdadeNome( faculdade[0].faculdadeNome );
            }
        }
        
    }, [selecionado, data ] )

    return (
        <SelectDropdown
            data={data}
            onSelect={(selectedItem, index) => {
                if( selectedItem.faculdadeId  ){
                    setId( selectedItem );
                }
                
              }}
            renderButton={(selectedItem, isOpened) => {
                return (
                    <View style={css.select}>
                        <Text style={css.label}>{label}</Text>
                        <Text style={css.text}>
                            { ( selectedItem && selectedItem.faculdadeNome ) && selectedItem.faculdadeNome }
                            { selecionado && !selectedItem && faculdadeNome }
                            { (!selectedItem && !selecionado ) &&  "Selecionado" }

                        </Text>
                        <Icon name={isOpened ? "chevron-up" : "chevron-down"} color="#DFD8FF" />
                    </View>
                );
            }}
            renderItem={(item, index, isSelected) => {
                return (
                    item.faculdadeNome ? 
                    <View style={{ ...css.dropdownItemStyle, ...(isSelected && { backgroundColor: '#DFD8FF' }) }}>
                        <Text style={css.dropdownItemTxtStyle}>{item.faculdadeNome}</Text>
                    </View>
                    :
                    <View style={{ ...css.dropdownItemStyle, ...(isSelected && { backgroundColor: '#DFD8FF' }) }}>
                        <Text style={css.dropdownItemTxtStyle}>{item.title}</Text>
                    </View>
                    
                );
            }}
            showsVerticalScrollIndicator={false}
            dropdownStyle={{ padding: 10, borderRadius: 8 }}

        />
    );
}

const css = StyleSheet.create({
    select: {
        width: "100%",
        height: 50,
        marginVertical: 20,
        backgroundColor: "#20164d",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "lightgrey",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 7,
    },
    label: {
        position: "absolute",
        top: -25,
        left: 0,
        fontSize: 16, 
        color: '#20164d', 
        fontWeight: 'bold',
    },
    text: {
        fontSize: 16, 
        color: '#fff', 
    },
    dropdownItemStyle: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
        borderRadius: 8
       
    },    
    dropdownItemTxtStyle: {
        flex: 1,
        fontSize: 16, 
        fontWeight: '500',
    },
    
});

