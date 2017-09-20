<template lang="pug">
  div#app
    page-header
    contacts
    messages
  </div>
</template>

<script>
import PageHeader from './components/PageHeader'
import Contacts from './components/Contacts'
import Messages from './components/Messages'

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
  font-family: 'Open Sans', sans-serif

#contacts
  float: left
  width: 30%

#messages
  float: left
  width: 70%

</style>
