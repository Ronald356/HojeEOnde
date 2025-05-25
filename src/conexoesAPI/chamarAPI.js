import { ToastAndroid } from 'react-native';

async function validarAPI({ url, body, onSuccessNavigate, navigation, setAlerta }) {
  function showToast(message) {
    ToastAndroid.showWithGravity(message, ToastAndroid.SHORT, ToastAndroid.CENTER);
  }

  if (!setAlerta) {
    // só avisa que setAlerta não foi passado, usará toast
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      if (setAlerta) {
        setAlerta({
          titulo: 'Erro',
          mensagem: data.error || 'Erro na validação',
          aoFechar: () => setAlerta(false),
          textoConfirmar: 'Ok',
          aoConfirmar: () => setAlerta(false),
        });
      } else {
        showToast(data.error || 'Erro na validação');
      }
      return false;
    }

    if (onSuccessNavigate && navigation) {
      navigation.navigate(onSuccessNavigate.name, onSuccessNavigate.params);
    }

    return true;

  } catch (error) {
    console.error('Erro na validação:', error);
    if (setAlerta) {
      setAlerta({
        titulo: 'Erro',
        mensagem: 'Erro ao validar. Tente novamente mais tarde.',
        aoFechar: () => setAlerta(false),
        textoConfirmar: 'Ok',
        aoConfirmar: () => setAlerta(false),
      });
    } else {
      showToast('Erro ao validar. Tente novamente mais tarde.');
    }
    return false;
  }
}

export { validarAPI };
