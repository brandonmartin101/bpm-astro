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
          <div class="custom-inputs">
            <input
              v-model.number="customMinutes"
              type="number"
              min="0"
              max="999"
              class="custom-input"
              placeholder="mm"
              @keyup.enter="startCustom"
            />
            <span class="custom-sep">:</span>
            <input
              v-model.number="customSeconds"
              type="number"
              min="0"
              max="59"
              class="custom-input custom-input-sec"
              placeholder="ss"
              @keyup.enter="startCustom"
            />
          </div>
          <button class="start-btn" :disabled="customSeconds == null" @click="startCustom">
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
      <div class="time-display" :class="{ urgent: displaySecs <= 10 }">
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
  '/images/toddler-timer/corgi-puppy.jpg',
  '/images/toddler-timer/puppy-dog.jpg',
  '/images/toddler-timer/kitten.jpg',
  '/images/toddler-timer/kitten-blue-eyes.jpg',
  '/images/toddler-timer/bunny-rabbit.jpg',
  '/images/toddler-timer/panda.jpg',
  '/images/toddler-timer/red-panda.jpg',
  '/images/toddler-timer/elephant.jpg',
  '/images/toddler-timer/giraffe.jpg',
  '/images/toddler-timer/parrot.jpg',
  '/images/toddler-timer/butterfly.jpg',
  '/images/toddler-timer/monarch-butterfly.jpg',
  '/images/toddler-timer/colorful-fish.jpg',
  '/images/toddler-timer/rainbow.jpg',
  '/images/toddler-timer/flowers.jpg',
  '/images/toddler-timer/balloons.jpg',
  '/images/toddler-timer/hot-air-balloons.jpg',
  '/images/toddler-timer/birthday-cake.jpg',
  '/images/toddler-timer/space-shuttle.jpg',
  '/images/toddler-timer/rocket.jpg',
  '/images/toddler-timer/space-planet.jpg',
  '/images/toddler-timer/dinosaur-skeleton.jpg',
  '/images/toddler-timer/toy-duck.jpg',
]

const presetColors = ['#FF7043', '#66BB6A', '#42A5F5', '#AB47BC', '#FFA726']

const presets = [1, 2, 5, 10, 30]

const screen = ref('home')
const total = ref(0)
const remaining = ref(0)
const customMinutes = ref(null)
const customSeconds = ref(null)
const currentImageUrl = ref('')
const imageIndex = ref(0)
let audioCtx = null
let masterGain = null
let rafId = null
let startTime = 0

const displaySecs = computed(() => Math.ceil(remaining.value))

const progress = computed(() => {
  if (total.value === 0) return 0
  return displaySecs.value / total.value
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
  const secs = displaySecs.value
  const m = Math.floor(secs / 60)
  const s = secs % 60
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

function initAudio() {
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)()
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume()
    }
    masterGain = audioCtx.createGain()
    masterGain.gain.value = 1
    masterGain.connect(audioCtx.destination)
  } catch {
  }
}

function scheduleTicks() {
  if (!audioCtx || !masterGain) return
  try {
    for (let i = 1; i <= total.value; i++) {
      const osc = audioCtx.createOscillator()
      const gain = audioCtx.createGain()
      osc.connect(gain)
      gain.connect(masterGain)
      osc.type = 'sine'
      osc.frequency.value = 440
      const t = audioCtx.currentTime + i
      gain.gain.setValueAtTime(0.08, t)
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.06)
      osc.start(t)
      osc.stop(t + 0.06)
    }
  } catch {
  }
}

function startTimer(seconds) {
  if (seconds < 1) return
  initAudio()
  total.value = seconds
  remaining.value = seconds
  pickImage()
  screen.value = 'countdown'
  startTime = performance.now()
  scheduleTicks()
  tick()
}

function startCustom() {
  const mins = customMinutes.value || 0
  const secs = customSeconds.value || 0
  const totalSecs = mins * 60 + secs
  if (totalSecs > 0) startTimer(totalSecs)
}

function tick() {
  if (screen.value !== 'countdown') return
  const elapsed = (performance.now() - startTime) / 1000
  const raw = total.value - elapsed
  remaining.value = raw > 0 ? raw : 0
  if (remaining.value <= 0) {
    finish()
    return
  }
  rafId = requestAnimationFrame(tick)
}

function finish() {
  cancelAnimationFrame(rafId)
  rafId = null
  remaining.value = 0
  screen.value = 'finish'
  playMelody()
}

function cancel() {
  if (rafId) {
    cancelAnimationFrame(rafId)
    rafId = null
  }
  if (masterGain && audioCtx) {
    masterGain.gain.setValueAtTime(0, audioCtx.currentTime)
  }
  screen.value = 'home'
}

function reset() {
  screen.value = 'home'
}

function playMelody() {
  if (!audioCtx || !masterGain) return
  try {
    const notes = [523.25, 587.33, 659.25, 783.99, 880, 1046.5]
    notes.forEach((freq, i) => {
      const osc = audioCtx.createOscillator()
      const gain = audioCtx.createGain()
      osc.connect(gain)
      gain.connect(masterGain)
      osc.type = 'sine'
      osc.frequency.value = freq
      const start = audioCtx.currentTime + i * 0.2
      gain.gain.setValueAtTime(0.12, start)
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.4)
      osc.start(start)
      osc.stop(start + 0.4)
    })
  } catch {
  }
}

onUnmounted(() => {
  if (rafId) {
    cancelAnimationFrame(rafId)
  }
})
</script>

<style scoped>
.toddler-timer {
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  font-family: inherit;
  background:
    radial-gradient(circle at 15% 20%, rgba(255,204,2,0.25) 0%, transparent 50%),
    radial-gradient(circle at 85% 15%, rgba(255,112,67,0.2) 0%, transparent 45%),
    radial-gradient(circle at 20% 80%, rgba(206,147,216,0.2) 0%, transparent 45%),
    radial-gradient(circle at 80% 85%, rgba(100,181,246,0.2) 0%, transparent 45%),
    linear-gradient(135deg, #FFF8E1, #F3E5F5, #E1F5FE);
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.08);
  position: relative;
  overflow: hidden;
}

.toddler-timer::before {
  content: '';
  position: absolute;
  top: 10px;
  left: 10px;
  width: 20px;
  height: 20px;
  background: #FFCC02;
  border-radius: 50%;
  opacity: 0.5;
}

.toddler-timer::after {
  content: '';
  position: absolute;
  bottom: 15px;
  right: 15px;
  width: 14px;
  height: 14px;
  background: #FF7043;
  border-radius: 50%;
  opacity: 0.4;
}

[data-theme='dark'] .toddler-timer {
  background:
    radial-gradient(circle at 15% 20%, rgba(255,204,2,0.2) 0%, transparent 50%),
    radial-gradient(circle at 85% 15%, rgba(255,112,67,0.15) 0%, transparent 45%),
    radial-gradient(circle at 20% 80%, rgba(206,147,216,0.15) 0%, transparent 45%),
    radial-gradient(circle at 80% 85%, rgba(100,181,246,0.15) 0%, transparent 45%),
    linear-gradient(135deg, #2D2432, #242D3A, #2D2D2D);
  box-shadow: 0 8px 32px rgba(0,0,0,0.3);
}

[data-theme='dark'] .toddler-timer::before {
  background: #FFCC02;
  opacity: 0.3;
}

[data-theme='dark'] .toddler-timer::after {
  background: #FF7043;
  opacity: 0.25;
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
  flex-wrap: wrap;
  gap: 8px;
  width: 100%;
  max-width: 360px;
  justify-content: center;
}

.custom-inputs {
  display: flex;
  align-items: center;
  gap: 4px;
  flex: 1 1 auto;
  min-width: 0;
}

.custom-input {
  width: 80px;
  padding: 12px 8px;
  border: 2px solid var(--border-color, #ccc);
  border-radius: 12px;
  font-size: 1.2rem;
  text-align: center;
  font-family: inherit;
  background: var(--background, #fff);
  color: var(--color, #111);
  outline: none;
  transition: border-color 0.2s;
  appearance: textfield;
  -moz-appearance: textfield;
}

.custom-input::-webkit-inner-spin-button,
.custom-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.custom-sep {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color, #111);
  line-height: 1;
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
  white-space: nowrap;
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
