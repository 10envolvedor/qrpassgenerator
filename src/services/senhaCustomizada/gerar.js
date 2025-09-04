import kleur from 'kleur';

export default async function gerar(
  elementosPermitidos,
  tamanho
) {
  try {
    // Validação dos parâmetros de entrada
    if (!elementosPermitidos || !Array.isArray(elementosPermitidos) || elementosPermitidos.length === 0) {
      throw new Error('Lista de elementos permitidos não pode estar vazia');
    }

    if (!tamanho || typeof tamanho !== 'number' || tamanho < 1) {
      throw new Error('Tamanho da senha deve ser um número maior que zero');
    }

    if (tamanho > 1000) {
      throw new Error('Tamanho da senha não pode exceder 1000 caracteres');
    }

    // Geração da senha
    let senha = '';
    for (let i = 0; i < tamanho; i++) {
      const indiceAleatorio = Math.floor(Math.random() * elementosPermitidos.length);
      senha += elementosPermitidos[indiceAleatorio];
    }

    // Validação da senha gerada
    if (!senha || senha.length !== tamanho) {
      throw new Error('Erro na geração da senha - tamanho incorreto');
    }

    console.log(senha + '\n');
    console.log(kleur.green('Senha customizada gerada com sucesso!'));
  } catch (error) {
    console.error(kleur.red('Erro ao gerar senha customizada:'), error.message);
    
    if (error.message.includes('elementos permitidos')) {
      console.log(kleur.yellow('Verifique se pelo menos um tipo de caractere foi selecionado.'));
    } else if (error.message.includes('Tamanho')) {
      console.log(kleur.yellow('Verifique se o tamanho da senha está entre 1 e 1000 caracteres.'));
    }
    
    throw error; // Re-throw para permitir tratamento adicional se necessário
  }
}
