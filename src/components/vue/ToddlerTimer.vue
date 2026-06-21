<template>
  <div class="toddler-timer">
    <div v-if="screen === 'home'" class="screen home">
      <h1 class="title">Toddler Timer</h1>
      <p class="subtitle">Pick a time to start!</p>

      <div class="presets">
        <button
          v-for="preset in presets"
          :key="preset"
          class="preset-btn"
          :style="{ background: presetColor(preset) }"
          @click="startTimer(preset * 60)"
        >
          {{ preset }} min
        </button>
      </div>

      <div class="custom-section">
        <p class="custom-label">Or enter a custom time</p>
        <div class="custom-row">
          <input
            v-model="customInput"
            class="custom-input"
            placeholder="mm:ss"
            @keyup.enter="startCustom"
          />
          <button class="start-btn" :disabled="!customInput" @click="startCustom">
            Start
          </button>
        </div>
      </div>
    </div>

    <div v-else-if="screen === 'countdown'" class="screen countdown">
      <div class="image-frame">
        <img :src="currentImage" alt="" class="timer-image" />
        <div class="reveal-overlay" :style="overlayStyle"></div>
      </div>
      <div class="time-display" :class="{ urgent: remaining <= 10 }">
        {{ formatted }}
      </div>
      <button class="cancel-btn" @click="cancel">Cancel</button>
    </div>

    <div v-else class="screen finish">
      <div class="image-frame done">
        <img :src="currentImage" alt="" class="timer-image" />
      </div>
      <div class="time-display done">Time's up!</div>
      <button class="reset-btn" @click="reset">Start Over</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'

const images = [
  '/images/toddler-timer/star.svg',
  '/images/toddler-timer/moon.svg',
  '/images/toddler-timer/sun.svg',
  '/images/toddler-timer/rainbow.svg',
  '/images/toddler-timer/balloon.svg',
  '/images/toddler-timer/fish.svg',
  '/images/toddler-timer/butterfly.svg',
  '/images/toddler-timer/rocket.svg',
  '/images/toddler-timer/heart.svg',
  '/images/toddler-timer/tree.svg',
  '/images/toddler-timer/dinosaur.svg',
  '/images/toddler-timer/cat.svg',
]

const presetColors = ['#FF7043', '#66BB6A', '#42A5F5', '#AB47BC', '#FFA726']

const presets = [1, 2, 5, 10, 30]

const screen = ref('home')
const total = ref(0)
const remaining = ref(0)
const customInput = ref('')
const currentImageUrl = ref('')
const imageIndex = ref(0)
let timerId = null
let audioCtx = null

const progress = computed(() => {
  if (total.value === 0) return 0
  return remaining.value / total.value
})

const overlayStyle = computed(() => {
  const deg = (1 - progress.value) * 360
  return {
    maskImage: `conic-gradient(transparent 0deg, transparent ${deg}deg, #000 ${deg}deg, #000 360deg)`,
    WebkitMaskImage: `conic-gradient(transparent 0deg, transparent ${deg}deg, #000 ${deg}deg, #000 360deg)`,
  }
})

const currentImage = computed(() => currentImageUrl.value)

const formatted = computed(() => {
  const m = Math.floor(remaining.value / 60)
  const s = remaining.value % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
})

function presetColor(minutes) {
  return presetColors[presets.indexOf(minutes) % presetColors.length]
}

function pickImage() {
  let idx
  do {
    idx = Math.floor(Math.random() * images.length)
  } while (idx === imageIndex.value && images.length > 1)
  imageIndex.value = idx
  currentImageUrl.value = images[idx]
}

function startTimer(seconds) {
  if (seconds < 1) return
  total.value = seconds
  remaining.value = seconds
  pickImage()
  screen.value = 'countdown'
  runTick()
}

function startCustom() {
  const val = customInput.value.trim()
  if (!val) return
  const parts = val.split(':')
  let seconds = 0
  if (parts.length === 2) {
    seconds = parseInt(parts[0]) * 60 + parseInt(parts[1])
  } else if (parts.length === 3) {
    seconds = parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseInt(parts[2])
  }
  if (seconds > 0) startTimer(seconds)
}

function runTick() {
  timerId = setInterval(() => {
    remaining.value--
    if (remaining.value <= 0) {
      remaining.value = 0
      clearInterval(timerId)
      timerId = null
      screen.value = 'finish'
      playMelody()
    } else {
      playTick()
    }
  }, 1000)
}

function cancel() {
  if (timerId) {
    clearInterval(timerId)
    timerId = null
  }
  screen.value = 'home'
}

function reset() {
  screen.value = 'home'
}

function getAudioCtx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume()
  }
  return audioCtx
}

function playTick() {
  try {
    const ctx = getAudioCtx()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.type = 'sine'
    osc.frequency.value = 440
    gain.gain.setValueAtTime(0.08, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06)
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.06)
  } catch {
  }
}

function playMelody() {
  try {
    const ctx = getAudioCtx()
    const notes = [523.25, 587.33, 659.25, 783.99, 880, 1046.5]
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.type = 'sine'
      osc.frequency.value = freq
      const start = ctx.currentTime + i * 0.2
      gain.gain.setValueAtTime(0.12, start)
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.4)
      osc.start(start)
      osc.stop(start + 0.4)
    })
  } catch {
  }
}

onUnmounted(() => {
  if (timerId) {
    clearInterval(timerId)
  }
})
</script>

<style scoped>
.toddler-timer {
  max-width: 500px;
  margin: 0 auto;
  padding: 1rem;
  font-family: inherit;
}

/* Home screen */
.screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.title {
  font-size: 2.2rem;
  margin: 0.5rem 0 0;
  color: var(--color, #111);
}

.subtitle {
  font-size: 1.1rem;
  margin: 0;
  opacity: 0.7;
  color: var(--color, #111);
}

.presets {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
}

.preset-btn {
  border: none;
  border-radius: 16px;
  padding: 14px 24px;
  font-size: 1.2rem;
  font-weight: 700;
  color: #fff;
  cursor: pointer;
  transition: transform 0.15s, box-shadow 0.15s;
  box-shadow: 0 3px 8px rgba(0,0,0,0.15);
  min-width: 100px;
}

.preset-btn:hover {
  transform: translateY(-3px) scale(1.03);
  box-shadow: 0 6px 16px rgba(0,0,0,0.2);
}

.preset-btn:active {
  transform: translateY(0) scale(0.97);
}

.custom-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.custom-label {
  font-size: 0.95rem;
  margin: 0;
  opacity: 0.7;
  color: var(--color, #111);
}

.custom-row {
  display: flex;
  gap: 8px;
  width: 100%;
  max-width: 300px;
}

.custom-input {
  flex: 1;
  padding: 12px 16px;
  border: 2px solid var(--border-color, #ccc);
  border-radius: 12px;
  font-size: 1.2rem;
  text-align: center;
  font-family: inherit;
  background: var(--background, #fff);
  color: var(--color, #111);
  outline: none;
  transition: border-color 0.2s;
}

.custom-input:focus {
  border-color: #FF7043;
}

.start-btn {
  padding: 12px 24px;
  border: none;
  border-radius: 12px;
  background: linear-gradient(135deg, #FF7043, #FF8A65);
  color: #fff;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: opacity 0.2s;
}

.start-btn:disabled {
  opacity: 0.4;
  cursor: default;
}

/* Countdown screen */
.countdown {
  gap: 1rem;
}

.image-frame {
  position: relative;
  width: 280px;
  height: 280px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
  background: var(--background, #fff);
}

.timer-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.reveal-overlay {
  position: absolute;
  inset: 0;
  background: var(--background, #fff);
  pointer-events: none;
}

.time-display {
  font-size: 3rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: var(--color, #111);
  transition: color 0.3s;
}

.time-display.urgent {
  color: #FF5252;
}

.cancel-btn {
  padding: 10px 28px;
  border: 2px solid var(--border-color, #ccc);
  border-radius: 12px;
  background: transparent;
  color: var(--color, #111);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.cancel-btn:hover {
  background: rgba(0,0,0,0.05);
}

/* Finish screen */
.image-frame.done {
  animation: pop 0.4s ease;
}

@keyframes pop {
  0% { transform: scale(0.9); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

.time-display.done {
  color: #66BB6A;
  font-size: 2.5rem;
}

.reset-btn {
  padding: 14px 36px;
  border: none;
  border-radius: 14px;
  background: linear-gradient(135deg, #66BB6A, #81C784);
  color: #fff;
  font-size: 1.2rem;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.15s, box-shadow 0.15s;
  box-shadow: 0 3px 10px rgba(0,0,0,0.15);
}

.reset-btn:hover {
  transform: translateY(-2px) scale(1.03);
  box-shadow: 0 6px 18px rgba(0,0,0,0.2);
}

.reset-btn:active {
  transform: translateY(0) scale(0.97);
}

/* Dark mode adjustments */
[data-theme='dark'] .toddler-timer .reveal-overlay {
  background: #1a1a1a;
}

[data-theme='dark'] .toddler-timer .image-frame {
  box-shadow: 0 4px 20px rgba(0,0,0,0.4);
}

[data-theme='dark'] .toddler-timer .cancel-btn:hover {
  background: rgba(255,255,255,0.08);
}

/* Responsive */
@media (max-width: 400px) {
  .image-frame {
    width: 220px;
    height: 220px;
  }

  .time-display {
    font-size: 2.5rem;
  }

  .title {
    font-size: 1.8rem;
  }

  .preset-btn {
    padding: 12px 18px;
    font-size: 1rem;
    min-width: 80px;
  }
}
</style>
