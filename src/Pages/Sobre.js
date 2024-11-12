import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';

const Sobre = () => {
    return (
        <View style={styles.container}>
            {/* Menu */}
            <View style={styles.menu}>
                <Image 
                    source={require('../../assets/LearnGo.png')} // Substitua pelo caminho da sua logo
                    style={styles.logo}
                />
            </View>

            {/* Conteúdo da Tela */}
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.title}>Sobre Nós</Text>
                <Text style={styles.description}>
                    Bem-vindo à LearnGo! Nós somos um aplicativo inovador, projetado especialmente para universitários que buscam caronas de forma prática e sustentável. Nosso objetivo é promover a economia colaborativa, reduzir as emissões de gases poluentes e incentivar a interação social entre os estudantes.
                </Text>
                <Text style={styles.subtitle}>Nossos Valores</Text>
                <Text style={styles.description}>
                    - Sustentabilidade: Compromisso com o meio ambiente.{"\n"}
                    - Colaboração: Trabalhando juntos para um futuro melhor.{"\n"}
                    - Comunidade: Construindo relações fortes entre universitários.{"\n"}
                    - Inovação: Sempre buscando novas soluções e melhorias.
                </Text>
                
                {/* Seção de Depoimentos */}
                <Text style={styles.subtitle}>O que nossos usuários dizem</Text>
                <View style={styles.testimonialContainer}>
                    <Text style={styles.testimonial}>
                        "A LearnGo facilitou muito a minha vida como universitário! É ótimo saber que posso contar com colegas para caronas." 
                    </Text>
                    <Text style={styles.userName}>- Ana, Estudante de Engenharia</Text>
                </View>
                <View style={styles.testimonialContainer}>
                    <Text style={styles.testimonial}>
                        "O aplicativo é super fácil de usar e me ajudou a economizar e fazer novos amigos!" 
                    </Text>
                    <Text style={styles.userName}>- Lucas, Estudante de Medicina</Text>
                </View>

                <Text style={styles.subtitle}>Contato</Text>
                <Text style={styles.description}>
                    Para mais informações, entre em contato conosco:{"\n"}
                    E-mail: learnGo@gmail.com{"\n"}
                    Telefone: (14) 99739-4232
                </Text>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF', // Fundo branco
    },
    menu: {
        width: '100%',
        height: 70,
        backgroundColor: '#20164d', // Azul escuro
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 75, 
        height: 57, 
    },
    content: {
        padding: 20,
        flexGrow: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: '#20164d', // Azul escuro
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        color: '#20164d',
    },
    description: {
        fontSize: 16,
        marginVertical: 10,
        color: '#000',
        lineHeight: 24, // Melhorar a legibilidade
        borderWidth: 1, // Borda em volta da descrição
        borderColor: '#20164d', // Cor da borda
        borderRadius: 8, // Cantos arredondados
        padding: 10, // Espaçamento interno
        backgroundColor: '#FFFFFF', // Fundo leve para as seções de descrição
        shadowColor: '#000', // Sombra da descrição
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 2, // Para Android
    },
    testimonialContainer: {
        marginVertical: 10,
        padding: 15,
        borderWidth: 1,
        borderColor: '#20164d',
        borderRadius: 8,
        backgroundColor: '#DFD8FF', // Fundo leve para depoimentos
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 2,
    },
    testimonial: {
        fontSize: 16,
        color: '#333',
        fontStyle: 'italic',
    },
    userName: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'right',
        marginTop: 5,
        color: '#20164d',
    },
});

export default Sobre;