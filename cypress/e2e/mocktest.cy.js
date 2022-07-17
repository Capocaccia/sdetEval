context("SDET Eval App Blog", () => {
    describe("Blog", () => {
        beforeEach(() => {
            cy.visit("/");
        });

        it("expects json keys", () => {
            for (let file of ['hello-world']) {
                fetch("/_next/data/development/posts/" + file + ".json")
                    .then(response => response.json())
                    .then(items => {
                        items = items.pageProps;
                        fetch('/api/mock_api?slug=' + file + '&isMock=true')
                            .then(response => response.json())
                            .then(data => {
                                console.log(items.post)
                                console.log(data)
                                expect(JSON.stringify(items.post) === JSON.stringify(data)).to.be.true;
                            });

                    })
                    .catch(error => {
                        console.log(error)
                    });
            }
        })
    })
});
