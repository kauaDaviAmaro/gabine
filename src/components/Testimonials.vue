<script lang="ts" setup>
import { onMounted } from 'vue';

onMounted(() => {
    const container = document.querySelector('.testimonialsWrapper');
    const nextButton = document.querySelector('#next');
    const prevButton = document.querySelector('#prev');

    let currentIndex = 0;
    const totalTestimonials = document.querySelectorAll('.testimonialsCard').length;
    const testimonialsPerPage = 3;


    function showTestimonials() {
        const offset = (currentIndex * testimonialsPerPage) * 100 / testimonialsPerPage;
        container.style.transform = `translateX(-${offset}%)`;

        prevButton.classList.toggle('active', currentIndex !== 0);
        nextButton.classList.toggle('active', currentIndex !== Math.ceil(totalTestimonials / testimonialsPerPage) - 1);
    }


    function nextTestimonial() {
        currentIndex = (currentIndex + 1) % Math.ceil(totalTestimonials / testimonialsPerPage);
        showTestimonials();
    }

    function prevTestimonial() {
        currentIndex = (currentIndex - 1 + Math.ceil(totalTestimonials / testimonialsPerPage)) % Math.ceil(totalTestimonials / testimonialsPerPage);
        showTestimonials();
    }

    nextButton.addEventListener('click', nextTestimonial);
    prevButton.addEventListener('click', prevTestimonial);

    showTestimonials();
});
</script>

<template>
    <section class="testimonials">
        <div class="subtitle1">
            TESTIMONIALS
        </div>
        <div class="body2">
            Voices of Satisfaction: Discover What Our Clients Have to Say
        </div>
        <div class="testimonialsContainer">
            <div class="testimonialsWrapper">
                <div class="testimonialsCard">
                    <div class="review">
                        <div class="stars">
                            <img src="../assets/images/icons/smallStar.webp" alt="Star">
                            <img src="../assets/images/icons/smallStar.webp" alt="Star">
                            <img src="../assets/images/icons/smallStar.webp" alt="Star">
                            <img src="../assets/images/icons/smallStar.webp" alt="Star">
                            <img src="../assets/images/icons/smallStar.webp" alt="Star">
                        </div>
                        <div class="text">
                            I absolutely love this coffee maker! I use it every morning. Cold coffee is my favorite
                            and
                            this
                            little machine makes great cold coffee. It is strong and tasty. I regular coffee cup or
                            a
                            larger
                            stainless steel cup will work. 1
                        </div>
                    </div>
                    <img src="https://picsum.photos/100/100" alt="Client">
                    <div class="name">
                        John Doe
                    </div>
                    <div class="job">
                        Entrepreneur
                    </div>
                </div>
                <div class="testimonialsCard">
                    <div class="review">
                        <div class="stars">
                            <img src="../assets/images/icons/smallStar.webp" alt="Star">
                            <img src="../assets/images/icons/smallStar.webp" alt="Star">
                            <img src="../assets/images/icons/smallStar.webp" alt="Star">
                            <img src="../assets/images/icons/smallStar.webp" alt="Star">
                            <img src="../assets/images/icons/smallStar.webp" alt="Star">
                        </div>
                        <div class="text">
                            I absolutely love this coffee maker! I use it every morning. Cold coffee is my favorite
                            and
                            this
                            little machine makes great cold coffee. It is strong and tasty. I regular coffee cup or
                            a
                            larger
                            stainless steel cup will work. 2
                        </div>
                    </div>
                    <img src="https://picsum.photos/100/100" alt="Client">
                    <div class="name">
                        John Doe
                    </div>
                    <div class="job">
                        Entrepreneur
                    </div>
                </div>
                <div class="testimonialsCard">
                    <div class="review">
                        <div class="stars">
                            <img src="../assets/images/icons/smallStar.webp" alt="Star">
                            <img src="../assets/images/icons/smallStar.webp" alt="Star">
                            <img src="../assets/images/icons/smallStar.webp" alt="Star">
                            <img src="../assets/images/icons/smallStar.webp" alt="Star">
                            <img src="../assets/images/icons/smallStar.webp" alt="Star">
                        </div>
                        <div class="text">
                            I absolutely love this coffee maker! I use it every morning. Cold coffee is my favorite
                            and
                            this
                            little machine makes great cold coffee. It is strong and tasty. I regular coffee cup or
                            a
                            larger
                            stainless steel cup will work. 3
                        </div>
                    </div>
                    <img src="https://picsum.photos/100/100" alt="Client">
                    <div class="name">
                        John Doe
                    </div>
                    <div class="job">
                        Entrepreneur
                    </div>
                </div>
                <div class="testimonialsCard">
                    <div class="review">
                        <div class="stars">
                            <img src="../assets/images/icons/smallStar.webp" alt="Star">
                            <img src="../assets/images/icons/smallStar.webp" alt="Star">
                            <img src="../assets/images/icons/smallStar.webp" alt="Star">
                            <img src="../assets/images/icons/smallStar.webp" alt="Star">
                            <img src="../assets/images/icons/smallStar.webp" alt="Star">
                        </div>
                        <div class="text">
                            I absolutely love this coffee maker! I use it every morning. Cold coffee is my favorite
                            and
                            this
                            little machine makes great cold coffee. It is strong and tasty. I regular coffee cup or
                            a
                            larger
                            stainless steel cup will work. 4
                        </div>
                    </div>
                    <img src="https://picsum.photos/100/100" alt="Client">
                    <div class="name">
                        John Doe
                    </div>
                    <div class="job">
                        Entrepreneur
                    </div>
                </div>
                <div class="testimonialsCard">
                    <div class="review">
                        <div class="stars">
                            <img src="../assets/images/icons/smallStar.webp" alt="Star">
                            <img src="../assets/images/icons/smallStar.webp" alt="Star">
                            <img src="../assets/images/icons/smallStar.webp" alt="Star">
                            <img src="../assets/images/icons/smallStar.webp" alt="Star">
                            <img src="../assets/images/icons/smallStar.webp" alt="Star">
                        </div>
                        <div class="text">
                            I absolutely love this coffee maker! I use it every morning. Cold coffee is my favorite
                            and
                            this
                            little machine makes great cold coffee. It is strong and tasty. I regular coffee cup or
                            a
                            larger
                            stainless steel cup will work. 5
                        </div>
                    </div>
                    <img src="https://picsum.photos/100/100" alt="Client">
                    <div class="name">
                        John Doe
                    </div>
                    <div class="job">
                        Entrepreneur
                    </div>
                </div>
                <div class="testimonialsCard">
                    <div class="review">
                        <div class="stars">
                            <img src="../assets/images/icons/smallStar.webp" alt="Star">
                            <img src="../assets/images/icons/smallStar.webp" alt="Star">
                            <img src="../assets/images/icons/smallStar.webp" alt="Star">
                            <img src="../assets/images/icons/smallStar.webp" alt="Star">
                            <img src="../assets/images/icons/smallStar.webp" alt="Star">
                        </div>
                        <div class="text">
                            I absolutely love this coffee maker! I use it every morning. Cold coffee is my favorite
                            and
                            this
                            little machine makes great cold coffee. It is strong and tasty. I regular coffee cup or
                            a
                            larger
                            stainless steel cup will work. 6
                        </div>
                    </div>
                    <img src="https://picsum.photos/100/100" alt="Client">
                    <div class="name">
                        John Doe
                    </div>
                    <div class="job">
                        Entrepreneur
                    </div>
                </div>
            </div>
        </div>
        <div class="pagination">
            <img id="prev" src="../assets/images/icons/desactiveArrow.webp" alt="previous">
            <img id="next" src="../assets/images/icons/activeArrow.webp" alt="next">
            </img>
        </div>
    </section>
</template>

<style scoped>
.testimonials {
    text-align: center;
    background-color: #f3f5f9;
    padding: 91px;
    border-radius: 30px;

    & .subtitle1 {
        margin-bottom: 16px;
    }

    & .body2 {
        margin-bottom: 50px;
        color: #767A85;
    }

    & .pagination {
        display: flex;
        justify-content: center;
        gap: 20px;
        margin-top: 30px;

        & img {
            height: 50px;
            width: 50px;
            border-radius: 50%;

            cursor: pointer;

            &:not(.active) {
                border: 1px solid var(--White-white-700, #B5B5B5);
            }
        }

        & .active {
            background-color: var(--black-500);
        }
    }

    & .testimonialsContainer {
        overflow: hidden;
    }

    & .testimonialsWrapper {
        max-width: 100%;
        position: relative;
        transition: transform 0.5s ease;
        display: flex;
        align-items: center;
        gap: 30px;
        justify-content: space-between;
        flex-wrap: nowrap;

        & .testimonialsCard {
            background-color: var(--white-50);
            flex: 1 0 calc(100% / 3 - 30px);
            border-radius: 30px;
            padding: 40px 30px;

            & .review {
                margin-bottom: 24px;

                & .stars {
                    margin-bottom: 24px
                }
            }

            & img {
                margin-bottom: 16px;
                border-radius: 50%;
                object-fit: cover;
                width: 56px;
                height: 56px;
            }

            & .name {
                color: #0A102F;
                margin-bottom: 4px;
            }

            & .job {
                color: #878787;
            }
        }
    }

}
</style>