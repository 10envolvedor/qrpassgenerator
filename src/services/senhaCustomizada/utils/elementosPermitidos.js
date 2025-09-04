import kleur from 'kleur';

function lerVariavelAmbienteBooleana(variavel) {
  try {
    if (!process.env[variavel]) {
      return false; // Retorna false se a variável não existir
    }
    return JSON.parse(process.env[variavel]);
  } catch (error) {
    console.log(kleur.yellow(`Aviso: Variável de ambiente ${variavel} tem valor inválido. Usando padrão.`));
    return false; // Retorna false em caso de erro no parse
  }
}

export default function elementosPermitidos(opcoes) {
  try {
    console.log(kleur.cyan('Gerando senha customizada...\n'));

    // Validação da entrada
    if (!opcoes || !Array.isArray(opcoes)) {
      throw new Error('Opções devem ser um array válido');
    }

    let elementosPermitidos = [];

    if (opcoes.includes(0)) {
      // Opção "Todos os tipos de caracteres"
      elementosPermitidos.push(
        ...'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()'
      );
    } else {
      // Verificação individual de cada tipo
      if (
        lerVariavelAmbienteBooleana('PERMITE_LETRAS_MAIUSCULAS') ||
        opcoes.includes(1)
      ) {
        elementosPermitidos.push(...'ABCDEFGHIJKLMNOPQRSTUVWXYZ');
      }

      if (
        lerVariavelAmbienteBooleana('PERMITE_LETRAS_MINUSCULAS') ||
        opcoes.includes(2)
      ) {
        elementosPermitidos.push(...'abcdefghijklmnopqrstuvwxyz');
      }

      if (lerVariavelAmbienteBooleana('PERMITE_NUMEROS') || opcoes.includes(3)) {
        elementosPermitidos.push(...'0123456789');
      }

      if (
        lerVariavelAmbienteBooleana('PERMITE_CARACTERES_ESPECIAIS') ||
        opcoes.includes(4)
      ) {
        elementosPermitidos.push(...'!@#$%^&*()');
      }
    }

    // Validação final
    if (elementosPermitidos.length === 0) {
      throw new Error('Nenhum tipo de caractere foi selecionado ou configurado');
    }

    return elementosPermitidos;
  } catch (error) {
    console.error(kleur.red('Erro ao processar elementos permitidos:'), error.message);
    
    // Fallback para elementos básicos em caso de erro
    console.log(kleur.yellow('Usando conjunto básico de caracteres como fallback.'));
    return [...'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'];
  }
}
