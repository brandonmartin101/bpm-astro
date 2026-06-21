# Toddler Timer — Requirements

**Stack:** Vue 3 · localStorage · No server

---

## Screens

- **Home** — preset time buttons + custom time input + start button
- **Countdown** — image reveals via clock sweep, numbers count down, gentle tick plays
- **Finish** — full image visible, ending melody plays, reset button shown

## Times

- **Presets:** 1 min, 2 min, 5 min, 10 min, 30 min
- **Custom input:** accepts `mm:ss` or `h:mm:ss` (e.g. `3:30` for 3 min 30 sec)
- **Stretch:** user can save custom presets to localStorage

## Display

- Remaining time shown as large numbers
- Image revealed via **clock-face sweep** behind the numbers
- Animation system should be **swappable** — built so the reveal mechanic (e.g. curtain slide, vertical rise, pixel dissolve) can be easily swapped without rewriting the component

## Images

- **20 bundled kid-friendly images** in `public/images/toddler-timer/`
- Selected randomly each session
- Source: public domain / permissive license (Unsplash, Pexels)
- Child-friendly subjects (animals, space, dinosaurs, nature)

## Sound

- **Countdown:** soft, gentle tick (not a sharp clock tick)
- **Finish:** a short, pleasant ending melody (not a harsh alarm)
- Sourced from free sound libraries or generated

## Theme

- Child-friendly: bright colors, large touch-friendly buttons, playful aesthetic

## Future Considerations

- Animation reveal style should be easy to swap (noted above)
- Custom presets saved to localStorage (stretch goal)
