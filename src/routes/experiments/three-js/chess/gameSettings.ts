export const TILE_SIZE = 4
export const BOARD_SIZE = 8
export const COL_NAMES = ['h', 'g', 'f', 'e', 'd', 'c', 'b', 'a']

export type RGB = [r: number, g: number, b: number]

export const BLACK_TILE: RGB = [0.35, 0.44, 0.62]
export const WHITE_TILE: RGB = [0.9, 0.9, 0.9]
export const BLACK_TILE_HIGHLIGHT: RGB = [1, 0.32, 0.19]
export const WHITE_TILE_HIGHLIGHT: RGB = [1, 0.32, 0.19]
export const FRAME_COLOR: RGB = [0.5529, 0.4667, 0.3725]

export function generateChessboard(rows: number, cols: number) {
	const chessboard: {
		name: string
		color: RGB
		side: 'white' | 'black'
		pos: [x: number, y: number, z: number]
	}[] = []
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			const x = i * TILE_SIZE - (BOARD_SIZE * TILE_SIZE) / 2 + TILE_SIZE / 2
			const z = j * TILE_SIZE - (BOARD_SIZE * TILE_SIZE) / 2 + TILE_SIZE / 2
			const tileValue = {
				name: `${COL_NAMES[i]}${j + 1}`,
				color: (i + j) % 2 === 0 ? WHITE_TILE : BLACK_TILE,
				side: (i + j) % 2 === 0 ? 'white' : ('black' as 'black' | 'white'), //weird type
				pos: [x, 0, z] as [x: number, y: number, z: number]
			}
			chessboard.push(tileValue)
		}
	}
	return chessboard
}

export const INITIAL_POSITIONS = [
	{ type: 'pawn', side: 'white', pos: 'a2' },
	{ type: 'pawn', side: 'white', pos: 'b2' },
	{ type: 'pawn', side: 'white', pos: 'c2' },
	{ type: 'pawn', side: 'white', pos: 'd2' },
	{ type: 'pawn', side: 'white', pos: 'e2' },
	{ type: 'pawn', side: 'white', pos: 'f2' },
	{ type: 'pawn', side: 'white', pos: 'g2' },
	{ type: 'pawn', side: 'white', pos: 'h2' },
	{ type: 'pawn', side: 'black', pos: 'a7' },
	{ type: 'pawn', side: 'black', pos: 'b7' },
	{ type: 'pawn', side: 'black', pos: 'c7' },
	{ type: 'pawn', side: 'black', pos: 'd7' },
	{ type: 'pawn', side: 'black', pos: 'e7' },
	{ type: 'pawn', side: 'black', pos: 'f7' },
	{ type: 'pawn', side: 'black', pos: 'g7' },
	{ type: 'pawn', side: 'black', pos: 'h7' },
	{ type: 'rook', side: 'white', pos: 'a1' },
	{ type: 'rook', side: 'white', pos: 'h1' },
	{ type: 'rook', side: 'black', pos: 'a8' },
	{ type: 'rook', side: 'black', pos: 'h8' },
	{ type: 'knight', side: 'white', pos: 'b1' },
	{ type: 'knight', side: 'white', pos: 'g1' },
	{ type: 'knight', side: 'black', pos: 'b8' },
	{ type: 'knight', side: 'black', pos: 'g8' },
	{ type: 'bishop', side: 'white', pos: 'c1' },
	{ type: 'bishop', side: 'white', pos: 'f1' },
	{ type: 'bishop', side: 'black', pos: 'c8' },
	{ type: 'bishop', side: 'black', pos: 'f8' },
	{ type: 'queen', side: 'white', pos: 'd1' },
	{ type: 'queen', side: 'black', pos: 'd8' },
	{ type: 'king', side: 'white', pos: 'e1' },
	{ type: 'king', side: 'black', pos: 'e8' }
]
