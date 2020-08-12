import React, { useState } from 'react';
import { View, ScrollView, Text,TextInput } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './styles';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem'
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import {Feather} from '@expo/vector-icons'
import api from '../../services/api';
import { useFocusEffect } from '@react-navigation/native';


function TeacherList() {
  const [teachers, setTeachers] = useState([]);
  const [isfiltersVisible, setIsFiltersVisible] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);

  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');

function handleTogleFiltersVisible(){
  setIsFiltersVisible(!isfiltersVisible)
}

useFocusEffect(()=>{
  loadFavorites();
})

function loadFavorites() {
  AsyncStorage.getItem('favorites').then(response => {
    if (response) {
      const favoritedTeachers = JSON.parse(response);
      const favoritedTeachersIds = favoritedTeachers.map(
        (teacher: Teacher) => {
          return teacher.id;
        },
      );

      setFavorites(favoritedTeachersIds);
    }
  });
}


async function handleFiltersSubmit() {
  loadFavorites();

  const response = await api.get('classes', {
    params: {
      subject,
      week_day,
      time,
    },
  });

  
  setIsFiltersVisible(false);
  setTeachers(response.data);
}

  return (
  <View style={styles.container}>
    <PageHeader 
    title="Proffys disponiveis" 
    headerRight={(
      <BorderlessButton onPress={handleTogleFiltersVisible}>
        <Feather name='filter' size={20} color='#FFF' />
      </BorderlessButton>
    )}>

    {isfiltersVisible && ( <View style={styles.searchForm}>
       <Text style={styles.label}>Máteria</Text>
     <TextInput
     placeholderTextColor="#c1bccc" 
     style={styles.input}
     value={subject}
     onChangeText={text => setSubject(text)}
     placeholder="Qual a matéria"
     />
     <View style={styles.inputGroup}>
       <View style={styles.inputBlock}>
       <Text style={styles.label}>Dia da semana</Text>
     <TextInput
     placeholderTextColor="#c1bccc" 
     style={styles.input}
     placeholder="Qual o dia?"
     value={week_day}
     onChangeText={text => setWeekDay(text)}
     />
       </View>

       <View style={styles.inputBlock}>
       <Text style={styles.label}>Horário</Text>
     <TextInput
     placeholderTextColor="#c1bccc" 
     style={styles.input}
     placeholder="Qual horário?"
     value={time}
     onChangeText={text => setTime(text)}
     />
       </View>

     </View>
     <RectButton onPress={handleFiltersSubmit} style={styles.submitButton}>
       <Text style={styles.submitButtonText}>Filtrar</Text>
     </RectButton>
     </View>
    )}
    </PageHeader>

<ScrollView 
style={styles.teacherList}
contentContainerStyle={{
  paddingHorizontal: 16,
  paddingBottom: 16,
}}
>
  {teachers.map((teacher: Teacher) => {
   return (
    <TeacherItem 
    key={teacher.id} 
    teacher={teacher}
    favorited={favorites.includes(teacher.id)}
    />
   )
  })}
    </ScrollView>
  </View>
     );
}

export default TeacherList;