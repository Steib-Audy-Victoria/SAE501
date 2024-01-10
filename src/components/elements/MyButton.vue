<script setup>
import { computed } from 'vue'

const props = defineProps({
  size: String,
  variant: String,
  color: String
})

const className = computed(() => ({
  ' -rounded': props.variant === 'rounded',
  ' -round': props.variant === 'round',
  ' -small': props.size === 'small',
  ' -rouge': props.color === 'rouge',
  ' -bordeaux': props.color === 'bordeaux',
  ' -grisFonce': props.color === 'grisFonce'
}))
</script>
<template>
  <button class="button" :class="className">
    <RouterLink to="/">
      <slot></slot>
    </RouterLink>
  </button>
</template>

<style lang="scss" scoped>
.button {
  background-color: $noir;
  color: $blanc;
  border: none;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: $blanc;
    color: $noir;
  }

  // variant
  &.-rounded {
    border-radius: 20px;
  }
  &.-round {
    border-radius: 50px;
  }

  // size
  &.-small {
    padding: 0.5rem 1rem;
    font-size: 0.75rem;
  }

  // background
  &.-rouge {
    background-color: $rouge;
  }
  &.-bordeaux {
    background-color: $bordeaux;
  }
  &.-grisFonce {
    background-color: $grisFonce;
  }
}
</style>
