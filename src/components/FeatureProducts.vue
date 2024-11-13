<template>
    <section class="featureProducts">
        <div class="featureCard">
            <div class="shadow"></div>
            <div class="weigh">
                <div class="icon">
                    <img src="../assets/images/featureProducts/box.webp" alt="Icon">
                </div>
                <div class="text">
                    <div class="body3">
                        Item Weight
                    </div>
                    <div class="body2">
                        2.6 Pounds
                    </div>
                </div>
            </div>
            <h4>
                Find the <br /> perfect gifts
            </h4>
        </div>
        <div class="featureCard">
            <div class="shadow"></div>
            <div class="weigh">
                <div class="icon">
                    <img src="../assets/images/featureProducts/box.webp" alt="Icon">
                </div>
                <div class="text">
                    <div class="body3">
                        Item Weight
                    </div>
                    <div class="body2">
                        2.6 Pounds
                    </div>
                </div>
            </div>
            <h4>
                Find the <br /> perfect gifts
            </h4>
        </div>
    </section>
</template>

<style scoped>
.featureProducts {
    display: flex;
    justify-content: space-evenly;
    gap: 34px;
    align-items: center;

    &>.featureCard {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        padding: 24px;
        width: 584px;
        height: 610px;
        border-radius: 40px;
        color: var(--white-50);
        transition: background-size 0.3s ease-in-out;

        &:hover {
            background-size: 110%;
        }

        &:hover .shadow {
            opacity: 1;
        }

        & .shadow {
            transition: opacity 0.3s ease-in-out;
            opacity: 0;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            border-radius: 40px;
        }

        & .weigh,
        & h4 {
            z-index: 1;
        }

        & h4 {
            text-align: left;
        }
    }

    &> :first-child {
        background-position: center;
        background-repeat: no-repeat;
        background-image: url("../assets/images/featureProducts/card1.webp");
    }

    &> :last-child {
        background-position: center;
        background-repeat: no-repeat;
        background-image: url("../assets/images/featureProducts/card2.webp");
    }

    & .weigh {
        padding: 14px 24px;
        width: fit-content;
        background: #0000001f;
        backdrop-filter: blur(54px);
        border-radius: 56px;
        display: flex;
        align-items: center;

        & img {
            margin-right: 12px;
            padding: 8px;
            border-radius: 50%;
            background-color: var(--white-50);
        }

        & .body2 {
            font-weight: bold;
        }
    }
}
</style>