// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const genUsername = require('unique-username-generator');
// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    if (context.data && context.data.nbEmail && context.data.domaine) {
      let emailArray = [];
      let indexDomaine = 0;
      for (let i = 0; i < context.data.nbEmail - 1; i++) {
        emailArray.push({email:genUsername.generateUsername('', 3) + '@' + context.data.domaine[indexDomaine]});
        indexDomaine = indexDomaine == context.data.domaine.length - 1 ? 0 : indexDomaine + 1;
      }
      console.log({emailArray});
      context.data = emailArray;
    }
    return context;
  };
};
