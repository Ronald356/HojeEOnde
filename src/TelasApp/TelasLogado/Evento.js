import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import {
  detalharEvento,
  verificarEventosDeBH,
} from '../../conexoesAPI/chamarAPI';
import COR from '../../constants/cor';

import {useNavigation} from '@react-navigation/native';

export default function EventoScreen() {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState('');
  const [resultado, setResultado] = useState('');
  const [pagina, setPagina] = useState(1);
  const [carregandoMais, setCarregandoMais] = useState(false);
  const [fimLista, setFimLista] = useState(false);

  const navigation = useNavigation();

  const buscarEventos = async (paginaParaBuscar = 0) => {
    try {
      const data = await verificarEventosDeBH(paginaParaBuscar);
      if (paginaParaBuscar === 0) {
        setEventos(data); // Primeira página, substitui
      } else {
        setEventos(prev => [...prev, ...data]); // Outras páginas, adiciona
      }
    } catch (error) {
      console.error('Erro ao buscar eventos:', error);
    } finally {
      setLoading(false);
      setCarregandoMais(false);
    }
  };

  useEffect(() => {
    buscarEventos(1);
  }, []);

  const carregarMais = async () => {
    if (carregandoMais || fimLista) return; // evita múltiplas chamadas e quando não tem mais páginas
    setCarregandoMais(true);

    try {
      const novaPagina = pagina + 1;
      const data = await verificarEventosDeBH(novaPagina); // passando a página na chamada

      if (data.length === 0) {
        setFimLista(true); // sem mais dados
      } else {
        setEventos(prev => [...prev, ...data]);
        setPagina(novaPagina);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setCarregandoMais(false);
    }
  };

  const buscarIrParaDetalhesEvento = async () => {
    const urlEvento =
      'https://portalbelohorizonte.com.br/eventos/performance/lgbt/festa-wig-brunch';

    try {
      const detalhes = await detalharEvento(urlEvento);
      console.log(detalhes);
    } catch (error) {
      console.error(error);
    }
  };

  const symplaEventos = async () => {
    const url = 'https://api.sympla.com.br/public/v1.5.1/events';
    const token =
      '2dd111d0e143dca194ad3976d57bc88861b6699598bad2918afefc54151cad19';

    try {
      const response = await fetch(
        `${url}?from=2025-05-01%2000:00:00&published=true&page_size=10&page=1`,
        {
          method: 'GET',
          headers: {
            headers: {
              S_TOKEN:
                '2dd111d0e143dca194ad3976d57bc88861b6699598bad2918afefc54151cad19',
            },
          },
        },
      );

      if (!response.ok) {
        throw new Error(`Erro: ${response.status}`);
      }

      const data = await response.json();
      setResultado(JSON.stringify(data, null, 2));
      console.warn(data, 'aqui3');
    } catch (error) {
      setResultado(error.message);
    }
  };

  useEffect(() => {
    buscarEventos();
    symplaEventos();
  }, []);

  // Filtra eventos dinamicamente
  const eventosFiltrados = eventos.filter(item =>
    item.titulo.toLowerCase().includes(busca.toLowerCase()),
  );

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate('DetalhesEvento', {
            linkEvento: item.linkEvento,
            tituloEvento: item.titulo,
            corDominante: item.corDominante,
            corSecundaria: item.corSecundaria,
            imagem: item.imagem,
          })
        }>
        <Image source={{uri: item.imagem}} style={styles.imagem} />
        <View style={styles.cardContent}>
          <Text style={styles.titulo}>{item.titulo}</Text>
          <Text style={styles.descricao}>{item.descricao}</Text>
          <Text style={styles.dataHorario}>
            {item.dataEvento} - {item.horario}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Buscar por nome do evento"
        placeholderTextColor={COR.cinzaMedio}
        value={busca}
        onChangeText={setBusca}
      />

      <FlatList
        data={eventosFiltrados}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.lista}
        onEndReached={carregarMais}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() =>
          carregandoMais ? (
            <ActivityIndicator size="small" color="#00aaff" />
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  input: {
    borderWidth: 1,
    borderColor: COR.corCCC,
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: COR.branco,
    color: COR.preto,
  },
  lista: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    overflow: 'hidden',
  },
  imagem: {
    width: '100%',
    height: 180,
  },
  cardContent: {
    padding: 10,
  },
  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  descricao: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  dataHorario: {
    fontSize: 12,
    color: '#999',
  },
  mensagem: {
    textAlign: 'center',
    marginTop: 20,
    color: '#999',
  },
});
