<template>
	<div class="poll-wrap">
		<section class="poll" v-if="currentPoll">
			<h2 class="poll-question">{{ currentPoll.question }}</h2>
			<div class="poll-options">
				<div v-for="option in currentPoll.options" :key="option.id" class="poll-option">
					<button @click="handleVote(option.id)" class="poll-option-button">
						<div class="poll-option-button-inner">
							<span class="poll-option-text">{{ option.text }}</span>
							<span class="poll-option-votes">{{ option.votes }} ({{ getPercentage(option.votes) }}%)</span>
						</div>
					</button>
					<div class="poll-option-progress-bar">
						<div class="poll-option-progress-bar-inner" :style="{ width: `${getPercentage(option.votes)}%` }" />
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { PartySocket } from 'partysocket';

interface PollOption {
	id: string;
	text: string;
	votes: number;
}
interface Poll {
	id: string;
	question: string;
	options: PollOption[];
	isActive: boolean;
}
interface ServerState {
	polls: Poll[];
	currentPollId: string;
}

const state = ref<ServerState>({
	polls: [],
	currentPollId: '',
});
const socket = ref<PartySocket | null>(null);

// Get current active poll
const currentPoll = computed(() => {
	return state.value.polls.find((p) => p.id === state.value.currentPollId);
});

// Compute total votes for current poll
const totalVotes = computed(() => {
	if (!currentPoll.value) return 0;
	return currentPoll.value.options.reduce((sum, opt) => sum + opt.votes, 0);
});

// Calculate percentage for an option
const getPercentage = (votes: number): number => {
	if (!totalVotes.value) return 0;
	return Number(((votes / totalVotes.value) * 100).toFixed(1));
};

// Handle voting
const handleVote = (optionId: string) => {
	if (!currentPoll.value) return;

	socket.value?.send(
		JSON.stringify({
			type: 'vote',
			pollId: currentPoll.value.id,
			optionId,
		})
	);
};

// Connect to PartyKit
// TODO host should probably not be hardcoded
onMounted(() => {
	socket.value = new PartySocket({
		host: import.meta.env.PUBLIC_PARTYKIT_HOST,
		room: 'poll',
	});

	socket.value.addEventListener('message', (event) => {
		state.value = JSON.parse(event.data);
	});
});

// Cleanup
onUnmounted(() => {
	socket.value?.close();
});
</script>
