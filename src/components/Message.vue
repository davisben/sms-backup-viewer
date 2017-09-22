<template lang="pug">
  div#messages
    div.message(v-for="message in loadedMessages"
      :class="message.type == 1 ? 'received' : 'sent'")

      img(v-for="image in message.images", :src="image")
      div.body {{ message.body }}
</template>

<script>
export default {
  name: 'messages',
  store: ['loadedMessages']
}
</script>

<style lang="sass">
@import ../../src/sass/variables

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
      background: $received

    &.sent
      float: right
      background: $sent

    img
      max-width: 100%
</style>
