class GridItemsPage {
    constructor(page) {
        this.page = page;

    }
    async getAllitems(){
        return this.page.locator('.item');
    }
    async getItemNameByIndex(index) {
        //return this.page.locator('[data-test-id="item-name"]').nth(index);
        return this.page.locator(`div.item>>h4 >> nth=${index}`)

    }
    async getItemPriceByIndex(index) {
        //return this.page.locator('[data-test-id="item-price"]').nth(index)
        return this.page.locator(`#item-price >>nth=${index}`)

    }
    async getItemImageByIndex(index) {
        return this.page.locator('.item').nth(index).locator('img');
    }
    async getItemButtonByIndex(index) {
        return this.page.locator('.item').nth(index).locator('[data-test-id="add-to-order"]');
    }
    async navigateToGridItemsPage() {
        await this.page.goto('/grid');
    }
    async getItemDetailsByIndex(index) {
        const titleElement = await this.getItemNameByIndex(index);
        const title = await titleElement.textContent();
        const priceElement = await this.getItemPriceByIndex(index);
        const price = await priceElement.textContent();
        const imageElement = await this.getItemImageByIndex(index);
        const imageSrc = await imageElement.getAttribute('src');
        const buttonElement = await this.getItemButtonByIndex(index);
        const buttonText = await buttonElement.textContent();

        return { title, price, imageSrc, buttonText };
    }
    
}
module.exports = { GridItemsPage };