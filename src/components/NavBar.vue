<template>
  <div id="nav">
    <b-navbar type="dark" variant="dark">
      <b-navbar-brand v-if="['Home'].indexOf($route.name) === 0" href="#">
        <router-link to="/"><img :src="logoURL" width="100px" alt="Innovator Island"></router-link>
      </b-navbar-brand>

        <b-button variant="outline-light" class="btn  ml-2 my-2 my-sm-0" v-if="['Home'].indexOf($route.name) != 0" to="/" size="sm">
          <font-awesome-icon icon="arrow-circle-left" size="2x"/>
        </b-button>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <!-- Language selector icon -->
          <b-dropdown v-if="languageCount > 1" id="languages" variant="outline-light" class="m-md-2 mr-2" right>
            <template v-slot:button-content><font-awesome-icon icon="globe" size="2x"/></template>
            <b-dropdown-header id="dropdown-header-label">{{ $t('phrases.selectLanguage') }}</b-dropdown-header>        
            <b-dropdown-item v-for="(lang) in $languages" :key="lang.code" @click="changeLanguage(lang.code)">{{ lang.language }}</b-dropdown-item>
          </b-dropdown>    
        </b-navbar-nav>
        <!-- Photo Gallery icon -->
        <b-button v-if="$store.getters.getPhotos.length !== 0" variant="outline-light" class="btn  ml-2 my-2 my-sm-0" to="/photo-gallery" size="md">
          <font-awesome-icon icon="images" size="2x"/>
        </b-button>
    </b-navbar>
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

export default {
  name: 'NavBar',
  data: function () {
    return {
      logoURL: this.$appConfig.images.logoURL,
      lang: 'EN',
      languageCount: 1
    }
  },
  methods: {
    changeLanguage: function (lang) {
      this.$root.$i18n.locale = lang
    }
  },
  mounted () {
    // In the workshop, if only English is in installed, the languageCount is 1.
    // We hide the control since the workshop user hasn't yet reached the
    // language module. This is achieved with v-if in the template.
    this.languageCount = Object.keys(this.$languages).length
  }
}
</script>
