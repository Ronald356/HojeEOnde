export async function pegarApiUrl() {
  if (__DEV__ === 'a') {
    try {
      const response = await fetch('http://192.168.0.12:3000/ngrok-url');
      const data = await response.json();
      console.log(data);
      return data.url;
    } catch (error) {
      console.error('Erro ao pegar URL da API:', error);
      return null;
    }
  } else {
    console.log('caiu no else');
    return 'https://bd6e-2804-14c-5bb8-8ac5-55f0-29ae-f812-6176.ngrok-free.app';
  }
}
