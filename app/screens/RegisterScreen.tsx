import React from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../types/screenprops';
import { StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNPickerSelect from 'react-native-picker-select';

type Props = NativeStackScreenProps<StackParamList, 'Register'>

interface RegisterData {
    email: string;
    password: string;
    insurance: string;
}

const RegisterScreen = ({ navigation }: Props) => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: { email: '', password: '', insurance: '' },
  });

  const onSubmit = async (data: RegisterData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', data);
      if (response.data.token) {
        await AsyncStorage.setItem('authToken', response.data.token);
        navigation.navigate('Map');
      }
    } catch (error) {
      Alert.alert('Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Register</Text>

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={value}
            onChangeText={onChange}
            secureTextEntry
          />
        )}
      />
      <Text>Health Insurance Provider</Text>
      <Controller
        control={control}
        name="insurance"
        render={({ field: { onChange, value } }) => (
          <RNPickerSelect
            onValueChange={onChange}
            value={value}
            items={[
              { label: 'Blue Cross', value: 'Blue Cross' },
              { label: 'Aetna', value: 'Aetna' },
              { label: 'Humana', value: 'Humana' },
              { label: 'United Healthcare', value: 'United Healthcare' },
              { label: 'Cigna', value: 'Cigna'}
            ]}
          />
        )}
      />

      <Button title="Register" onPress={handleSubmit(onSubmit)} />
      <Button title="Go to Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      justifyContent: 'center',
      backgroundColor: '#f5f5f5',
    },
    header: {
      fontSize: 32,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 20,
    },
    input: {
      height: 50,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 8,
      paddingLeft: 10,
      marginBottom: 15,
      backgroundColor: '#fff',
    },
    loginButton: {
      marginTop: 10,
    },
  });
  

  const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      height: 50,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 8,
      paddingLeft: 10,
      marginBottom: 15,
      backgroundColor: '#fff',
    },
    inputAndroid: {
      height: 50,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 8,
      paddingLeft: 10,
      marginBottom: 15,
      backgroundColor: '#fff',
    },
  });
