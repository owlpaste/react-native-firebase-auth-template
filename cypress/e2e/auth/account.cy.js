/// <reference types="cypress" />

import { testData, configs, uiEl } from '../../../config/common.js';

describe('Account related functionality', () => {
   before(() => {
      // Create a user
      cy.visit(configs.website);
      cy.findByTestId(uiEl.auth.pages.login)
         .should('be.visible')
         .within(() => {
            cy.findByRole('button', {
               name: uiEl.auth.texts.buttonCreateAccount,
            }).click();
         });

      cy.findByTestId(uiEl.auth.pages.signUp)
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

      cy.findByTestId(uiEl.auth.pages.login)
         .should('be.visible')
         .within(() => {
            cy.findByPlaceholderText(
               uiEl.auth.texts.placeholderEmailAddress
            ).type(testData.correctEmailAddress, {
               delay: configs.typingDelay,
            });

            cy.findByPlaceholderText(
               uiEl.auth.texts.placeholderEnterPassword
            ).type(testData.correctPassword, {
               delay: configs.typingDelay,
            });

            cy.findByRole('button', {
               name: uiEl.auth.texts.buttonLogin,
            }).click();
         });

      cy.findByTestId(uiEl.auth.pages.loggedIn)
         .should('be.visible')
         .within(() => {
            cy.findByText(uiEl.auth.texts.titleLoggedIn)
               .should('be.visible')
               .wait(configs.smallWaitMs)
               .end();
            cy.findByRole('button', {
               name: uiEl.auth.texts.buttonDeleteAccount,
            }).click();
         });
   });

   it('Wrong password entered', () => {
      cy.findByTestId(uiEl.auth.pages.login)
         .should('be.visible')
         .within(() => {
            cy.findByPlaceholderText(
               uiEl.auth.texts.placeholderEmailAddress
            ).type(testData.correctEmailAddress, {
               delay: configs.typingDelay,
            });
            cy.findByPlaceholderText(
               uiEl.auth.texts.placeholderEnterPassword
            ).type(testData.incorrectPassword, {
               delay: configs.typingDelay,
            });

            cy.findByRole('button', {
               name: uiEl.auth.texts.buttonLogin,
            }).click();
            cy.findByText(uiEl.auth.errors.incorrectEmailOrPass).should(
               'be.visible'
            );
         });
   });

   it('Email already in use', () => {
      cy.findByTestId(uiEl.auth.pages.login)
         .should('be.visible')
         .within(() => {
            cy.findByRole('button', {
               name: uiEl.auth.texts.buttonCreateAccount,
            })
               .click()
               .wait(configs.smallWaitMs)
               .end();
         });

      cy.findByTestId(uiEl.auth.pages.signUp)
         .should('be.visible')
         .within(() => {
            cy.findByPlaceholderText(
               uiEl.auth.texts.placeholderEmailAddress
            ).type(testData.correctEmailAddress, {
               delay: configs.typingDelay,
            });
            cy.findByPlaceholderText(
               uiEl.auth.texts.placeholderEnterPassword
            ).type(testData.correctPassword, {
               delay: configs.typingDelay,
            });
            cy.findByPlaceholderText(
               uiEl.auth.texts.placeholderConfirmPassword
            ).type(testData.correctPassword, {
               delay: configs.typingDelay,
            });

            cy.findByRole('button', {
               name: uiEl.auth.texts.buttonCreateAccount,
            }).click();
            cy.findByText(uiEl.auth.errors.emailInUse).should('be.visible');
         });
   });
});
