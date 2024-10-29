import React, { useState, useContext } from 'react';
import { View, Text, Image, StyleSheet, Button, TextInput, ScrollView } from 'react-native';
import { AuthContext } from '../Context/AuthContext';

const ProfileScreen = () => {
  const { user } = useContext(AuthContext);

  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user.cadastroNomeCompleto,
    birthDate: user.cadastroDataNascimento,
    email: user.cadastroEmail,
    college: user.cadastroFaculdade,
    course: user.cadastroCurso,
  });

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (field, value) => {
    setProfileData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleSave = () => {
    alert('Informações salvas com sucesso!');
    setIsEditing(false);
  };

  if (!user) {
    return <Text>Carregando...</Text>;
  }

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
        {/* Foto de Perfil */}
        <View style={styles.profileHeader}>
          <Image
            style={styles.profileImage}
            source={{
              uri: 'https://img.freepik.com/fotos-gratis/retrato-de-uma-jovem-linda-modelo-de-pe-e-sorrindo-para-a-camera-foto-de-alta-qualidade_144627-75055.jpg',
            }} 
          />
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={profileData.name}
              onChangeText={(value) => handleChange('name', value)}
            />
          ) : (
            <Text style={styles.nameText}>{profileData.name}</Text>
          )}
        </View>

        {/* Informações pessoais */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Informações Pessoais</Text>

          {/* Nome Completo */}
          <Text style={styles.labelText}>Nome Completo</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={profileData.name}
              onChangeText={(value) => handleChange('name', value)}
            />
          ) : (
            <Text style={styles.detailText}>{profileData.name}</Text>
          )}

          {/* Data de Nascimento */}
          <Text style={styles.labelText}>Data de Nascimento</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={profileData.birthDate}
              onChangeText={(value) => handleChange('birthDate', value)}
            />
          ) : (
            <Text style={styles.detailText}>{profileData.birthDate}</Text>
          )}

          {/* Faculdade */}
          <Text style={styles.labelText}>Faculdade</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={profileData.college}
              onChangeText={(value) => handleChange('college', value)}
            />
          ) : (
            <Text style={styles.detailText}>{profileData.college}</Text>
          )}

          {/* Curso */}
          <Text style={styles.labelText}>Curso</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={profileData.course}
              onChangeText={(value) => handleChange('course', value)}
            />
          ) : (
            <Text style={styles.detailText}>{profileData.course}</Text>
          )}

          {/* Email */}
          <Text style={styles.labelText}>Email</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={profileData.email}
              onChangeText={(value) => handleChange('email', value)}
            />
          ) : (
            <Text style={styles.detailText}>{profileData.email}</Text>
          )}
        </View>

        {/* Botões de Editar/Salvar */}
        <View style={styles.buttonContainer}>
          {isEditing ? (
            <Button title="Salvar" color="#ff784e" onPress={handleSave} />
          ) : (
            <Button title="Editar" color="#ff784e" onPress={handleEdit} />
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
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
  profileContainer: {
    backgroundColor: '#DFD8FF', // Azul claro
    borderRadius: 10,
    padding: 20,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    backgroundColor: '#D9D9D9', // Cinza
  },
  nameText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#20164d', // Azul escuro
  },
  infoContainer: {
    width: '100%',
    backgroundColor: '#DFD8FF', // Azul claro
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
    marginTop: 10,
  },
  detailText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  input: {
    fontSize: 16,
    color: '#555',
    backgroundColor: '#e6e6e6',
    borderRadius: 8,
    padding: 8,
    marginBottom: 10,
    width: '100%',
  },
  buttonContainer: {
    width: '100%',
    marginTop: 20,
  },
});

export default ProfileScreen;