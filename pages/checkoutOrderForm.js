class CheckoutOrderForm{
    constructor(page) {
        this.page = page;
    }
    get fullName(){
        return this.page.locator('#fname');
    }
    get emailInput(){
        return this.page.locator('#email');
    }
    get addressInput(){
        return this.page.locator('#adr');
    }
    get cityInput(){
        return this.page.locator('#city');
    }
    get stateInput(){
        return this.page.locator('#state');
    }
    get zipInput(){
        return this.page.locator('#zip');
    }
    get nameOnCard(){
        return this.page.locator('#cname');
    }
    get cardNumber(){
        return this.page.locator('#ccnum');
    }
    get expMonth(){
        return this.page.locator('#expmonth');
    }
    get expYear(){
        return this.page.locator('#expyear');
    }
    get cvv(){
        return this.page.locator('#cvv');
    }
    get contunieToCheckout(){
        return this.page.locator('.btn');
    }
    get shippingAdressSame(){
        return this.page.locator("input[name='sameadr']");
    }
    get orderConfirmationMessage(){
        return this.page.locator('#order-confirmation');
    }
    get orderNumber(){
        return this.page.locator("[data-id= 'ordernumber']");
    }

    async navigateToCart(){
        await this.page.goto('/checkout');
    }
    
    async enterShippingAddressDetails(fullName, email, address, city, state, zip){
        await this.fullName.fill(fullName);
        await this.emailInput.fill(email);
        await this.addressInput.fill(address);
        await this.cityInput.fill(city);
        await this.stateInput.fill(state);
        await this.zipInput.fill(zip);
    }
    async enterPaymentDetails(nameOnCard, cardNumber, expMonth, expYear, cvv){
        await this.nameOnCard.fill(nameOnCard);
        await this.cardNumber.fill(cardNumber);
        //await this.expMonth.fill(expMonth);
        await this.expMonth.selectOption(expMonth);
        await this.expYear.fill(expYear);
        await this.cvv.fill(cvv);
    }
    async clickShippingAdressSame(shouldCheck){
        const isChecked = await this.shippingAdressSame.isChecked();
        if (shouldCheck && !isChecked) {
            await this.shippingAdressSame.click();
        } else if (!shouldCheck && isChecked) {
            await this.shippingAdressSame.click();
        } else {
            console.log(`Shipping address is already ${shouldCheck ? 'same as' : 'different from'} billing address`);
        }
    }
    async clickContunieToCheckout(){
        await this.contunieToCheckout.click();
    }
    async verifyOrderSuccess(){
        await this.page.waitForSelector('#order-confirmation');
        const [confirmationMessage, orderNumber] = await Promise.all([
            this.orderConfirmationMessage.textContent(),
            this.orderNumber.textContent()
        ]);
        return { confirmationMessage, orderNumber };
    }
    async calculateTotalAmountInCart() {
        const productPrices = await this.page.locator('p:has(a) .price').allTextContents(); // Adjust the selector as needed
        const total = productPrices.reduce((acc, price) => acc + parseFloat(price.replace('$', '')), 0);
        console.log("total price in cart is "+ total)
        return total;
    }



}

module.exports = {CheckoutOrderForm};