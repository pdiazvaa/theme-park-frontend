<template>
  <div id="ride">
    <b-card :title="$t('phrases.yourGallery')"/>      
                  
    <div>
      <gallery :images="images" :index="index" @close="index = null"></gallery>
      <div
        class="image"
        v-for="(image, imageIndex) in images"
        :key="imageIndex"
        @click="index = imageIndex"
        :style="{ backgroundImage: 'url(' + image + ')', width: '400px', height: '300px' }"
      >
        <social-sharing :url="image"
          title="I completed the AWS Serverless Theme Park Workshop!"
          hashtags="aws serverless reInvent2019"
          inline-template>
          <div>
            <network network="twitter">
              <img class="hoverButton" src="@/assets/twitter_share.png"  style="width: 150px;left:125px;top:261px;position:relative;"/>
            </network>
          </div>
        </social-sharing>   
      </div>
    </div>
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

import VueGallery from 'vue-gallery'
export default {
  name: 'PhotoGallery',
  components: {
    'gallery': VueGallery
  },
  data () {
    return {
      index: null
    }
  },
  computed: {
    images () {
      // console.log(this.$store.getters.getPhotos)
      return this.$store.getters.getPhotos
    }
  }
}
</script>

<style scoped>
  .image {
    float: left;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    border: 1px solid #ebebeb;
    margin: 5px;
  }
</style>