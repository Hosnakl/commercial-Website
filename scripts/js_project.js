let data = [
    {
        id: 1,
        name: 'DREAMY WHITE',
        image: 'images/images/dip/Blanc_bec_215g.png',
        price: '$7.99',
    },
    {
        id: 2,
        name: 'FONDUE TRIO',
        image: 'images/images/dip/CF_BoiteTrio_400x400_LNCFDS.png',
        price: '$21.99',
    },
    {
        id: 2,
        name: 'COOKIES AND CREAM',
        image: 'images/images/dip/Duo_biscuitcreme_1200X1200(v3).png',
        price: '$7.99',
    },
    {
        id: 2,
        name: "S'MORES",
        image: 'images/images/dip/DuoCFDS2_800x800.png',
        price: '$7.99',
    },
    {
        id: 2,
        name: "MAPLE FONDANT",
        image: 'images/images/dip/erable_fondant_duo.png',
        price: '$7.99',
    },
    {
        id: 2,
        name: "HAZELNUT PRALINE",
        image: 'images/images/dip/FondantNoisetteDUO2_800x800.png',
        price: '$7.99',
    },
    {
        id: 2,
        name: "COTTON CANDY",
        image: 'images/images/dip/Fondue215g_BAP_800x800.png',
        price: '$7.99',
    },
    {
        id: 2,
        name: "CRUNCHY HAZELNUT",
        image: 'images/images/dip/noisettes_croquantes_duo.png',
        price: '$7.99',
    },
    {
        id: 2,
        name: "SALTED CARAMEL",
        image: "images/images/dip/S'moresDUO2_800x800.png",
        price: '$7.99',
    },
    {
        id: 2,
        name: "DARK SALTED",
        image: "images/images/dip/Shortcake_aux_fraises.png",
        price: '$7.99',
    },
    {
        id: 2,
        name: "TANZANIA",
        image: "images/images/dip/Tanzanie215g.png",
        price: '$7.99',
    },
    {
        id: 2,
        name: "ORIGINAL MILK",
        image: "images/images/box/ECOM_12Fantaisies_Lait.png",
        price: '$12.99',
    },
    {
        id: 2,
        name: "ORIGINAL MILK & DARK",
        image: "images/images/box/ECOM_12Fantaisies_Lait_Noir.png",
        price: '$12.99',
    },
    {
        id: 2,
        name: "ORIGINAL DARK",
        image: "images/images/box/ECOM_12Fantaisies_Noir.png",
        price: '$12.99',
    },
    {
        id: 2,
        name: "MILK",
        image: "images/images/box/ECOM_24Fantaisies_Lait.png.png",
        price: '$12.99',
    },
    {
        id: 2,
        name: "DARK",
        image: "images/images/box/ECOM_24Fantaisies_Noir.png",
        price: '$12.99',
    },
    {
        id: 2,
        name: "BOX ONE",
        image: "images/images/gift/PanierDivin_800x800_2021.png",
        price: '$35.99',
    },
    {
        id: 2,
        name: "BOX TWO",
        image: "images/images/gift/PanierMignon_800x800_2021.png",
        price: '$35.99',
    },
    {
        id: 2,
        name: "BOX THREE",
        image: "images/images/gift/PanierSympathique_800x800_2021.png",
        price: '$35.99',
    },

]

let order = document.getElementById('order')
let menu = document.querySelector('#option')
let options = []
let information = []
let item_checker = []
let sum = 0
let search = false
let newData
let check = JSON.parse(localStorage.getItem('product'))

totalItem = (data) => {
    let result = data.map(product => {
        return `<div class="col-4 card"  id="product">
        <img class="card-img-top p-2" src=${product.image} />
        <div class="card-body  color-black">
        <h5 class="card-title">${product.name}</h5>
        <p class="card-text">${product.price}</p>
        <a href="#" class="btn btn-primary bg-success"><i class="fa fa-shopping-cart"></i></a>
        </div>
        </div>`
    })
    menu.innerHTML = result.join('')
    options = document.querySelectorAll('#option>div')
}

function getOption(e) {
    let price = e.currentTarget.children[1].children[1].textContent
    price = price.split('$')
    let basicPrice = price.splice(price.indexOf(0), 1)
    let product_price = parseFloat(basicPrice)
    let product_name = e.currentTarget.children[1].children[0].textContent
    let image = e.currentTarget.children[0].src
    let targetProduct = image.indexOf('images')
    let product_image = image.slice(targetProduct)
    let item = { product_price, product_image, product_name, basicPrice, count: 1 }
    if (check == null) {
        information.push(item)
    } else {
        information = check
        let finder = check.map(product => {
            return product.product_image
        })
        if (finder.includes(product_image)) {
            search = true
        } else {
            search = false
            information.push(item)
        }
    }
    localStorage.setItem('product', JSON.stringify(information))
    check = JSON.parse(localStorage.getItem('product'))
    search ? Swal.fire({
        title: 'Error! Already added before',
        text: 'You can modify amount using cart page',
        icon: 'error',
        confirmButtonText: 'Ok'
    }) : Swal.fire({
        title: 'Added to cart',
        text: 'You can modify amount using cart page',
        icon: 'success',
        confirmButtonText: 'cool'
    })
    card()
}

card = () => {
    let data = localStorage.getItem('product')
    let products = JSON.parse(data).map(product => {
        return `
           <div class = "cart-item">
                <img src=${product.product_image} />
                <div class = "cart-item-info">
                    <h3 class = "cart-item-name">${product.product_name}</h3>
                    <span class = "cart-item-price">${product.basicPrice}</span>
                   
                </div>
              
            </div>`
    })

    document.querySelector('#cart').innerHTML = products.join('')
    console.log(document.querySelector('#cart').innerHTML)
    calculator()
    itemCards()
}


window.addEventListener('DOMContentLoaded', totalItem(data))
window.addEventListener('DOMContentLoaded', card)
options.forEach(item => item.addEventListener('click', getOption))


