<template>
  <div class="markdown-editor">
		<textarea :value='input' @input='markdown.render(source)'># Hello</textarea>
	</div>
  <div class="markdown-output">
    <div v-html='markdown.render(source)'>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import MarkdownIt from 'markdown-it'

const markdown = new MarkdownIt()

defineProps({
  source: {
    type: String,
    default: ''
  }
})

export default {
  setup() {
    const update = () => {}
    const count = Vue.ref(0)
    const add = () => (count.value = count.value + 1)
    const subtract = () => (count.value = count.value - 1)

    return {
      input,
      update,
    }
  },
}
</script>
