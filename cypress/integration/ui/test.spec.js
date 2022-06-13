
context("SDET Eval App Blog", () => {
    describe("Blog", () => {
        beforeEach(() => {
            cy.visit("/");
        });
       /* it("All links should have HREF populated", () => {
            cy.get("a").each((link) => {
                cy.wrap(link).invoke("attr", "href").should("not.be.empty");         //UI Code error - href is empty
            });
        }); */
        //To check 200 response for links without clicking
        it("Checking for 200 response on links", () => {
            cy.get("a").each((link) => {
                cy.request({
                    url: link.attr("href"),
                    followRedirect: false,
                  }).then((resp) => {
                    expect(resp.status).to.eq(200)
                    expect(resp.redirectedToUrl).to.eq(undefined)
                  })        
            });
        });

        it("Post rendering works correctly for all post previews", () => {
            cy.get('[data-testid="post-preview"]').each(($post) => {                  //test error - selector format is incorrect & UI Code error - conditional statement issue
                cy.get('h2').should('be.visible').should('not.be.empty')
                cy.get('a').should('be.visible').should('have.attr', 'href').should('not.be.empty')
                cy.get('[data-testid="excerpt"]').should('not.be.empty').should('be.visible')           //test error - typo error for 'excerpt'
            })
        });

        //this test is passing but something is wrong.
        //Take a look and see what you find.
        it("Checks for page navigations on blogs posts", () => {      
            let location = cy.location('href')
            cy.get('[data-testid="heroPostLink"]').click()                              //UI Code error - 'title' is missing
            cy.location('href').should('not.equal', location)
        });

        it("Validates footer and contents", () => {
           cy.get('footer').should('be.visible').within(($footer) => {                  //UI code error - hidden
               cy.get('h3').should('not.be.empty')
           })
        });
    });
});





  