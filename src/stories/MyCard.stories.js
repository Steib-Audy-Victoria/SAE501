import MyCard from '@/components/MyCard.vue'

export default {
  title: 'Components/MyCard',
  component: MyCard,
  argTypes: {
    buttonLabel: {
      control: 'text'
    }
  }
}

export const Card = {
  render: (args) => {
    return {
      components: {
        MyCard
      },
      setup() {
        return { args }
      },
      template: `<MyCard v-bind="args" />`
    }
  },
  args: {

    buttonLabel: "Bouton de la card"
  }
}
