export default function formatSeconds(inputSec: number | undefined) {
    if (inputSec || inputSec === 0) {
        let minutes: number = Math.floor(inputSec/60);
        let seconds = Math.floor(inputSec) - minutes * 60;
        return `${minutes}:${seconds > 9 ? '' : '0'}${seconds}`
    }
}