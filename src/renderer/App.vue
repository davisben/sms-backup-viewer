<template lang="pug">
  div#app
    page-header

    div#wrapper
      contacts
      messages
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader'
import Contacts from '@/components/Contacts'
import Messages from '@/components/Messages'

export default {
  name: 'app',
  components: {
    PageHeader,
    Contacts,
    Messages
  }
}
</script>

<style lang="sass">
@import url('https://fonts.googleapis.com/css?family=Open+Sans:400,700')

body
  margin: 0

  #app
    color: $primary
    font-family: 'Open Sans', sans-serif
    padding: 1em

    #wrapper
      clear: both
      border: 1px solid $primary-light
      overflow: hidden

      #contacts
        float: left
        width: 20%

      #messages
        float: left
        width: calc(80% - 1px)
</style>
