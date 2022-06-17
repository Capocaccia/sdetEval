## How to use

To start the app in dev mode:
```
yarn dev
```

To start the app in production mode
``` 
yarn build && yarn start
```

To run cypress
```
yarn cypress:run
```

To open Cypress in GUI mode
```
yarn cypress:open
```

# Notes

This blog contains some failing Cypress tests. Run the tests and figure out whats going on.

This blog-starter uses [Tailwind CSS](https://tailwindcss.com) [(v3.0)](https://tailwindcss.com/blog/tailwindcss-v3).

# ToDo

   1. There are tests in this application that are failing. Run the tests and identify the root cause of the failure, then fix that failure.
   2. Create a test to validate each HREF on the page. Implement a solution that avoids clicking on each link but makes sure that the link does respond with a 200 status code.
   3. Using MSW , set up a handler that mocks a blog post and use that handler in a Cypress test. This way we have the ability to run against mocks if necessary.
