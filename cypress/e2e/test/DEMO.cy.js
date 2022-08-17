/* eslint-disable no-undef */
import "../../support/commands";
var token;

beforeEach(() => {
  Cypress.Cookies.preserveOnce("access_token");
  // cy.restoreLocalStorageCache();
  // cy.saveLocalStorageCache();
});
describe("HTTP Example", function () {
  it("GET => healthcheck", function () {
    cy.request({
      method: "GET",
      url: "http://localhost:9101/api/healthcheck",
    }).then(function (response) {
      expect(response.body).have.property("data");
      expect(response.status).to.equal(200);
      expect(response.body.message).to.equal("OK");
      expect(response.body.data.version).to.equal("develop");
      expect(response.body.data.serviceDbError).to.equal(undefined);
      expect(response.body.data.logDbError).to.equal(undefined);
    });
  });
  it("POST => Web_customer_login", function () {
    const username = "0877316012";
    const password = "12345678";
    // cy.webCustomerLogin(username, password);
    cy.apiCustomerLogin(username, password)
      .then(function (response) {
        expect(response.body.data.customer_login.access_token).to.not.equal(
          undefined
        );
      })
      .then(function (response) {
        const access_token = response.body.data.customer_login.access_token;
        cy.webCustomerLogin(username, password, access_token);
      });
  });

  it("POST => api_customer_login", function () {
    const username = "0877316012";
    const password = "12345678";
    cy.apiCustomerLogin(username, password).then(function (response) {
      expect(response.body.data.customer_login.access_token).to.not.equal(
        undefined
      );
    });
  });

  it("POST => admin_login", function () {
    const username = "admin";
    const password = "password";
    var data = JSON.stringify({
      query: `{
  admin_login(username: "${username}" , password:"${password}"){
    access_token
    id
    username
  }
}`,
    });

    cy.request({
      method: "POST",
      url: "https://master-chester-staging.cpmplatform.com/api/gql",
      body: data,
    }).then(function (response) {
      expect(response.body.data.admin_login.access_token).to.not.equal(
        undefined
      );
      expect(response.body.data.admin_login.id).to.not.equal(undefined);
      expect(response.body.data.admin_login.username).to.not.equal(undefined);
      expect(response.status).to.equal(200);
      expect(response.statusText).to.equal("OK");
      if (response.body.data.admin_login.access_token !== undefined) {
        cy.writeFile(
          "/Users/sorawitkwanmuk/Documents/MyProject/cypress/cypress/e2e/test/localStorage.json",
          // "./localStorage.json",
          {
            AdminAccessToken: response.body.data.admin_login.access_token,
          }
        );
      }
    });
  });
  it("POST => Callcenter_login", function () {
    const username = "chester-callcenter";
    const password = "password";
    var data = JSON.stringify({
      query: `{
  callcenter_login(username: "${username}" , password:"${password}"){
    access_token
    id
    username
  }
}`,
    });

    cy.request({
      method: "POST",
      url: "https://chester-api-staging.cpmplatform.com/api/gql",
      body: data,
    }).then(function (response) {
      expect(response.body.data.callcenter_login.access_token).to.not.equal(
        undefined
      );
      expect(response.body.data.callcenter_login.id).to.not.equal(undefined);
      expect(response.body.data.callcenter_login.username).to.not.equal(
        undefined
      );
      expect(response.status).to.equal(200);
      expect(response.statusText).to.equal("OK");
      if (response.body.data.callcenter_login.access_token !== undefined) {
        cy.writeFile(
          "/Users/sorawitkwanmuk/Documents/MyProject/cypress/cypress/e2e/test/localStorage.json",
          //example data {"token": {"CustomerAccessToken": "","AdminAccessToken": "","CallcenterAccessToken": ""}}
          {
            token: {
              CallcenterAccessToken:
                response.body.data.callcenter_login.access_token,
            },
          }
        );
      }
    });
  });
  it("POST => search_products", function () {
    const limit = 10;
    const offset = 0;
    const body = JSON.stringify({
      query: `{
          master_brands(
            limit: ${limit}
          offset: ${offset}
          ) {
            data {
              brand_code
              brand_id
              merchant_id
              status
              title
            }
            total
          }
      }`,
    });

    cy.request({
      method: "POST",
      url: "https://chester-api-staging.cpmplatform.com/api/gql",
      body: body,
      headers: {
        "Content-Type": "application/json",
      },
    }).then(function (response) {
      if (response.status === 200) {
        const limit = 10;
        const offset = 0;
        response.body.data.master_brands.data.map(item => {
          const body = JSON.stringify({
            query: `{
            search_products(
                  limit: ${limit}
                  offset: ${offset}
                  brand_id: "${item.brand_id}"
                ) {
                  data {
                    branch_product_status(branch_id: "string")
                    default_flag
                    description
                    id
                    image
                    is_favorite
                    price
                    product_tag
                    product_type
                    shelf_order_number(shelf_id: 1)
                    sku
                    title
                  }
                  total
                }
            }`,
          });
          cy.request({
            method: "POST",
            url: "https://chester-api-staging.cpmplatform.com/api/gql",
            body: body,
          }).then(function (res) {
            expect(res.status).to.equal(200);
            expect(res.body.data).to.not.equal(undefined);
            expect(res.body.data.search_products.data).to.be.an("array");
          });
        });
      }
    });
  });
});
