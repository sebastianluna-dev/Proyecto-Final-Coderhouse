const submitButton = document.querySelector("form")
const productsContainer = document.querySelector("#productsContainer")

const deleteProduct = async (id) => {
    const product = document.querySelector(`#product${id}`)
    const res = await fetch(`/api/products/${id}`, {
        method: "DELETE"
    })
    if (res.status === 200) {
        product.remove()
    }
}

const createProduct = ({title, image_url, price, id}) => {
    const productImage = document.createElement("img")
    productImage.src = image_url
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
    button.addEventListener("click", () => deleteProduct(id))
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
    productContainer.className = "bg-white grid grid-cols-2 hover:shadow-2xl rounded-2xl overflow-hidden duration-150 cursor-pointer" 
    productContainer.append(productImage, productDescription)
    productContainer.id = `product${id}`

    return productContainer
}

const onClickButton = async (event) => {
    event.preventDefault()

    const productData = {
        title: document.querySelector("#title").value,
        description: document.querySelector("#description").value,
        code: document.querySelector("#code").value,
        price: document.querySelector("#price").value,
        stock: document.querySelector("#stock").value,
        image_url: document.querySelector("#image").value
    }

    const res = await fetch("/api/products", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(productData)
    })

    const product = await res.json()
}

const getProducts = async () => {
    const res = await fetch("/api/products")
    const data = await res.json()
    const elementsArray = data.map(product => createProduct(product))
    productsContainer.append(...elementsArray)
}

getProducts()

submitButton.addEventListener("submit",  onClickButton)


