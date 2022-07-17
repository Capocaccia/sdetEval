import { rest } from 'msw'
import base64Image from '!url-loader!./images/disny.jpeg';

function redirect(destination, statusCode) {
    return (res) => {
        res.status = statusCode
        res.headers.set('Location', destination)
        return res
    }
}

export const handlers = [
    rest.get('/_next/image', async (_, res, ctx) => {
        const imageBuffer = await fetch(base64Image).then((res) =>
            res.arrayBuffer(),
        )
        return res(
            ctx.set('Content-Length', imageBuffer.byteLength.toString()),
            ctx.set('Content-Type', 'image/jpeg'),
            ctx.body(imageBuffer),
        )
    }),
    rest.get('/_next/data/development/posts/:fileName', async (req, res, ctx) => {
        const { fileName } = req.params;
        const testData = await ctx.fetch('/api/mock_api?slug=' + fileName.replace('.json', '') + '&isMock=true').then((res) =>
            res.json(),
        );

        return res(
            ctx.json({ "pageProps": { "post": testData }, "__N_SSG": true })
        );

    }),

]
