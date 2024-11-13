<script setup lang="ts">
import ok from '../assets/images/productsHighlighted/ok.webp';
import { onMounted } from 'vue';

onMounted(() => {
    const redBlue = document.querySelector('#redBlue');
    const bluePink = document.querySelector('#bluePink');

    const selectedImg = document.createElement('img');
    selectedImg.src = ok;
    selectedImg.style.width = '100%';

    const carousel = document.querySelector('.carousel');

    function changeCarouselStyle() {
        carousel.style.transition = 'transform 1s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        carousel.style.transform = 'translateY(-40%)';
    }

    bluePink.addEventListener('click', () => {
        changeCarouselStyle();
        bluePink.appendChild(selectedImg);
    });

    redBlue.addEventListener('click', () => {
        changeCarouselStyle();
        carousel.style.transform = 'translateY(50%)';
        redBlue.appendChild(selectedImg);
    });
});
</script>

<template>
    <section class="productsHighlighted">
        <div class="container">
            <div class="caroselContainer">
                <div class="carousel">
                    <div class="carousel-item">
                        <div class="rect" style="background: linear-gradient(135deg, #6ACEEC, #F4A1C2);">
                            <div class="noise"></div>
                        </div>
                        <img src="../assets/images/productsHighlighted/pinkHeadphone.webp" alt="headphone pink">
                    </div>
                    <div class="carousel-item">
                        <div class="rect" style="background: linear-gradient(135deg, #B53228, #3B4A99);">
                            <div class="noise"></div>
                        </div>
                        <img src="../assets/images/productsHighlighted/headphoneRed.webp" alt="headphone red">
                    </div>
                </div>
            </div>
            <div class="productInformation">
                <div class="title">
                    JBL Children's Bluetooth Headphones
                </div>
                <div class="review">
                    <div class="stars">
                        <img src="../assets//images/icons/smallStar.webp" alt="Star">
                        <img src="../assets//images/icons/smallStar.webp" alt="Star">
                        <img src="../assets//images/icons/smallStar.webp" alt="Star">
                        <img src="../assets//images/icons/smallStar.webp" alt="Star">
                        <img src="../assets//images/icons/smallStar.webp" alt="Star">
                    </div>
                    <div class="totalRating">
                        18,921 (reviews)
                    </div>
                </div>
                <div class="colorOptions">
                    <div class="label">
                        Color Options
                    </div>
                    <div class="colors">
                        <div id="redBlue" class="color-circle redBlue">
                        </div>
                        <div id="bluePink" class="color-circle bluePink">
                        </div>
                    </div>
                </div>
                <div class="price">
                    <span class="symbol">$</span>
                    <h2>28</h2>
                    <div class="priceInfo">
                        <span class="old">$35.99</span>
                        <span class="discount">22% off</span>
                    </div>
                </div>
                <button>
                    SEE MORE DETAILS
                    <img src="../assets/images/icons/arrow-right-white.webp" alt="Arrow">
                </button>
            </div>
        </div>
    </section>
</template>

<style scoped>
.productsHighlighted {
    padding: 90px 0;
    background-color: #f3f5f9;
    border-radius: 30px;
    justify-content: center;
    align-items: center;
    gap: 80px;

    & .container {
        max-width: 80%;
        margin: 0 auto;
        display: flex;

        &>*:first-child {
            flex: 1.6;
        }

        &>*:last-child {
            max-width: 600px;
        }
    }


    & .title {
        font-size: 48px;
        line-height: 56px;
        text-align: left;
        font-weight: 600;
        line-break: anywhere;
    }

    & .review {
        display: flex;
        align-items: center;
        margin: 32px 0;

        & .totalRating {
            margin-left: 10px;
            color: #1177FF;
        }
    }

    & .price {
        margin: 56px 0 32px 0;
        display: flex;

        & .old {
            text-decoration: line-through;
        }

        & .priceInfo {
            margin-left: 10px;
            font-weight: bold;
            display: flex;
            flex-direction: column;

            & .discount {
                margin: 10px 0;
                background: radial-gradient(circle at 100% 100%, #f4f6f9 0, #f4f6f9 8px, transparent 8px) 0% 0%/9px 9px no-repeat,
                    radial-gradient(circle at 0 100%, #f4f6f9 0, #f4f6f9 8px, transparent 8px) 100% 0%/9px 9px no-repeat,
                    radial-gradient(circle at 100% 0, #f4f6f9 0, #f4f6f9 8px, transparent 8px) 0% 100%/9px 9px no-repeat,
                    radial-gradient(circle at 0 0, #f4f6f9 0, #f4f6f9 8px, transparent 8px) 100% 100%/9px 9px no-repeat,
                    linear-gradient(#f4f6f9, #f4f6f9) 50% 50%/calc(100% - 2px) calc(100% - 18px) no-repeat,
                    linear-gradient(#f4f6f9, #f4f6f9) 50% 50%/calc(100% - 18px) calc(100% - 2px) no-repeat,
                    linear-gradient(90deg, #cd43ff 0%, #fd65a6 26%, #fc9651 77%, #ffbd72 100%);
                border-radius: 11px;
                padding: 5px;
                box-sizing: border-box;
            }
        }
    }

    & .colorOptions {
        display: flex;
        align-items: center;
        margin-bottom: 32px;

        font-family: Inter;
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        color: #1F2026;

        .colors {
            margin-left: 20px;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        & .color-circle {
            cursor: pointer;
            border: 2px solid #FFFFFF;
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }

        & .redBlue {
            background: linear-gradient(135deg, #6ACEEC 48.12%, #F4A1C2 49.37%);
        }

        & .bluePink {
            background: linear-gradient(135deg, #B53228 48.12%, #3B4A99 49.37%);
        }
    }

    & .imagem {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    & .caroselContainer {
        overflow: hidden;
        transition: transform 0.5s ease;
    }

    & .carousel {
        position: relative;
        width: 100%;
        max-height: 700px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-width: fit-content;


        transform: translateY(50%);

        & .carousel-item {
            position: relative;

            & .rect {
                border-radius: 40px;
                z-index: -2;
                position: absolute;
                top: 0;
                left: 0;
                width: 60%;
                height: 80%;
            }

            & .noise {
                border-radius: 40px;
                background-image: url("../imgs/texture.png");
                background-size: 100%;
                z-index: -1;
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
            }

            & img {
                height: 646px;
            }
        }
    }
}

@media screen and (max-width: 1024px) {
    .productsHighlighted {

        & .container {
            flex-direction: column;
            align-items: center;
        }
    }
}
</style>