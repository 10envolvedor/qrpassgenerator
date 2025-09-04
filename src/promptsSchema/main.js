import kleur from 'kleur';

// {
//     type: 'number',
//     name: 'option',
//     message: 'Escolha entre 1 e 2',
//     validate: value => value < 1 || value > 2 ? `Fora do permitido` : true
// }

// fazer no onSubmit chamar o manipular.
// fazer no onCancel  a ação de voltar, ai ele permite passar calback nomeados apenas e na faze de construção do prompt apos o prompt em si
export default {
  type: 'multiselect',
  name: 'option',
  message: 'será sobreescrito',
  onRender() {
    this.msg = kleur.yellow('Escolha uma das opções a seguir para gerar');
  },
  choices: [
    {
      title: '0 - Sair',
      value: 0,
    },
    {
      title: '1 - QRCode',
      value: 1,
    },
    {
      title: '2 - Senha customizada',
      value: 2,
    },
  ],
  min: 1,
  max: 1,
  hint: 'Lista abaixo!',
};
