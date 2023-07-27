import { loadAudio, loadImage } from '../utils';

export const explosionSounds = [
	'/runner/point-and-shoot/hit01.mp3.flac',
	'/runner/point-and-shoot/hit02.mp3.flac',
	'/runner/point-and-shoot/hit04.mp3.flac',
	'/runner/point-and-shoot/hit08.mp3.flac',
	'/runner/point-and-shoot/hit11.mp3.flac'
];

export class Explosion {
	image: HTMLImageElement;
	spriteWidth: number;
	spriteHeight: number;
	size: number;
	x: number;
	y: number;
	frame: number;
	sound: HTMLAudioElement;
	timeSinceLastFrame: number;
	frameInterval: number;
	markedForDeletion = false;
	maxFrame: number;
	constructor(x: number, y: number, size: number, depth: number) {
		this.image = loadImage('/runner/point-and-shoot/explosion-16.png');
		this.spriteWidth = 16;
		this.spriteHeight = 16;
		this.size = size;
		this.x = x;
		this.y = y;
		this.frame = 0;
		const randomSoundIndex = Math.floor(Math.random() * explosionSounds.length);
		this.sound = loadAudio(explosionSounds[randomSoundIndex]);
		this.sound.volume = depth / 8;
		this.timeSinceLastFrame = 0;
		this.frameInterval = 50;
		this.maxFrame = 5;
	}
	update(deltaTime: number) {
		if (this.frame === 0) this.sound.play();
		this.timeSinceLastFrame += deltaTime;
		if (this.timeSinceLastFrame > this.frameInterval) {
			this.frame >= this.maxFrame ? (this.markedForDeletion = true) : this.frame++;
			this.timeSinceLastFrame = 0;
		}
		if (this.frame > 5) this.markedForDeletion = true;
	}
	draw(ctx: CanvasRenderingContext2D) {
		ctx.drawImage(
			this.image,
			this.frame * this.spriteWidth,
			0,
			this.spriteWidth,
			this.spriteHeight,
			this.x,
			this.y,
			this.size,
			this.size
		);
	}
}
