import kleur from 'kleur';
import QRCode from 'qrcode';
import opcoesPadraoQRCode from './utils/opcoesPadrao.js';

// Tabela de capacidade máxima de caracteres por versão e nível de correção de erro do QR Code
// | Modo         |   L    |   M    |   Q    |   H    |
// |--------------|--------|--------|--------|--------|
// | Numeric      |  7089  |  5596  |  3993  |  3057  |
// | Alphanumeric |  4296  |  3391  |  2420  |  1852  |
// | Byte         |  2953  |  2331  |  1663  |  1273  |
// | Kanji        |  1817  |  1435  |  1024  |   784  |

// var to = {browser: ['String', 'DataUrl', 'Canvas'], server: [...borwser, 'File', 'FileStream]};

// var text = 'ABCDEFG0123456';

// var segs = [
//   { data: 'ABCDEFG', mode: 'alphanumeric' },
//   { data: '0123456', mode: 'numeric' }
// ]

// @todo sempre retornar a mascara utilizada.

// usar create e cachear
export default async function gerar(
  dadosParaEncodar,
  opcoes = opcoesPadraoQRCode
) {
  try {
    // Validação adicional dos dados de entrada
    if (!dadosParaEncodar || typeof dadosParaEncodar !== 'string') {
      throw new Error('Dados para encodar devem ser uma string válida');
    }

    if (dadosParaEncodar.length > 2953) { // Limite para modo Byte nível L
      throw new Error('Texto muito longo para QR Code. Máximo 2953 caracteres.');
    }

    // Validação das opções
    if (!opcoes || typeof opcoes !== 'object') {
      console.log(kleur.yellow('Usando opções padrão devido a configuração inválida.'));
      opcoes = opcoesPadraoQRCode;
    }

    const qrCodeString = await QRCode.toString(dadosParaEncodar, opcoes);
    console.log(qrCodeString);
    console.log(kleur.green('QR Code gerado com sucesso!'));
  } catch (err) {
    if (err.message.includes('Input data exceeds maximum length')) {
      console.error(kleur.red('Erro: Dados excedem o tamanho máximo permitido para QR Code.'));
      console.log(kleur.yellow('Tente reduzir o tamanho do texto.'));
    } else if (err.message.includes('Invalid input')) {
      console.error(kleur.red('Erro: Dados de entrada inválidos para QR Code.'));
      console.log(kleur.yellow('Verifique se o texto contém apenas caracteres válidos.'));
    } else {
      console.error(kleur.red('Erro ao gerar QR Code:'), err.message);
    }
    
    throw err; // Re-throw para permitir tratamento adicional se necessário
  }
}
