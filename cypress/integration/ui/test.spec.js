context("SDET Eval App Blog", () => {
    describe("Blog", () => {
        beforeEach(() => {
            cy.visit("/");
        });
        
        it("All links should have HREF populated", () => {
            cy.get("a").each((link) => {
            cy.wrap(link).invoke("attr", "href").should("not.be.empty");
            });
        });

        it("Post rendering works correctly for all post previews", () => {
            cy.get('[data-testid="post-preview"]').each(() => {
                cy.get('h3').should('be.visible').should('not.be.empty')
                cy.get('a').should('be.visible').should('have.attr', 'href').should('not.be.empty')
                cy.get('[data-testid="excerpt"]').should('not.be.empty').should('be.visible')
            })
        });

        //this test is passing but something is wrong.
        //Take a look and see what you find.
        // This test appeared twice in the original repo
        it("Checks for page navigations on blogs posts", () => {      
            let location = cy.location('href')
            cy.get('[data-testid="heroPostLink"]').click()
            cy.location('href').should('not.equal', location)
        });

        it("Validates footer and contents", () => {
           cy.get('footer').should('be.visible').within(($footer) => {
               cy.get('h3').should('not.be.empty')
           })
        });
    });
});
  