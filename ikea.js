(function () {

    const url = new URL(window.location.href);
    const colors = {
        yellow: '#ffd500'
    };
    const selectors = {
        product: {
            info: '.product-information',
            compact: '.Product_Compact',
            name: '.pie-productname',
            price: '.Price-information--value',
            addBtn: '.IKEA-Component-Form-Submit-Submit-button',
        } ,
        cart: {
           item: '.IKEA-PageModule-ShoppingBag-_Item',
           quantity: '.IKEA-PageModule-ShoppingBag-_Item-quantity',
        }
    };

    function getProductName(product){
        const name = product.querySelector(selectors.product.name);
        return name ? name.textContent.trim() : null;
    }

    function getProductPrice(product){
        const price = product.querySelector(selectors.product.price);
        return price ? Number(price.textContent): null;
    }

    function getProductAddBtn(product) {
        return product.querySelector(selectors.product.addBtn);
    }

    function getCartItemQuantity(item) {
        const quantity = item.querySelector(selectors.cart.quantity);
        return quantity ? Number(quantity.value) : 1;
    }

    function trackAddToCart(){
        const products = document.querySelectorAll(selectors.product.compact);
        products.forEach((product) => {
            const addBtn = getProductAddBtn(product);
            if (addBtn) {
                const productName = getProductName(product);
                addBtn.addEventListener('click',(event) => {
                    console.log(`Added to cart ${productName}`);
                })
            }
        });
    }

    function actionIndex() {
        console.log('homepage');
    }

    function actionProduct() {
        const product = document.querySelector(selectors.product.info);
        const addBtn = getProductAddBtn(product);
        if (addBtn) {
            addBtn.style.cssText = `background-color: ${colors.yellow} !important; border-color: ${colors.yellow} !important;`;
        }
        console.log(getProductName(product), getProductPrice(product));
    }

    function actionCart() {
        const products = document.querySelectorAll(selectors.cart.item);
        let sum = 0;
        let count = 0;
        products.forEach((product) => {
            const quantity = getCartItemQuantity(product);
            sum += getProductPrice(product) * quantity ;
            count += quantity ;
        });
        console.log(count, sum / count);
    }

    function actionSearch() {
        const key = url.searchParams.get('k');
        console.log(key);
        trackAddToCart();
    }

    function mapAction(path){
        switch (path) {
            //homepage
            case '/':
                actionIndex();
                break;
            //product page
            case (path.match(/\/products\/.+\/.+-\d+/) || {}).input:
                actionProduct();
                break;
            //shopping cart page
            case (path.match(/\/order\/shoppingbag/) || {}).input:
                actionCart();
                break;
            //search page
            case (path.match(/\/search\//) || {}).input:
                actionSearch();
                break;
            default:
                break;
        }
    }

    mapAction(url.pathname);

}());
