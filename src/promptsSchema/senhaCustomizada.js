import kleur from 'kleur';

export default [
  // default on empty
  {
    type: 'number',
    name: 'size',
    message: kleur.yellow('Informe qual o tamanho máximo da sua senha'),
    validate: value => {
      let msg;
      if (value.length < 1) msg = 'O texto não pode ser vazio';
      if (value.length > 250)
        msg = 'O texto não pode ter mais de 250 caracteres';
      if (msg) return kleur.red(msg);
      return true;
    }
  },
  {
    type: 'multiselect',
    name: 'options',
    message: 'será sobreescrito',
    onRender() {
      this.msg = kleur.yellow(
        'Escolha quais caracteres serão permitidos em sua senha'
      );
    },
    choices: [
      {
        title: '0 - Todos os tipos de caracteres',
        value: 0,
      },
      {
        title: '1 - Letras maiúsculas',
        value: 1,
      },
      {
        title: '2 - Letras minúsculas',
        value: 2,
      },
      {
        title: '3 - Números',
        value: 3,
      },
      {
        title: '4 - Caracteres especiais',
        value: 4,
      },
      // adicionar a opção do padrão.
    ],
    min: 1,
    hint: 'Lista abaixo!',
  },
];
