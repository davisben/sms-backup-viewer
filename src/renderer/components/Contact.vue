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
  store: ['data', 'contacts', 'messages'],
  methods: {
    contactClick: function (address, e) {
      var app = this
      this.active = address
      this.messages = []

      var messages = _.filter(this.data, function (m) {
        return m.attrs.address === address
      })

      var msg = {}
      _.forEach(messages, function (message) {
        var contact = app.getContact(message.attrs.address)

        if (message.children === undefined) {
          msg = {
            address: address,
            date: message.attrs.date,
            type: message.attrs.type,
            color: message.attrs.type === '1' ? contact.color : 'amber',
            body: message.attrs.body
          }
        } else {
          var type
          var sender
          var images = []
          var body

          _.forEach(message.children, function (child) {
            if (child.tag === 'parts') {
              _.forEach(child.children, function (part) {
                type = part.attrs.ct
                if (_.indexOf(app.$imageMimeTypes, type) >= 0) {
                  var src = 'data:' + type + ';base64, ' + part.attrs.data
                  images.push(src)
                } else if (type === 'text/plain') {
                  body = part.attrs.text
                }
              })
            } else if (child.tag === 'addrs') {
              _.forEach(child.children, function (addr) {
                if (addr.attrs.type === '137') {
                  if (address.includes(addr.attrs.address)) {
                    type = '1'
                    var normalizedAddress = app.$normalizeAddress(addr.attrs.address)
                    sender = app.getContact(normalizedAddress)
                    if (sender === undefined) {
                      sender = {
                        address: normalizedAddress,
                        color: app.$randomColor()
                      }
                    }
                  } else {
                    type = '2'
                  }
                }
              })
            }
          })

          msg = {
            address: address,
            date: message.attrs.date,
            type: type,
            color: type === '1' ? sender.color : 'amber',
            body: body,
            images: images
          }
        }

        app.messages.push(msg)
      })

      this.messages = _.sortBy(this.messages, ['date'])
    },
    getContact: function (address) {
      var contact = _.filter(this.contacts, function (c) {
        return c.address === address
      })
      return contact[0]
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
