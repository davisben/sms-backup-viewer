<template lang="pug">
  div#contacts
    div.contact(v-for="contact in contacts"
      @click="contactClick(contact.address, $event)"
      :class="{ active: active == contact.address}")
      div.name {{ contact.name }}
      div.message-count {{ contact.count }} {{ contact.count | pluralize('message') }}
</template>

<script>
import _ from 'lodash'

export default {
  name: 'contact',
  store: ['contacts', 'messages', 'loadedMessages'],
  methods: {
    contactClick: function (address, e) {
      this.active = address

      var filtered = this.messages.filter(function (message) {
        return message.address === this.toString()
      }, address)

      this.loadedMessages = _.sortBy(filtered, ['date'])
    }
  },
  data () {
    return {
      active: ''
    }
  }
}
</script>

<style lang="sass">
@import ../../src/sass/variables

#contacts
  .contact
    border-right: 1px solid $primary-light
    border-bottom: 1px solid $primary-light
    padding: 0.5em
    cursor: pointer

    &:last-child
      border-bottom: 0

    &.active
      border-left: 3px solid $primary-dark
      border-right: 0

    .message-count
      font-size: 0.7em
</style>
