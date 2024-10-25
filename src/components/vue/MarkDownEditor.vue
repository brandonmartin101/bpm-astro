<template>
	<div class="md-wrap">
		<div class="md-input">
			<h2>Input</h2>
			<textarea class="md-text-input" v-model="markdown" placeholder="Enter your markdown here..."></textarea>
		</div>
		<div class="md-output">
			<h2>Output</h2>
			<div class="md-text-output" v-html="renderedHtml"></div>
		</div>
	</div>
	<div class="file-upload">
		<input
			type="file"
			accept=".md,.markdown,text/markdown"
			@change="handleFileUpload"
			ref="fileInput"
			class="upload-input hidden"
		/>
		<button @click="$refs.fileInput.click()" class="upload-button">Load Markdown File</button>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import MarkdownIt from 'markdown-it';

const props = defineProps<{
	exampleMarkdown?: string;
}>();

const md = new MarkdownIt({
	html: true,
	linkify: true,
	typographer: true,
});

const markdown = ref(props.exampleMarkdown || '# Welcome to the Markdown Editor\n\nStart typing here...');
const renderedHtml = computed(() => md.render(markdown.value));

const fileInput = ref<HTMLInputElement | null>(null);
const handleFileUpload = async (e: Event) => {
	const input = e.target as HTMLInputElement;
	if (!input.files?.length) return;

	const file = input.files[0];
	try {
		const text = await file.text();
		markdown.value = text;
	} catch (error) {
		console.error('Error reading file:', error);
		alert('Error reading file');
	}

	if (fileInput.value) fileInput.value.value = '';
};
</script>

<style scoped>
.md-wrap {
	display: flex;
	flex-wrap: wrap;
	gap: 20px;
}
.md-input,
.md-output {
	flex: 1 1 400px;
	max-width: calc(50% - 10px);
	padding: 10px 20px;
	text-align: left;
}
.md-input > *,
.md-output > * {
	width: 100%;
}
.md-text-input,
.md-output {
	overflow-y: scroll;
}
.md-text-input,
.md-output {
	height: 50vh;
}
@media (max-width: 800px) {
	.md-input,
	.md-output {
		max-width: 100%;
	}
}
</style>
