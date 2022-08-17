/* eslint-disable no-undef */
import "../../support/commands";
var token;

beforeEach(() => {
  Cypress.Cookies.preserveOnce("access_token");
});
describe("PaymentPrepaid", function () {
  it("Customer Web => Prepaid Card test", function () {
    const username = "0877316012";
    const password = "12345678";
    cy.apiCustomerLogin(username, password).then(function (response) {
      const access_token = response.body.data.customer_login.access_token;
      expect(access_token).to.not.equal(undefined);
      if (access_token !== undefined) {
        cy.VisitCustomerWeb(access_token);
        cy.get("img[alt='ข้าวสวย']", { timeout: 10000 }).click();
        cy.get(".ant-btn.ant-btn-primary.ant-btn-round.ant-btn-lg", {
          timeout: 10000,
        }).click();
        cy.get("span:contains('ไปยังหน้าตะกร้าอาหาร')", {
          timeout: 10000,
        }).click();
        cy.get("span:contains('สั่งซื้ออาหาร')", { timeout: 10000 }).click();
        cy.get("span:contains('เลือกวิธีการชำระเงิน')", {
          timeout: 10000,
        }).click();
        cy.get("input[name='payment'][value='prepaidCards']", {
          timeout: 10000,
        }).click();
        cy.get("span:contains('เพิ่มบัตรใหม่')", { timeout: 10000 }).click();

        // <input id="card_holder" placeholder="กรอกชื่อบนบัตร (ภาษาอังกฤษ)" type="text" class="ant-input" value="">
        cy.get("#card_holder", { timeout: 10000 }).type(
          "Automated Add Prepaid Card"
        );
        {
          /* <input id="credit_card_number" data-encrypt="cardnumber" placeholder="กรอกหมายเลขบัตร" type="tel" class="ant-input" value="" inputmode="numeric"> */
        }
        cy.get("#credit_card_number", { timeout: 10000 }).type(
          "5555552906330137"
        );
        {
          /* <input id="expire_date_month" type="tel" data-encrypt="month" placeholder="MM" maxlength="2" class="ant-input" value=""> */
        }
        cy.get("#expire_date_month", { timeout: 10000 }).type("12");
        {
          /* <input id="expire_date_year" type="tel" data-encrypt="year" placeholder="YYYY" maxlength="4" class="ant-input" value=""> */
        }
        cy.get("#expire_date_year", { timeout: 10000 }).type("2023");
        {
          /* <input id="credit_card_cvv" type="password" data-encrypt="cvv" placeholder="CVV Code" maxlength="3" class="ant-input"> */
        }
        cy.get("#credit_card_cvv", { timeout: 10000 }).type("123");
        {
          /* <input id="card_name" placeholder="เช่น บัตรหลัก, บัตรสำรอง" type="text" class="ant-input" value=""> */
        }
        cy.get("#card_name", { timeout: 10000 }).type(
          "Automated Add Prepaid Card"
        );
        {
          /* <button
  type='submit'
  class='ant-btn ant-btn-round ant-btn ant-btn-primary'
  style='height: 44px; border-radius: 22px; width: 100%; margin-top: 55px;'
  ant-click-animating-without-extra-node='false'>
  <span style='color: white;'>บันทึก</span>
</button>; */
        }
        cy.get("span:contains('บันทึก')", { timeout: 10000 }).click();
        cy.wait(5000);

        // cy.get(".ant-btn.ant-btn.ant-btn-primary", { timeout: 10000 }).click();
        // cy.get("span:contains('สั่งซื้ออาหาร')", { timeout: 10000 }).click();
        // cy.get("input[name='securityCode2']", { timeout: 10000 }).type("123");
        // cy.get("input[name='submit']", { timeout: 10000 }).click();
        // cy.get("input[value='Continue']", { timeout: 10000 }).click();
        // cy.get("button:contains('สถานะการสั่งซื้อ')", {
        //   timeout: 10000,
        // }).click();
        // cy.wait(2000);
      }
    });
  });
  // it("Customer Web => Delete Prepaid Card", function () {
  //   const username = "0877316012";
  //   const password = "12345678";
  //   cy.apiCustomerLogin(username, password).then(function (response) {
  //     const access_token = response.body.data.customer_login.access_token;
  //     if (access_token !== undefined) {
  //       cy.VisitCustomerWeb(access_token);
  //       cy.get("a:contains('โปรไฟล์')", {
  //         timeout: 10000,
  //       }).click();
  //       cy.get("p:contains('บัตรเครดิตของฉัน')", {
  //         timeout: 10000,
  //       }).click();
  //       cy.get("span:contains('ลบบัตรนี้')", { timeout: 10000 }).click();
  //       cy.get(".ant-btn.ant-btn-default.ant-btn-round", {
  //         timeout: 10000,
  //       }).click();
  //       cy.get(".ant-btn.ant-btn-primary", { timeout: 10000 }).click();
  //       cy.wait(2000);
  //     } else {
  //       console.log("access_token is undefined");
  //     }
  //   });
  // });
});
