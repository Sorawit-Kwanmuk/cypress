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
beforeEach(() => {
  Cypress.Cookies.preserveOnce("access_token");
});
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
Cypress.Commands.add("webCustomerLogin", (username, password, access_token) => {
  cy.visit("https://chester-staging.cpmplatform.com/login");
  cy.clearCookies();
  cy.clearLocalStorage();
  cy.get("#basic_username").type(username);
  cy.get("#basic_password").type(password);
  cy.get(".ant-btn.ant-btn-secondary.ant-btn-round", {
    timeout: 10000,
  }).click();
  //   cy.visit("https://chester-staging.cpmplatform.com");
  //   cy.setCookie("access_token", access_token);
  Cypress.on("uncaught:exception", (err, runnable) => {
    return false;
  });
  cy.reload();

  cy.get("img[alt='ข้าวสวย']", { timeout: 8000 }).click();

  cy.get(".ant-btn.ant-btn-primary.ant-btn-round.ant-btn-lg", {
    timeout: 8000,
  }).click();

  cy.get("span:contains('ไปยังหน้าตะกร้าอาหาร')", { timeout: 8000 }).click();

  cy.get("span:contains('สั่งซื้ออาหาร')", { timeout: 8000 }).click();

  cy.get("span:contains('เลือกวิธีการชำระเงิน')", { timeout: 8000 }).click();

  cy.get("input[name='payment'][value='cash']", { timeout: 8000 }).click();

  cy.get(".ant-btn.ant-btn.ant-btn-primary", { timeout: 8000 }).click();

  cy.get(
    ".ant-btn.ant-btn-submit.OrderSummarystyles__ButtonOrder-gd9hlc-31.jPMIzu",
    { timeout: 8000 }
  ).click();

  cy.get("button:contains('สถานะการสั่งซื้อ')", { timeout: 8000 }).click();
  cy.wait(2000);
});

Cypress.Commands.add("VisitCustomerWeb", access_token => {
  cy.visit("https://chester-staging.cpmplatform.com");
  cy.setCookie("access_token", access_token);
  Cypress.on("uncaught:exception", (err, runnable) => {
    return false;
  });
  cy.get(".ant-btn.indexstyle__AcceptButton-n13u9j-2.bBlZdv", {
    timeout: 8000,
  }).click();
  cy.reload();
  cy.wait(2000);
});
