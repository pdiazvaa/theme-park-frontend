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

import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// initial state
const state = {
  rides: [],
  facilities: [],
  photos: [],
  parkAlert: null,
  initialized: false
}

// getters
const getters = {
  isInitialized: (state) => state.initialized,
  getParkAlert: (state) => state.parkAlert,
  getRides: (state) => state.rides,
  getPhotos: (state) => state.photos,
  getFacilities: (state) => state.facilities
}

// actions
const actions = {
}

// mutations
const mutations = {
  // App is ready
  setInitialized (state) {
    state.initialized = true
  },
  setParkAlert (state, parkAlert) {
    console.log('Park alert: ', parkAlert)
    state.parkAlert = parkAlert
  },
  addRide (state, ride) {
    state.rides.push(ride)
  },
  addPhoto (state, photo) {
    state.photos.push(photo)
  },
  addFacility (state, facility) {
    state.facilities.push(facility)
  },
  updateRideTimes (state, rideTimes) {
    // Convert list of waittimes msg to JSON and iterate
    JSON.parse(rideTimes).map(rideTime => {
      // Find matching ride and update wait time.
      for (let i = 0; i < state.rides.length; i++) {
        if (state.rides[i].id === rideTime.rideId) {
          state.rides[i].wait = rideTime.wait
          state.rides[i].inService = rideTime.inService
          return
        }
      }
    })
    // console.log('updateRideTimes: ', state.rides)
  }
}

export const store = new Vuex.Store({
  state,
  actions,
  getters,
  mutations
})
