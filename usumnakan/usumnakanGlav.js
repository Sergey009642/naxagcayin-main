const particleList = [];
const columns = [];
const w = 12;
const h = w * 2;
let lastUpdateAt = -1000;

class Particle {
	state = 'good';
	createdAt = performance.now();
	// lastUpdateAt = performance.now() + floor(random(100)) * 50;
	// lastUpdateAt = -1000;
	pos = new Vector();
	vel = new Vector();
	constructor(isClone = false) {
		this.isClone = isClone;
		this.pickChar();
		if(!this.isClone) {
			this.reset();
		}
	}
	reset() {
		const now = performance.now();
		const xCount = ceil(width / w);
		const validColumns = [];
		for(let i = 0; i < xCount; i++) {
			const n = columns[i];
			if(!n || now - n > 2500) {
				validColumns.push(i);
			}
		}
		if(validColumns.length === 0) {
			validColumns.push(0);
		}
		const columnIndex = random(validColumns);
		columns[columnIndex] = now;
		const x = (columnIndex + 0.5) * w;
		this.pos = new Vector(x, -w);
		this.vel.set(0, 0);
	}
	pickChar() {
		if(this.isClone && random() < 0.9) {
			return;
		}
		const offsetGroup = random([ [ 0x30, 0x39 ], [ 0x41, 0x5A ], [ 0xFF66, 0xFF9D ] ]);
		this.offset = floor(random(offsetGroup[1] - offsetGroup[0]) + offsetGroup[0]);
		this.char = String.fromCodePoint(this.offset);
	}
	clone() {
		if(!this.isClone) {
			const p = new Particle(true);
			p.pos.set(this.pos);
			p.char = this.char;
			particleList.push(p);
		}
		else {
			this.remove();
		}
	}
	remove() {
		const index = particleList.indexOf(this);
		if(index !== -1) {
			particleList.splice(index, 1);
		}
	}
}

function setup() {
	for(let i = 0; i < 40; i++) {
		const p = new Particle(false);
		p.pos.y = random(height / 24) * 24;
		particleList.push(p);
	}
	loadWebFont('Roboto Mono:600');
}

function draw(e) {
	translate(width, 0);
	scale(-1, 1);
	font('600 24px "Roboto Mono"', '600 24px monospace');
	textBaseline('middle');
	textAlign('center');
	const mouseInteration = e - mouseDownTime < 16;
	if(mouseDown) {
		mouseDownPos.multX(-1).addX(width);
		mouseDown = false;
	}
	const shouldUpdate = lastUpdateAt + 100 < e;
	for(let i = particleList.length - 1; i >= 0; i--) {
		const p = particleList[i];
		const aliveTime = e - p.createdAt;
		if(p.isClone && aliveTime > 2500) {
			p.remove();
		}
		const style = p.isClone ? hsl(210, 100, 50, map(aliveTime, 2000, 2500, 1, 0)) : COLOR_WHITE;
		fillStyle(style);
		// ctx.shadowColor = style;
		// ctx.shadowBlur = 12;
		fillText(p.char, p.pos);
		if(shouldUpdate) {
			if(!p.isClone) {
				p.clone();
				p.pos.y += 24;
			}
			p.pickChar();
			if(p.pos.y > height) {
				p.reset();
			}
		}
		if(mouseInteration) {
			const diff = p.pos._.sub(mouseDownPos);
			const magSq = diff.magSq();
			if(magSq < 22500) {
				const mag = sqrt(magSq);
				p.vel.add(diff.setMag(ease.expo.out(map(mag, 0, 150, 1, 0)) * 8, mag));
			}
			// else if(mag < 1000) {
			// 	p.vel.add(0, 10);
			// }
		}
		p.pos.add(p.vel.mult(0.875));
	}
	if(shouldUpdate) {
		lastUpdateAt = e;
	}
	
	// ctx.shadowBlur = 0;
	// for(let i = 0; i < columns.length; i++) {
	// 	const n = columns[i];
	// 	beginPath();
	// 	rect((i + 0.5) * 12 - 3, 0, 6, height);
	// 	if(!n || e - n > 2500) {
	// 		fill(hsl(120, 100, 50));
	// 	}
	// 	else {
	// 		const o = map(e - n, 0, 2500, 1, 0.35);
	// 		fill(hsl(0, 100, 50, o));
	// 	}
	// }
}