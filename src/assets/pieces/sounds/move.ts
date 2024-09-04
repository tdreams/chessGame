export function playMoveSound() {
  const moveSound = new Audio(`/sounds/public_sound_sfx_Move.mp3`);
  moveSound.currentTime = 0;
  moveSound.play();
}
