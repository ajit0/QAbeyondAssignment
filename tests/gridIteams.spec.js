const { test, expect } = require('@playwright/test');
const { GridItemsPage } = require('../pages/gridItemsPage')
const DataFile = require('../testData/GridPageData.json')

test.describe('Grid Items Page', () => {   
    let gridItemsPage;
    let page;
    let context;
    let browser;
    
    test.beforeEach(async ({browser}) => {
        // browser = await chromium.launch();
        context = await browser.newContext();
        page = await context.newPage();
        gridItemsPage = new GridItemsPage(page);
        await gridItemsPage.navigateToGridItemsPage();
    });

    test.afterEach(async () => {
        await page.close();
        await context.close();
    });

    test('Test : Verify 7th item name and price', async () => {
        // Get the details of the 7th item (index 6)
        const itemDetails = await gridItemsPage.getItemDetailsByIndex(DataFile.index);
        console.log('7th Item Details:', itemDetails);
        // Assert the item name
        expect(itemDetails.title).toBe(DataFile.titleOf7thitem);
        // Assert the item price
        expect(itemDetails.price).toEqual(DataFile.price);
    
    });

    test('Grid All Items Test', async () => {
        const items = await gridItemsPage.getAllitems();
        const itemCount = await items.count();

        for (let i = 0; i < itemCount; i++) {
            const itemDetails = await gridItemsPage.getItemDetailsByIndex(i);

            expect(itemDetails.title).not.toBe('');
            expect(itemDetails.price).not.toBe('');
            expect(itemDetails.imageSrc).not.toBe('');
            expect(itemDetails.buttonText).not.toBe('');
        }
    });
});