const { test, expect } = require('@playwright/test');
const { SearchPage } = require('../pages/searchPage');
const DataFile = require('../testData/SearchPagesData.json')

test.describe('Search Page', () => {
    let searchPage;
    let page;
    let context;
    let browser;

    test.beforeEach(async ({ browser }) => {
        // browser = await chromium.launch();
        context = await browser.newContext();
        page = await context.newPage();
        searchPage = new SearchPage(page);
        await searchPage.navigateToSearchPage();
    });

    test.afterEach(async () => {
        await page.close();
        await context.close();
    });

    test('Test : Search for a word', async () => {
       let searchword = DataFile.searchWord;
        await searchPage.searchForWord(searchword);
        // Verify the search result
        await page.waitForResponse(response => 
            response.url().includes('/search-engine') && response.status() === 200
        );
        const searchResultText = await searchPage.getSearchResultText();
        expect(searchResultText).toContain(`${DataFile.foundResultMessage} ${searchword}`);
    });
    test('Search Empty', async () => {
        await searchPage.submitEmptySearch();
        //Verify the empty search result
        await page.waitForResponse(response => 
            response.url().includes('/search-engine') && response.status() === 404
        );
        const searchResultText = await searchPage.getSearchResultText();
        expect(searchResultText).toBe(DataFile.emptyMessage);
    });
});