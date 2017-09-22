<template lang="pug">
  header
    h1 SMS Backup Viewer
    div.select-file
      button Select file
      input(type='file', accept='text/xml', @change='onFileChange')
</template>

<script>
import Parser from 'xml2js'
import _ from 'lodash'

export default {
  name: 'page-header',
  store: ['contacts', 'messages'],
  methods: {
    onFileChange (e) {
      var app = this
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }

      var reader = new FileReader()
      reader.onload = function (e) {
        var xml = e.target.result

        Parser.parseString(xml, function (err, result) {
          if (err) {
            console.log(err.stack)
          }

          var contacts = []
          var messages = []

          var imageMimeTypes = [
            'image/jpeg',
            'image/jpg',
            'image/png',
            'image/gif'
          ]

          _.forEach(result.smses.sms, function (sms) {
            var address = sms.$.address
            var index = _.findIndex(contacts, ['address', address])

            if (index === -1) {
              var contact = {
                address: sms.$.address,
                name: sms.$.contact_name,
                count: 1,
                latest: sms.$.date
              }
              contacts.push(contact)
            } else {
              contacts[index].count++
              contacts[index].latest = sms.$.date
            }

            var message = {
              address: address,
              date: sms.$.date,
              type: sms.$.type,
              body: sms.$.body
            }
            messages.push(message)
          })

          _.forEach(result.smses.mms, function (mms) {
            if (!_.isEmpty(mms.parts)) {
              _.forEach(mms.parts, function (part) {
                if (!_.isEmpty(part)) {
                  var images = []
                  var body

                  _.forEach(part.part, function (part) {
                    if (_.indexOf(imageMimeTypes, part.$.ct) >= 0) {
                      var src = 'data:' + part.$.ct + ';base64, ' + part.$.data
                      images.push(src)
                    } else if (part.$.ct === 'text/plain') {
                      body = part.$.text
                    }
                  })

                  var message = {
                    address: mms.$.address,
                    date: mms.$.date,
                    type: 1,
                    body: body,
                    images: images
                  }
                  messages.push(message)
                }
              })
            }
          })

          app.contacts = _.reverse(_.sortBy(contacts, ['latest']))
          app.messages = messages
        })
      }
      reader.readAsText(files[0])
    }
  }
}
</script>

<style lang="sass">
@import ../../src/sass/variables

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
