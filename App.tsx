import {
  Button,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import {ReactElement, ReactNode, useState} from 'react';
import {Checkbox} from 'expo-checkbox';
import Input from './Input/Input';

const tasksUser = [
  {id: 1, title: 'HTML', isDone: true},
  {id: 2, title: 'CSS', isDone: true},
  {id: 3, title: 'JS', isDone: true},
  {id: 4, title: 'React', isDone: true},
  {id: 5, title: 'React native', isDone: false}
]

export default function App() {
  const [value, setValue] = useState('')
  const [show, setShow] = useState(0)
  const [tasks, setTasks] = useState(tasksUser)

  const addTask = () => {
    const newTask = {id: tasks.length + 1, title: value, isDone: false}
    setTasks([...tasks, newTask])
    setValue('')
  }

  const deleteTask = (id: number) => {
    const task = tasks.filter(t => t.id !== id)
    setTasks(task)
  }

  const statusTask = (id: number, isDone: boolean) => {
    const updatedTasks = tasks.map(task =>
        task.id === id ? { ...task, isDone } : task)
    setTasks(updatedTasks)
  }

  const changeTitle = (id: number, title: string) => {
    const updatedTasks = tasks.map((task) =>
        task.id === id ? { ...task, title } : task
    );
    setTasks(updatedTasks)
  }

  return (
    <View style={styles.container}>
      <HideKeyboard>
        <View style={{width: '100%', paddingVertical: 20}}>
          <TextInput style={[styles.input, stylesGlobal.border]} value={value} onChangeText={setValue}/>
        </View>
      </HideKeyboard>
      <Button title={'Add task'} onPress={addTask} color={'#00252f'}/>
      <View style={styles.containerTasks}>
        {tasks.map(t => {
          return <View key={t.id} style={styles.boxTask}>
            <Checkbox
                style={styles.checkbox}
                value={t.isDone}
                onValueChange={(value) => statusTask(t.id, value) }
                color={t.isDone ? '#00252f' : undefined}/>
            {show === t.id
                ? <Input id={t.id} title={t.title} callback={changeTitle} setShow={setShow}/>
                : <Text onPress={() => setShow(t.id)}>{t.title}</Text>}
            {show !== t.id ? <Button title={'X'} onPress={() => deleteTask(t.id)} color={'red'}/> : null}

          </View>
        })}
      </View>
    </View>

  );
}

const HideKeyboard = ({children}: {children: ReactNode}): ReactElement => {
  return <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss}}>
    {children}
  </TouchableWithoutFeedback>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gold',
    color: 'white',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  input: {
    width: '100%',
    padding: 10,
    backgroundColor: '#fff',
    fontSize: 16
  },
  containerTasks: {
    width: '100%',
    paddingTop: 20
  },
  boxTask: {
    width: '100%',
    flexDirection:'row',
    gap: 10,
    alignItems: 'center',
    padding: 5,
    borderWidth: 2,
    borderColor: '#321',
    borderRadius: 5,
    marginBottom: 10
  },
  checkbox: {
    margin: 8,
  },
});

const stylesGlobal = StyleSheet.create({
  border: {
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#321'
  }
});

