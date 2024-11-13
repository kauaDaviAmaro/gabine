<template>
    <footer>
        <div class="logo">
            <img src="../assets/images/footer/LogoWhite.webp" alt="Logo">
        </div>
        <div class="wrapper">
            <div class="linksGroup">
                <div class="links">
                    <div class="title">
                        Menu
                    </div>
                    <a class="body3" href="#">
                        Home
                    </a>
                    <a class="body3" href="#">
                        About Us
                    </a>
                    <a class="body3" href="#">
                        Product
                    </a>
                    <a class="body3" href="#">
                        Pricing
                    </a>
                </div>
                <div class="links">
                    <div class="title">
                        Resources
                    </div>
                    <a class="body3" href="#">
                        Forum
                    </a>
                    <a class="body3" href="#">
                        Support
                    </a>
                    <a class="body3" href="#">
                        Partners
                    </a>
                    <a class="body3" href="#">
                        Events
                    </a>
                </div>
                <div class="links">
                    <div class="title">
                        My Account
                    </div>
                    <a class="body3" href="#">
                        My Orders
                    </a>
                    <a class="body3" href="#">
                        FAQ
                    </a>
                    <a class="body3" href="#">
                        Sales Conditions
                    </a>
                    <a class="body3" href="#">
                        Contact
                    </a>
                    <a class="body3" href="#">
                        Legal Mentions
                    </a>
                </div>
            </div>
            <div class="subscrive">
                <div class="body1">
                    Subscribe to Newsletter
                </div>
                <div class="caption">
                    Sign up for exclusive offers, original stories, events and more.
                </div>
                <div class="input">
                    <div class="text-button">
                        <input type="text" placeholder="Enter your email">
                        <div class="round-background">
                            <img src="../assets/images/icons/arrow-right-black.svg" alt="Arrow">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="footerWrapper">
            <div class="bigLogo">
                <img src="../assets/images/Logo.svg" alt="Logo">
            </div>
            <div class="others">
                <div class="line"></div>
                <div class="content">
                    <div class="copyright">
                        © 2024 Gabini Headset Store. - All Rights Reserved
                    </div>
                    <div class="links">
                        <a href="#">
                            Privacy Policy
                        </a>
                        <a href="#">
                            Privacy Policy
                        </a>
                        <a href="#">
                            Customer Service
                        </a>
                    </div>
                    <div class="social">
                        <i class='bx bxl-twitter'></i>
                        <i class='bx bxl-facebook'></i>
                        <i class='bx bxl-youtube'></i>
                        <i class='bx bxl-linkedin'></i>
                        <i class='bx bxl-tiktok'></i>
                        <i class='bx bxl-pinterest'></i>
                        <i class='bx bxl-instagram'></i>
                        <i class='bx bxl-spotify'></i>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<style scoped>
footer {
    margin: 20px;
    border-radius: 40px;
    padding: 80px;
    background-color: var(--black-500);

    & .wrapper {
        display: flex;
        justify-content: space-between;

    }

    & .footerWrapper {
        display: flex;
        justify-content: center;
        width: 100%;
        position: relative;
        min-height: 240px;

        & .others {
            padding-top: 30px;
            position: absolute;
            width: 100%;
            height: 108px;
            bottom: -80px;
            z-index: 3;
            background-color: black;


            & .links a {
                color: var(--white-50);
                margin: 0px 2vw;
            }

            & .content {
                margin-top: 24px;
                display: flex;
                justify-content: space-between;

                .social {
                    color: white;
                }
            }

            & .line {
                width: 100%;
                height: 1px;
                background-color: #383838;
            }
        }
    }

    & .copyright {
        color: #C2C2C2;
    }

    & .bigLogo {
        z-index: 0;
        position: absolute;
        top: 0px;
        width: 90%;

        & img {
            width: 100%;
        }
    }

    & .subscrive {

        & .body1 {
            color: var(--white-50);
            margin-bottom: 16px;
        }

        & .caption {
            color: #878787;
            margin-bottom: 32px;
        }

        & .input {
            position: relative;

            & .text-button {
                width: 100%;
                height: 60px;
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                border: 1px solid #767A85;
                border-radius: 40px;
                background-color: #4B4B4B;

                & input {
                    color: var(--white-50);
                    border: none;
                    width: 80%;
                    background-color: inherit;
                    border-radius: inherit;

                }
            }

            & .round-background {
                background-color: white;
                width: 40px;
                height: 40px;
                border-radius: 40px;
                display: flex;
                align-items: center;
                justify-content: center;

                & img {
                    height: 24px;
                    width: 24px;
                }
            }

        }
    }

    & .logo img {
        margin-bottom: 32px;
        width: 200px;
    }

    & .linksGroup {
        display: flex;
        justify-content: space-between;
        gap: 56px;
        color: var(--white-50);

        & .links {
            display: flex;
            flex-direction: column;
            margin-right: 56px;

            &> :first-child {
                margin-bottom: 24px;
            }

            & a {
                margin-bottom: 16px;
                text-decoration: none;
                color: var(--black-100);
            }

            & .title {
                font-weight: 600;
            }
        }
    }
}
</style>