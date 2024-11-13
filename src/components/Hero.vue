<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
    const marquees = document.querySelectorAll(".marquee");

    marquees.forEach(marquee => {
        const originalText = marquee.innerHTML;

        let repeatedText = '';
        for (let i = 0; i < 50; i++) {
            repeatedText += originalText + ' ';
        }

        marquee.innerHTML = repeatedText;
    });
});
</script>

<template>
    <section class="hero">
        <div class="textAnimation">
            <div class="marquee">
                <span class="text">YOUR TEXT HERE</span> <img src="../assets/images/hero/point.webp" alt="point">
            </div>
        </div>
        <div class="textAnimation">
            <div class="marquee">
                <span class="text">YOUR TEXT HERE</span> <img src="../assets/images/hero/point.webp" alt="point">
            </div>
        </div>
        <div class="information">
            <h1>
                GABINI HEADSET STORE
            </h1>
            <div class="text">
                <div class="subtitle1">
                    Welcome to Gabini quality, at our most welcoming price.
                </div>
                <div class="details">
                    <button>
                        SEE MORE DETAILS
                        <img src="../assets/images/icons/arrow-right-white.webp" alt="">
                    </button>
                </div>
            </div>
            <div class="rating">
                <div class="rating-wrapper">
                    <div class="rating-inner">
                        <div class="subtitle3">
                            4.8
                        </div>
                        <div class="stars">
                            <img v-for="i in 4" :key="i" src="../assets/images/icons/smallStar.webp" alt="Rating">
                            <img src="../assets/images/icons/halfStar.webp" alt="Rating">
                        </div>

                    </div>
                    <div class="body3">
                        2.290 ratings
                    </div>
                </div>
                <div class="totalBought">
                    <div class="subtitle2">
                        10K+
                    </div>
                    <div class="caption">
                        Bought in past month
                    </div>
                </div>
            </div>
        </div>
        <div class="image">
            <img class="bakground" src="../assets/images/hero/Rectangle.webp" alt="Background">
            <img class="main" src="../assets/images/hero/headphone.webp" alt="Hero">
        </div>
    </section>
</template>

<style scoped>
.hero {
    position: relative;
    padding: 0 128px;
    display: flex;
    justify-content: center;
    align-items: end;
    gap: 40px;

    & .image {
        position: relative;
        max-height: 612px;
        max-width: 556px;

        & .bakground {
            z-index: -1;
            position: absolute;
            height: 95%;

            bottom: 0;
            left: 0;
        }

        & img {
            height: 100%;
        }
    }

    & .information {
        max-width: 50%;

        & .text {
            border-left: 1px solid #BFC0C2;
            margin-top: 60px;
            margin-bottom: 70px;
            padding: 0 0 0 24px;

            & .subtitle1 {
                padding-bottom: 50px;
            }
        }

        & .rating {
            font-weight: 600;
            display: flex;

            & .rating-inner {
                display: flex;
                align-items: center;
                margin-right: 64px;

                &> :first-child {
                    margin-right: 16px;
                }
            }

            & .body3 {
                color: var(--black-200);
            }
        }
    }

    & .textAnimation {
        z-index: -1;
        user-select: none;
        background-color: var(--black-500);
        color: var(--white-50);
        position: absolute;
        width: 100vw;
        height: 46px;
        display: flex;
        align-items: center;

        & .marquee {
            width: 100%;
            white-space: nowrap;
            animation: scroll 10s linear infinite alternate;

            & span {
                padding: 0 14px;
            }
        }

    }

    & .textAnimation:first-child {
        top: 15%;
        right: -10%;
        transform: rotate(25deg);
    }

    & .textAnimation:nth-child(2) {
        bottom: 80%;
        right: -70%;
        transform: rotate(-25deg);
    }
}

@keyframes scroll {
    0% {
        transform: translateX(-100%);
    }

    100% {
        transform: translateX(-200%);
    }
}

@media screen and (max-width: 1024px) {
    .hero {

        & .information {
            h1 {
                font-size: 80px;
            }
        }
    }

}

@media screen and (max-width: 768px) {

    .hero .image,
    .textAnimation {
        display: none !important;
    }

    .hero {
        padding: 0;
    }
}
</style>