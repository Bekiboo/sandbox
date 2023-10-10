import { ChessPiece } from './chess'

export const TILE_SIZE = 4
export const BOARD_SIZE = 8
export const COL_NAMES = ['h', 'g', 'f', 'e', 'd', 'c', 'b', 'a']

export type RGB = [r: number, g: number, b: number]

export const BLACK: RGB = [0.35, 0.44, 0.62]
export const WHITE: RGB = [0.8, 0.8, 0.8]
export const WHITE_HIGHLIGHT: RGB = [1.5, 1.5, 1.5]
export const BLACK_HIGHLIGHT: RGB = [0.5804, 0.6745, 0.9412]
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
				side: (i + j) % 2 === 0 ? 'black' : 'white',
				pos: [x, 0, z]
			}
			chessboard.push(tileValue as any)
		}
	}
	return chessboard
}

export const INITIAL_POSITIONS = [
	{ type: 'pawn', side: 'white', color: WHITE, pos: 'a2' },
	{ type: 'pawn', side: 'white', color: WHITE, pos: 'b2' },
	{ type: 'pawn', side: 'white', color: WHITE, pos: 'c2' },
	{ type: 'pawn', side: 'white', color: WHITE, pos: 'd2' },
	{ type: 'pawn', side: 'white', color: WHITE, pos: 'e2' },
	{ type: 'pawn', side: 'white', color: WHITE, pos: 'f2' },
	{ type: 'pawn', side: 'white', color: WHITE, pos: 'g2' },
	{ type: 'pawn', side: 'white', color: WHITE, pos: 'h2' },
	{ type: 'pawn', side: 'black', color: BLACK, pos: 'a7' },
	{ type: 'pawn', side: 'black', color: BLACK, pos: 'b7' },
	{ type: 'pawn', side: 'black', color: BLACK, pos: 'c7' },
	{ type: 'pawn', side: 'black', color: BLACK, pos: 'd7' },
	{ type: 'pawn', side: 'black', color: BLACK, pos: 'e7' },
	{ type: 'pawn', side: 'black', color: BLACK, pos: 'f7' },
	{ type: 'pawn', side: 'black', color: BLACK, pos: 'g7' },
	{ type: 'pawn', side: 'black', color: BLACK, pos: 'h7' },
	{ type: 'rook', side: 'white', color: WHITE, pos: 'a1' },
	{ type: 'rook', side: 'white', color: WHITE, pos: 'h1' },
	{ type: 'rook', side: 'black', color: BLACK, pos: 'a8' },
	{ type: 'rook', side: 'black', color: BLACK, pos: 'h8' },
	{ type: 'knight', side: 'white', color: WHITE, pos: 'b1' },
	{ type: 'knight', side: 'white', color: WHITE, pos: 'g1' },
	{ type: 'knight', side: 'black', color: BLACK, pos: 'b8' },
	{ type: 'knight', side: 'black', color: BLACK, pos: 'g8' },
	{ type: 'bishop', side: 'white', color: WHITE, pos: 'c1' },
	{ type: 'bishop', side: 'white', color: WHITE, pos: 'f1' },
	{ type: 'bishop', side: 'black', color: BLACK, pos: 'c8' },
	{ type: 'bishop', side: 'black', color: BLACK, pos: 'f8' },
	{ type: 'queen', side: 'white', color: WHITE, pos: 'd1' },
	{ type: 'queen', side: 'black', color: BLACK, pos: 'd8' },
	{ type: 'king', side: 'white', color: WHITE, pos: 'e1' },
	{ type: 'king', side: 'black', color: BLACK, pos: 'e8' }
]
