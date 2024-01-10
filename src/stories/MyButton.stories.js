import MyButton from '@/components/elements/MyButton.vue'

export default {
  title: 'Elements/MyButton',
  component: MyButton,
  argTypes: {
    href : {
      control: "text"
    },
    size: {
      control: "select",
      options: ['normal', 'small']
    },
    variant: {
      control: "select",
      options: ['default', 'rounded', 'round']
    },
    color: {
      control: "select",
      options: ['black', 'rouge', 'bordeaux', 'grisFonce']
    },
    textTransform : {
      control: "select",
      options: ['none', 'uppercase', 'lowercase', 'capitalize']
    },
  } 
}

export const BlackButton = {
  render: (args) => {
    return {
      components: {
        MyButton,
      },
      setup(){
        return { args }
      },
      template: `<MyButton v-bind="args">My link Button</MyButton>`
    }
  },
  args: {
    size: "normal",
    variant: "default",
    color: "black",
    textTransform: "uppercase"
  }
}

export const RedButton = {
  ...BlackButton,
  args: {
    size: "normal",
    variant: "default",
    color: "rouge",
    textTransform: "none"
  }
}
export const BordeauxButton = {
  ...BlackButton,
  args: {
    size: "normal",
    variant: "rounded",
    color: "bordeaux",
    textTransform: "none"
  }
}
export const GrisButton = {
  ...BlackButton,
  args: {
    size: "normal",
    variant: "round",
    color: "grisFonce",
    textTransform: "none"
  }
}




