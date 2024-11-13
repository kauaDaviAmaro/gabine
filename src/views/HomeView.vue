<script setup lang="ts">
import FeatureProducts from '@/components/FeatureProducts.vue';
import Footer from '@/components/Footer.vue';
import Hero from '@/components/Hero.vue';
import Navbar from '@/components/Navbar.vue';
import NewProducts from '@/components/NewProducts.vue';
import ProductsHighlighted from '@/components/ProductsHighlighted.vue';
import Promotion from '@/components/Promotion.vue';
import Testimonials from '@/components/Testimonials.vue';

</script>

<template>
  <header>
    <Navbar />
  </header>

  <main>
    <Hero />

    <FeatureProducts />

    <NewProducts />

    <Promotion />

    <ProductsHighlighted />

    <Testimonials />
  </main>

  <Footer />
</template>

<style scoped>
section {
  margin-bottom: 2rem;
}
</style>