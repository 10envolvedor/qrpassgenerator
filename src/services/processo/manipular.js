import kleur from 'kleur';

export default {
  sair: () => {
    console.log(kleur.red('Saindo...'));
    process.exit(0);
  },
};
