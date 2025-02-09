import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import * as Location from 'expo-location'; // Expo Location API

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      api: '', // Dados do clima
      location: null, // Localização do dispositivo
      errorMessage: null,
      currentDateTime: '', // Data e hora
    };
  }

  async componentDidMount() {
    await this.getLocation(); // Obtém a localização
    this.getTime(); // Obtém a hora
  }

  // Função para obter a localização do dispositivo
  getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      this.setState({ errorMessage: 'Permissão negada' });
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location }, () => {
      this.pegarDados(); // Chama a função para pegar os dados do clima
    });
  };

  // Função para pegar os dados do clima
  pegarDados = async () => {
    const { latitude, longitude } = this.state.location.coords;
    const link = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=143454aa39bbe3442a890cdbf3f9db36`;

    try {
      const response = await fetch(link);
      const responseJson = await response.json();
      this.setState({ api: responseJson });
    } catch (error) {
      console.error(error);
    }
  };

  // Função para pegar a hora atual via API WorldTime
  getTime = async () => {
    try {
      const response = await fetch(
        'http://worldtimeapi.org/api/timezone/Etc/UTC'
      );
      const data = await response.json();
      const datetime = data.datetime; // Exemplo de resposta: "2024-12-10T12:45:00+00:00"
      const formattedDateTime = this.formatDateTime(datetime);
      this.setState({ currentDateTime: formattedDateTime });
    } catch (error) {
      console.error(error);
    }
  };

  // Função para formatar a data e hora
  formatDateTime = (datetime) => {
    const date = new Date(datetime);
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    };
    return date.toLocaleString('pt-BR', options); // Exibe em português
  };

  render() {
    if (!this.state.api) {
      return (
        <View style={styles.container}>
          <Text> Carregando ... </Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Previsão do Tempo</Text>
          <Text style={styles.dateTime}>{this.state.currentDateTime}{' '}</Text>
          <Image source={require('./clima.png')} style={styles.imagem} />
          <Text style={styles.texto}>
            {this.state.api.name} - {this.state.api.main.temp}ºC
          </Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00BFFF',
    padding: 20,
  },
  title: {
    marginTop: 50,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dateTime: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  imagem: {
    width: 150,
    height: 150,
    marginTop: 30,
    alignSelf: 'center',
    marginVertical: 30,
  },
  texto: {
    marginHorizontal: 20,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});