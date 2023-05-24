/// <reference types="cypress" />

import { testData, configs, uiEl } from '../../../config/common.js';

describe('Create account functionality', () => {
   beforeEach(() => {
      cy.visit(configs.website);
      cy.findByRole('button', {
         name: uiEl.auth.texts.buttonCreateAccount,
      }).click();
   });

   it('Can see register prompt', () => {
      cy.findByTestId(uiEl.auth.pages.signUp)
         .should('be.visible')
         .within(() => {
            cy.findByText(uiEl.auth.texts.titleSignup)
               .should('be.visible')
               .should('have.text', uiEl.auth.texts.titleSignup);
            cy.findByPlaceholderText(
               uiEl.auth.texts.placeholderEmailAddress
            ).should('be.visible');
            cy.findByPlaceholderText(
               uiEl.auth.texts.placeholderEnterPassword
            ).should('be.visible');
            cy.findByPlaceholderText(
               uiEl.auth.texts.placeholderConfirmPassword
            ).should('be.visible');
         });
   });

   it('Incorrect email address', () => {
      cy.findByTestId(uiEl.auth.pages.signUp).within(() => {
         cy.findByPlaceholderText(uiEl.auth.texts.placeholderEmailAddress).type(
            testData.notValidEmailAddress,
            {
               delay: configs.typingDelay,
            }
         );
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
         cy.findByText(uiEl.auth.errors.incorrectEmailAddress).should(
            'be.visible'
         );
      });
   });

   it('Passwords do not match', () => {
      cy.findByTestId(uiEl.auth.pages.signUp).within(() => {
         cy.findByPlaceholderText(uiEl.auth.texts.placeholderEmailAddress).type(
            testData.correctEmailAddress,
            {
               delay: configs.typingDelay,
            }
         );
         cy.findByPlaceholderText(
            uiEl.auth.texts.placeholderEnterPassword
         ).type(testData.correctPassword, {
            delay: configs.typingDelay,
         });
         cy.findByPlaceholderText(
            uiEl.auth.texts.placeholderConfirmPassword
         ).type(testData.incorrectPassword, {
            delay: configs.typingDelay,
         });
         cy.findByRole('button', {
            name: uiEl.auth.texts.buttonCreateAccount,
         }).click();
         cy.findByText(uiEl.auth.errors.passwordsNotMatch).should('be.visible');
      });
   });
});
