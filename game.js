// Graphics
var surface = document.getElementById('surface');
var context = surface.getContext('2d');

// Color
function color_interpolation(c1, c2, interpolation)
{
	interpolation = Math.max(
		0.0,
		Math.min(
			1.0,
			interpolation
		)
	);
	
	return '#' + dec2hexString(Math.floor((c1[0] + (c2[0] - c1[0]) * interpolation), 10)) +
	dec2hexString(Math.floor(c1[1] + (c2[1] - c1[1]) * interpolation)) +
	dec2hexString(Math.floor(c1[2] + (c2[2] - c1[2]) * interpolation))
}

// Textures
var tex_path = [];
var tex = [];

function loadTextures()
{
	tex_path['PlayerBullet1'] = 'img/Bullet1.png';
	
	tex_path['star0'] = 'img/star0.png';
	tex_path['star1'] = 'img/star1.png';
	tex_path['star2'] = 'img/star2.png';
	tex_path['star3'] = 'img/star3.png';
	
	tex_path['cat0'] = 'img/cat0.png';
	tex_path['cat1'] = 'img/cat1.png';
	tex_path['cat2'] = 'img/cat2.png';
	tex_path['cat3'] = 'img/cat3.png';
	tex_path['cat4'] = 'img/cat4.png';
	tex_path['cat5'] = 'img/cat5.png';
	
	tex_path['cursor'] = 'img/cursor.png';
	
	tex_path['bot0'] = 'img/bot0.png';
	tex_path['bot1'] = 'img/bot1.png';
	tex_path['bot2'] = 'img/bot2.png';
	tex_path['bot3'] = 'img/bot3.png';
	tex_path['bot4'] = 'img/bot4.png';
	tex_path['bot5'] = 'img/bot5.png';
	tex_path['bot6'] = 'img/bot6.png';
	
	tex_path['bot2r0'] = 'img/bot2r0.png';
	tex_path['bot2r1'] = 'img/bot2r1.png';
	tex_path['bot2r2'] = 'img/bot2r2.png';
	tex_path['bot2r3'] = 'img/bot2r3.png';
	tex_path['bot2r4'] = 'img/bot2r4.png';
	tex_path['bot2r5'] = 'img/bot2r5.png';
	
	tex_path['bullet1d0'] = 'img/bullet1d0.png';
	tex_path['bullet1d1'] = 'img/bullet1d1.png';
	tex_path['bullet1d2'] = 'img/bullet1d2.png';
	tex_path['bullet1d3'] = 'img/bullet1d3.png';
	
	Object.keys(tex_path).forEach(
		(item) =>
		{
			tex[item] = new Image();
			tex[item].src = tex_path[item];
		}
	);
}

var asp = 1;
var yoffset = 0;
var xoffset = 0;
function setScreen()
{
	asp = innerHeight / surface.height;
	var vw = surface.width * asp;
	var vh = surface.height * asp;
	xoffset = (innerWidth - vw) * 0.5;
	
	if (vw > innerWidth)
	{
		asp = innerWidth / surface.width;
		var vw = surface.width * asp;
		var vh = surface.height * asp;
		
		xoffset = 0;
		yoffset = (innerHeight - vh) * 0.5;
	}
	
	surface.style.width = vw + 'px';
	surface.style.height = vh + 'py';
	
	surface.style.top = yoffset;
	surface.style.left = xoffset;
	surface.style.position = 'fixed';
}


// Utils
function irandom(val)
{
	return Math.floor(Math.random() * val);
}

function shuffle(array)
{
	for (var i = array.length - 1; i > 0; i --)
	{
		var j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}

// WITHOUT #!!
function hex2arr(src)
{
	var r = parseInt(
		src.slice(0, 2).toString(16),
		16
	);
	var g = parseInt(
		src.slice(2, 4).toString(16),
		16
	);
	var b = parseInt(
		src.slice(4, 6).toString(16),
		16
	);
	
	return [r, g, b]
}

function dec2hexString(dec)
{
   return (dec+0x100).toString(16).substr(-2).toUpperCase();
}

function choose(values)
{
	shuffle(values);
	return values[0];
}

function distance(x1, y1, x2, y2)
{
	return Math.sqrt(
		(x1 - x2) * (x1 - x2) +
		(y1 - y2) * (y1 - y2)
	);
}


// Game
var DEBUG = 0;

// Player
function CreatePlayer()
{
	this.x = surface.width * 0.5;
	this.y = surface.height - 64;
	this.half_width = 32;
	this.half_height = 32;
	this.anims = [
		'cat0',
		'cat1',
		'cat2',
		'cat3',
		'cat4',
		'cat5'
	];
	this.anim = 0;
	this.anim_speed = 0.25;
	this.anim_max = 6;
	this.texture = 'cat0';
	this.reload_max = 12;
	this.reload = 0;
	this.bullet_spread = Math.PI * 0.01;
	
	
	this.upd = () =>
	{
		// Shooting
		if (mouse_check)
		{
			if (this.reload == 0)
			{
				this.reload = this.reload_max;
				
				bullets.push(
					new PlayerBullet(
						this.x,
						this.y - this.half_height,
						4,
						Math.PI * 0.5 + Math.random() * this.bullet_spread * choose([-1, 1])
					)
				);
			}
		}
		
		this.reload = Math.max(0, this.reload - 1);
		
		// Moving
		this.x += (
			mouse_x - this.x
		) * 0.15;
		
		this.x = Math.max(
			this.half_width,
			Math.min(
				surface.width - this.half_width,
				this.x
			)
		);
		
		// Animation
		this.anim += this.anim_speed;
		if (this.anim >= this.anim_max)
		{
			this.anim = 0;
		}
		this.texture = this.anims[Math.floor(this.anim)];
	};
	
	this.draw = () =>
	{
		context.save();
		context.translate(
			this.x,
			this.y
		)
		context.drawImage(
			tex[this.texture],
			-this.half_width,
			-this.half_height
		);
		context.restore();
	};
};
var player = new CreatePlayer();

// Input
var mouse_x = 0;
var mouse_y = 0;

var mouse_check = 0;

addEventListener(
	'mousemove',
	(e) =>
	{
		mouse_x = (e.clientX - xoffset) / asp;
		mouse_y = (e.clientY - yoffset) / asp;
	}
);

addEventListener(
	'mousedown',
	(e) =>
	{
		if (e.which == 1)
		{
			mouse_check = 1;
		}
	}
);

addEventListener(
	'mouseup',
	(e) =>
	{
		if (e.which == 1)
		{
			mouse_check = 0;
		}
	}
);

addEventListener(
	'touchmove',
	function (e)
	{
		mouse_x = (e.changedTouches[0].clientX - xoffset) / asp;
		mouse_y = (e.changedTouches[0].clientY - yoffset) / asp;
	}
)

addEventListener(
	'touchstart',
	function (e)
	{
		mouse_check = 1
		
		mouse_x = (e.changedTouches[0].clientX - xoffset) / asp;
		mouse_y = (e.changedTouches[0].clientY - yoffset) / asp;
	}
)

addEventListener(
	'touchend',
	function (e)
	{
		mouse_check = 0
	}
)

// Background
var back_time_max = 15;
var back_time = back_time_max;
var back_gradient = context.createLinearGradient(
	0,
	0,
	0,
	surface.height
);
back_gradient.addColorStop(0, '#000000');
back_gradient.addColorStop(1, '#48084E');
var back_objects = [];

function starCreate()
{
	var stars = 10 + irandom(10);
	
	for (var i = 0; i < stars; i ++)
	{
		back_objects.push(
			new BackStar(
				[
					'star0'
				],
				 2
			)
		);
		
		back_objects[i].y = irandom(surface.height);
	}
}


// Enemies
var enemies = [];

function Spawner()
{
	this.bot_spawn_max = 120;
	this.bot_spawn = irandom(this.bot_spawn_max);
	
	this.ram_max = 300;
	this.ram = irandom(this.ram_max);
	
	this.upd = () =>
	{
		// Bot
		if (this.bot_spawn > 0)
		{
			this.bot_spawn --;
		}
		else
		{
			this.bot_spawn = this.bot_spawn_max;
			
			enemies.push(
				new RamBot(
					16 + irandom(surface.width - 32),
					-32
					//16 + irandom(surface.width - 32)
				)
			);
		}
		
		// RamBot2
		if (this.ram > 0)
		{
			this.ram --;
		}
		else
		{
			this.ram = this.ram_max;
			
			enemies.push(
				new RamBot2(
					48 + irandom(surface.width - 96),
					-32
				)
			);
		}
	};
}
var spawn = new Spawner();

function RamBot(x, y)
{
	this.x = x;
	this.y = y;
	
	this.hp_max = 2;
	this.hp = this.hp_max;
	
	this.speed = 2;
	this.angle = -Math.PI * 0.5;
	
	this.vecx = Math.cos(this.angle) * this.speed;
	this.vecy = -Math.sin(this.angle) * this.speed;
	
	this.half_width = 32;
	this.half_height = 32;
	
	this.radius = 30;
	
	this.texture = 'bot0';
	
	this.anim = 0;
	this.anim_speed = 0.25;
	this.anim_max = 7;
	this.anims = [
		'bot0',
		'bot1',
		'bot2',
		'bot3',
		'bot4',
		'bot5',
		'bot6'
	];
	
	
	this.upd = () =>
	{
		this.x += this.vecx;
		this.y += this.vecy;
		
		this.vecx = Math.cos(this.angle) * this.speed;
		this.vecy = -Math.sin(this.angle) * this.speed;
		
		this.speed += 0.03;
		
		this.anim += this.anim_speed;
		if (this.anim >= this.anim_max)
		{
			this.anim = 0;
		}
		
		this.texture = this.anims[Math.floor(this.anim)];
		
		if (this.y > surface.height + 32)
		{
			return 1;
		}
		
		if (this.hp <= 0)
		{
			return 1;
		}
		
		return 0;
	};
	
	this.draw = () =>
	{
		context.save();
		context.translate(
			this.x,
			this.y
		);
		context.drawImage(
			tex[this.texture],
			-this.half_width,
			-this.half_height
		);
		
		if (DEBUG)
		{
			context.strokeStyle = '#FF0000';
			
			context.beginPath();
			context.arc(
				0,
				0,
				this.radius,
				0,
				Math.PI * 2
			);
			context.stroke();
		}
		
		context.restore();
	};
}

function RamBot2(x, y)
{
	this.x = x;
	this.y = y;
	
	this.xstart = x;
	
	this.time = Math.random();
	
	this.hp_max = 4;
	this.hp = this.hp_max;
	
	this.speed = 1;
	this.angle = -Math.PI * 0.5;
	
	this.vecx = 0;
	this.vecy = -Math.sin(this.angle) * this.speed;
	
	this.half_width = 32;
	this.half_height = 32;
	
	this.radius = 30;
	
	this.texture = 'bot2r0';
	
	this.anim = 0;
	this.anim_speed = 0.25;
	this.anim_max = 6;
	this.anims = [
		'bot2r0',
		'bot2r1',
		'bot2r2',
		'bot2r3',
		'bot2r4',
		'bot2r5'
	];
	
	
	this.upd = () =>
	{
		this.y += this.vecy;
		
		this.time += 0.05;
		
		this.x = this.xstart + Math.sin(this.time) * 64;
		
		this.vecx = Math.cos(this.angle) * this.speed;
		this.vecy = -Math.sin(this.angle) * this.speed;
		
		this.speed += 0.02;
		
		this.anim += this.anim_speed;
		if (this.anim >= this.anim_max)
		{
			this.anim = 0;
		}
		
		this.texture = this.anims[Math.floor(this.anim)];
		
		if (this.y > surface.height + 32)
		{
			return 1;
		}
		
		if (this.hp <= 0)
		{
			return 1;
		}
		
		return 0;
	};
	
	this.draw = () =>
	{
		context.save();
		context.translate(
			this.x,
			this.y
		);
		context.drawImage(
			tex[this.texture],
			-this.half_width,
			-this.half_height
		);
		
		if (DEBUG)
		{
			context.strokeStyle = '#FF0000';
			
			context.beginPath();
			context.arc(
				0,
				0,
				this.radius,
				0,
				Math.PI * 2
			);
			context.stroke();
		}
		
		context.restore();
	};
}

// Bullets
var bullets = [];

function PlayerBullet(x, y, speed, angle)
{
	this.x = x;
	this.y = y;
	this.speed = speed;
	this.angle = angle;
	this.vecx = Math.cos(angle) * speed;
	this.vecy = -Math.sin(angle) * speed;
	
	this.side = 'player';
	
	this.texture = 'PlayerBullet1';
	
	this.half_width = 11;
	this.half_height = 6;
	
	this.radius = 12;
	
	
	this.upd = () =>
	{
		this.x += this.vecx * this.speed;
		this.y += this.vecy * this.speed;
		
		var resul = 0;
		
		if (
			((this.x - this.half_width) < -32) ||
			((this.y - this.half_height) < -32) ||
			((this.x + this.half_width) > surface.width + 32) ||
			((this.y + this.half_height) > surface.height + 32)
		)
		{
			resul = 1;
		}
		
		if (this.side == 'player')
		{
			enemies.forEach(
				(enemy) =>
				{
					if (distance(this.x, this.y, enemy.x, enemy.y) < this.radius + enemy.radius)
					{
						enemy.hp --;
						resul = 1;
					}
				}
			)
		}
		
		if (resul == 1)
		{
			bullets.splice(
				0,
				0,
				new Bullet1Destroy(
					this.x,
					this.y
				)
			)
		}
		
		return resul;
	};
	
	this.draw = () =>
	{
		context.save();
		context.translate(
			this.x,
			this.y
		);
		context.rotate(-this.angle);
		context.drawImage(
			tex[this.texture],
			-this.half_width,
			-this.half_height
		);
		
		if (DEBUG)
		{
			context.strokeStyle = '#FF0000';
			
			context.beginPath();
			context.arc(
				0,
				0,
				this.radius,
				0,
				Math.PI * 2
			);
			context.stroke();
		}
		
		context.restore();
	};
}

function Bullet1Destroy(x, y)
{
	this.x = x;
	this.y = y;
	
	this.angle = Math.random() * Math.PI * 2.0;
	
	this.half_width = 32;
	this.half_height = 32;
	
	this.anim = 0;
	this.anim_max = 4;
	this.anim_speed = 0.25;
	
	this.texture = 'bullet1d0';
	
	this.anims = [
		'bullet1d0',
		'bullet1d1',
		'bullet1d2',
		'bullet1d3'
	];
	
	
	this.upd = () =>
	{
		this.anim += this.anim_speed;
		if (this.anim >= this.anim_max)
		{
			this.anim = 0;
			return 1;
		}
		
		this.texture = this.anims[Math.floor(this.anim)];
		
		return 0;
	};
	
	this.draw = () =>
	{
		context.save();
		
		context.translate(
			this.x,
			this.y
		);
		
		context.rotate(this.angle);
		
		context.drawImage(
			tex[this.texture],
			-this.half_width,
			-this.half_height
		);
		
		context.restore();
	};
}

function BackStar(star, speed)
{
	shuffle(star);
	this.img = star[0];
	
	this.half_width = 8;
	this.half_height = 8;
	
	this.x = 16 + irandom(surface.width - 16);
	this.y = -this.half_height;
	
	this.speed = speed + irandom(100) / 100 * Math.floor(speed * 0.2);
	
	this.angle = -Math.PI * 0.5 + (irandom(10) / 100) * choose([-1, 1]);
	
	this.vecx = Math.cos(this.angle) * this.speed;
	this.vecy = -Math.sin(this.angle) * this.speed;
	
	
	this.upd = () =>
	{
		this.x += this.vecx;
		this.y += this.vecy;
		
		if (this.y > surface.height + this.half_height)
		{
			return 1;
		}
		
		return 0;
	};
	
	this.draw = () =>
	{
		context.save();
		context.translate(
			this.x,
			this.y
		);
		context.drawImage(
			tex[this.img],
			-this.half_width,
			-this.half_height
		);
		context.restore();
	};
}


// Update
function update()
{
	// Player
	player.upd();
	
	// Objects
	spawn.upd();
	
	enemies.forEach(
		(obj) =>
		{
			switch (obj.upd())
			{
				case 1:
				{
					var num = enemies.indexOf(obj);
					delete enemies[num];
					enemies.splice(num, 1);
				}
				break;
			}
		}
	)
	
	bullets.forEach(
		(obj) =>
		{
			switch (obj.upd())
			{
				case 1:
				{
					var num = bullets.indexOf(obj);
					delete bullets[num];
					bullets.splice(num, 1);
				}
				break;
			}
		}
	)
	
	// Background
	back_objects.forEach(
		(obj) =>
		{
			switch (obj.upd())
			{
				case 1:
				{
					var num = back_objects.indexOf(obj);
					delete back_objects[num];
					back_objects.splice(num, 1);
				}
				break;
			}
		}
	)
	
	// Star 
	back_time --;
	if (back_time <= 0)
	{
		var temp = Math.floor(back_time_max * 0.5);
		
		switch (irandom(2))
		{
			case 0:
			{
				back_time = temp + irandom(temp);
				
				back_objects.push(
					new BackStar(
						[
							'star0'
						],
						2
					)
				);
			}
			break;
			
			
			case 1:
			{
				back_time = temp + irandom(temp);
				
				back_objects.push(
					new BackStar(
						[
							'star1',
							'star2',
							'star3'
						],
						4
					)
				);
			}
			break;
		}
	}
}


// Drawing
function paint()
{
	update();
	
	context.fillStyle = back_gradient;
	context.fillRect(
		0,
		0,
		surface.width,
		surface.height
	);
	
	back_objects.forEach(
		(obj) =>
		{
			obj.draw();
		}
	)
	
	enemies.forEach(
		(obj) =>
		{
			obj.draw();
		}
	)
	
	bullets.forEach(
		(obj) =>
		{
			obj.draw();
		}
	)
	
	player.draw();
	
	context.save();
	context.translate(
		mouse_x,
		mouse_y
	);
	context.drawImage(
		tex['cursor'],
		-8,
		-8
	);
	context.restore();
	
	requestAnimationFrame(paint);
}


// Start
loadTextures();
starCreate();
setScreen();

requestAnimationFrame(paint);