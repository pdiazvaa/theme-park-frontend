<template>
  <div></div>
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

  const AWS = require('aws-sdk')
  const AWSIoTData = require('aws-iot-device-sdk')
  const ridesTopic = 'theme-park-rides'

  export default {
    name: 'IoT',
    data () {
      return {
        init: false
      }
    },
    mounted: function () {
      // For the workshop, if this isn't in the config, the user has not
      // attemped this module yet, so hide the feature.

      if (this.$appConfig.iot.poolId === '') return
      const AWSConfiguration = this.$appConfig.iot

      console.log('IoT mounted')
      const _store = this.$store
      // const _t = this.$t

      const clientId = 'theme-park-client-' + (Math.floor((Math.random() * 100000) + 1))
      AWS.config.region = AWSConfiguration.region

      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: AWSConfiguration.poolId
      })

      const cognitoIdentity = new AWS.CognitoIdentity()
      const getCreds = function () {
        console.log('getCreds called')
        AWS.config.credentials.get(function (err, data) {
          if (!err) {
            console.log('retrieved identity: ' + AWS.config.credentials.identityId)
            var params = {
              IdentityId: AWS.config.credentials.identityId
            }
            cognitoIdentity.getCredentialsForIdentity(params, function (err, data) {
              console.log('Creds: ', data)
              if (!err) {
                mqttClient.updateWebSocketCredentials(data.Credentials.AccessKeyId,
                  data.Credentials.SecretKey,
                  data.Credentials.SessionToken)
              // } else {
              //   console.log('error retrieving credentials: ' + err)
              }
            })
          } else {
            console.log('Error retrieving identity:' + err)
          }
        })
      }

      const mqttClient = AWSIoTData.device({
        region: AWS.config.region,
        host: AWSConfiguration.host,
        clientId: clientId,
        protocol: 'wss',
        maximumReconnectTimeMs: 8000,
        debug: false,
        accessKeyId: '',
        secretKey: '',
        sessionToken: ''
      })

      // When first connected, subscribe to the topics we are interested in.
      mqttClient.on('connect', function () {
        console.log('mqttClient connected')
        mqttClient.subscribe(ridesTopic)
      })

      // Attempt to reconnect in the event of any error
      mqttClient.on('error', function (err) {
        console.log('mqttClient error:', err)
        getCreds()
      })

      // A message has arrived - parse to determine topic
      mqttClient.on('message', function (topic, payload) {
        console.log('IoT::onMessage: ', topic)
        const payloadEnvelope = JSON.parse(payload.toString())
        console.log('Message: ', payloadEnvelope)

        if (payloadEnvelope.type === 'alert') {
          _store.commit('setParkAlert', JSON.parse(payloadEnvelope.msg))
        }
        if (payloadEnvelope.type === 'photoProcessed') {
          console.log('Photo processed: ', payloadEnvelope.message.URL)
          _store.commit('addPhoto', payloadEnvelope.message.URL)
          _store.commit('setParkAlert', {
            title: 'Photo processed',
            type: 'info',
            confirmButtonText: 'OK'
          })
        }
        // ride updates use the ridesTopic
        if (payloadEnvelope.type === 'summary') {
          _store.commit('updateRideTimes', payloadEnvelope.msg)
        }
      })
    }
  }
</script>
