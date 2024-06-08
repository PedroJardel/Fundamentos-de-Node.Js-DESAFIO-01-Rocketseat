import http from 'node:http';
 

const server = http.createServer(async (req, res) => {
    const { method, url } = req
    await json(req, res)

})

server.listen(3333)