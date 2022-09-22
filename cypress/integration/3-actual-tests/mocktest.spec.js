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

                    expect(jsonData).to.deep.equal(apiData);
                })();
            }
        })
    })
});
