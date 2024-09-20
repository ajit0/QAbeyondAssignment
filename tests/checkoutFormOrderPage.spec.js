const { test, expect } = require('@playwright/test');

const { CheckoutOrderForm } = require('../pages/checkoutOrderForm');
const DataFile = require('../testData/ShippingAndPaymentDeatils.json')
test.describe('Checkout Order Form Page', () => {
    let checkoutFormOrderPage;
    let page;
    let context;
    let browser;



    test.beforeEach(async ({ browser }) => {
        // browser = await chromium.launch();
        context = await browser.newContext();
        page = await context.newPage();
        checkoutFormOrderPage = new CheckoutOrderForm(page);
        await checkoutFormOrderPage.navigateToCart();
    });

    test.afterEach(async () => {
        await page.close();
        await context.close();


    });

    test('Test : Fill the Billing and payment info On checkout Page', async () => {
        // Verify that cart page is visible successfully
        await expect(page).toHaveURL('/checkout');
        // Fill the order form
        await checkoutFormOrderPage.enterShippingAddressDetails(
            DataFile.shippingDetails.name,
            DataFile.shippingDetails.email,
            DataFile.shippingDetails.address,
            DataFile.shippingDetails.city,
            DataFile.shippingDetails.state,
            DataFile.shippingDetails.zipCode
        );
        await checkoutFormOrderPage.enterPaymentDetails(
            DataFile.paymentDetails.name,
            DataFile.paymentDetails.cardNumber,
            DataFile.paymentDetails.expiryMonth,
            DataFile.paymentDetails.expiryYear,
            DataFile.paymentDetails.cvv
        );
        // Click on Continue to checkout button
        await checkoutFormOrderPage.clickShippingAdressSame(true);
        await checkoutFormOrderPage.clickContunieToCheckout();
        // Verify success message 'Order Confirmed!' is visible
        const { confirmationMessage, orderNumber } = await checkoutFormOrderPage.verifyOrderSuccess();
        expect(confirmationMessage).toContain('Order Confirmed!')
        expect(orderNumber).not.toBe(null);
    });
    test('Test : Verify alert when "Shipping address same as billing" is unchecked', async () => {
        // Navigate to checkout page
        await page.goto('http://localhost:3100/checkout');
        // Fill the order form
        await checkoutFormOrderPage.enterShippingAddressDetails(
            DataFile.shippingDetails.name,
            DataFile.shippingDetails.email,
            DataFile.shippingDetails.address,
            DataFile.shippingDetails.city,
            DataFile.shippingDetails.state,
            DataFile.shippingDetails.zipCode
        );

        // Uncheck "Shipping address same as billing" checkbox if it is checked
        await checkoutFormOrderPage.enterPaymentDetails(
            DataFile.paymentDetails.name,
            DataFile.paymentDetails.cardNumber,
            DataFile.paymentDetails.expiryMonth,
            DataFile.paymentDetails.expiryYear,
            DataFile.paymentDetails.cvv
        );
        await checkoutFormOrderPage.clickShippingAdressSame(false);
        const dialogPromise = page.waitForEvent('dialog');
        // Try to submit the form
        await checkoutFormOrderPage.clickContunieToCheckout();
        // Validate that the alert message is shown and confirm the alert
        const dialog = await dialogPromise;
        console.log(dialog.message());
        expect(dialog.message()).toContain(DataFile.DailogMessage);
        await dialog.accept();
        // Assert alert is gone
        const alertVisible = await page.isVisible('.alert'); // Adjust the selector as needed
        expect(alertVisible).toBe(false);

    });
    test('Test : Verify cart total is correct', async () => {
        const expectedTotal = await checkoutFormOrderPage.calculateTotalAmountInCart();
        const actualTotalText = await page.locator('p b').innerText();
        const actualTotal = parseFloat(actualTotalText.replace('$', '').trim());
        expect(parseFloat(actualTotal)).toBe(expectedTotal);

    });

});