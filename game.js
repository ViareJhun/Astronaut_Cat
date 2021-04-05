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
	
	tex_path['button1test'] = 'img/button1test.png';
	tex_path['button2test'] = 'img/button2test.png';
	
	tex_path['ontest'] = 'img/ontest.png';
	tex_path['offtest'] = 'img/offtest.png';
	
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
	
	tex_path['shooter0'] = 'img/shooter0.png';
	tex_path['shooter1'] = 'img/shooter1.png';
	tex_path['shooter2'] = 'img/shooter2.png';
	tex_path['shooter3'] = 'img/shooter3.png';
	tex_path['shooter4'] = 'img/shooter4.png';
	tex_path['shooter5'] = 'img/shooter5.png';
	
	tex_path['ebullet1'] = 'img/ebullet1.png';
	
	tex_path['bullet1d0'] = 'img/bullet1d0.png';
	tex_path['bullet1d1'] = 'img/bullet1d1.png';
	tex_path['bullet1d2'] = 'img/bullet1d2.png';
	tex_path['bullet1d3'] = 'img/bullet1d3.png';
	
	tex_path['bmenu_main'] = 'img/bmenu_main.png';
	tex_path['bmenu_glow'] = 'img/bmenu_glow.png';
	tex_path['bmenu_sub'] = 'img/bmenu_sub.png';
	tex_path['bmenu_back'] = 'img/bmenu_back.png';
	tex_path['level_label'] = 'img/level_label.png';
	tex_path['level_bar'] = 'img/level_bar.png';
	
	tex_path['back'] = 'img/back.png';
	tex_path['bstart'] = 'img/bstart.png';
	
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

// TEST
function testButtons()
{
	if (mouse_x > 0 && mouse_y > 0 && mouse_x < 33 && mouse_y < 33)
	{
		spawn.level = 0;
		spawn.progress = 0;
		spawn.progress_speed = spawn.speeds[0];
		
		player.bullet_spread = Math.PI * 0.01;
		player.bullets = 1;
		player.reload_max = 12;
	}
	else if (mouse_x > 32 && mouse_y > 0 && mouse_x < 65 && mouse_y < 33)
	{
		spawn.level = 10;
		spawn.progress = 0;
		spawn.progress_speed = spawn.speeds[9];
		
		player.bullet_spread = Math.PI * 0.07;
		player.bullets = 3;
		player.reload_max = 8;
	}
	else if (mouse_x > 64 && mouse_y > 0 && mouse_x < 97 && mouse_y < 33)
	{
		back_show = 1;
	}
	else if (mouse_x > 96 && mouse_y > 0 && mouse_x < 129 && mouse_y < 33)
	{
		back_show = 0;
		back_objects = [];
	}
}


// Game
var DEBUG = 0;
var PAUSE = 0;

var game_state = 'menu';

function clearObjects()
{
	clearEnemies();
	clearBullets();
	player = null;
	spawn = null;
}

function startGame()
{
	player = new CreatePlayer();
	spawn = new Spawner();
	game_state = 'game';
}

function gotoMenu()
{
	clearObjects();
	game_state = 'menu';
	start_game = 0;
}

function mouseUp()
{
	switch (game_state)
	{
		case 'menu':
		{
			menuMouseUp();
		}
		break
	}
}

var cellSize = 40;
var cellWidth = surface.width / cellSize;
var cellHeihght = surface.height / cellSize;

var matrix = [];

for (var x = 0; x < cellWidth; x ++)
{
	var temp = [];
	for (var y = 0; y < cellHeihght; y ++)
	{
		temp.push(null);
	}
	matrix.push(temp);
}

function matrixNull()
{
	for (var x = 0; x < cellWidth; x ++)
	{
		for (var y = 0; y < cellHeihght; y ++)
		{
			matrix[x][y] = null;
		}
	}
}

function matrixObj()
{
	enemies.forEach(
		(enemy) =>
		{
			var ax = Math.floor(enemy.x / cellSize);
			var ay = Math.floor(enemy.y / cellSize);
			
			if (
				ax > -1 &&
				ay > -1 &&
				ax < cellWidth &&
				ay < cellHeihght
			)
			{
				if (matrix[ax][ay] == null)
				{
					matrix[ax][ay] = [];
				}
				matrix[ax][ay].push(
					enemy
				);
			}
		}
	);
	
	bullets.forEach(
		(bullet) =>
		{
			var ax = Math.floor(bullet.x / cellSize);
			var ay = Math.floor(bullet.y / cellSize);
			
			if (
				ax > -1 &&
				ay > -1 &&
				ax < cellWidth &&
				ay < cellHeihght
			)
			{
				if (matrix[ax][ay] == null)
				{
					matrix[ax][ay] = [];
				}
				matrix[ax][ay].push(
					bullet
				);
			}
		}
	);
}

// Menu
var bstart_s = 1.0;
var bstart_scale = 1.0;
var start_game = 0;

function menuMouseUp()
{
	if (
		distance(
			mouse_x,
			mouse_y,
			surface.width * 0.5,
			surface.height * 0.5
		) < 128
	)
	{
		start_game = 1;
	}
}

// Timers
var T1 = Math.random() * Math.PI * 2.0;
var T2 = Math.random() * Math.PI * 2.0;

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
	this.bullets = 1;
	this.radius = 30;
	
	
	this.upd = () =>
	{
		// Shooting
		if (!PAUSE)
		{
			if (mouse_check)
			{
				if (this.reload == 0)
				{
					this.reload = this.reload_max;
					
					for (var i = 0; i < this.bullets; i ++)
					{
						bullets.push(
							new PlayerBullet(
								this.x,
								this.y - this.half_height,
								3.5,
								Math.PI * 0.5 + Math.random() * this.bullet_spread * choose([-1, 1])
							)
						);
					};
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
		};
		
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
var player = null;

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
			
			// TEST
			// testButtons();
			
			mouseUp();
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
		
		// TEST
		// testButtons();
		
		mouseUp();
	}
)

// Background
var back_time_max = 15;
var back_time = back_time_max;
var back_objects = [];
var back_show = 1;

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

function clearEnemies()
{
	enemies = [];
}

function Spawner()
{
	this.level = 0;
	
	this.progress = 0;
	this.progress_max = 100;
	
	this.progress_speed = 0.05;
	
	this.speeds = [
		0.060,
		0.050,
		0.040,
		0.035,
		0.030,
		0.026,
		0.022,
		0.018,
		0.016,
		0.015
	];
	
	// Bot
	this.bot_spawn_max = 120;
	this.bot_spawn = irandom(this.bot_spawn_max);
	
	this.bot_diff = 1.0;
	
	this.bots_diffs = [
		1.0,
		0.7,
		0.7,
		0.7,
		0.5,
		0.4,
		0.3,
		0.3,
		0.2,
		0.15
	];
	
	// Ram
	this.ram_max = 300;
	this.ram = irandom(this.ram_max);
	
	this.ram_diff_start = 0.5;
	this.ram_diff = 1.0;
	
	this.ram_diffs = [
		1.0,
		1.0,
		1.0,
		1.0,
		1.0,
		0.8,
		0.5,
		0.3,
		0.2,
		0.1
	];
	
	// Shooter
	this.sh_max = 200;
	this.sh = irandom(this.sh_max);
	
	this.sh_diff = 1.0;
	
	this.sh_diffs = [
		1.0,
		1.0,
		1.0,
		1.0,
		1.0,
		0.9,
		0.8,
		0.7,
		0.6,
		0.5
	];
	
	
	this.upd = () =>
	{
		if (!PAUSE)
		{
			// Progress
			this.progress += this.progress_speed;
			if (this.progress >= this.progress_max)
			{
				this.progress = 0;
				this.level += 1;
				this.progress_speed = this.speeds[Math.min(9, this.level)];
			}
			this.bot_diff = this.bots_diffs[Math.min(9, this.level)];
			this.ram_diff = this.ram_diffs[Math.min(9, this.level)];
			
			// Bot
			if (this.bot_spawn > 0)
			{
				this.bot_spawn --;
			}
			else
			{
				this.bot_spawn = this.bot_spawn_max * this.bot_diff;
				
				enemies.push(
					new RamBot(
						16 + irandom(surface.width - 32),
						-32
						//16 + irandom(surface.width - 32)
					)
				);
			};
			
			// RamBot2
			if (this.level >= 1)
			{
				if (this.ram > 0)
				{
					this.ram --;
				}
				else
				{
					this.ram = this.ram_max * this.ram_diff;
					
					enemies.push(
						new RamBot2(
							48 + irandom(surface.width - 96),
							-32
						)
					);
				};
			};
			
			// Shooter
			if (this.level >= 0)
			{
				if (this.sh > 0)
				{
					this.sh --;
				}
				else
				{
					this.sh = this.sh_max * this.sh_diff;
					
					enemies.push(
						new Shooter(
							48 + irandom(surface.width - 96),
							-32
						)
					);
				};
			};
		};
	};
	
	this.draw = () =>
	{	
		// Level
		T1 += 0.05;
		context.font = 'bold 25px "Press Start 2P"';
		context.textAlign = 'left';
		context.textBaseline = 'top';
		context.fillStyle = '#C0E3F8';
		
		context.globalAlpha = 0.4;
		context.drawImage(
			tex['level_label'],
			0,
			0
		);
		context.globalAlpha = 1.0;
		
		var txt = 'Уровень:' + spawn.level;
		
		context.globalAlpha = Math.abs(
			Math.sin(T1) * 0.8
		);
		context.fillText(
			txt,
			12 + 2,
			18
		);
		context.fillText(
			txt,
			12 - 2,
			18
		);
		context.globalAlpha = 1.0;
		
		context.fillText(
			txt,
			12,
			18
		);
		context.globalAlpha = 0.5;
		context.fillText(
			txt,
			12 + Math.cos(T1 * 1.35) * 4,
			18 - Math.sin(T1 * 1.35) * 4
		);
		
		// Level Bar
		context.globalAlpha = 0.4;
		var w = 193;
		var h = 14;
		var bx = 0;
		var by = 17;
		
		context.fillStyle = '#00FFFF';
		context.fillRect(
			bx,
			48 + by,
			w * this.progress / this.progress_max,
			h
		);
		
		context.drawImage(
			tex['level_bar'],
			0,
			48
		);
		
		// Меню
		txt = 'меню';
		context.drawImage(
			tex['bmenu_back'],
			surface.width - 128,
			0
		);
		var x = surface.width - 64;
		context.textAlign = 'center';
		context.fillStyle = '#C0E3F8';
		context.globalAlpha = Math.abs(
			Math.sin(T1) * 0.8
		);
		context.fillText(
			txt,
			x + 2,
			18
		);
		context.fillText(
			txt,
			x - 2,
			18
		);
		context.globalAlpha = 1.0;
		context.fillText(
			txt,
			x,
			18
		);
		context.globalAlpha = 0.5;
		context.fillText(
			txt,
			x + Math.cos(T1 * 1.35) * 4,
			18 - Math.sin(T1 * 1.35) * 4
		);
		context.globalAlpha = 1.0;
	};
}
var spawn = null;

function RamBot(x, y)
{
	this.x = x;
	this.y = y;
	this.type = 'enemy';
	
	this.hp_max = 1;
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
		if (!PAUSE)
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
		}
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
	this.type = 'enemy';
	
	this.xstart = x;
	
	this.time = Math.random();
	
	this.hp_max = 3;
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
		if (!PAUSE)
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
		}
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

function Shooter(x, y)
{
	this.x = x;
	this.y = y;
	this.type = 'enemy';
	
	this.time = Math.random();
	
	this.hp_max = 3;
	this.hp = this.hp_max;
	
	this.speed = 1;
	this.angle = -Math.PI * 0.5;
	
	this.vecx = 0;
	this.vecy = -Math.sin(this.angle) * this.speed;
	
	this.half_width = 32;
	this.half_height = 32;
	
	this.radius = 30;
	
	this.texture = 'shooter0';
	
	this.anim = 0;
	this.anim_speed = 0.25;
	this.anim_max = 6;
	this.anims = [
		'shooter0',
		'shooter1',
		'shooter2',
		'shooter3',
		'shooter4',
		'shooter5'
	];
	
	this.shoot_time_max = 60;
	this.shoot_time = this.shoot_time_max;
	this.shoot_state = 1;
	
	
	this.upd = () =>
	{
		if (!PAUSE)
		{
			// Shooting
			if (this.shoot_time > 0)
			{
				this.shoot_time --;
			}
			else
			{
				this.shoot_time = this.shoot_time_max;
				
				if (this.shoot_state === 1)
				{
					this.shoot_state = 2;
					
					bullets.push(
						new EnemyBullet(
							this.x,
							this.y,
							3,
							-Math.PI * 0.5
						)
					);
				}
				else
				{
					this.shoot_state = 1;
					
					bullets.push(
						new EnemyBullet(
							this.x,
							this.y,
							3,
							-Math.PI * 0.5 + 0.2
						)
					);
					
					bullets.push(
						new EnemyBullet(
							this.x,
							this.y,
							3,
							-Math.PI * 0.5 - 0.2
						)
					);
				}
			}
			
			// Move
			this.y += this.vecy;
			
			this.time += 0.05;
			
			this.vecx = Math.cos(this.angle) * this.speed;
			this.vecy = -Math.sin(this.angle) * this.speed;
			
			this.speed += 0.005;
			
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
		}
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

function clearBullets()
{
	bullets = [];
}

function PlayerBullet(x, y, speed, angle)
{
	this.x = x;
	this.y = y;
	this.type = 'bullet';
	this.speed = speed;
	this.angle = angle;
	this.vecx = Math.cos(angle) * speed;
	this.vecy = -Math.sin(angle) * speed;
	
	this.side = 'player';
	
	this.texture = 'PlayerBullet1';
	
	this.half_width = 11;
	this.half_height = 6;
	
	this.radius = 12;
	
	
	this.checkCollision = function (t, l)
	{
		if (
			t > -1 &&
			l > -1 &&
			t < cellWidth &&
			l < cellHeihght
		)
		{
			var arr = matrix[t, l];
			
			if (arr != null)
			{
				/*
				arr.forEach(
					(item) =>
					{
						if (item != null)
						{
							if (item.type == 'enemy')
							{
								/*
								if (
									distance(
										this.x,
										this.y,
										item.x,
										item.y
									) <= this.radius + item.radius
								)
								
								if (1)
								{
									return item;
								}
							}
						}
					}
				)
				*/
				
				for (var i = 0; i < arr.length; i ++)
				{
					if (arr[i] != null)
					{
						alert(arr[i])
						if (arr[i].type == 'enemy')
						{
							return arr[i];
						}
					}
				}
			}
		}
		
		return null;
	}
	
	this.upd = () =>
	{
		if (!PAUSE)
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
			
			/*
			var ax = Math.floor(this.x / cellSize);
			var ay = Math.floor(this.y / cellSize);
			
			var checker = null;
			
			checker = this.checkCollision(ax, ay);
			if (checker != null)
			{
				checker.hp --;
				resul = 1;
			}
			checker = this.checkCollision(ax + 1, ay);
			if (checker != null)
			{
				checker.hp --;
				resul = 1;
			}
			
			checker = this.checkCollision(ax - 1, ay);
			if (checker != null)
			{
				checker.hp --;
				resul = 1;
			}
			
			checker = this.checkCollision(ax, ay + 1);
			if (checker != null)
			{
				checker.hp --;
				resul = 1;
			}
			
			checker = this.checkCollision(ax, ay - 1);
			if (checker != null)
			{
				checker.hp --;
				resul = 1;
			}
			*/
			
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
		}
	}
	
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
	}
}

function Bullet1Destroy(x, y)
{
	this.x = x;
	this.y = y;
	this.type = 'bullet';
	
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
	}
	
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
	}
}

function EnemyBullet(x, y, speed, angle)
{
	this.x = x;
	this.y = y;
	this.type = 'bullet';
	this.speed = speed;
	this.angle = angle;
	this.vecx = Math.cos(angle) * speed;
	this.vecy = -Math.sin(angle) * speed;
	
	this.side = 'enemy';
	
	this.texture = 'ebullet1';
	
	this.half_width = 16;
	this.half_height = 9;
	
	this.radius = 14;
	
	
	this.upd = () =>
	{
		if (!PAUSE)
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
			
			if (
				distance(
					this.x,
					this.y,
					player.x,
					player.y
				) <= player.radius + this.radius
			)
			{
				resul = 1;
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
		}
	}
	
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
	}
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
	}
	
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
	}
}


// Update
function update()
{
	switch (game_state)
	{
		case 'game':
		{
			//matrixNull();
			//matrixObj();
			
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
		}
		break
		
		case 'menu':
		{
			bstart_scale += (
				bstart_s - bstart_scale
			) * 0.2;
			
			bstart_s = 1.0;
			if (mouse_check)
			{
				if (
					distance(
						mouse_x,
						mouse_y,
						surface.width * 0.5,
						surface.height * 0.5
					) < 128
				)
				{
					bstart_s = 0.75;
				}
			}
			
			if (bstart_scale > 0.95)
			{
				if (start_game)
				{
					startGame();
				}
			}
		}
		break
	}
	
	// Background
	if (back_show)
	{
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
}


// Drawing
function paint()
{
	T2 += 0.1;
	
	update();
	context.drawImage(
		tex['back'],
		0,
		0
	);
	
	if (back_show)
	{
		back_objects.forEach(
			(obj) =>
			{
				obj.draw();
			}
		)
	}
	
	switch (game_state)
	{
		case 'game':
			{
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
			
			// GUI
			spawn.draw();
		}
		break
		
		case 'menu':
		{
			context.globalAlpha = 0.3;
			context.save();
			context.translate(
				surface.width * 0.5,
				surface.height * 0.5
			);
			context.scale(
				bstart_scale,
				bstart_scale
			);
			context.drawImage(
				tex['bstart'],
				-128,
				-128
			);
			context.restore();
			context.globalAlpha = 1.0;
		}
		break
	}
	
	requestAnimationFrame(paint);
}


// VK
function vkInit()
{
	vkBridge.send('VKWebAppInit');
	
	vkBridge.send("VKWebAppShowNativeAds", {ad_format:"preloader"})
	.then(data => console.log(data.result))
	.catch(error => console.log(error));
}


// Start
vkInit();

loadTextures();
starCreate();
setScreen();

gotoMenu();

requestAnimationFrame(paint);