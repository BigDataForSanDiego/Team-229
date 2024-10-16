import React from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../types/screenprops';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LoginData {
    email: string
    password: string
}

type Props = NativeStackScreenProps<StackParamList, 'Login'>

const LoginScreen = ({route, navigation }: Props) => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data: LoginData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', data);
      if (response.data.token) {
        await AsyncStorage.setItem('authToken', response.data.token);
        navigation.navigate('Map');
      }
    } catch (error) {
      Alert.alert('Something went wrong');
    }
  };

  return (
    <View>
      <Text>Login</Text>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput
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
            placeholder="Password"
            value={value}
            onChangeText={onChange}
            secureTextEntry
          />
        )}
      />
      <Button title="Login" onPress={handleSubmit(onSubmit)} />
      <Button title="Go to Register" onPress={() => navigation.navigate('Register')} />
    </View>
  );
};

export default LoginScreen;