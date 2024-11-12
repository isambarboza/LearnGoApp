import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../Context/AuthContext';

const LoginScreen = ({ setCadastro }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState('');

  const {Login, error } = useContext( AuthContext );

  const handleLogin = () => {
    Login( email , password );
  };

  const handlePasswordRecovery = () => {
    if (recoveryEmail === '') {
      Alert.alert('Erro', 'Por favor, insira seu e-mail para recuperação.');
    } else {
      Alert.alert('Sucesso',' E-mail de recuperação enviado para: ${recoveryEmail}');
      setModalVisible(false);
    }
  };

  return (
    <>
      <View style={styles.menu}>
        <Image
          source={require('../../assets/LearnGo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Faça seu Login:</Text>

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#fff"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#fff"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>LOGAR</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setCadastro(true)}>
          <Text style={styles.registrationText}>Não tem cadastro ainda? Cadastre-se!</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={styles.forgotPasswordText}>Esqueci a Senha</Text>
        </TouchableOpacity>
      
       
        <Modal
          transparent={true}
          visible={modalVisible}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Recuperar Senha</Text>

              <TextInput
                style={styles.input}
                placeholder="Digite seu e-mail"
                placeholderTextColor="#fff"
                value={recoveryEmail}
                onChangeText={setRecoveryEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <TouchableOpacity style={styles.recoveryButton} onPress={handlePasswordRecovery}>
                <Text style={styles.recoveryButtonText}>Recuperar Senha</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.closeModalText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#20164d',
  },
  input: {
    borderWidth: 1,
    borderColor: '#20164d',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#20164d',
    color: '#fff',
  },
  loginButton: {
    backgroundColor: '#ff784e',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registrationText: {
    color: '#20164d',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16, 
    fontWeight: '500', 
    textDecorationLine: 'underline', 
    fontWeight: 'bold',
  },
  forgotPasswordText: {
    color: '#20164d',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16, 
    fontWeight: '500', 
    textDecorationLine: 'underline', 
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 7,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 15,
    color: '#20164d',
    fontWeight: 'bold',
  },
  recoveryButton: {
    backgroundColor: '#ff784e',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  recoveryButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  closeModalText: {
    color: '#20164d',
    marginTop: 15,
    fontWeight: 'bold',
  },
  menu: {
    width: '100%',
    height: 70,
    backgroundColor: '#20164d',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100, 
    height: 57, 
  },
});

export default LoginScreen;