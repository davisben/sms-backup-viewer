<template lang="pug">
  header
    h1 SMS Backup Viewer
    div.select-file
      button Select file
      input(type='file', accept='text/xml', @change='onFileChange')
</template>

<script>
import fastXmlParser from 'fast-xml-parser'
import PhoneNumber from 'awesome-phonenumber'
import _ from 'lodash'

export default {
  name: 'page-header',
  store: ['xmlData', 'contacts'],
  methods: {
    onFileChange (e) {
      var app = this
      var files = e.target.files || e.dataTransfer.files

      if (!files.length) {
        return
      }

      var reader = new FileReader()
      reader.onload = function (e) {
        var contacts = []

        var options = {
          attrPrefix: '',
          attrNodeName: 'attr',
          ignoreNonTextNodeAttr: false,
          ignoreTextNodeAttr: false
        }
        var xmlData = fastXmlParser.parse(e.target.result, options)

        var smses = xmlData.smses.sms
        var mmses = xmlData.smses.mms
        var messages = smses.concat(mmses)
        app.xmlData = messages

        var colors = [
          'red',
          'pink',
          'purple',
          'indigo',
          'teal',
          'blue-grey'
        ]

        _.forEach(messages, function (message) {
          var address = message.attr.address
          // var address = app.normalizeAddress(message.attr.address)
          var index = _.findIndex(contacts, ['address', address])

          if (index === -1) {
            var contact = {
              address: address,
              name: message.attr.contact_name,
              count: 1,
              latest: message.attr.date,
              color: colors[Math.floor(Math.random() * colors.length)]
            }
            contacts.push(contact)
          } else {
            contacts[index].count++
            contacts[index].latest = message.attr.date
          }
        })

        app.contacts = _.reverse(_.sortBy(contacts, ['latest']))
      }
      reader.readAsText(files[0])
    },
    normalizeAddress: function (address, e) {
      var pn = PhoneNumber(address, 'US')
      var number = pn.getNumber('e164')

      if (number === undefined) {
        number = address
      }

      return number
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
