import { When, Then, Before, After } from "@badeball/cypress-cucumber-preprocessor";
import { configs } from "../../../config/common";

Before({ tags: "@FirebaseResetUser" }, function () {
  deleteDocuments();
  deleteUsers();
});

After({ tags: "@FirebaseResetUser" }, function () {
  deleteDocuments();
  deleteUsers();
});

function deleteDocuments() {
  cyRequest(
    `http://localhost:8080/emulator/v1/projects/${configs.firebase.projectId}/databases/(default)/documents`,
    "DELETE"
  );
}

function deleteUsers() {
  cyRequest(
    `http://localhost:9099/emulator/v1/projects/${configs.firebase.projectId}/accounts`,
    "DELETE"
  );
}

function cyRequest(requestUrl: string, method: string) {
  cy.request({
    method: method,
    url: requestUrl,
  }).then((response) => {
    expect(response.status).to.equal(200);
  });
}

function isEnabledState(
  element: Cypress.Chainable<JQuery<HTMLElement>>,
  enabledState: "enabled" | "disabled"
) {
  if (enabledState === "enabled") {
    element.should("not.be.disabled").should("have.css", "cursor", "pointer");
  } else if (enabledState === "disabled") {
    // Elements are not actually disabled, just look disabled
    element
      .should("have.css", "pointer-events", "none")
      .should("have.attr", "aria-disabled", "true");
  } else {
    throw new Error(`Invalid enabledState: ${enabledState}`);
  }
}

When("I visit {string} screen", (screen: string) => {
  cy.visit(`${configs.website}${screen}`);
});

Then("I should see a screen title {string}", (title: string) => {
  cy.contains(title).should("exist").should("be.visible");
});

Then("I should see the following text on the page: {string}", (text: string) => {
  cy.contains(text).should("exist").should("be.visible");
});

Then("I should see a {string} label", (labelTitle: string) => {
  cy.contains(labelTitle).should("exist").should("be.visible");
});

Then("I know there is a {string} label", (labelTitle: string) => {
  cy.contains(labelTitle).should("exist").should("not.be.visible");
});

Then("I should see an error message: {string}", (errorMsg: string) => {
  cy.contains(errorMsg).should("exist").should("be.visible");
});

Then(
  "I should see a {string} button in {string} state",
  (buttonName: string, enabledState: "enabled" | "disabled") => {
    const button = cy
      .findByRole("button", { name: buttonName })
      .should("exist")
      .should("be.visible")
      .should("contain", buttonName);

    isEnabledState(button, enabledState);
  }
);

Then("I should see an input with a {string} placeholder", (placeholder: string) => {
  cy.findByPlaceholderText(placeholder).should("exist").should("be.visible");
});

Then("I type {string} in {string} input", (typedText: string, placeholder: string) => {
  cy.findByPlaceholderText(placeholder).should("exist").should("be.visible").type(typedText, {
    delay: configs.typingDelayMs,
  });
});

Then("I should see a link {string}", (linkName: string) => {
  cy.findByText(linkName).should("exist").should("be.visible");
});

Then("I click the {string} link to follow to {string}", (linkName: string, href: string) => {
  cy.findByText(linkName)
    .should("exist")
    .should("be.visible")
    .then(($button) => {
      cy.wrap($button).click();
      cy.url().should("contain", href);
    });
});

Then("I cannot click on disabled button {string}", (buttonName: string) => {
  const button = cy
    .findByRole("button", { name: buttonName })
    .should("exist")
    .should("be.visible")
    .should("contain", buttonName)
    .click({ force: true });

  isEnabledState(cy.findByRole("button", { name: buttonName }), "disabled");
});

Then("I click the {string} button", (buttonName: string) => {
  cy.findByRole("button", { name: buttonName })
    .should("exist")
    .should("be.visible")
    .should("contain", buttonName)
    .click();
});
