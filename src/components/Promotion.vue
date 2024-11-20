<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';

onMounted(() => {
    const elementHours = document.getElementById('hours');
    const elementMinutes = document.getElementById('minutes');
    const elementSeconds = document.getElementById('seconds');

    if (!elementHours || !elementMinutes || !elementSeconds) return;

    let timer = 3600;

    const padZero = (num: number) => num.toString().padStart(2, '0');

    const render = () => {
        const hours = Math.floor(timer / 3600);
        const minutes = Math.floor((timer % 3600) / 60);
        const seconds = Math.floor(timer % 60);

        elementHours.innerHTML = padZero(hours);
        elementMinutes.innerHTML = padZero(minutes);
        elementSeconds.innerHTML = padZero(seconds);

        timer = timer > 0 ? timer - 1 : 3600;
    };

    const intervalId = setInterval(render, 1000);

    onUnmounted(() => clearInterval(intervalId));
})
</script>

<template>
    <section class="promotion">
        <img src="../assets/images/texture.webp" alt="Texture" class="texture">
        <div class="promotion-content">
            <h3>
                Save 20% or more on Headset
            </h3>
            <div class="subtitle3">
                Enjoy for a limited time
            </div>
            <div class="countdown">
                <div class="hour number">
                    <div id="hours" class="time-unit"><span>12</span></div>
                    <span class="text">hours</span>
                </div>
                <div class="minutes number">
                    <div id="minutes" class="time-unit"><span>25</span></div>
                    <span class="text number">minutes</span>
                </div>
                <div class="seconds number  ">
                    <div id="seconds" class="time-unit"><span>45</span></div>
                    <span class="text">seconds</span>
                </div>
            </div>
            <button>
                SHOP NOW
                <img src="../assets/images/icons/arrow-right-white.webp" alt="Arrow">
            </button>
            <div class="body3">
                Ends 18/08. Restrictions apply. See details
            </div>
        </div>
        <div class="promotion-image">
            <img src="../assets/images/promotion/blueHeadset.wepb" alt="Promotion">
        </div>
    </section>
</template>

<style scoped>
.promotion {
    position: relative;
    display: flex;
    justify-content: space-between;
    padding: 4vw;

    color: var(--white-50);

    background: linear-gradient(#548CAD, #97C4D8);
    border-radius: 30px;

    & .texture {
        z-index: 0;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0.5;
    }

    & .promotion-content {
        flex: auto;
        z-index: 1;
    }

    & .promotion-image {
        flex: auto;
        z-index: 1;
        max-width: fit-content;
    }

    & .countdown {
        flex: 1;
        display: flex;
        width: 100%;
        margin: 40px 0;

        &>* {
            padding-right: 10%;
            font-family: "Roboto", sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
        }

        & .number {
            font-size: 7vw;
            font-weight: 700;
        }

        & .text {
            font-size: 19px;
        }
    }

    & h3 {
        max-width: 700px;
        margin-bottom: 16px;
    }

    & .subtitle3,
    & .body3 {
        color: var(--black-50);
    }

    & .body3 {
        margin-top: 10px;
    }


    & time-unit {
        animation: scroll 10s linear infinite;
    }
}

@media screen and (max-width: 1024px) {

    .promotion {
        & .promotion-content {
            h3 {
                font-size: 60px;
            }
        }
    }

}
</style>