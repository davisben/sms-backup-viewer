<template lang="pug">
  header
    h1 SMS Backup Viewer
    input(type='file', accept='text/xml', @change='onFileChange')
</template>

<script>
import Parser from 'xml2js'

export default {
  name: 'page-header',
  store: ['contacts', 'messages'],
  methods: {
    onFileChange (e) {
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
          console.dir(result)
        })
      }
      reader.readAsText(files[0])
    }
  }
}
</script>
