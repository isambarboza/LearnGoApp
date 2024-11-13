import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Button, TextInput, ScrollView,TouchableOpacity } from 'react-native';
import { AuthContext } from '../Context/AuthContext';
import DropDown from '../Components/DropDown';


const ProfileScreen = () => {
    const { user } = useContext(AuthContext);


    const [data, setData] = useState('');
    const [nome, setNome] = useState('');
    const [faculdade, setFaculdade] = useState('');
    const [curso, setCurso] = useState('');
    const [email, setEmail] = useState('');

    const [faculdades, setFaculdades] = useState([]);

    async function getFaculdades() {
        await fetch(
            process.env.EXPO_PUBLIC_URL + "api/Faculdade/GetAllFaculdade/",
            {
                method: "GET"
            }
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

    

    async function Salvar() {
        await fetch(
            process.env.EXPO_PUBLIC_URL + 'api/Cadastro/UpdateCadastro/' + user.cadastroId,
            {
                method: "PUT",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    cadastroNomeCompleto: nome,
                    cadastroDataNascimento: data,
                    cadastroFoto: user.cadastroFoto,
                    cadastroRm: user.cadastroRm,
                    cadastroCurso: curso,
                    cadastroEmail: email,
                    cadastroSenha: user.cadastroSenha,
                    cadastroEndereco: user.cadastroEndereco,
                    faculdadeId: faculdade.faculdadeId
                })
            }
        )
        .then(json => {
            console.log(json);
            alert("Alterações realizadas com sucesso!"); 

        })
        .catch(err => {
            console.log(err);
            alert("Ocorreu um erro ao alterar o perfil: " + err.message); 
        });
    }        

    useEffect(() => {
        getFaculdades();

    }, [])

    useEffect(() => {
        if (user) {
            setNome(user.cadastroNomeCompleto);
            setEmail(user.cadastroEmail);
            setCurso(user.cadastroCurso);
            setData(user.cadastroDataNascimento);
            setFaculdade(user.faculdadeId);
        }
    }, [user]);

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            {/* Menu */}
            <View style={styles.menu}>
                <Image
                    source={require('../../assets/LearnGo.png')} // Substitua pelo caminho da sua logo
                    style={styles.logo}
                />
            </View>
            <View style={styles.profileContainer}>
                <View style={styles.profileHeader}>
                    {user.cadastroFoto &&
                        <Image
                            style={styles.profileImage}
                            source={{
                                uri: user.cadastroFoto,
                            }}
                        />
                    }
                    <Text style={styles.nameText}>{user.cadastroNomeCompleto}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoText}>Informações Pessoais</Text>
                    <Text style={styles.labelText}>Nome Completo</Text>
                    <TextInput
                        style={styles.input}
                        value={nome}
                        onChangeText={(value) => setNome(value)}
                    />
                    <Text style={styles.labelText}>Data de Nascimento</Text>
                    <TextInput
                        style={styles.input}
                        value={data}
                        onChangeText={(value) => setData(value)}
                    />
                    <Text style={styles.labelText}>Selecione uma faculdade:</Text>
                    <DropDown label="" data={faculdades} setId={setFaculdade} selecionado={faculdade}/>
                    <Text style={styles.labelText}>Curso</Text>
                    <TextInput
                        style={styles.input}
                        value={curso}
                        onChangeText={(value) => setCurso(value)}
                    />
                    <Text style={styles.labelText}>E-mail</Text>
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={(value) => setEmail(value)}
                    />
                </View>
                <TouchableOpacity style={styles.button} onPress={Salvar}>
                    <Text style={styles.buttonText}>Salvar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        paddingBottom: 30,  // Espaçamento inferior para rolar mais facilmente
    },
    menu: {
        width: '100%',
        height: 70,
        backgroundColor: '#20164d', // Azul escuro
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd', // Adicionando uma linha abaixo do menu
    },
    logo: {
        width: 75,
        height: 57,
        resizeMode: 'contain', // Garantindo que o logo se ajuste sem distorção
    },
    profileContainer: {
        backgroundColor: '#DFD8FF', // Azul claro
        borderRadius: 12,
        padding: 20,
        width: '90%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        marginBottom: 20,
    },
    profileHeader: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 10,
        backgroundColor: '#D9D9D9', // Cinza
        borderWidth: 3,
        borderColor: '#fff', // Adicionando uma borda branca ao redor da imagem
    },
    nameText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#20164d', // Azul escuro
        textAlign: 'center', // Centralizando o nome
    },
    infoContainer: {
        width: '100%',
        backgroundColor: '#fff', // Branco para destacar as informações
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
    },
    infoText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#20164d', // Azul escuro
    },
    labelText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#555',
        marginTop: 15, // Ajustando o espaçamento para mais clareza
    },
    input: {    
        color: '#555',
        backgroundColor: '#e6e6e6',
        borderRadius: 10,
        padding: 12,
        marginBottom: 15,
        width: '100%',
        fontSize: 16,
    },
    button: {
        backgroundColor: '#ff784e',
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
        width: '90%',
        alignItems: 'center', // Garantindo que o texto fique centralizado no botão
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default ProfileScreen;