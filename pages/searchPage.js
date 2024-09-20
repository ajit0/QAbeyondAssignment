class SearchPage {
    constructor(page) {
        this.page = page;
    }
     get searchBoxInput()
     {
            return this.page.locator("input[placeholder='Search..']");
     }
        get searchButton()
        {
                return this.page.locator("button[type='submit']");
        }
        get searchResult()
        {
                return this.page.locator('#result');
        }
    async navigateToSearchPage() {
        await this.page.goto('/search');
    }

    async searchForWord(word) {
        await this.searchBoxInput.fill(word);
        await this.searchButton.click();
    
    }
    async submitEmptySearch() {
        await this.searchButton.click()
    }
    async getSearchResultText() {
        return await this.searchResult.textContent();

    }
}

module.exports = { SearchPage };