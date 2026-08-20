# Shopware 6 QA Automation

This project contains an automated end-to-end test created as part of the QA / Automation Tester Intern practical exercise.

## Test Scenario

The automated test verifies that a guest user can successfully complete an order using the Cash on Delivery payment method.

The test covers the following flow:

1. Open the Shopware 6 Demo Store.
2. Navigate to the Clothing category.
3. Open "Demo Produkt".
4. Add the product to the shopping cart.
5. Proceed to checkout.
6. Enter guest customer information.
7. Select Cash on Delivery.
8. Accept the terms and conditions.
9. Place the order.
10. Verify the order confirmation.

## Technologies Used

- Playwright
- TypeScript
- Node.js
- Visual Studio Code

## Installation

Install the project dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

## Run the Test

Run the automated test in Chromium:

```bash
npx playwright test tests/guest-checkout.spec.ts --project=chromium
```

Run the test with the browser visible:

```bash
npx playwright test tests/guest-checkout.spec.ts --project=chromium --headed
```

## Test Report

To open the Playwright HTML report:

```bash
npx playwright show-report
```

## Result

The guest checkout automation test was executed successfully in Chromium.

Expected result:

```text
1 passed
```

## Improvements

With more time, I would add additional automated test scenarios, including negative and edge cases, test the checkout flow across multiple browsers, and further improve the test structure by introducing reusable Page Objects.