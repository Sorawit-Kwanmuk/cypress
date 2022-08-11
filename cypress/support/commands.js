/* eslint-disable no-undef */
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

//api Customer Login
Cypress.Commands.add("apiCustomerLogin", (username, password) => {
  const data = JSON.stringify({
    query: `{
        customer_login(username : "${username}" , password:"${password}"){
            access_token
        }
    }`,
  });
  return cy.request({
    method: "POST",
    url: "https://chester-api-staging.cpmplatform.com/api/gql",
    body: data,
  });
});

//Web Customer Login
Cypress.Commands.add("webCustomerLogin", (username, password) => {
  cy.clearCookies();
  cy.clearLocalStorage();
  cy.get("#basic_username").type(username);
  cy.get("#basic_password").type(password);
  cy.get(".ant-btn.ant-btn-secondary.ant-btn-round").click();
});
