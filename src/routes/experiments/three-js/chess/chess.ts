export class ChessPiece {
	side: 'white' | 'black'
	type: 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king'
	color: [r: number, g: number, b: number]
	pos: string
	status: 'idle' | 'hovered' | 'selected' | 'moving' | 'captured' = 'idle'

	constructor(
		type: 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king',
		side: 'white' | 'black',
		color: [r: number, g: number, b: number],
		pos: string
	) {
		this.side = side
		this.type = type
		this.color = color
		this.pos = pos
	}

	getName() {
		return `${this.color}-${this.type}`
	}

	getSide() {
		return this.side
	}

	getType() {
		return this.type
	}

	getPos() {
		return this.pos
	}

	setStatus(status: 'idle' | 'hovered' | 'selected' | 'moving' | 'captured') {
		this.status = status
	}

	getStatus() {
		return this.status
	}
}
