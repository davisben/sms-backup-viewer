<template lang="pug">
  div#messages
    div.message(v-for="message in messages"
      :class="[message.type == 1 ? 'received' : 'sent', 'bg-' + message.color + '-500']")

      img(v-for="image in message.images", :src="image")
      div.body {{ message.body }}
</template>

<script>
export default {
  name: 'messages',
  store: ['messages']
}
</script>

<style lang="sass">
#messages
  .message
    clear: both
    max-width: 70%
    border-radius: 5px
    color: #333
    padding: 0.5em 1em
    margin: 0.5em

    &.received
      float: left

    &.sent
      float: right

    img
      max-width: 100%
</style>
