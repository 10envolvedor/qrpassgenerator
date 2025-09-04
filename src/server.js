import prompts from 'prompts';
import promptMain from './promptsSchema/main.js';
import manipularProcesso from './services/processo/manipular.js';
import manipularQRCode from './services/QRCode/manipular.js';
import manipularSenhaCustomizada from './services/senhaCustomizada/manipular.js';
import kleur from 'kleur';

await (async () => {
  try {
    console.log(kleur.green('Bem vindo ao meu gerador de utilidades!'));

    let opcao;
    do {
      try {
        console.log('='.repeat(50));

        const resposta = await prompts(promptMain);
        
        if (!resposta || !resposta.option || !Array.isArray(resposta.option)) {
          console.log(kleur.yellow('Operação cancelada. Tente novamente.'));
          continue;
        }

        opcao = resposta.option[0];

        if (opcao === undefined || opcao === null) {
          console.log(kleur.yellow('Opção inválida. Tente novamente.'));
          continue;
        }

        // poderia ser um switch case.
        let estrategias = [
          manipularProcesso.sair,
          manipularQRCode,
          manipularSenhaCustomizada,
        ];

        if (opcao < 0 || opcao >= estrategias.length) {
          console.log(kleur.red('Opção fora do range permitido. Tente novamente.'));
          continue;
        }

        await estrategias[opcao]();
      } catch (error) {
        if (error.name === 'ExitPromptError') {
          console.log(kleur.yellow('\nOperação cancelada pelo usuário.'));
          break;
        }
        
        console.error(kleur.red('Erro durante a execução:'), error.message);
        console.log(kleur.yellow('Tente novamente ou pressione Ctrl+C para sair.'));
      }
    } while (opcao !== 0);
  } catch (error) {
    console.error(kleur.red('Erro crítico na aplicação:'), error.message);
    console.log(kleur.yellow('Encerrando aplicação...'));
    process.exit(1);
  }
})();
