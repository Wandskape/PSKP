const http = require('http')
const {createHandler} = require('graphql-http/lib/use/http')
const schema = require("./schema")
const {initializeDb, closeDb} = require("./db")
const resolvers = require("./resolvers")

async function startServer() {
    try {
        await initializeDb()

        const server = http.createServer(createHandler({
            schema: schema,
            rootValue: resolvers,
        }))

        const PORT = process.env.PORT || 3000
        server.listen(PORT, () => {
            console.log(`Server started http://localhost:${PORT}`)
        })

        process.on('SIGINT', async () => {
            await closeDb()
            process.exit(0)
        })

    } catch (err) {
        console.error('Failed to start server:', err)
        process.exit(1)
    }
}

startServer().then()
