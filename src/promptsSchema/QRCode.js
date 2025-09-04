import kleur from 'kleur';

export default {
  type: 'text',
  name: 'texto',
  message: kleur.yellow('Digite um texto para torná-lo um QRCode'),
  validate: value => {
    let msg;
    if (value.length === 0) msg = 'O texto não pode ser vazio';
    if (value.length > 250) msg = 'O texto não pode ter mais de 250 caracteres';
    if (value.includes('javascript:'))
      msg = 'URLs com javascritp não são permitidas';
    if (msg) return kleur.red(msg);
    return true;
  },
};
