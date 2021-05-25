/* eslint-disable no-console */
const firebaseDB = require('../dbConnection/firebaseConnection');

module.exports = {
  async addContact(data) {
    const addressName = `strv-addressbook-${data.lastName}-${data.firstName}`;
    await firebaseDB.ref(addressName).push(data, (error) => {
      if (error) {
        console.log(`Failed with error: ${error}`);
      } else {
        console.log('success');
      }
    });
  },
};
