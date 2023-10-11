import type { RGB } from './gameSettings'

export const BLACK: RGB = [0.35, 0.44, 0.62]
export const WHITE: RGB = [0.8, 0.8, 0.8]
export const WHITE_HIGHLIGHT: RGB = [1.5, 1.5, 1.5]
export const BLACK_HIGHLIGHT: RGB = [0.5804, 0.6745, 0.9412]

export class ChessPiece {
	side: 'white' | 'black'
	type: 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king'
	color: [r: number, g: number, b: number]
	highlightColor: [r: number, g: number, b: number]
	pos: string
	status: 'idle' | 'hovered' | 'selected' = 'idle'

	constructor(
		type: 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king',
		side: 'white' | 'black',
		pos: string
	) {
		this.side = side
		this.type = type
		this.color = side === 'white' ? WHITE : BLACK
		this.highlightColor = side === 'white' ? WHITE_HIGHLIGHT : BLACK_HIGHLIGHT
		this.pos = pos
	}

	setStatus(status: 'idle' | 'hovered' | 'selected') {
		this.status = status
		if (this.status === 'hovered') {
			this.color = this.highlightColor
		} else if (this.status === 'selected') {
			this.color = this.highlightColor
		} else {
			this.color = this.side === 'white' ? WHITE : BLACK
		}
	}

	move(pos: string) {
		this.pos = pos
	}
}
