import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import SelectData from '../Components/SelectData';
import DropDown from '../Components/DropDown';

const TelaCadastro = ({ setCadastro }) => {
    const [nome, setNome] = useState('');
    const [dataNascimento, setDataNascimento] = useState();
    const [rm, setRm] = useState('');
    const [faculdade, setFaculdade] = useState('');
    const [curso, setCurso] = useState('');
    const [senha, setSenha] = useState('');
    const [email, setEmail] = useState('');
    const [endereco, setEndereco] = useState('');

    const [faculdades, setFaculdades] = useState([]);

    async function getFaculdades() {
        await fetch(
            process.env.EXPO_PUBLIC_URL + "api/Faculdade/GetAllFaculdade/",
            { method: "GET" }
        )
            .then(res => res.json())
            .then(json => {
                setFaculdades(json);
            })
            .catch(err => {
                console.error('Erro ao buscar faculdade: ', err);
                Alert.alert('Erro', 'Não foi possível buscar as faculdade.');
            });
    }

    async function Cadastrar() {
        await fetch(
            process.env.EXPO_PUBLIC_URL + 'api/Cadastro/CreateCadastro',
            {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    cadastroNomeCompleto: nome,
                    cadastroDataNascimento: dataNascimento,
                    cadastroEmail: email,
                    cadastroRm: rm,
                    cadastroEndereço: endereco,
                    cadastroCurso: curso,
                    cadastroSenha: senha,
                    faculdadeId: faculdade.faculdadeId
                })
            }
        )
        .then(response => response.json())
        .then(() => {
            Alert.alert(
                "Sucesso!",
                "Cadastro realizado com sucesso!",
                [{ text: "OK", onPress: () => setCadastro(true) }]
            );

            // Limpa os campos após o cadastro
            setNome('');
            setDataNascimento(null);
            setRm('');
            setFaculdade('');
            setCurso('');
            setSenha('');
            setEmail('');
            setEndereco('');
        })
        .catch(err => {
            console.log(err);
            Alert.alert("Erro", "Ocorreu um erro ao se cadastrar: " + err.message);
        });
    }

    useEffect(() => {
        getFaculdades();
    }, []);

    // Função para voltar
    const handleVoltar = () => {
        setCadastro(false); // Atualiza o estado para voltar à tela anterior
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
                    placeholderTextColor="#c2c2c2"
                    value={nome}
                    onChangeText={(value) => setNome(value)}
                />

                <SelectData label="Data De Nascimento" saveDate={setDataNascimento} />
                <TextInput
                    style={styles.input}
                    placeholder="E-mail"
                    placeholderTextColor="#c2c2c2"
                    value={email}
                    onChangeText={(value) => setEmail(value)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Registro de Matrícula (RM)"
                    placeholderTextColor="#c2c2c2"
                    value={rm}
                    onChangeText={(value) => setRm(value)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Endereço"
                    placeholderTextColor="#c2c2c2"
                    value={endereco}
                    onChangeText={(value) => setEndereco(value)}
                />

                <DropDown label="Faculdades" data={faculdades} setId={setFaculdade} selecionado={faculdade} />

                <TextInput
                    style={styles.input}
                    placeholder="Curso"
                    placeholderTextColor="#c2c2c2"
                    value={curso}
                    onChangeText={(value) => setCurso(value)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    placeholderTextColor="#c2c2c2"
                    secureTextEntry
                    value={senha}
                    onChangeText={(value) => setSenha(value)}
                />

                <TouchableOpacity style={styles.button} onPress={Cadastrar}>
                    <Text style={styles.buttonText}>CADASTRA-SE</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.voltarButton} onPress={handleVoltar}>
                    <Text style={styles.voltarButtonText}>Voltar</Text>
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
        height: 55,
        borderColor: '#20164d',
        borderWidth: 3,
        borderRadius: 10,
        marginBottom: 15,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        color: '#20164d',
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
    voltarButton: {
        backgroundColor: '#20164d',
        padding: 15,
        borderRadius: 10,
        marginTop: 10,
    },
    voltarButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default TelaCadastro;
