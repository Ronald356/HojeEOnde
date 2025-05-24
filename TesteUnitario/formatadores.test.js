import * as formatadores from '../src/constants/formatar';

  describe('formatarData', () => {
    test('deve formatar data sem hora corretamente', () => {
      expect(formatadores.formatarData('2023-01-01')).toBe('01/01/2023');
    });

    test('deve formatar data com hora corretamente', () => {
      expect(formatadores.formatarData('2023-01-01T15:30:00', true)).toBe('01/01/2023 15:30');
    });

    test('deve retornar vazio para data inválida ou vazia', () => {
      expect(formatadores.formatarData(null)).toBe('');
      expect(formatadores.formatarData(undefined)).toBe('');
      expect(formatadores.formatarData('')).toBe('');
      expect(formatadores.formatarData('abc')).toBe(''); // data inválida
    });
  });

  // --- Números ---

  describe('formatarNumero', () => {
    test('deve formatar número corretamente', () => {
      expect(formatadores.formatarNumero(1234.567)).toBe('1.234,57');
    });

    test('deve formatar com número de casas decimais customizado', () => {
      expect(formatadores.formatarNumero(1234.567, 1)).toBe('1.234,6');
    });

    test('deve retornar vazio para valores inválidos', () => {
      expect(formatadores.formatarNumero(null)).toBe('');
      expect(formatadores.formatarNumero(undefined)).toBe('');
      expect(formatadores.formatarNumero(NaN)).toBe('');
      expect(formatadores.formatarNumero('texto')).toBe('');
    });
  });

  describe('formatarMoeda', () => {
    test('deve formatar valor em moeda corretamente', () => {
      expect(formatadores.formatarMoeda(1234.56)).toBe('R$ 1.234,56');
    });

    test('deve retornar vazio para valores inválidos', () => {
      expect(formatadores.formatarMoeda(null)).toBe('');
      expect(formatadores.formatarMoeda(undefined)).toBe('');
      expect(formatadores.formatarMoeda(NaN)).toBe('');
      expect(formatadores.formatarMoeda('texto')).toBe('');
    });
  });

  describe('formatarPorcentagem', () => {
    test('deve formatar porcentagem corretamente', () => {
      expect(formatadores.formatarPorcentagem(0.1234)).toBe('12.34%');
    });

    test('deve retornar vazio para valores inválidos', () => {
      expect(formatadores.formatarPorcentagem(null)).toBe('');
      expect(formatadores.formatarPorcentagem(undefined)).toBe('');
      expect(formatadores.formatarPorcentagem(NaN)).toBe('');
      expect(formatadores.formatarPorcentagem('texto')).toBe('');
    });
  });

  // --- Strings ---

  describe('capitalizar', () => {
    test('deve capitalizar a primeira letra', () => {
      expect(formatadores.capitalizar('teste')).toBe('Teste');
    });

    test('deve retornar vazio para entradas inválidas', () => {
      expect(formatadores.capitalizar(null)).toBe('');
      expect(formatadores.capitalizar(undefined)).toBe('');
      expect(formatadores.capitalizar('')).toBe('');
    });
  });

  describe('capitalizarPalavras', () => {
    test('deve capitalizar cada palavra', () => {
      expect(formatadores.capitalizarPalavras('teste de palavras')).toBe('Teste De Palavras');
    });

    test('deve retornar vazio para entradas inválidas', () => {
      expect(formatadores.capitalizarPalavras(null)).toBe('');
      expect(formatadores.capitalizarPalavras(undefined)).toBe('');
      expect(formatadores.capitalizarPalavras('')).toBe('');
    });
  });

  describe('truncar', () => {
    test('deve truncar texto corretamente', () => {
      const texto = 'a'.repeat(200);
      expect(formatadores.truncar(texto, 100)).toHaveLength(103); // 100 + "..."
    });

    test('deve retornar texto inteiro se menor que tamanho max', () => {
      expect(formatadores.truncar('teste', 10)).toBe('teste');
    });

    test('deve retornar vazio para entradas inválidas', () => {
      expect(formatadores.truncar(null)).toBe('');
      expect(formatadores.truncar(undefined)).toBe('');
      expect(formatadores.truncar('')).toBe('');
    });
  });

  describe('limparEspacos', () => {
    test('deve remover espaços extras', () => {
      expect(formatadores.limparEspacos('  texto  com   espaços ')).toBe('texto com espaços');
    });

    test('deve retornar vazio para entradas inválidas', () => {
      expect(formatadores.limparEspacos(null)).toBe('');
      expect(formatadores.limparEspacos(undefined)).toBe('');
      expect(formatadores.limparEspacos('')).toBe('');
    });
  });

  describe('formatarTelefone', () => {
    test('deve formatar telefone corretamente', () => {
      expect(formatadores.formatarTelefone('11987654321')).toBe('(11) 98765-4321');
      expect(formatadores.formatarTelefone('(11)98765-4321')).toBe('(11) 98765-4321');
    });

    test('deve retornar input original se formato inválido', () => {
      expect(formatadores.formatarTelefone('123')).toBe('123');
      expect(formatadores.formatarTelefone('abc')).toBe('abc');
      expect(formatadores.formatarTelefone(null)).toBe('');
      expect(formatadores.formatarTelefone(undefined)).toBe('');
    });
  });

  describe('formatarCPF', () => {
    test('deve formatar CPF corretamente', () => {
      expect(formatadores.formatarCPF('12345678909')).toBe('123.456.789-09');
      expect(formatadores.formatarCPF('123.456.789-09')).toBe('123.456.789-09');
    });

    test('deve retornar input original se formato inválido', () => {
      expect(formatadores.formatarCPF('123')).toBe('123');
      expect(formatadores.formatarCPF('abc')).toBe('abc');
      expect(formatadores.formatarCPF(null)).toBe('');
      expect(formatadores.formatarCPF(undefined)).toBe('');
    });
  });

  // --- CamelCase ---

  describe('paraCamelCase', () => {
    test('deve converter para camelCase', () => {
      expect(formatadores.paraCamelCase('teste de camel case')).toBe('testeDeCamelCase');
      expect(formatadores.paraCamelCase('Teste-De_camel.case')).toBe('testeDeCamelCase');
    });

    test('deve retornar vazio para entradas inválidas', () => {
      expect(formatadores.paraCamelCase(null)).toBe('');
      expect(formatadores.paraCamelCase(undefined)).toBe('');
      expect(formatadores.paraCamelCase('')).toBe('');
    });
  });
