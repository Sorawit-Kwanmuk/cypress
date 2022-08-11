/* eslint-disable no-undef */
let CustomerAccessToken;
let AdminAccessToken;
let CallcenterAccessToken;

describe("HTTP Example", function () {
  it("POST => customer_login", function () {
    const username = "0877316012";
    const password = "12345678";
    var data = JSON.stringify({
      query: `{
    customer_login(username : "${username}" , password:"${password}"){
        access_token
    }
}`,
    });
    cy.request({
      method: "POST",
      url: "https://chester-api-staging.cpmplatform.com/api/gql",
      body: data,
    }).then(function (response) {
      expect(response.body.data.customer_login.access_token).to.not.equal(
        undefined
      );
      if (response.body.data.customer_login.access_token !== undefined) {
        cy.writeFile("../../../localStorage.json", {
          CustomerAccessToken: response.body.data.customer_login.access_token,
        });
      }
    });
  });
});
