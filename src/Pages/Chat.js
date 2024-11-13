import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image, KeyboardAvoidingView, Platform, Alert, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Ícone de check para indicar mensagem lida

const { width } = Dimensions.get('window');

// Componente de Avaliação com Estrelas
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
          <Text style={star <= currentRating ? styles.starFilled : styles.starEmpty}>★</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const App = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const [rating, setRating] = useState(0);
  const flatListRef = useRef();

  const addMessage = (text, sender) => {
    const newMessage = {
      id: Math.random().toString(),
      text,
      sender,
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    addMessage(inputText, 'user');

    let botResponse = '';
  if (inputText.toLowerCase() === 'olá' && messages.length === 0) {
    botResponse = 'Olá! Eu sou a Nathy, assistente de caronas universitárias. Como posso ajudar?';
  } else if (inputText.toLowerCase() === 'como funciona?') {
    botResponse = 'Nosso sistema conecta universitários que precisam de carona com quem pode oferecer. Basta informar sua localização e destino!';
  } else if (inputText.toLowerCase().includes('carona')) {
    botResponse = 'Para solicitar uma carona, por favor, forneça seu local de partida e destino.';
  } else if (inputText.toLowerCase() === 'horário de funcionamento') {
    botResponse = 'Nosso sistema funciona 24 horas por dia, 7 dias por semana. Você pode solicitar carona a qualquer momento!';
  } else if (inputText.toLowerCase() === 'onde estou localizado?') {
    botResponse = 'Atualmente, não posso acessar sua localização diretamente, mas você pode me informar seu local de partida para que possamos buscar caronas disponíveis.';
  } else if (inputText.toLowerCase() === 'qual é o meu destino?') {
    botResponse = 'Infelizmente, ainda não sei seu destino, mas você pode me informar para que eu possa ajudá-lo a encontrar uma carona.';
  } else if (inputText.toLowerCase() === 'tchau') {
    botResponse = 'Até logo! Agradecemos pela interação. Por favor, avalie nosso atendimento!';
    setShowEmoji(true);
  } else if (inputText.toLowerCase() === 'como posso ajudar alguém com carona?') {
    botResponse = 'Para oferecer uma carona, você precisa informar sua localização atual, o destino e a disponibilidade para o horário desejado.';
  } else if (inputText.toLowerCase() === 'preciso de ajuda') {
    botResponse = 'Claro! Como posso ajudá-lo? Você pode me dizer onde está ou qual seu destino, ou fazer outras perguntas sobre o serviço.';
  } else {
    botResponse = 'Desculpe, não entendi. Você pode tentar perguntar de outra forma?';
  }

    setTimeout(() => addMessage(botResponse, 'bot'), 500);
    setInputText('');
  };

  const handleAttachment = () => {
    Alert.alert('Anexo', 'Busque no seus arquivos, por favor!!.');
  };

  const handleEvaluation = () => {
    Alert.alert('Feedback', 'Muito obrigado pela sua avaliação!', [{ text: 'OK' }]);
    setShowEmoji(false);
  };

  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={({ item }) => (
          <View style={[styles.messageContainer, item.sender === 'user' ? styles.userContainer : styles.botContainer]}>
            {item.sender === 'bot' && (
              <Image source={require('../../assets/Avatar.jpeg')} style={styles.avatar} />
            )}
            <View style={[styles.message, item.sender === 'user' ? styles.userMessage : styles.botMessage]}>
              <Text style={styles.messageText}>{item.text}</Text>
            </View>
            {/* Ícone de check visível para todas as mensagens do bot */}
            {item.sender === 'bot' && (
              <Ionicons name="checkmark-done" size={18} color="#4caf50" style={styles.checkIcon} />
            )}
          </View>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.chatContainer}
      />

      {showEmoji && (
        <View style={styles.emojiContainer}>
          <Text style={styles.emojiText}>Como foi o atendimento?</Text>
          <StarRating rating={rating} onChange={(newRating) => setRating(newRating)} />
          <TouchableOpacity onPress={handleEvaluation} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Enviar Avaliação</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Digite sua mensagem..."
          placeholderTextColor="#888"
        />
        <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  chatContainer: {
    paddingBottom: 10,
    paddingHorizontal: 10,
    justifyContent: 'flex-start',
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 5,
  },
  userContainer: {
    justifyContent: 'flex-end',
  },
  botContainer: {
    justifyContent: 'flex-start',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  message: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: width * 0.75, // Adaptável ao tamanho da tela
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#ff784e',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#DFD8FF',
  },
  messageText: {
    color: '#333',
    fontSize: 16,
  },
  checkIcon: {
    marginLeft: 5,
    alignSelf: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#D9D9D9',
    backgroundColor: '#ffffff',
  },
  attachmentButton: {
    marginRight: 5,
  },
  attachmentButtonText: {
    fontSize: 24,
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 30,
    marginRight: 10,
    backgroundColor: '#f7f7f7',
    color: '#333',
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#ff784e',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emojiContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  emojiText: {
    fontSize: 18,
    marginBottom: 10,
  },
  starContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  starFilled: {
    fontSize: 40,
    color: '#ff784e',
  },
  starEmpty: {
    fontSize: 40,
    color: '#ccc',
  },
  submitButton: {
    backgroundColor: '#ff784e',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;