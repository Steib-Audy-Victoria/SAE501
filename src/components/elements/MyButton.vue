<script setup>
import { computed } from 'vue'

const props = defineProps({
  size: String,
  variant: String,
  color: String,
  textTransform: String
})

const className = computed(() => ({
  ' -rounded': props.variant === 'rounded',
  ' -round': props.variant === 'round',
  ' -small': props.size === 'small',
  ' -rouge': props.color === 'rouge',
  ' -bordeaux': props.color === 'bordeaux',
  ' -grisFonce': props.color === 'grisFonce',
  ' -uppercase': props.textTransform === 'uppercase',
  ' -capitalize': props.textTransform === 'capitalize',
  ' -lowercase': props.textTransform === 'lowercase'
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

    &:hover {
      background-color: $blanc;
    }
  }
  &.-bordeaux {
    background-color: $bordeaux;

    &:hover {
      background-color: $blanc;
    }
  }
  &.-grisFonce {
    background-color: $grisFonce;

    &:hover {
      background-color: $blanc;
    }
  }

  // text
  &.-uppercase {
    text-transform: uppercase;
  }
  &.-capitalize {
    text-transform: capitalize;
  }
  &.-lowercase {
    text-transform: lowercase;
  }
}
</style>
