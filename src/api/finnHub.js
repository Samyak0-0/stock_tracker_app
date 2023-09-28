import axios from "axios"

const TOKEN = "ck9ub09r01qq65jkjtn0ck9ub09r01qq65jkjtng"

export default axios.create ({
    baseURL: "https://finnhub.io/api/v1",
    params: {
        token: TOKEN
    }
})