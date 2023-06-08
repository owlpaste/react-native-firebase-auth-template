/// <reference types="cypress" />

import { configs, testData, uiEl } from '../../../config/common';

describe('Test login functionality', () => {
   before(() => {
      // Create a user
      cy.visit(configs.website);
      cy.findByTestId(uiEl.auth.pageId.login)
         .should('be.visible')
         .within(() => {
            cy.findByRole('button', {
               name: uiEl.auth.texts.buttonCreateAccount,
            }).click();
         });

      cy.findByTestId(uiEl.auth.pageId.signUp)
         .should('be.visible')
         .within(() => {
            cy.findByPlaceholderText(
               uiEl.auth.texts.placeholderEmailAddress
            ).type(testData.correctEmailAddress, {
               delay: configs.typingDelayMs,
            });

            cy.findByPlaceholderText(
               uiEl.auth.texts.placeholderEnterPassword
            ).type(testData.correctPassword, {
               delay: configs.typingDelayMs,
            });

            cy.findByPlaceholderText(
               uiEl.auth.texts.placeholderConfirmPassword
            ).type(testData.correctPassword, {
               delay: configs.typingDelayMs,
            });

            cy.findByRole('button', {
               name: uiEl.auth.texts.buttonCreateAccount,
            }).click();
         });
   });

   beforeEach(() => {
      cy.visit(configs.website);
   });

   after(() => {
      // Delete user
      cy.visit(configs.website);
      cy.findByTestId(uiEl.auth.pageId.loggedIn)
         .should('be.visible')
         .within(() => {
            cy.findByText(uiEl.auth.texts.titleLoggedIn).should('exist');
            cy.findByRole('button', {
               name: uiEl.auth.texts.buttonDeleteAccount,
            }).click();
         });
   });

   it('Can see login prompt', () => {
      cy.findByTestId(uiEl.auth.pageId.login)
         .should('be.visible')
         .within(() => {
            cy.contains(uiEl.auth.texts.titleLoginToAccount).should('exist');
            cy.contains(uiEl.auth.texts.buttonCreateAccount).should('exist');
            cy.findByPlaceholderText(
               uiEl.auth.texts.placeholderEmailAddress
            ).should('exist');
            cy.findByPlaceholderText(
               uiEl.auth.texts.placeholderEnterPassword
            ).should('exist');
            cy.findByRole('button', {
               name: uiEl.auth.texts.buttonLogin,
            }).should('exist');
         });
   });

   it('Show error message when trying to login with account that does not exist', () => {
      cy.findByTestId(uiEl.auth.pageId.login)
         .should('be.visible')
         .within(() => {
            cy.findByPlaceholderText(
               uiEl.auth.texts.placeholderEmailAddress
            ).type(testData.incorrectEmailAddress, {
               delay: configs.typingDelayMs,
            });

            cy.findByPlaceholderText(
               uiEl.auth.texts.placeholderEnterPassword
            ).type(testData.correctPassword, {
               delay: configs.typingDelayMs,
            });

            cy.findByRole('button', { name: uiEl.auth.texts.buttonLogin })
               .click()
               .end();

            cy.contains(uiEl.auth.errors.userNotFound);
         });
   });

   it('Cannot press button until all fields are filled in', () => {
      cy.findByTestId(uiEl.auth.pageId.login)
         .should('be.visible')
         .within(() => {
            cy.findByPlaceholderText(
               uiEl.auth.texts.placeholderEmailAddress
            ).type(testData.incorrectEmailAddress, {
               delay: configs.typingDelayMs,
            });

            cy.findByRole('button', { name: uiEl.auth.texts.buttonLogin })
               .wait(configs.smallWaitMs)
               .should('exist')
               .should('have.attr', 'aria-disabled');

            cy.findByPlaceholderText(
               uiEl.auth.texts.placeholderEnterPassword
            ).type(testData.correctPassword, {
               delay: configs.typingDelayMs,
            });

            cy.findByRole('button', {
               name: uiEl.auth.texts.buttonLogin,
            }).should('not.be.disabled');

            cy.findByRole('button', { name: uiEl.auth.texts.buttonLogin })
               .click()
               .end();

            cy.contains(uiEl.auth.errors.userNotFound);
         });
   });

   it('Can login', () => {
      cy.findByTestId(uiEl.auth.pageId.login)
         .should('be.visible')
         .within(() => {
            cy.findByPlaceholderText(uiEl.auth.texts.placeholderEmailAddress)
               .type(testData.correctEmailAddress, {
                  delay: configs.typingDelayMs,
               })
               .wait(500);

            cy.findByPlaceholderText(
               uiEl.auth.texts.placeholderEnterPassword
            ).type(testData.correctPassword, {
               delay: configs.typingDelayMs,
            });

            cy.findByRole('button', { name: uiEl.auth.texts.buttonLogin })
               .click()
               .end();
         });

      cy.findByTestId(uiEl.auth.pageId.loggedIn)
         .should('be.visible')
         .within(() => {
            cy.contains(uiEl.auth.texts.titleLoggedIn).should('exist');
         });
   });
});
