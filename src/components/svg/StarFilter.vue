<template>
  <section class="flex relative">
    <StarIcon v-for="(item, idx) in 5" :key="idx" class="star text-red"/>
    <div 
      class="absolute top-0 left-0 overflow-hidden whitespace-nowrap"
      :style="{'width': ratingPercentage}"
    >
        <StarIcon v-for="(item, idx) in 5" :key="idx" class="star text-grey-2"/>
    </div>
  </section>
</template>

<script>
  import StarIcon from "@/components/svg/Star.vue";
  export default {
    components: {
      StarIcon
    },
    props: {
      rating: {
        type: Number,
        default: 0
      }
    },
    computed: {
      ratingPercentage() {
        const starsTotal = 5;
        const percentageRound = (this.rating/starsTotal*100/10)*10;
        return `${percentageRound}%`;
      }
    }
  }
</script>

<style scoped>
  .star{
    @apply mx-1 mt-5 mb-4;
  }
</style>