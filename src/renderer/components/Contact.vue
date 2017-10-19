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
  store: ['xmlData', 'contacts', 'messages'],
  methods: {
    contactClick: function (address, e) {
      var app = this
      this.active = address
      this.messages = []

      var imageMimeTypes = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/gif'
      ]

      var messages = _.filter(this.xmlData, function (m) {
        return m.attr.address === address
      })

      var msg = {}
      _.forEach(messages, function (message) {
        if (_.has(message, 'parts')) {
          var images = []
          var body

          _.forEach(message.parts.part, function (part) {
            if (part.attr !== undefined) {
              part = part.attr
            }

            var type = part.ct
            if (_.indexOf(imageMimeTypes, type) >= 0) {
              var src = 'data:' + type + ';base64, ' + part.data
              images.push(src)
            } else if (type === 'text/plain') {
              body = part.text
            }
          })
          msg = {
            address: address,
            date: message.attr.date,
            type: message.attr.rr === '128' ? 1 : 2,
            body: body,
            images: images
          }
        } else {
          msg = {
            address: address,
            date: message.attr.date,
            type: message.attr.type,
            body: message.attr.body
          }
        }

        app.messages.push(msg)
      })

      this.messages = _.sortBy(this.messages, ['date'])
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
