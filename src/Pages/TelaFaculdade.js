import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, FlatList, TextInput, Alert } from 'react-native';
import DropDown from '../Components/DropDown';
import { AuthContext } from '../Context/AuthContext';
import moment from 'moment';

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


    const { user } = useContext(AuthContext);
    const [showCarona, setShowCarona] = useState(false);
    const [showOfertaCarona, setShowOfertaCarona] = useState(false);
    const [perfilCarona, setPerfilCarona] = useState(null);
    
    const [data, setData] = useState('');
    const [horario, setHorario] = useState('');
    const [vagas, setVagas] = useState('');
    const [veiculo, setVeiculo] = useState('');
    const [avaliacao, setAvaliacao] = useState(0);
    const [caronaVagas, setCaronaVagas] = useState([]);
    const [usuario, setUsuario] = useState();
    
    const [dataNascimento, setDataNascimento] = useState();
    
    const [origem, setOrigem] = useState('');
    const [destino, setDestino] = useState();
    const [faculdade, setFaculdade] = useState();
    



    async function getCaronas() {

        await fetch(
            process.env.EXPO_PUBLIC_URL + "api/Carona/FiltroCarona/" + origem + "/" + destino,
            {
                method: "GET"
            }
        )
            .then(res => res.json())
            .then(json => {
                setCaronaVagas(json);
            })
            .catch(err => {
                console.error('Erro ao buscar caronas: ', err);
                Alert.alert('Erro', 'Não foi possível buscar as caronas disponíveis.');
            });

    }

    async function getUsuario(id) {
        await fetch(
            process.env.EXPO_PUBLIC_URL + "api/Cadastro/GetById/" + id,
            {
                method: "GET"
            }
        )
            .then(res => res.json())
            .then(json => {
                setUsuario(json);
                getFaculdade(json.faculdadeId);
            })
            .catch(err => {
                console.error('Erro ao buscar caronas: ', err);
                Alert.alert('Erro', 'Não foi possível buscar as caronas disponíveis.');
            });

    }

    async function getFaculdade(id) {
        await fetch(
            process.env.EXPO_PUBLIC_URL + "api/Faculdade/GetById/" + id,
            {
                method: "GET"
            }
        )
            .then(res => res.json())
            .then(json => {
                setFaculdade(json);
            })
            .catch(err => {
                console.error('Erro ao buscar faculdade: ', err);
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





    async function PedirCarona(item) {
        console.log(item.caronaId);
        console.log(user.cadastroId);
        await fetch(process.env.EXPO_PUBLIC_URL + "api/CaronaHasCadastro/CreateCaronaHasCadastro", {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                caronaId: item.caronaId,
                cadastroId: user.cadastroId
            })
        })
            .then(res => res.json())
            .then(json => console.log(json))
            .catch(err => console.log(err));
    }

    async function OfertarCarona() {

        const datetime = moment( data + horario, "DD/MM/YYYY HH:mm:ss").toDate();
        await fetch(`${process.env.EXPO_PUBLIC_URL}api/Carona/CreateCarona`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                caronaHorario: datetime,
                caronaVagas: vagas,
                caronaVeiculo: veiculo,
                caronaOrigem: origem,
                caronaDestino: destino,
                cadastroId: user.cadastroId
            })
        })
            .then(res => res.json())
            .then(json => {
                console.log(json)
                Alert.alert("Sucesso", "Carona ofertada com sucesso!");

                setOrigem('');
                setDestino('');
                setData('');
                setHorario('');
                setVagas('');
                setVeiculo('');
                
            })
            .catch(err => {
                console.error('Erro!! ', err);
                Alert.alert('Erro', 'Não foi possível ofertar a carona.');
            });




    }



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
                        <Text style={styles.title}>Digite o local de onde você está partindo:</Text>
                        <TextInput
                style={styles.input}
                placeholder="Origem"
                value={origem}
                onChangeText={(text) => setOrigem(text)}
            />
                        
                        <Text style={styles.title}>Digite o local para onde você quer ir:</Text>
                        
                        <TextInput
                style={styles.input}
                placeholder="Destino"
                value={destino}
                onChangeText={(text) => setDestino(text)}
            />
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
        <View style={styles.content}>
            <Text style={styles.title}>Caronas Disponíveis:</Text>
            {caronaVagas &&
                <FlatList
                    data={caronaVagas}
                    keyExtractor={(item) => item.caronaId.toString()}
                    style={styles.caronaList}  // Aplica o tamanho fixo
                    renderItem={({ item }) =>
                        <View style={styles.caronaItem}>
                            <Text>Origem: {item.caronaOrigem}</Text>
                            <Text>Destino: {item.caronaDestino}</Text>
                            <Text>Horário: {item.caronaHorario}</Text>
                            <Text>Vagas: {item.caronaVagas}</Text>
                            <TouchableOpacity style={styles.caronaButton} onPress={() => { getUsuario(item.cadastroId); handleVerPerfil(item); }}>
                                <Text style={styles.caronaButtonText}>Ver Perfil</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.pedirCaronaButton} onPress={() => PedirCarona(item)}>
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
                            placeholder="Destino"
                            value={destino}
                            onChangeText={(digitado) => setDestino(digitado)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Origem"
                            value={origem}
                            onChangeText={(digitado) => setOrigem(digitado)}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Dia"
                            value={data}
                            onChangeText={(digitado) => setData(digitado)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Horário"
                            value={horario}
                            onChangeText={(digitado) => setHorario(digitado)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Vagas Disponíveis"
                            value={vagas}
                            onChangeText={(digitado) => setVagas(digitado)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Veículo"
                            value={veiculo}
                            onChangeText={(digitado) => setVeiculo(digitado)}
                        />
                        <TouchableOpacity style={styles.button} onPress={OfertarCarona}>
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
                    <View style={styles.content}>
                        <View style={styles.infoPerfil}>
                            <Text style={styles.title}>Perfil de {usuario.cadastroNomeCompleto}</Text>
                            <Image source={{ uri: usuario.cadastroFoto }} style={styles.fotoPerfil} />
                            <Text>E-mail: {usuario.cadastroEmail}</Text>
                            <Text>Data Nascimento: {usuario.cadastroDataNascimento}</Text>
                            <Text>Faculdade: {faculdade.faculdadeNome}</Text>
                            <Text>Curso: {usuario.cadastroCurso}</Text>
                        </View>
                        <Text style={{ fontWeight: 'bold' }}>Avalie a Carona:</Text>
                        <StarRating rating={avaliacao} onChange={setAvaliacao} />

                        <TouchableOpacity style={styles.salvarButton} onPress={handleSalvarAvaliacao}>
                            <Text style={styles.salvarButtonText}>Salvar Avaliação</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.voltarButton} onPress={handleVoltar}>
                            <Text style={styles.voltarButtonText}>Voltar</Text>
                        </TouchableOpacity>
                    </View>
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
    infoPerfil: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    fotoPerfil: {
        width: 100,
        height: 100,
        borderRadius: 80,
        marginBottom: 20,
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
        backgroundColor: '#ff784e',
        padding: 15,
        borderRadius: 10,
        marginTop: 10,
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
        padding: 15,
        borderRadius: 10,
        marginTop: 10,
    },
    caronaButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    pedirCaronaButton: {
        backgroundColor: '#ff784e',
        padding: 15,
        borderRadius: 10,
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
    caronaList: {
        height: 300, // Define um tamanho fixo (ajuste conforme necessário)
    },
});

export default TelaFaculdade;