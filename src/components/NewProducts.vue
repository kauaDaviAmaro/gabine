<template>
    <section class="newProducts">
        <div class="subtitle1">
            NEW PRODUCTS
        </div>
        <div class="body2">
            Choose the headset that best suits your needs. We offer top-quality options with <br /> a variety of
            features to
            enhance your audio experience
        </div>
        <div class="products">
            <div class="product">
                <div class="img">
                    <img src="../assets/images/newProducts/blackHeadphone.webp" alt="new product">
                </div>
                <div class="body2">
                    Gabini® K-29 Premium Headset with Multi-Device Connectivity and Noise-Canceling Technology,
                    Black.
                </div>
                <div class="price">
                    <span class="symbol">$</span>
                    <h6>94.99</h6> <span class="old">$139.09</span>
                </div>
                <button>
                    ADD TO CART
                    <img src="../assets/images/icons/cart.webp" alt="cart" />
                </button>
            </div>
            <div class="product">
                <div class="img">
                    <img src="../assets/images/newProducts/blackHeadphone.webp" alt="new product">
                </div>
                <div class="body2">
                    Gabini® K-29 Premium Headset with Multi-Device Connectivity and Noise-Canceling Technology,
                    Black.
                </div>
                <div class="price">
                    <span class="symbol">$</span>
                    <h6>94.99</h6> <span class="old">$139.09</span>
                </div>
                <button>
                    ADD TO CART
                    <img src="../assets/images/icons/cart.webp" alt="cart" />
                </button>
            </div>
            <div class="product">
                <div class="img">
                    <img src="../assets/images/newProducts/blackHeadphone.webp" alt="new product">
                </div>
                <div class="body2">
                    Gabini® K-29 Premium Headset with Multi-Device Connectivity and Noise-Canceling Technology,
                    Black.
                </div>
                <div class="price">
                    <span class="symbol">$</span>
                    <h6>94.99</h6> <span class="old">$139.09</span>
                </div>
                <button>
                    ADD TO CART
                    <img src="../assets/images/icons/cart.webp" alt="cart" />
                </button>
            </div>
        </div>
    </section>
</template>

<style scoped>
.newProducts {
    background-color: #F3F5F9;
    text-align: center;

    padding: 105px 0;
    border-radius: 40px;

    & .products {
        padding: 0 20px;
        display: flex;
        justify-content: space-evenly;
        overflow-y: auto;

        & .product {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 0 60px;

            & .body2 {
                margin: 32px 0;
            }

            & .price {
                margin-bottom: 24px;
                display: flex;
                align-items: start;

                & h6 {
                    padding: 0 5px;
                }

                & .old {
                    color: #E12237;
                    text-decoration: line-through;
                }
            }

        }
    }

    & .body2 {
        margin: 16px 0 80px 0;
        color: var(--black-200);
    }
}
</style>