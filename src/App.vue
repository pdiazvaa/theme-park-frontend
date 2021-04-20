<template>
  <div id="app">
    <navBar/>
    <router-view></router-view>
    <iot/>
    <parkAlert/>
  </div>
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

import NavBar from '@/components/NavBar'
import ParkMap from '@/components/ParkMap'
import ParkAlert from '@/components/ParkAlert'
import axios from 'axios'

export default {
  name: 'App',
  components: {
    NavBar,
    ParkMap,
    ParkAlert
  },
  methods: {
    initState: function (items) {
      let initRideTimes
      items.map(item => {
        // Initial ride time valus - store until locations populaterd
        if (item.partitionKey === 'config' && item.message) {
          initRideTimes = item.message
        }
        // Photos
        if (item.partitionKey === 'user-photo') {
          this.$store.commit('addPhoto', item.URL)
        }
        // Other data
        if (item.partitionKey !== 'locations') return
        const key = item.sortKey.split('-')[0]
        switch (key) {
          // Facilities
          case 'facility':
            this.$store.commit('addFacility', {
              id: item.sortKey,
              name: item.name,
              lat: JSON.parse(item.map).lat.N,
              lng: JSON.parse(item.map).lng.N,
              type: item.type
            })
            break
          // Rides
          case 'ride':
            const ride = {
              id: item.sortKey,
              name: item.name,
              lat: JSON.parse(item.map).lat.N,
              lng: JSON.parse(item.map).lng.N,
              thumbnail: item.thumbnail,
              image: item.image,
              wait: null,
              inService: null
            }
            this.$store.commit('addRide', ride)
            break
        }
        // Now add init ride times
        if (initRideTimes) {
          this.$store.commit('updateRideTimes', initRideTimes)
        }
        this.$store.commit('setInitialized')
      })
    }
  },
  mounted: async function () {
    try {
      // For the workshop, if this isn't in the config, the user has not
      // attemped this module yet, so don't initalize.
      if (this.$appConfig.initStateAPI === '') return

      const response = await axios.get(`${this.$appConfig.initStateAPI}`)
      console.log('ParkMap: ', response)
      this.initState(response.data.result.Items)
    } catch (err) {
      console.error(err)
    }
  }
}
</script>
<style>
  body {
    background: #00b0f3 !important;
  }
</style>
