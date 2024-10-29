import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import SelectData from '../Components/SelectData';
import DropDown from '../Components/DropDown';

const TelaCadastro = ({setCadastro}) => {
    const [nome, setNome] = useState('');
    const [dataNascimento, setDataNascimento] = useState(new Date());
    const [rm, setRm] = useState('');
    const [faculdade, setFaculdade] = useState('');
    const [curso, setCurso] = useState('');
    const [senha, setSenha] = useState('');
    const [email, setEmail] = useState('');
    const [endereco, setEndereco] = useState('');

    const faculdades = [
        { title: 'USC- Universidade do Sagrado Coração' },
        { title: 'FIB- Faculdade Integrada de Bauru' },
        { title: 'UNESP- Universidade Estadual Paulista' },
    ];
    const cursos = [{ title: 'Administração' }, { title: 'Engenharia Civil' }, { title: 'Psicologia' }];

    const handleCadastro = () => {
        console.log('Cadastro enviado');
        setCadastro( false );
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
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Faça seu Cadastro</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Nome Completo"
                    placeholderTextColor="#fff"
                    value={nome}
                    onChangeText={setNome}
                />

                <SelectData label="Data De Nascimento" />
                <TextInput
                    style={styles.input}
                    placeholder="E-mail"
                    placeholderTextColor="#fff"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Registro de Matrícula (RM)"
                    placeholderTextColor="#fff"
                    value={rm}
                    onChangeText={setRm}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Endereço"
                    placeholderTextColor="#fff"
                    value={endereco}
                    onChangeText={setEndereco}
                />

                <DropDown label="Faculdades" data={faculdades} />
                <DropDown label="Cursos" data={cursos} />

                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    placeholderTextColor="#fff"
                    secureTextEntry
                    value={senha}
                    onChangeText={setSenha}
                />

                <TouchableOpacity style={styles.button} onPress={handleCadastro}>
                    <Text style={styles.buttonText}>CADASTRA-SE</Text>
                </TouchableOpacity>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#fff',
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
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
        color: '#20164d',
        letterSpacing: 1.5,
    },
    input: {
        height: 45,
        borderColor: '#20164d',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 15,
        paddingHorizontal: 10,
        backgroundColor: '#20164d',
        color: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    button: {
        backgroundColor: '#ff784e',
        paddingVertical: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
        marginTop: 30,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        letterSpacing: 1,
    },
});

export default TelaCadastro;
