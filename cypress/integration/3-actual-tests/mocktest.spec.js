context("SDET Eval App Blog", () => {
    describe("Blog", () => {
        beforeEach(() => {
            cy.visit("/");
        });

        it("expects json keys", () => {
            for (let file of ['hello-world', 'dynamic-routing', 'preview']) {
                (async () => {
                    const jsonData = await fetch("/_next/data/development/posts/" + file + ".json")
                        .then(response => response.json() )
                        .then(items => { return items.pageProps.post });

                    const apiData = await fetch('/api/mock_api?slug=' + file + '&isMock=true')
                        .then(response => { return response.json() });

                    expect(jsonData.author != null && apiData.author != null).to.be.true;
                    expect(jsonData.author.name != null && jsonData.author.name == apiData.author.name).to.be.true;
                    expect(jsonData.author.picture = null && jsonData.author.picture == apiData.author.picture).to.be.true;
                    expect(jsonData.title != null && jsonData.title == apiData.title).to.be.true;
                    expect(jsonData.excerpt != null && jsonData.excerpt == apiData.excerpt).to.be.true;
                    expect(jsonData.coverImage != null && jsonData.coverImage == apiData.coverImage).to.be.true;
                    expect(jsonData.date != null && jsonData.date == apiData.date).to.be.true;
                    expect(jsonData.ogImage != null && apiData.ogImage != null).to.be.true;
                    expect(jsonData.ogImage.url == apiData.ogImage.url).to.be.true;
                    // expect(JSON.stringify(jsonData) === JSON.stringify(apiData)).to.be.true;
                })();
            }
        })
    })
});
