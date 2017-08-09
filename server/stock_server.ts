import * as express from 'express'
import * as path from 'path'
import * as bodyParser from 'body-parser'
import { Server } from 'ws'

const app = express()
const nodeport = 3003


app.use('/', express.static(path.join(__dirname, '..', 'client')))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.get('/api/stock', (req, res) => {
    let result = stocks
    let params = req.query
    if (params.name) {
        result = result.filter(stock => stock.name.indexOf(params.name) != -1)
    }
    res.json(result)
})

app.get('/api/stock/:id', (req, res) => {
    res.json(stocks.find(stock => stock.id == req.params.id))
})

app.post('/api/savestock', (req, res) => {
    let stock = req.body
    // console.log(stock)
    if (stock.id == 0) {
        stock.id = stocks.length + 1
        stocks.push(stock)
        res.json({ create: "success" })
    } else {
        for (let i in stocks) {
            if (stocks[i].id == stock.id) {
                stocks[i] = stock
            }
        }
        res.json({save:"success"})
    }
})

app.get('/api/deleteStock/:id',(req,res)=>{
    for(let i in stocks){
        if(stocks[i].id == req.params.id){
            stocks.splice(parseInt(i),1)
        }
    }
    for(let i in stocks){
        stocks[i].id = parseInt(i)+1
    }
    res.json({delete:"success"})
})

const server = app.listen(nodeport, 'localhost', () => {
    console.log('started on port: ' + nodeport)
})

var subscriptions = new Set<any>()

const wsServer = new Server({ port: 8085 })
wsServer.on('connection', websocket => {
    subscriptions.add(websocket)
})

var messageCount = 0

setInterval(() => {
    subscriptions.forEach(ws => {
        if (ws.readyState === 1) {
            ws.send(JSON.stringify({ messageCount: messageCount++ }))
        } else {
            subscriptions.delete(ws)
        }
    })
}, 2000)

export class Stock {
    constructor(
        public id: number,
        public name: string,
        public price: number,
        public rating: number,
        public desc: string,
        public categories: Array<string>
    ) {
    }
}

const stocks: Stock[] = [
    new Stock(1, '第一只股票', 1.99, 3.5, '这是第一只股票', ['IT', '互联网']),
    new Stock(2, '第二只股票', 2.99, 4.5, '这是第二只股票', ['金融']),
    new Stock(3, '第三只股票', 3.99, 2.5, '这是第三只股票', ['IT']),
    new Stock(4, '第四只股票', 4.99, 1.5, '这是第四只股票', ['互联网']),
    new Stock(5, '第五只股票', 5.99, 3.5, '这是第五只股票', ['IT', '互联网']),
    new Stock(6, '第六只股票', 6.99, 4.5, '这是第六只股票', ['互联网']),
    new Stock(7, '第七只股票', 7.99, 2.5, '这是第七只股票', ['金融'])
];
