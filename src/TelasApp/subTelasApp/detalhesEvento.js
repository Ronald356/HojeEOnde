import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {FontAwesome, MaterialIcons} from '@expo/vector-icons';
import {detalharEvento} from '../../conexoesAPI/chamarAPI';
import MapView, {Callout, Marker} from 'react-native-maps';
import COR from '../../constants/cor';
import FONTES from '../../constants/fonts';
import estiloMapaBranco from '../../componentes/customMapStyle';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from '../../constants/Ionicons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {FlatList} from 'react-native-gesture-handler';

const width = Dimensions.get('window').width;

export default function DetalhesEventoScreen() {
  const route = useRoute();
  const {linkEvento, tituloEvento} = route.params;

  const [detalhes, setDetalhes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [coords, setCoords] = useState(null);
  const [nomeInstagram, setNomeInstagram] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const flatListRef = useRef(null);

  const currentIndexRef = useRef(currentIndex);
  const autoScrollTimer = useRef(null);

  useEffect(() => {
    carregaDados();
  }, []);

  useEffect(() => {
    obterCoordenadas();
  }, [detalhes]);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    const timer = setInterval(() => {
      let nextIndex = currentIndexRef.current + 1;
      if (nextIndex >= detalhes.imagensUrls.length) {
        nextIndex = 0;
      }
      flatListRef.current?.scrollToIndex({index: nextIndex, animated: true});
      setCurrentIndex(nextIndex);
    }, 4000);

    return () => clearInterval(timer);
  }, [detalhes]);

  const carregaDados = async () => {
    try {
      const data = await detalharEvento(linkEvento);
      setDetalhes(data);

      const urlInstagram = data?.redeSocial || null;

      const extrairNomeInstagram = url => {
        if (!url) return null;
        const partes = url.split('.com/');
        if (partes.length > 1) {
          return partes[1].split('/')[0];
        }
        return null;
      };

      const nomeInstagram = extrairNomeInstagram(urlInstagram);
      setNomeInstagram(nomeInstagram);
    } catch (error) {
      console.error('Erro ao buscar detalhes:', error);
    } finally {
      setLoading(false);
    }
  };

  const obterCoordenadas = async () => {
    if (!detalhes || !detalhes.titulo) return;

    const textoLocalizacao = detalhes.titulo.includes('Localização')
      ? detalhes.titulo.split('Localização')[1].split('Informações')[0].trim()
      : null;

    console.log('Texto localização:', textoLocalizacao);
    if (!textoLocalizacao) return;

    const match = textoLocalizacao.match(/(Rua|Avenida|Travessa).*/);
    const endereco = match
      ? `${match[0]}, Belo Horizonte`
      : `${textoLocalizacao}, Belo Horizonte`;

    console.log('Endereço limpo:', endereco);

    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      endereco,
    )}&key=AIzaSyBKgJF0yP2dkClE1jKpK0rAm0YNfOiZODk`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.status === 'OK') {
        const {lat, lng} = data.results[0].geometry.location;
        setCoords({latitude: lat, longitude: lng});
      } else {
        console.warn('Geocoding falhou:', data.status);
      }
    } catch (error) {
      console.error('Erro no fetch do geocoding:', error);
    }
  };

  if (loading) {
    return (
      <ActivityIndicator size="large" color="#00aaff" style={styles.loading} />
    );
  }

  if (!detalhes) {
    return (
      <Text style={styles.erro}>Erro ao carregar detalhes do evento.</Text>
    );
  }

  console.log(detalhes.redeSocial, 'aa');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Imagem do Evento */}

      <View style={{position: 'relative'}}>
        <FlatList
          ref={flatListRef}
          data={detalhes.imagensUrls}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          snapToInterval={width} // pode deixar ou tirar, pagingEnabled já faz snap
          snapToAlignment="start" // opcional
          decelerationRate="fast" // melhora a velocidade do snap
          onMomentumScrollEnd={event => {
            const index = Math.floor(event.nativeEvent.contentOffset.x / width);
            setCurrentIndex(index);
          }}
          renderItem={({item}) => (
            <Image
              source={{uri: item}}
              style={{width, height: 200}} // altura fixa para exemplo
              resizeMode="cover"
            />
          )}
          keyExtractor={(_, index) => String(index)}
        />

        <View
          style={[
            styles.pagination,
            {position: 'absolute', bottom: 20, left: 0, right: 0},
          ]}>
          {detalhes.imagensUrls.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentIndex === index ? styles.dotActive : styles.dotInactive,
              ]}
            />
          ))}
        </View>
      </View>

      <View style={styles.secao}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 6,
          }}>
          <Ionicon
            name={Ionicons.relatorio}
            size={25}
            color="purple"
            style={{marginRight: 8}}
          />
          <View style={{top: 2}}>
            <Text style={styles.subtitulo}>Descrição</Text>
          </View>
        </View>
        <Text style={styles.texto}>
          {detalhes.titulo.includes('Descrição')
            ? detalhes.titulo
                .split('Descrição')[1]
                .split('Localização')[0]
                .trim()
            : 'Descrição não disponível.'}
        </Text>
      </View>

      {/* Seção: Localização */}
      <View style={styles.secao}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 6,
          }}>
          <Ionicon
            name={Ionicons.pin}
            size={23}
            color="purple"
            style={{marginRight: 8}}
          />
          <View style={{top: 2}}>
            <Text style={styles.subtitulo}>Localização</Text>
          </View>
        </View>
        <Text style={styles.texto}>
          {detalhes.titulo.includes('Localização')
            ? detalhes.titulo
                .split('Localização')[1]
                .split('Informações')[0]
                .trim()
            : 'Localização não disponível.'}
        </Text>

        {/* Mapa incorporado */}
        <View style={styles.mapaContainer}>
          <MapView
            style={styles.mapa}
            region={{
              latitude: coords?.latitude || -19.9248576,
              longitude: coords?.longitude || -43.9373018,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            showsUserLocation={false}
            showsMyLocationButton={false}
            customMapStyle={estiloMapaBranco}>
            {/* Marcador no mapa */}
            {coords && (
              <Marker
                coordinate={{
                  latitude: coords.latitude,
                  longitude: coords.longitude,
                }}
                title="Local do Evento"
                description={tituloEvento}
              />
            )}
          </MapView>
          {nomeInstagram && (
            <Callout tooltip>
              <TouchableOpacity
                style={{flexDirection: 'row', alignItems: 'center', padding: 8}}
                onPress={() => Linking.openURL(detalhes.redeSocial)}>
                <Image
                  source={{
                    uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/1200px-Instagram_logo_2016.svg.png',
                  }}
                  style={{width: 24, height: 24, marginRight: 8}}
                />
                <Text style={{color: COR.branco, fontWeight: 'bold'}}>
                  {nomeInstagram}
                </Text>
              </TouchableOpacity>
            </Callout>
          )}
        </View>
      </View>

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={styles.secaoHorarios}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 6,
            }}>
            <Ionicon
              name={Ionicons.relogio}
              size={25}
              color="purple"
              style={{marginRight: 8}}
            />
            <View style={{top: 2}}>
              <Text style={styles.subtitulo}>Horários</Text>
            </View>
          </View>
          <Text style={styles.texto}>
            {detalhes.titulo.includes('Horários')
              ? (() => {
                  let horario = detalhes.titulo
                    .split('Horários')[1]
                    .split('Entrada')[0]
                    .trim();
                  // Obter ano atual
                  const anoAtual = new Date().getFullYear();
                  // Substituir 0001 pelo ano atual
                  horario = horario.replace(/0001/g, anoAtual.toString());
                  return horario;
                })()
              : 'Horário não disponível.'}
          </Text>
        </View>

        <View style={styles.secaoEntrada}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 6,
            }}>
            <Ionicon
              name={Ionicons.entrada}
              size={25}
              color="purple"
              style={{marginRight: 8}}
            />
            <View style={{top: 2}}>
              <Text style={styles.subtitulo}>Entrada</Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: COR.cinzaClaro,
              borderRadius: 8,
              alignItems: 'center',
              marginTop: 5,
            }}>
            <Text style={styles.textoInfoEntrada}>
              {detalhes.titulo.includes('Entrada')
                ? detalhes.titulo.split('Entrada')[1].split('Tag')[0].trim()
                : 'Informação de entrada não disponível.'}
            </Text>
          </View>
        </View>
      </View>

      {/* Seção: Categorias (tags) */}
      <View style={styles.secao}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 6,
          }}>
          <Ionicon
            name={Ionicons.tag}
            size={23}
            color="purple"
            style={{marginRight: 8}}
          />
          <View style={{top: 2}}>
            <Text style={styles.subtitulo}>Categoria</Text>
          </View>
        </View>
        <View style={styles.tagsContainer}>
          {detalhes.categorias.map((categoria, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{categoria}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
  },
  erro: {
    padding: 16,
    textAlign: 'center',
    color: 'red',
  },

  imagem: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    borderWidth: 1, // Borda fina
    borderColor: '#ddd', // Cor clara para a borda
    // Sombra para iOS
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Elevação para Android
    elevation: 5,
    marginBottom: 12,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  secaoHorarios: {
    width: '60%',
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,

    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Elevação para Android
    elevation: 5,
  },
  secaoEntrada: {
    width: '35%',
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,

    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Elevação para Android
    elevation: 5,
  },
  textoInfoEntrada: {
    ...FONTES.bold,
    color: COR.primaria,
    fontSize: 16,
  },
  secao: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    // Sombra para iOS
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Elevação para Android
    elevation: 5,
  },

  subtitulo: {
    ...FONTES.bold,
    color: COR.primaria,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
  },
  texto: {
    fontSize: 16,
  },
  botaoLink: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00aaff',
    padding: 8,
    borderRadius: 6,
  },
  textoBotao: {
    color: '#fff',
    marginLeft: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    borderWidth: 1,
    borderColor: COR.verdeLogo,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,

    marginBottom: 6,
  },
  tagText: {
    ...FONTES.bold,
    color: COR.preto,
    fontSize: 14,
  },
  mapaContainer: {
    height: 200,
    marginTop: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  mapa: {
    flex: 1,
  },

  /////////////////////////////////////
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // bolinhas transparentes, quase brancas
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)', // borda branca semi-transparente
  },
  dotActive: {
    backgroundColor: 'rgba(106, 27, 154, 0.9)',
    borderColor: 'rgba(106, 27, 154, 1)',
  },

  dotInactive: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // mesma do dot normal
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
});
