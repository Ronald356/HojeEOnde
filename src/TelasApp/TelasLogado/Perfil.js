import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {
  obterEmail,
  obterFotoPerfil,
  obterSenha,
  salvarFotoPerfil,
} from '../../services/storage';
import ModalPersonalizado from '../../componentes/modalAlerta';
import {useNavigation} from '@react-navigation/native';
import {contaDoUsuario, excluirConta} from '../../conexoesAPI/chamarAPI';
import {launchImageLibrary} from 'react-native-image-picker';

export default function PerfilScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState();
  const [mostrarModal, setMostrarModal] = useState(false);
  const [fotoPerfil, setFotoPerfil] = useState('');
  const [nome, setNome] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    carregarDadosUsuario();
  }, []);

  const verificarConta = async emailParam => {
    try {
      const resultado = await contaDoUsuario(emailParam);
      console.log('Dados da conta:', resultado);
      return resultado; // importante retornar para usar no carregarDadosUsuario
    } catch (error) {
      console.error('Erro ao buscar conta:', error);
    }
  };

  const carregarDadosUsuario = async () => {
    const uriSalva = obterFotoPerfil();
    if (uriSalva) {
      setFotoPerfil(uriSalva);
    }

    const emailObtido = obterEmail();
    setEmail(emailObtido);

    setSenha(obterSenha());

    try {
      const resposta = await verificarConta(emailObtido);
      if (resposta?.usuario?.nome) {
        setNome(resposta.usuario.nome);
      }
    } catch (error) {
      console.error('Erro ao verificar conta:', error);
    }
  };

  const handleExcluirConta = async () => {
    try {
      await excluirConta(email);

      navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const escolherFoto = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
      quality: 0.7,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('Usuário cancelou a seleção');
      } else if (response.errorCode) {
        console.log('Erro:', response.errorMessage);
      } else {
        const uri = response.assets[0].uri;
        setFotoPerfil(uri);
        salvarFotoPerfil(uri);
      }
    });
  };

  console.log('aqui');

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={escolherFoto}>
          <Image source={{uri: fotoPerfil}} style={styles.avatar} />
        </TouchableOpacity>

        <Text style={styles.nome}>{nome || 'Usuário'}</Text>
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.option}>
          <Icon name="settings-outline" size={24} color="#333" />
          <Text style={styles.optionText}>Configurações</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Icon name="lock-closed-outline" size={24} color="#333" />
          <Text style={styles.optionText}>Segurança</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Icon name="settings-outline" size={24} color="#333" />
          <Text style={styles.optionText}>Notificações</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={() => setMostrarModal(true)}>
          <MaterialIcon name="delete-outline" size={24} color="red" />
          <Text style={[styles.optionText, {color: 'red'}]}>Excluir Conta</Text>
        </TouchableOpacity>
      </View>

      <ModalPersonalizado
        visivel={mostrarModal}
        aoFechar={() => setMostrarModal(false)}
        titulo="Confirmação"
        mensagem="Tem certeza que deseja excluir sua conta? Essa ação é irreversível."
        textoConfirmar="Excluir"
        textoCancelar="Cancelar"
        aoConfirmar={() => {
          setMostrarModal(false);
          handleExcluirConta();
        }}
        aoCancelar={() => setMostrarModal(false)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  nome: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  section: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  optionText: {
    fontSize: 16,
    marginLeft: 15,
    color: '#333',
  },
});
