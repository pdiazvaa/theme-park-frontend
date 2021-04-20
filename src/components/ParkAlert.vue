<template>
</template>

<script>
/*
  MIT No Attribution

  Copyright Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.

  Permission is hereby granted, free of charge, to any person obtaining a copy of this
  software and associated documentation files (the "Software"), to deal in the Software
  without restriction, including without limitation the rights to use, copy, modify,
  merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
  permit persons to whom the Software is furnished to do so.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
  INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
  PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
  HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
  OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
import Swal from 'sweetalert2'

export default {
  name: 'ParkAlert',
  mounted () {
    console.log('ParkAlert::mounted')
  },
  computed: {
    parkAlert () { return this.$store.getters.getParkAlert }
  },
  watch: {
    // expected format:
    // {
    //  "title": string,
    //  "text": string,
    //  "type": string,
    //  "confirmButtonText": string
    // }

    parkAlert (msg) {
      if (msg.level === 'info') {
        msg.title = this.$t(`${msg.type}.title`)
        msg.text = this.$t(`${msg.type}.text`)
        msg.confirmButtonText = 'OK'
        msg.confirmStyle = 'success'
        msg.type = 'success'
      }
      console.log('ParkAlert: ', msg)
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: `btn btn-${msg.confirmStyle}`
        },
        buttonsStyling: false
      })

      swalWithBootstrapButtons.fire({
        title: msg.title,
        text: msg.text,
        type: msg.type,
        confirmButtonText: msg.confirmButtonText
      })
    }
  }
}
</script>
