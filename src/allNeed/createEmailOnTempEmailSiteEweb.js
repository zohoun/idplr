/* eslint-disable no-empty */
/* eslint-disable linebreak-style */
const FormData = require('form-data');
const Axios = require('axios').default;
// const output = execSync(`tmac -n Ethernet -m ${randomMac} -re`, { encoding: 'utf-8' }); // the default is 'buffer'
// console.log('Output was:\n', output, randomMac);

// var objShell = new ActiveXObject("Shell.Application");
// bjShell.ShellExecute("cmd.exe", "cd C: C:\\cd c:\\ext_file main.exe test.txt", "C:\\WINDOWS\\system32", "open", 1);
// objShell.ShellExecute("cmd.exe", `C: tmac -n Ethernet -m ${randomMac} -re`, "C: \\WINDOWS\\ system32 ", "open ", "1");

module.exports = async function lunchBrowserndCreateAccountFiverr(accounts, app) {
  if (accounts && accounts.length > 0) {
    var bodyData = new FormData();
    try {

      for (let i = 0; i < accounts.length; i++) {
        const element = accounts[i];

        try {
          const infoArray = element.email.split('@');
          const username = infoArray[0];
          const domaine = infoArray[1];
          bodyData.append('usr', username);
          bodyData.append('dmn', domaine);
          try {
            console.log('test');

            const response = await Axios({
              method: 'post',
              url: 'https://generator.email/check_adres_validation3.php',
              headers: bodyData.getHeaders(),
              data: bodyData,

            });
            console.log('test1');
            await app.service('idplr-account').create({ fakeEmail: element.email });
            element.isValidate= true;
            await app.service('email-generator').patch(element._id, element);
          } catch (error) {
            console.log({ error });
          }


        } catch (error) {
          console.log(error);
        }
      }

    } catch (error) {
      console.log(error);
    }
  }

};