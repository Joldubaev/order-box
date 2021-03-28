
let menu_list =document.getElementById('menu-list')
let orders_list =document.getElementById('orders-list')
let sum =document.getElementById('sum')
let items_count =document.getElementById('items-count')


const renderMenuItem=(product)=>{
   return `
        <div class="food-card" data-product='${JSON.stringify(product)}' onclick="onClickCard(event)">
            <img class="food-img"  src="${product.img}" alt="">
            <div>
                <div>${product.title}</div>
                <div>${product.price} som</div>
            </div>
        </div>
    `
}
const renderOrderItem=(orderItem)=>{
    return `
        <li class="order-item" onclick="onDelete(event)">
        <div> ${orderItem.title}</div>
        <span>count:${orderItem.count}</span>
        <span>price: ${orderItem.price}</span>
        <span data-order='${JSON.stringify(orderItem)}' onclick="onDelete(event)" class="delete-btn">X</span>
        </li>
     `
 }
 const renderOrders = (list) => {
    let items=[]
    list.map((item,index)=>{
       items.push(renderOrderItem(item))
    })
    orders_list.innerHTML = items.join('')
}
const renderMenuList=(list)=>{
   let items=[]
   list.map((item,index)=>{
      items.push(renderMenuItem(item))
   })
   menu_list.innerHTML = items.join('')
}
const onClickCard = (event) => {
    let card = JSON.parse(event.currentTarget.dataset.product)
    // orders_basket.push({...card,count:1})
  
    let currentIndex=orders_basket.findIndex(el=>el.id==card.id)
    if (currentIndex==-1){
        orders_basket.push({
            ...card,
            count:1
        })
    }else{
         orders_basket[currentIndex].count++
        orders_basket[currentIndex].price+=card.price
    }
    solveSum()
    getCount()
    renderOrders(orders_basket)
}
const onDelete = (event) => {
    let current_order = JSON.parse(event.currentTarget.dataset.order)
    let currentIndex = orders_basket.findIndex(el => el.id == current_order.id)
    let item_price = menu_items.find(el => el.id == current_order.id).price

    if (current_order.count > 1) {
        orders_basket[currentIndex].count--
        orders_basket[currentIndex].price -= item_price
        renderOrders(orders_basket)
    } else {
        orders_basket.splice(currentIndex, 1)
        renderOrders(orders_basket)
    }

    solveSum()
    getCount()
}

const solveSum = () => {
sum.innerHTML = orders_basket.reduce((it,{price})=>it+price,0)

}


const getCount = () => {
    items_count.innerHTML = orders_basket.reduce((it,{count})=>it+count,0)
}

renderMenuList(menu_items)