import { View, Text, Button, StyleSheet, Pressable } from 'react-native';
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from "@expo/vector-icons/Ionicons";
import moment from 'moment';
import "moment/locale/pt-br";
moment.locale("pt-br");

export default function SelectData({ label, saveDate }) {
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date; 
        setShow(false);
        setDate(currentDate);
        saveDate( currentDate );
    }

    return (
        <Pressable style={css.dataContainer} onPress={() => setShow(true)}>
            <Text style={css.label}>{label}</Text>
            <Text style={css.dateText}>{(date) ? moment(date).format("L") : "Selecione"}</Text>
            <Text>
                <Icon name="calendar-outline" size={18} color="#fff" /> 
            </Text>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode="date"
                    is24Hour={true}
                    onChange={onChange}
                    locale="pt-BR"
                    timeZoneName={'America/Sao_Paulo'}
                />
            )}
        </Pressable>
    );
}

const css = StyleSheet.create({
    dataContainer: {
        width: "100%",
        height: 50,
        marginVertical: 20,
        backgroundColor: "#20164d", 
        borderRadius: 10, 
        borderWidth: 1,
        borderColor: "#20164d",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    label: {
        position: "absolute",
        top: -25,
        left: 10,
        color: "#20164d", 
        fontSize: 16,
        fontWeight: 'bold',
    },
    dateText: {
        color: "#fff", 
        fontSize: 16,
    },
});
