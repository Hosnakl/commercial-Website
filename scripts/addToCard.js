function receiver() {
    let newData = JSON.parse(localStorage.getItem('product'))
    console.log(newData)
    if (!newData) {
        document.querySelector('.cart_page').style.display = 'none'
    }
    return newData
}

let x = receiver().map(item => item.product_price)
sum = x.reduce((total, product) => {
    return total += product
}, 0)

let products = receiver().map(product => {
    return `<li id="new">
    <img class="img-responsive" width="200" src=${product.product_image} />
    <span>Item Price</span>
    <span>${product.basicPrice}</span>
    <span id="plus">+</span>
    <span id="result_sum">${product.count}</span>
    <span id="minus">-</span>
    <span>TOTAL</span>
    <span id="total">${product.product_price}</span>
    <span>${product.product_name}</span>
    </li>`
})

document.getElementById('cart_data').innerHTML = products.join('')


calculator = () => {
    let data = localStorage.getItem('product')
    let price = JSON.parse(data)
    let y = price.map(item => item.product_price)
    sum = y.reduce((total, product) => {
        return total += product
    }, 0)
    document.querySelector('.totalPrice').textContent = sum ? `Check Out $${sum.toFixed(2)}` : 0
}



function itemCards() {
    document.querySelector('.totalPrice').textContent = sum ? `Check Out $${sum.toFixed(2)}` : 0
    document.querySelector('#cart_sub').innerHTML = receiver().length
    if (receiver() !== null) {
        let plus = document.querySelectorAll('#plus')
        plus.forEach(item => {
            item.addEventListener('click', (e) => {
                let parent = e.target.parentElement.children[0].src
                let targetProduct = parent.indexOf('image')
                let product_image = parent.slice(targetProduct)
                data = receiver().map(product => {
                    if (product_image == product.product_image) {
                        product.count += 1
                        e.target.parentElement.children[4].textContent = product.count
                        e.target.parentElement.children[7].textContent = product.basicPrice * product.count
                        product.product_price = (product.basicPrice * product.count)
                        return product
                    } else {
                        return product
                    }
                })
                localStorage.setItem('product', JSON.stringify(data))
                calculator()
            })
        })

        let minus = document.querySelectorAll('#minus')
        minus.forEach(item => {
            item.addEventListener('click', (e) => {
                let parent = e.target.parentElement.children[0].src
                let targetProduct = parent.indexOf('image')
                let product_image = parent.slice(targetProduct)
                let data = JSON.parse(localStorage.getItem('product'))
                newData = data.map(product => {
                    if (product_image == product.product_image) {
                        if (product.count <= 1) {
                            product.count = 1
                        } else {
                            product.count -= 1
                        }
                        e.target.parentElement.children[4].textContent = product.count
                        e.target.parentElement.children[7].textContent = product.basicPrice * product.count
                        product.product_price = product.basicPrice * product.count
                        return product
                    } else {
                        return product
                    }
                })
                localStorage.setItem('product', JSON.stringify(data))
                calculator()
            })
        })
    }
}

window.addEventListener('DOMContentLoaded', receiver())
window.addEventListener('DOMContentLoaded', itemCards())
