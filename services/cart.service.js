const { readFile, writeFile } = require("fs/promises")

module.exports = class Cart {

    constructor(fileName) {
        this._fileName = fileName
        this._counter = 1
    }
    async createCart() {
        this._counter = 1
        const fileContent = await readFile(`./database/${this._fileName}`, { encoding: "utf-8", flag:'r'})
        const objectArray = JSON.parse(fileContent)
        let isObject = objectArray.find(obj => obj.id === this._counter)
        while (isObject) {
            this._counter = this._counter + 1
            isObject = objectArray.find(obj => obj.id === this._counter)
        }
        const newObject =  {
            id: this._counter, 
            timestamp: Date.now(),
            products: []
        }
        objectArray.push(newObject)
        await writeFile(`./database/${this._fileName}`, JSON.stringify(objectArray),{ encoding: "utf-8", flag:'w'})
        return newObject.id
    }
    async deleteCart(id) {
        const fileContent = await readFile(`./database/${this._fileName}`, { encoding: "utf-8", flag:'r'})
        const objectArray = JSON.parse(fileContent)
        const object = objectArray.findIndex(obj => obj.id === id)
        if (object < 0) 
            return false 
        const filteredData = objectArray.filter(obj => obj.id !== id)
        await writeFile(`./database/${this._fileName}`, JSON.stringify(filteredData),{ encoding: "utf-8", flag:'w'})
        return true
    }
    async getCartProducts(id) {
        const fileContent = await readFile(`./database/${this._fileName}`, { encoding: "utf-8", flag:'r'})
        const objectArray = JSON.parse(fileContent)
        const cartIndex = objectArray.findIndex(obj => obj.id === id)
        if (cartIndex < 0) 
            return false
        return objectArray[cartIndex].products
    }
    async addCartProduct(id, product) {
        const fileContent = await readFile(`./database/${this._fileName}`, { encoding: "utf-8", flag:'r'})
        const objectArray = JSON.parse(fileContent)
        const cartIndex = objectArray.findIndex(obj => obj.id === id)
        if (cartIndex < 0) 
            return false
        objectArray[cartIndex].products.push(product)
        await writeFile(`./database/${this._fileName}`, JSON.stringify(objectArray),{ encoding: "utf-8", flag:'w'})
        return true
    }
    async deleteCartProduct(id, id_prod) {
        const fileContent = await readFile(`./database/${this._fileName}`, { encoding: "utf-8", flag:'r'})
        const objectArray = JSON.parse(fileContent)
        const cartIndex = objectArray.findIndex(obj => obj.id === id)
        if (cartIndex < 0) 
            return { status: false, message: "There is not any cart with that id" }
        const products = objectArray[cartIndex].products
        const productIndex = products.findIndex(obj => obj.id === id_prod)
        if (productIndex < 0) 
            return { status: false, message: "There is not any product with that id in this cart" }
        objectArray[cartIndex].products = products.filter(obj => obj.id !== id_prod)
        await writeFile(`./database/${this._fileName}`, JSON.stringify(objectArray),{ encoding: "utf-8", flag:'w'})
        return products.filter(obj => obj.id === id_prod)
    }
}