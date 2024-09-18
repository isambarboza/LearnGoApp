import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { useState } from 'react';
import React from 'react'

export default function Inserir() {
  const [clienteNome, setClienteNome] = useState();
  const [clienteEmail, setClienteEmail] = useState();
  const [clienteGenere, setClienteGenere] = useState();

  async function InsertClient() {
    await fetch('http://10.139.75.23:5251/api/Clients/CreateClient/', {
      method: 'POST',
      headers: {
        'content-type': 'application/json; charset-UTF-8',
      },
      body: JSON.stringify({
        clientEmail: clienteEmail,
        clientGenere: clienteGenere,
        clientName: clienteNome
      })
    })
      .then((response) => response.json(), setClienteEmail(''), setClienteGenere(''), setClienteNome(''))
      .then(json => console.log(json))
      .catch(err => console.log(err));
    getClientes();
  }
  return (
    <View style={styles.container}>
      <TextInput
        inputMode="text"
        placeholder='Nome'
        style={styles.input}
        value={clienteNome}
        onChangeText={(digitado) => setClienteNome(digitado)}
        placeholderTextColor='#BFBFBF'
      />
      <TextInput
        inputMode="email"
        placeholder='E-mail'
        style={styles.input}
        value={clienteEmail}
        onChangeText={(digitado) => setClienteEmail(digitado)}
        placeholderTextColor='#BFBFBF'
      />
      <TextInput
        inputMode="text"
        placeholder='Gênero'
        style={styles.input}
        value={clienteGenere}
        onChangeText={(digitado) => setClienteGenere(digitado)}
        placeholderTextColor='#BFBFBF'
      />
      <TouchableOpacity onPress={() => InsertClient()}>
        <Text style={styles.btnCadastrar}>CADASTRAR</Text>
      </TouchableOpacity>

      <Text style={styles.text}>Inserir</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "white",
    flexGrow: 1,
    color: "white",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: "white"
  },
  input: {
    width: 300,
    height: 45,
    borderColor: '#bdc3c7',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    color: '#191919',
},
btnCadastrar:{
  backgroundColor: '#0195fd',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
}
})