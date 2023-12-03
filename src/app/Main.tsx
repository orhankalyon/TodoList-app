import React from 'react'
import './App.css'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import {useAppSelector} from './store'
import {RequestStatusType} from './app-reducer'
// import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar'
import {View} from 'react-native';


export function Main() {
    const status = useAppSelector<RequestStatusType>((state) => state.app.status)
    return (
        <div className="App">
            {/*<ErrorSnackbar/>*/}
            <View>
                <TodolistsList/>
            </View>
        </div>
    )
}
