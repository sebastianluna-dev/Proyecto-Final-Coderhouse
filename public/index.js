const submitButton = document.querySelector("form")
const productsContainer = document.querySelector("#productsContainer")
const cartBackground = document.querySelector("#cartBackground")
const cartSidebar = document.querySelector("#cartSidebar")
const closeCartButton = document.querySelector("#closeCartButton")
const openCartButton = document.querySelector("#openCartButton")
const cartProductsContainer = document.querySelector("#cartProductsContainer")
const sidebarWhite = document.querySelector("#sidebar")


let isOpenCartOnce = false

const openCartModal = () => {
    cartSidebar.classList.remove("pointer-event-none")
    cartBackground.classList.remove("closed")
    sidebarWhite.classList.remove("closed")
    if (!isOpenCartOnce) {
        isOpenCartOnce = true 
        loadCartProducts()
    }
}
const closeCartModal = () => {
    cartSidebar.classList.add("pointer-event-none")
    cartBackground.classList.add("closed")
    sidebarWhite.classList.add("closed")
}

cartBackground.addEventListener("click", closeCartModal)
closeCartButton.addEventListener("click", closeCartModal)
openCartButton.addEventListener("click", openCartModal)

const deleteProduct = async (id) => {
    const product = document.querySelector(`#product${id}`)
    const res = await fetch("/api/products", {
        method: "DELETE",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ id })
    })
    if (res.status === 200) {
        product.remove()
    }
    await getCartProducts()
}

const deleteCartProduct = async (id) => {
    const product = document.querySelector(`#productCart${id}`)
    const res = await fetch("/api/cart/products", {
        method: "DELETE",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ id })
    })
    if (res.status === 200) {
        product.remove()
    }
}

const createCartIfDoesntExist = async () => {
    const isCartResponse = await fetch("api/cart", {
        method: "POST", 
        credentials: "include"
    })
    const isCart = await isCartResponse.json()
    console.log(isCart)
}

const addProductToCart = async (id) => {
    const res = await fetch(`api/cart/products`, {  
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ id })
    })
    const cart = await res.json()
    console.log(cart)
}

const deleteCart = async () => {
    const res = await fetch("api/cart", {
        method: "DELETE"
    })
    const response = await res.json()
    if (!response.message) {
        cartProductsContainer.innerHTML = ""
    }
}

const createProduct = ({title, image, price, _id}) => {
    const productImage = document.createElement("img")
    productImage.src = image
    productImage.className = "h-40 w-full object-cover rounded-2xl"

    const buttonIcon = `
        <svg class="w-full h-full" fill="#fff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
            <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/>
        </svg> 
    `
    const buttonContainer = document.createElement("div")
    buttonContainer.className = "flex justify-end"
    const button = document.createElement("button")
    button.className = "w-8 h-8 p-2 rounded-full bg-slate-400 flex items-center justify-center"
    button.addEventListener("click", () => deleteProduct(_id))
    button.innerHTML = buttonIcon
    buttonContainer.append(button)

    const productTitle = document.createElement("h2")
    productTitle.className = "text-xl font-semibold px-4"
    const titleText = document.createTextNode(title)
    productTitle.append(titleText)

    const productPrice = document.createElement("h2")
    productPrice.className = "px-4"
    const priceText = document.createTextNode(`$${price}`)
    productPrice.append(priceText)

    const addToCartButton = document.createElement("button")
    const buttonCartText = document.createTextNode("Add to cart")
    addToCartButton.addEventListener("click", async () => {
        console.log("product with this id: " + _id + " was added to cart")
        await createCartIfDoesntExist()
        await addProductToCart(_id)
        await getCartProducts()
        openCartModal()
    })
    addToCartButton.className = "bg-red-400 p-2 rounded-md block mx-auto mt-4 text-white font-semibold"
    addToCartButton.append(buttonCartText)
        
    const productDescription = document.createElement("div")
    productDescription.append(buttonContainer, productTitle, productPrice, addToCartButton)
    
    const productContainer = document.createElement("div")
    productContainer.className = "bg-white grid grid-cols-2 hover:shadow-2xl rounded-2xl overflow-hidden duration-150 cursor-pointer" 
    productContainer.append(productImage, productDescription)
    productContainer.id = `product${_id}`
    return productContainer
}

const createCartProduct = ({title, image, price, _id}) => {
    const productImage = document.createElement("img")
    productImage.src = image
    productImage.className = "h-40 w-full object-cover rounded-2xl"

    const buttonIcon = `
        <svg class="w-full h-full" fill="#fff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
            <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/>
        </svg> 
    `
    const buttonContainer = document.createElement("div")
    buttonContainer.className = "flex justify-end"
    const button = document.createElement("button")
    button.className = "w-8 h-8 p-2 rounded-full bg-slate-400 flex items-center justify-center"
    button.addEventListener("click", () => deleteCartProduct(_id))
    button.innerHTML = buttonIcon
    buttonContainer.append(button)

    const productTitle = document.createElement("h2")
    productTitle.className = "text-xl font-semibold px-4"
    const titleText = document.createTextNode(title)
    productTitle.append(titleText)

    const productPrice = document.createElement("h2")
    productPrice.className = "px-4"
    const priceText = document.createTextNode(`$${price}`)
    productPrice.append(priceText)

        
    const productDescription = document.createElement("div")
    productDescription.append(buttonContainer, productTitle, productPrice)
    
    const productContainer = document.createElement("div")
    productContainer.className = "bg-white grid grid-cols-2 hover:shadow-2xl rounded-2xl overflow-hidden duration-150 cursor-pointer mb-4" 
    productContainer.append(productImage, productDescription)
    productContainer.id = `productCart${_id}`

    return productContainer
}

const onClickButton = async (event) => {
    event.preventDefault()

    const productData = {
        title: document.querySelector("#title").value,
        description: document.querySelector("#description").value,
        code: document.querySelector("#code").value,
        price: parseInt(document.querySelector("#price").value),
        stock: parseInt(document.querySelector("#stock").value),
        image: document.querySelector("#image").value
    }

    const res = await fetch("/api/products", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(productData)
    })

    const product = await res.json()

    productsContainer.innerHTML = ""
    await getProducts()

}

const getProducts = async () => {
    const res = await fetch("/api/products")
    const data = await res.json()
    const elementsArray = data.map(product => createProduct(product))
    productsContainer.append(...elementsArray)
}

const getCartProducts = async () => {
    console.log("getcartproducts")
    const res = await fetch("/api/cart/products")
    const data = await res.json()
    if (Array.isArray(data)) {
        const arrrayFiltered = data.filter(product => product !== null)
        const elementsArray = arrrayFiltered.map(product => createCartProduct(product))
        cartProductsContainer.innerHTML = ""
        cartProductsContainer.append(...elementsArray)
    }
}

getProducts()


const loadCartProducts = async () => {
    await createCartIfDoesntExist()
    await getCartProducts()
}

submitButton.addEventListener("submit",  onClickButton)


