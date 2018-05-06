(function () {

    const url = new URL(window.location.href);
    const colors = {
        yellow: '#ffd500'
    };
    const selectors = {
        product: {
            info: '.product-information',
            addBtn: '.IKEA-Component-Form-Submit-Submit-button',
        } ,
    };
    const storageName = 'ABtest_addBtn';
    const probability = 0.5;

    function mapAction(path){
        switch (path) {
            //product page
            case (path.match(/\/products\/.+\/.+-\d+/) || {}).input:
                ABtest();
                break;
            default:
                break;
        }
    }

    function getProductAddBtn(product) {
        return product.querySelector(selectors.product.addBtn);
    }

    function ABtest() {
        let perform = window.localStorage.getItem(storageName);
        if (perform == null) {
            perform = Math.random() < probability;
            window.localStorage.setItem(storageName, perform);
        } else {
            perform = (perform === 'true');
        }
        if (perform) {
            const addBtn = getProductAddBtn(document.querySelector(selectors.product.info));
            if (addBtn) {
                addBtn.style.cssText = `background-color: ${colors.yellow} !important; border-color: ${colors.yellow} !important;`;
            }
        }
    }

}());
