<template>
	<div class="poll-wrap admin">
		<section class="poll-admin">
			<h2>Admin</h2>
			<div v-for="poll in state.polls" :key="poll.id" class="poll-admin-buttons">
				<button
					@click="sendPollMessage(poll.id, 'changePoll')"
					class="poll-change-button"
					:class="[poll.isActive ? 'poll-active' : 'poll-inactive']"
				>
					Make {{ poll.name }} Active
				</button>
				<button
					@click="sendPollMessage(poll.id, 'resetPoll')"
					class="poll-reset-button"
					:class="[poll.isActive ? 'poll-active' : 'poll-inactive']"
				>
					Reset {{ poll.name }}
				</button>
			</div>
		</section>
		<section class="poll" v-for="poll in state.polls" :key="poll.id">
			<h4 class="poll-question">
				{{ poll.question }}
				<span v-if="poll.isActive" class="poll-active">(Active)</span>
			</h4>
			<div class="poll-options">
				<div v-for="option in poll.options" :key="option.id" class="poll-option">
					<button class="poll-option-button">
						<div class="poll-option-button-inner">
							<span class="poll-option-button-text">{{ option.text }}</span>
							<span class="poll-option-button-votes">
								{{ option.votes }} ({{ getPercentage(option.votes, poll) }}%)
							</span>
						</div>
					</button>
					<div class="poll-option-progress-bar">
						<div class="poll-option-progress-bar-inner" :style="{ width: `${getPercentage(option.votes, poll)}%` }" />
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { PartySocket } from 'partysocket';

interface PollOption {
	id: string;
	text: string;
	votes: number;
}
interface Poll {
	id: string;
	name: string;
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

const getPercentage = (votes: number, poll: Poll): number => {
	const totalVotes = poll.options.reduce((sum, option) => sum + option.votes, 0);
	if (!totalVotes) return 0;
	return Number(((votes / totalVotes) * 100).toFixed(1));
};

// Send message to server to either change or reset the poll
const sendPollMessage = (pollId: string, type: 'changePoll' | 'resetPoll') => {
	socket.value?.send(
		JSON.stringify({
			type,
			pollId,
		})
	);
};

// Connect to PartyKit
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
