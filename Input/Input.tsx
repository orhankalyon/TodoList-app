import React, {FC, useState} from 'react';
import {Button, StyleSheet, TextInput} from 'react-native';

type Props = {
    id: number
    title: string
    callback: (id: number, title: string) => void
    setShow: (id: number) => void
}

const Input:FC<Props> = ({id, title, callback, setShow}) => {
    const [value, setValue] = useState(title)

    const updateTitle = ( title: string) => {
        setValue(title)
    }

    const handleUpdate = () => {
        callback(id, value)
        setShow(0)
    }

    return (
        <>
            <TextInput style={[styles.input]} value={value} onChangeText={(title) => updateTitle(title)}/>
            <Button title={'+'} onPress={handleUpdate} color={'green'}/>
        </>
    );
};

export default Input;

const styles = StyleSheet.create({
    input: {
        width: '72%',
        padding: 10,
        backgroundColor: '#fff',
        fontSize: 14,
        borderRadius: 5
    },
})