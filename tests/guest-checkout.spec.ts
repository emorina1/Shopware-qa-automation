import { test, expect } from '@playwright/test';

test('Guest can complete checkout with Cash on Delivery', async ({ page }) => {

  // 1. Open Shopware Demo Store
  await page.goto('https://www.shopware6-demo.development-s25.com/');

  await expect(page).toHaveURL(
    /shopware6-demo\.development-s25\.com/
  );

  // 2. Open Clothing category
  await page
    .getByLabel('Hauptnavigation')
    .getByRole('link', { name: 'Clothing', exact: true })
    .click();

  // 3. Open Demo Produkt
  await page
    .getByRole('link', { name: 'Demo Produkt', exact: true })
    .click();

  // Verify product page
  await expect(
    page.getByRole('heading', {
      name: 'Demo Produkt',
      exact: true
    })
  ).toBeVisible();

  // 4. Add product to cart
  await page
    .getByRole('button', { name: 'In den Warenkorb' })
    .click();

  // Verify successful add-to-cart message
  await expect(
    page.getByText(/1 Produkt zum Warenkorb hinzugefügt/i)
  ).toBeVisible();

  // 5. Open shopping cart
  const cartButton = page.locator('.header-cart-btn');

  await cartButton.click();

  // Verify product is visible in cart
  await expect(
    page.getByText('Demo Produkt', { exact: true }).first()
  ).toBeVisible();

  // Proceed to checkout
  await page
    .getByRole('link', { name: 'Zur Kasse' })
    .click();

  // 6. Fill guest customer information
  await page
    .getByRole('textbox', { name: 'Vorname' })
    .fill('Test');

  await page
    .getByRole('textbox', { name: 'Nachname' })
    .fill('User');

  await page
    .getByRole('textbox', { name: 'E-Mail-Adresse' })
    .fill('testuser@example.com');

  await page
    .getByRole('textbox', { name: 'Straße und Hausnummer' })
    .fill('Teststrasse 10');

  await page
    .getByRole('textbox', { name: 'PLZ' })
    .fill('10115');

  await page
    .getByRole('textbox', { name: 'Ort' })
    .fill('Berlin');

  // 7. Continue to order review
  await page
    .getByRole('button', { name: 'Weiter' })
    .click();

  // 8. Select Cash on Delivery
  const cashOnDelivery = page.getByRole('radio', {
    name: 'Cash on delivery'
  });

  await cashOnDelivery.check();

  // Verify payment method
  await expect(cashOnDelivery).toBeChecked();

  // 9. Accept terms and conditions
  const termsCheckbox = page.getByRole('checkbox', {
    name: 'Ich habe die AGB gelesen und'
  });

  await termsCheckbox.check();

  await expect(termsCheckbox).toBeChecked();

  // 10. Confirm order
  await page
    .getByRole('button', {
      name: 'Zahlungspflichtig bestellen'
    })
    .click();

  // 11. Verify successful order
  await expect(
    page.getByText(/Vielen Dank für Ihre Bestellung/i)
  ).toBeVisible();

  // Verify order number is displayed
  await expect(
    page.getByText(/Bestellnummer/i)
  ).toBeVisible();

});