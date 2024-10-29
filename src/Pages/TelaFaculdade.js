import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, FlatList, TextInput, Alert } from 'react-native';
import DropDown from '../Components/DropDown';

// Avaliação com Estrelas
const StarRating = ({ rating, onChange }) => {
    const [currentRating, setCurrentRating] = useState(rating || 0);
    const stars = [1, 2, 3, 4, 5];

    const handlePress = (star) => {
        setCurrentRating(star);
        if (onChange) {
            onChange(star);
        }
    };

    return (
        <View style={styles.starContainer}>
            {stars.map((star) => (
                <TouchableOpacity key={star} onPress={() => handlePress(star)}>
                    <Text style={star <= currentRating ? styles.starFilled : styles.starEmpty}>
                        ★
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const TelaFaculdade = () => {

    const faculdades = [
        { title: 'USC- Universidade do Sagrado Coração' },
        { title: 'FIB- Faculdade Integrada de Bauru' },
        { title: 'UNESP- Universidade Estadual Paulista' },
    ];

    const cidades = [
        { title: "Bauru" },
        { title: "Pederneiras" },
        { title: "Jaú" },
    ];

    const [showCarona, setShowCarona] = useState(false);
    const [showOfertaCarona, setShowOfertaCarona] = useState(false);
    const [perfilCarona, setPerfilCarona] = useState(null);
    const [rota, setRota] = useState('');
    const [periodo, setPeriodo] = useState('');
    const [horario, setHorario] = useState('');
    const [vagas, setVagas] = useState('');
    const [carro, setCarro] = useState('');
    const [avaliacao, setAvaliacao] = useState(0);
    const [caronaVagas, setCaronaVagas] = useState([]);

    const [ usuario, setUsuario ] = useState();
    const [ faculdade, setFaculdade ] = useState();
    const [dataNascimento, setDataNascimento] = useState();


    async function getCaronas() {
        
        await fetch(
            process.env.EXPO_PUBLIC_URL + "api/Carona/GetAllCarona",
            {
                method: "GET"
            }
        )
            .then(res => res.json())
            .then(json => {
                setCaronaVagas( json );
            })
            .catch(err => {
                console.error('Erro ao buscar caronas: ', err );
                Alert.alert('Erro', 'Não foi possível buscar as caronas disponíveis.');
            });

    }

    async function getUsuario(id) {
        await fetch(
            process.env.EXPO_PUBLIC_URL + "api/Cadastro/GetById/" + id ,
            {
                method: "GET"
            }
        )
            .then(res => res.json())
            .then(json => {
                setUsuario(json);
                getFaculdade( json.faculdadeId );
            })
            .catch(err => {
                console.error('Erro ao buscar caronas: ', err );
                Alert.alert('Erro', 'Não foi possível buscar as caronas disponíveis.');
            });

    }

    async function getFaculdade(id)
    {
        await fetch(
            process.env.EXPO_PUBLIC_URL + "api/Faculdade/GetById/" + id ,
            {
                method: "GET"
            }
        )
            .then(res => res.json())
            .then(json => {
                setFaculdade( json );
            })
            .catch(err => {
                console.error('Erro ao buscar faculdade: ', err );
                Alert.alert('Erro', 'Não foi possível buscar as faculdade.');
            });

    }

    





    const handleVoltar = () => {
        setShowCarona(false);
        setShowOfertaCarona(false);
        setPerfilCarona(null);
        setAvaliacao(0);
    };


    const handleVerPerfil = (perfil) => {
        setPerfilCarona(perfil);
    };


    const handleConfirmarOferta = async () => {
        try {
            await OfertarCarona(rota, periodo, horario, vagas, carro, 1);
            Alert.alert("Carona Confirmada", "Sua carona foi ofertada com sucesso!");
            setShowOfertaCarona(false);
        } catch (error) {
            Alert.alert("Erro", "Não foi possível ofertar a carona. Tente novamente.");
        }
    };


    const handlePedirCarona = async (carona) => {
        try {
            await SolicitarCarona(carona.id, 1);
            Alert.alert("Carona Solicitada", 'Você solicitou uma carona de ${carona.nome} com sucesso!');
        } catch (error) {
            Alert.alert("Erro", "Não foi possível solicitar a carona. Tente novamente.");
        }
    };


    const handleSalvarAvaliacao = () => {
        if (perfilCarona) {

            const updatedCarona = caronaVagas.map(carona => {
                if (carona.id === perfilCarona.id) {
                    return { ...carona, avaliacao: avaliacao };
                }
                return carona;
            });
            setCaronaVagas(updatedCarona);
            Alert.alert("Avaliação Registrada", "Sua avaliação foi registrada com sucesso!");
            handleVoltar();
        }
    };

    return (
        <View style={styles.container}>
            {/* Menu */}
            <View style={styles.menu}>
                <Image
                    source={require('../../assets/LearnGo.png')}
                    style={styles.logo}
                />
            </View>
            {!showCarona && !showOfertaCarona && !perfilCarona &&
                <>
                <ScrollView contentContainerStyle={styles.content}>
                    <Text style={styles.title}>Selecione uma faculdade:</Text>
                    <DropDown label="Faculdades" data={faculdades} />
                    <Text style={styles.title}>Selecione a cidade:</Text>
                    <DropDown label="Cidades" data={cidades} />
                    <Text style={styles.title}>Carona:</Text>
                    <TouchableOpacity style={styles.button} onPress={() => { getCaronas(); setShowCarona(true); }}>
                        <Text style={styles.buttonText}>Solicitação de carona</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => setShowOfertaCarona(true)}>
                        <Text style={styles.buttonText}>Oferta de carona</Text>
                    </TouchableOpacity>
                    </ScrollView>
                </>
            }

            {/* Tela de Solicitação de Carona */}
            {showCarona && !perfilCarona &&
                <>
                <View contentContainerStyle={styles.content}>
                    <Text style={styles.title}>Caronas Disponíveis:</Text>
                    {caronaVagas &&
                        <FlatList
                            data={caronaVagas}
                            keyExtractor={ (item) => item.caronaId }
                            renderItem={({ item }) =>
                                <View style={styles.caronaItem}>
                                    <Text>Origem: {item.caronaOrigem}</Text>
                                    <Text>Destino: {item.caronaDestino}</Text>
                                    <Text>Horário: {item.caronaHorario}</Text>
                                    <Text>Vagas: {item.caronaVagas}</Text>
                                    <TouchableOpacity style={styles.caronaButton} onPress={() => { getUsuario( item.cadastroId); handleVerPerfil(item); }}>
                                        <Text style={styles.caronaButtonText}>Ver Perfil</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.pedirCaronaButton} onPress={() => handlePedirCarona(item)}>
                                        <Text style={styles.pedirCaronaButtonText}>Pedir Carona</Text>
                                    </TouchableOpacity>
                                </View>                               
                            }                           
                        />                     
                    }
                    <TouchableOpacity style={styles.voltarButton} onPress={handleVoltar}>
                        <Text style={styles.voltarButtonText}>Voltar</Text>
                    </TouchableOpacity>
                    </View>
                </>
            }

            {/* Tela de Oferta de Carona */}
            {showOfertaCarona &&
                <>
                <ScrollView contentContainerStyle={styles.content}>
                    <Text style={styles.title}>Oferecer Carona:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Rota"
                        value={rota}
                        onChangeText={setRota}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Período"
                        value={periodo}
                        onChangeText={setPeriodo}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Horário"
                        value={horario}
                        onChangeText={setHorario}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Vagas Disponíveis"
                        value={vagas}
                        onChangeText={setVagas}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Carro"
                        value={carro}
                        onChangeText={setCarro}
                    />
                    <TouchableOpacity style={styles.button} onPress={handleConfirmarOferta}>
                        <Text style={styles.buttonText}>Confirmar Oferta</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.voltarButton} onPress={handleVoltar}>
                        <Text style={styles.voltarButtonText}>Voltar</Text>
                    </TouchableOpacity>
                    </ScrollView>
                </>
            }

            {/* Tela de Perfil do Caroneiro */}
            {perfilCarona && usuario && faculdade && 
                <>
                <ScrollView contentContainerStyle={styles.content}>
                    <Text style={styles.title}>Perfil de {usuario.cadastroNomeCompleto}</Text>
                    <Image source={{ uri: usuario.cadastroFoto }} style={{ width: 90, height: 90}}/>
                    <Text>E-mail: {usuario.cadastroEmail}</Text>
                    <Text>Data Nascimento: {usuario.cadastroDataNascimento}</Text>
                    <Text>Faculdade: {faculdade.faculdadeNome}</Text>
                    <Text>Curso: {usuario.cadastroCurso}</Text>

                    <Text>Avalie a Carona:</Text>
                    <StarRating rating={avaliacao} onChange={setAvaliacao} />

                    <TouchableOpacity style={styles.salvarButton} onPress={handleSalvarAvaliacao}>
                        <Text style={styles.salvarButtonText}>Salvar Avaliação</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.voltarButton} onPress={handleVoltar}>
                        <Text style={styles.voltarButtonText}>Voltar</Text>
                    </TouchableOpacity>
                    </ScrollView>
                </>
            }

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        
    },
    content: {
        padding: 20,
        flexGrow: 1,
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
        width: 75,
        height: 57,
    },
    title: {
        fontSize: 18,
        marginVertical: 10,
        color: '#20164d',
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#ff784e',
        padding: 15,
        borderRadius: 10,
        marginTop: 10,
    },
    buttonText: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: 'bold',
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
    salvarButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    salvarButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    input: {
        backgroundColor: '#F0F0F0',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
    },
    caronaItem: {
        backgroundColor: '#f0f0f0',
        padding: 15,
        marginVertical: 8,
        borderRadius: 10,
    },
    caronaButton: {
        backgroundColor: '#20164d',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    caronaButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    pedirCaronaButton: {
        backgroundColor: '#ff784e',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    pedirCaronaButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 20,
        alignSelf: 'center',
    },
    starContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 10,
    },
    starFilled: {
        fontSize: 30,
        color: '#FFD700', // Ouro
        marginHorizontal: 5,
    },
    starEmpty: {
        fontSize: 30,
        color: '#CCCCCC', // Cinza
        marginHorizontal: 5,
    },
});

export default TelaFaculdade;