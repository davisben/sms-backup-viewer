<template lang="pug">
  header
    h1 SMS Backup Viewer
    div.select-file
      button Select file
      input(type='file', accept='text/xml', @change='onFileChange')
</template>

<script>
import bigXml from 'big-xml'
import _ from 'lodash'

export default {
  name: 'page-header',
  store: ['data', 'contacts'],
  methods: {
    onFileChange (e) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }

      var filePath = files[0].path
      this.parseData(filePath)
    },
    parseData: function (filePath, e) {
      var messages = []
      var contacts = []
      var app = this

      bigXml.createReader(filePath, /^(sms|mms)$/)
        .on('record', function (record) {
          messages.push(record)
        })
        .on('end', function () {
          _.forEach(messages, function (message) {
            var address = app.$normalizeAddress(message.attrs.address)
            var index = _.findIndex(contacts, ['address', address])

            if (index === -1) {
              var contact = {
                address: address,
                name: message.attrs.contact_name,
                count: 1,
                latest: message.attrs.date,
                color: app.$randomColor()
              }
              contacts.push(contact)
            } else {
              contacts[index].count++
              contacts[index].latest = message.attrs.date
            }
          })

          app.contacts = _.reverse(_.sortBy(contacts, ['latest']))
          app.data = messages
        })
    }
  }
}
</script>

<style lang="sass">
h1
  float: left
  color: $primary-dark
  margin-top: 0

.select-file
  float: right
  display: inline-block
  position: relative
  overflow: hidden

  button
    border: 2px solid $primary-dark
    border-radius: 7px
    background-color: #fff
    color: $primary-dark
    font-size: 20px
    font-weight: bold
    padding: 7px 20px

  input[type=file]
    position: absolute
    left: 0
    top: 0
    font-size: 20em
    opacity: 0
</style>
