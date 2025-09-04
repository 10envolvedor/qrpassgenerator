import prompts from 'prompts';
import promptQRCode from '../../promptsSchema/QRCode.js';
import kleur from 'kleur';
import gerar from './gerar.js';

export default async function manipular() {
  try {
    const resposta = await prompts(promptQRCode);
    
    if (!resposta || !resposta.texto) {
      console.log(kleur.yellow('Operação cancelada. Retornando ao menu principal.'));
      return;
    }

    const dadosParaEncodar = resposta.texto;

    if (!dadosParaEncodar || dadosParaEncodar.trim().length === 0) {
      console.log(kleur.red('Texto não pode estar vazio. Tente novamente.'));
      return;
    }

    console.log(kleur.cyan('Gerando QR Code...\n'));

    await gerar(dadosParaEncodar);
  } catch (error) {
    if (error.name === 'ExitPromptError') {
      console.log(kleur.yellow('Operação cancelada pelo usuário.'));
      return;
    }
    
    console.error(kleur.red('Erro ao processar entrada do QR Code:'), error.message);
    console.log(kleur.yellow('Tente novamente.'));
  }
}
