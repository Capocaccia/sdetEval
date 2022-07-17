if (typeof window === "undefined") {
  const { server } = require("./server");
  server.listen();
  console.log('This is the Server')
} else {
  const { worker } = require("./browser");
  worker.start({
    onUnhandledRequest: 'warn',
  })
  worker.printHandlers();
  console.log('This is the Browser')
}