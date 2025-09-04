import prompts from 'prompts';
import opcoesPadraoSenhaCustomizada from './utils/opcoesPadrao.js';
import promptSenhaCustomizada from '../../promptsSchema/senhaCustomizada.js';
import elementosPermitidos from './utils/elementosPermitidos.js';
import gerar from './gerar.js';
import kleur from 'kleur';

export default async function manipular() {
  try {
    const opcoes = await prompts(promptSenhaCustomizada);
    
    if (!opcoes) {
      console.log(kleur.yellow('Operação cancelada. Retornando ao menu principal.'));
      return;
    }

    // Validação do tamanho da senha
    let tamanhoSenha = opcoes.size;
    
    if (!tamanhoSenha) {
      try {
        tamanhoSenha = parseInt(process.env.TAMANHO_DA_SENHA) || opcoesPadraoSenhaCustomizada.TAMANHO_DA_SENHA;
      } catch (error) {
        console.log(kleur.yellow('Usando tamanho padrão devido a erro na variável de ambiente.'));
        tamanhoSenha = opcoesPadraoSenhaCustomizada.TAMANHO_DA_SENHA;
      }
    }

    // Validação do tamanho
    if (tamanhoSenha < 1 || tamanhoSenha > 1000) {
      console.log(kleur.red('Tamanho da senha deve estar entre 1 e 1000 caracteres.'));
      return;
    }

    // Validação das opções selecionadas
    if (!opcoes.options || !Array.isArray(opcoes.options) || opcoes.options.length === 0) {
      console.log(kleur.red('Você deve selecionar pelo menos uma opção de caracteres.'));
      return;
    }

    const elementos = elementosPermitidos(opcoes.options);
    
    if (!elementos || elementos.length === 0) {
      console.log(kleur.red('Nenhum elemento válido foi selecionado para gerar a senha.'));
      return;
    }

    await gerar(elementos, tamanhoSenha);
  } catch (error) {
    if (error.name === 'ExitPromptError') {
      console.log(kleur.yellow('Operação cancelada pelo usuário.'));
      return;
    }
    
    console.error(kleur.red('Erro ao processar entrada da senha customizada:'), error.message);
    console.log(kleur.yellow('Tente novamente.'));
  }
}
