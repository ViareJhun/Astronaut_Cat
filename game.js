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
	
	tex_path['big0'] = 'img/big0.png';
	tex_path['big1'] = 'img/big1.png';
	tex_path['big2'] = 'img/big2.png';
	tex_path['big3'] = 'img/big3.png';
	tex_path['bigmask'] = 'img/bigmask.png';
	
	tex_path['ebullet1'] = 'img/ebullet1.png';
	
	tex_path['bullet1d0'] = 'img/bullet1d0.png';
	tex_path['bullet1d1'] = 'img/bullet1d1.png';
	tex_path['bullet1d2'] = 'img/bullet1d2.png';
	tex_path['bullet1d3'] = 'img/bullet1d3.png';
	
	tex_path['bullet2d0'] = 'img/bullet2d0.png';
	tex_path['bullet2d1'] = 'img/bullet2d1.png';
	tex_path['bullet2d2'] = 'img/bullet2d2.png';
	tex_path['bullet2d3'] = 'img/bullet2d3.png';
	
	tex_path['bmenu_main'] = 'img/bmenu_main.png';
	tex_path['bmenu_glow'] = 'img/bmenu_glow.png';
	tex_path['bmenu_sub'] = 'img/bmenu_sub.png';
	tex_path['bmenu_back'] = 'img/bmenu_back.png';
	tex_path['level_label'] = 'img/level_label.png';
	tex_path['level_bar'] = 'img/level_bar.png';
	
	tex_path['back'] = 'img/back.png';
	tex_path['back2'] = 'img/back2.png';
	tex_path['back3'] = 'img/back3.png';
	tex_path['bstart'] = 'img/bstart.png';
	
	tex_path['catlogo1'] = 'img/catlogo1.png';
	tex_path['catlogo2'] = 'img/catlogo2.png';
	
	tex_path['logoname'] = 'img/logoname.png';
	
	tex_path['hpdown'] = 'img/hpdown.png';
	tex_path['hpup'] = 'img/hpup.png';
	
	tex_path['fool'] = 'img/fool.png';
	tex_path['button3'] = 'img/button3.png';
	
	tex_path['powerup'] = 'img/powerup.png';
	tex_path['bonus_hp'] = 'img/bonus_hp.png';
	tex_path['bonus_rate'] = 'img/bonus_rate.png';
	tex_path['bonus_skull'] = 'img/bonus_skull.png';
	tex_path['bonus_bullet'] = 'img/bonus_bullet.png';
	
	tex_path['particle1'] = 'img/particle1.png';
	tex_path['particle2'] = 'img/particle2.png';
	tex_path['particle3'] = 'img/particle3.png';
	tex_path['particle4'] = 'img/particle4.png';
	tex_path['particle5'] = 'img/particle5.png';
	
	tex_path['group'] = 'img/group.png';
	tex_path['share'] = 'img/share.png';
	
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

// Audio
var audioLoaded = 0;

var snd_path = [];
var snd = [];
var snd_index = [];

var music = new Audio();

function audioLoad()
{
	snd_path['lose'] = 'snd/lose.ogg';
	snd_path['bonus'] = 'snd/bonus.ogg';
	snd_path['shooting'] = 'snd/shooting.ogg';
	snd_path['enemy_hurt'] = 'snd/enemy_hurt.ogg';
	snd_path['enemy_death'] = 'snd/enemy_death.ogg';
	snd_path['enemy_shoot'] = 'snd/enemy_shoot.ogg';
	
	Object.keys(snd_path).forEach(
		(key) =>
		{
			snd[key] = [null, null, null];
			for (var i = 0; i < 6; i ++)
			{
				snd[key][i] = new Audio();
				snd[key][i].src = snd_path[key];
			}
			snd_index[key] = 0;
		}
	);
	
	Object.keys(snd).forEach(
		(item) =>
		{
			snd[item].forEach(
				(aud) =>
				{
					switch (item)
					{
						case 'shooting':
						{
							aud.volume = 0.2;
						}
						break
						case 'lose':
						{
							aud.volume = 0.5;
						}
						break
						case 'bonus':
						{
							aud.volume = 0.5;
						}
						break
						case 'enemy_hurt':
						{
							aud.volume = 0.4;
						}
						break
						case 'enemy_death':
						{
							aud.volume = 0.3;
						}
						break
						case 'enemy_shoot':
						{
							aud.volume = 0.5;
						}
						break
					}
				}
			);
		}
	);
	
	music.src = 'mus.ogg';
	music.volume = 0.2;
	//music.play();
	
	/*
	music.onload = () =>
	{
		music.play();
	}
	*/
	music.play();
	
	music.onended = () =>
	{
		music.play();
	};
}

window.addEventListener(
	'unload',
	() =>
	{
		music.stop();
	}
)

function sound_play(sound)
{
	snd[sound][snd_index[sound]].play();
	snd_index[sound] ++;
	if (snd_index[sound] > 5)
	{
		snd_index[sound] = 0;
	}
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
var testvar = 0;
var score = 0;
var score_draw = 0;
var max_score = 0;
var is_lose = 0;
var back_tex = choose(['back', 'back', 'back', 'back2', 'back3']);

var running = 0;

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
	is_lose = 0;
	score_draw = 0;
	score = 0;
}

function gotoMenu()
{
	clearObjects();
	game_state = 'menu';
	start_game = 0;
	
	back_tex = choose(['back', 'back', 'back', 'back2', 'back3']);
	
	max_score = localStorage.getItem('AsCatScore');
	if (max_score == null)
	{
		max_score = 0;
	}
	
	if (score > max_score)
	{
		max_score = score;
		localStorage.setItem('AsCatScore', max_score);
	}
}

function loosing()
{
	if (running % 2 != 0)
	{
		showAd();
	}
	clearObjects();
	
	sound_play('lose');
	
	if (score > max_score)
	{
		max_score = score;
		localStorage.setItem('AsCatScore', max_score);
	}
	
	game_state = 'lose';
	
	ship_x = -32;
	ship_time = ship_time_max;
	ship_catch = 0;
	
	l_score = 0;
	l_score_draw = 0;
	l_score_time = l_score_time_max;
	
	l_balpha = 0;
	l_bscale = 1;
	l_tomenu = 0;
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
		
		case 'game':
		{
			if (
				mouse_x > surface.width - 128 &&
				mouse_y > 32 &&
				mouse_x < surface.width &&
				mouse_y < 32 + 48
			)
			{
				gotoMenu();
			}
		}
		break
		
		case 'lose':
		{
			if (
				distance(
					mouse_x,
					mouse_y,
					l_bx,
					l_by
				) < 64 && l_balpha > 0.6
			)
			{
				l_tomenu = 1;
			}
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
			surface.height * 0.7
		) < 128
	)
	{
		start_game = 1;
	}
	
	if (
		mouse_x > surface.width * 0.5 - 160 - 64 &&
		mouse_y > surface.height * 0.9 - 64 &&
		mouse_x < surface.width * 0.5 - 160 + 64 &&
		mouse_y < surface.height * 0.9 + 64
	)
	{
		// alert('group!');
		groupVK();
	}
	
	if (
		mouse_x > surface.width * 0.5 + 160 - 64 &&
		mouse_y > surface.height * 0.9 - 64 &&
		mouse_x < surface.width * 0.5 + 160 + 64 &&
		mouse_y < surface.height * 0.9 + 64
	)
	{
		// alert('share!');
		shareVK();
	}
}

// L
var ship_time_max = 60 * 6;
var ship_time = ship_time_max;
var ship_x = -32;
var ship_catch = 0;
var l_score = 0;
var l_score_draw = 0;
var l_score_speed = 0.4;
var l_score_time_max = 60 * 3;
var l_score_time = l_score_time_max;
var l_balpha = 0;
var l_bx = surface.width * 0.5;
var l_by = surface.height * 0.75;
var l_bscale = 1;
var l_tomenu = 0;

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
	this.hp_max = 5;
	this.hp = this.hp_max;
	this.rage = 0;
	this.snd_index = 0;
	
	
	this.upd = () =>
	{
		// Shooting
		if (!PAUSE)
		{
			if (this.rage > 0)
			{
				this.rage --;
			}
			
			if (1) //(mouse_check)
			{
				if (this.reload == 0)
				{
					this.reload = this.reload_max;
					
					snd['shooting'][this.snd_index].play();
					this.snd_index ++;
					if (this.snd_index > 5)
					{
						this.snd_index = 0;
					}
					
					var N = this.bullets;
					var SP = this.bullet_spread;
					
					if (this.rage)
					{
						this.reload = 6;
						N = 4;
						if (this.bullets == N)
						{
							N = 6;
						}
						SP = Math.PI * 0.06;
					}
					
					for (var i = 0; i < N; i ++)
					{
						bullets.push(
							new PlayerBullet(
								this.x,
								this.y - this.half_height,
								3.5,
								Math.PI * 0.5 + Math.random() * SP * choose([-1, 1])
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
		
		if (this.hp <= 0)
		{
			is_lose = 1;
		}
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
	// Bonuses
	this.bonus_time_max = 60 * 15;
	this.bonus_time = this.bonus_time_max;
	
	this.bonus_text_time_max = 60 * 5;
	this.bonus_text_time = 0;
	this.bonus_text = '';
	
	this.liveBonus = 0;
	this.bonus = 'bonus_hp';
	this.bonus_x = 0;
	this.bonus_y = 0;
	this.bonus_radius = 32;
	
	this.texts = [];
	
	
	// Tutorial
	this.tut = 0;
	this.tut_alpha = 0;
	this.tut_time = 60 * 5;
	
	
	this.level = 0;
	
	this.progress = 0;
	this.progress_max = 100;
	
	this.progress_speed = 0.100;
	
	this.speeds = [
		0.100,
		0.090,
		0.070,
		0.050,
		0.035,
		0.030,
		0.026,
		0.018,
		0.016,
		0.015
	];
	
	// Bot
	this.bot_spawn_max = 90;
	this.bot_spawn = irandom(this.bot_spawn_max);
	
	this.bot_diff = 1.0;
	
	this.bots_diffs = [
		1.0,
		1.0,
		0.6,
		0.5,
		0.6,
		0.5,
		0.4,
		0.3,
		0.2,
		0.2,
		0.2,
		0.2,
		0.1
	];
	
	// Ram
	this.ram_max = 260;
	this.ram = irandom(this.ram_max);
	
	this.ram_diff_start = 0.5;
	this.ram_diff = 1.0;
	
	this.ram_diffs = [
		1.0,
		1.0,
		1.0,
		1.0,
		1.0,
		1.0,
		0.8,
		0.5,
		0.3,
		0.2,
		0.2,
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
		1.0,
		1.0,
		1.0,
		0.8,
		0.6,
		0.5,
		0.4,
		0.4,
		0.4,
		0.2,
		0.15
	];
	
	// BigBot
	this.big_max = 250;
	this.big = irandom(this.big_max);
	
	this.big_diff = 1.0;
	
	this.big_diffs = [
		1.0,
		1.0,
		1.0,
		1.0,
		1.0,
		0.9,
		0.8,
		0.7,
		0.6,
		0.5,
		0.4,
		0.3
	];
	
	
	this.upd = () =>
	{
		if (!PAUSE)
		{
			// Bonuses
			if (this.bonus_time > 0)
			{
				this.bonus_time --;
			}
			else
			{
				if (!this.liveBonus)
				{
					this.bonus = choose(
						[
							'powerup',
							'bonus_skull'
						]
					);
					
					this.bonus_x = 32 + irandom(surface.width - 64);
					this.bonus_y = -32;
					
					// HP
					if (player.hp < player.hp_max)
					{
						var chance = 45;
						
						if (player.hp <= player.hp_max * 0.5)
						{
							chance = 75;
						}
						
						if (irandom(99) < chance)
						{
							this.bonus = 'bonus_hp';
						}
					}
					
					// rate & bullet
					if (this.level >= 4 && player.bullets == 1)
					{
						this.bonus = 'bonus_bullet';
					}
					
					if (this.level >= 6 && player.reload_max > 11)
					{
						this.bonus = 'bonus_rate';
					}
					
					if (this.level >= 7 && player.reload_max > 9)
					{
						this.bonus = 'bonus_rate';
					}
					
					if (this.level >= 8 && player.bullets == 2)
					{
						this.bonus = 'bonus_bullet';
					}
					
					if (this.level >= 10 && player.bullets == 3)
					{
						this.bonus = 'bonus_bullet';
					}
					
					if (this.level >= 11 && player.reload_max > 7)
					{
						this.bonus = 'bonus_rate';
					}
					
					this.liveBonus = 1;
				}
				else
				{
					this.bonus_y += 2.5;
					
					if (this.bonus_y > surface.height + 32)
					{
						this.liveBonus = 0;
						this.bonus_time = this.bonus_time_max;
					}
					
					if (
						distance(
							this.bonus_x,
							this.bonus_y,
							player.x,
							player.y
						) < this.bonus_radius + player.radius
					)
					{
						// SET Bonuses
						
						snd['bonus'][0].play();
						
						switch (this.bonus)
						{
							case 'powerup':
							{
								player.rage = 120 * 4;
								this.bonus_text = 'Временное безумие!';
								this.bonus_text_time = this.bonus_text_time_max;
							}
							break
							
							case 'bonus_hp':
							{
								player.hp ++;
								this.bonus_text = '+Здоровье!';
								this.bonus_text_time = this.bonus_text_time_max;
							}
							break
							
							case 'bonus_rate':
							{
								player.reload_max -= 2;
								this.bonus_text = 'Больше пуль!';
								this.bonus_text_time = this.bonus_text_time_max;
							}
							break
							
							case 'bonus_bullet':
							{
								player.bullets ++;
								player.bullet_spread += Math.PI * 0.02;
								this.bonus_text = '+1 пуля!';
								this.bonus_text_time = this.bonus_text_time_max;
							}
							break
							
							case 'bonus_skull':
							{
								enemies.forEach(
									(enemy) =>
									{
										enemy.hp = 0;
									}
								);
								this.bonus_text = 'Взрывная волна!';
								this.bonus_text_time = this.bonus_text_time_max;
							}
							break
						}
						
						this.bonus_time = this.bonus_time_max;
						this.liveBonus = 0;
					}
				}
			}
			
			// Progress
			this.progress += this.progress_speed;
			if (this.progress >= this.progress_max)
			{
				this.progress = 0;
				this.level += 1;
				this.progress_speed = this.speeds[Math.min(9, this.level)];
			}
			this.bot_diff = this.bots_diffs[Math.min(this.bots_diffs.length - 1, this.level)];
			this.ram_diff = this.ram_diffs[Math.min(this.ram_diffs.length - 1, this.level)];
			this.sh_diff = this.sh_diffs[Math.min(this.sh_diffs.length - 1, this.level)];
			this.big_diff = this.big_diffs[Math.min(this.big_diffs.length - 1, this.level)];
			
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
			if (this.level >= 3)
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
			if (this.level >= 5)
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
			
			// BigBot
			if (this.level >= 1)
			{
				if (this.big > 0)
				{
					this.big --;
				}
				else
				{
					this.big = this.big_max * this.big_diff;
					
					enemies.push(
						new BigBot(
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
		if (this.liveBonus)
		{
			context.save();
			context.translate(
				this.bonus_x,
				this.bonus_y
			);
			context.scale(
				0.75 + Math.abs(Math.sin(T1 * 0.5)) * 0.35,
				0.75 + Math.abs(Math.sin(T1 * 0.5)) * 0.35,
			);
			context.drawImage(
				tex[this.bonus],
				-32,
				-32
			);
			context.restore();
		}
		
		// Scores
		context.font = 'bold 15px "Press Start 2P"';
		context.textAlign = 'center';
		context.textBaseline = 'middle';
		context.fillStyle = '#C0E3F8';
		
		this.texts.forEach(
			(txt) =>
			{
				txt[0] --;
				
				if (txt[0] <= 0)
				{
					var num = this.texts.indexOf(txt);
					delete this.texts[num];
					this.texts.splice(num, 1);
				}
				else
				{
					txt[1] += (
						1.0 - txt[1]
					) * 0.1;
					
					context.save();
					context.translate(
						txt[2],
						txt[3]
					);
					context.scale(
						txt[1],
						txt[1]
					);
					context.fillText(
						txt[4],
						0,
						0
					);
					context.restore();
				}
			}
		);
		
		// Level
		T1 += 0.05;
		context.textAlign = 'left';
		context.textBaseline = 'top';
		context.fillStyle = '#C0E3F8';
		
		context.globalAlpha = 0.5;
		context.font = 'bold 15px "Press Start 2P"';
		score_draw = Math.min(score, score_draw + 5);
		context.fillText(
			'Очки:' + score_draw,
			8,
			136
		);
		context.globalAlpha = 1.0;
		context.font = 'bold 25px "Press Start 2P"';
		
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
		
		// HP
		context.globalAlpha = 1.0;
		context.save();
		context.translate(
			4,
			96 + 4
		);
		
		for (var i = 0; i < player.hp_max; i ++)
		{
			context.drawImage(
				tex['hpdown'],
				i * 38,
				0
			);
		}
		for (var i = 0; i < player.hp; i ++)
		{
			context.drawImage(
				tex['hpup'],
				i * 38,
				0
			);
		}
		
		context.restore();
		context.globalAlpha = 0.4;
		
		// Меню
		txt = 'меню';
		context.drawImage(
			tex['bmenu_back'],
			surface.width - 128,
			32
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
			32 + 18
		);
		context.fillText(
			txt,
			x - 2,
			32 + 18
		);
		context.globalAlpha = 1.0;
		context.fillText(
			txt,
			x,
			32 + 18
		);
		context.globalAlpha = 0.5;
		context.fillText(
			txt,
			x + Math.cos(T1 * 1.35) * 4,
			32 + 18 - Math.sin(T1 * 1.35) * 4
		);
		
		// Бонусы
		if (this.bonus_text_time > 0)
		{
			this.bonus_text_time --;
			
			context.font = '25px "Press Start 2P"';
			context.textAlign = 'center';
			context.textBaseline = 'middle';
			
			context.save();
			context.translate(
				surface.width * 0.5,
				surface.height * 0.5
			);
			context.scale(
				0.75 + Math.abs(Math.cos(T1 * 0.66)) * 0.5,
				0.75 + Math.abs(Math.cos(T1 * 0.66)) * 0.5
			);
			context.fillText(
				this.bonus_text,
				0,
				0
			);
			context.restore();
		}
		
		context.globalAlpha = 1.0;
		
		// Tutorial
		if (this.tut == 0)
		{
			if (this.tut_alpha < 1)
			{
				this.tut_alpha += 0.01;
			}
			else
			{
				this.tut = 1;
			}
		}
		else
		{
			if (this.tut_time > 0)
			{
				this.tut_time --;
			}
			else
			{
				if (this.tut_alpha > 0)
				{
					this.tut_alpha -= 0.01;
				}
				else
				{
					this.tut_alpha = 0;
					this.tut = 2;
				}
			}
		}
		
		if (this.tut < 2)
		{
			context.globalAlpha = Math.max(0, this.tut_alpha) * 0.6;
			
			context.font = 'bold 18px "Press Start 2P"';
			
			context.textAlign = 'center';
			context.textBaseline = 'middle';
			
			context.fillStyle = '#FFFFFF';
			
			context.save();
			context.translate(
				surface.width * 0.5,
				surface.height * 0.4
			);
			context.fillText(
				'Проведи пальцем или мышью,',
				0,
				0
			);
			context.fillText(
				'чтобы двигаться',
				0,
				32
			);
			
			context.font = 'bold 20px "Press Start 2P"';
			context.fillStyle = '#FFFFFF';
			context.fillText(
				'НЕ ДОПУСКАЙ, ЧТОБЫ ВРАГИ',
				0,
				256
			);
			context.fillText(
				'ДОСТИГЛИ ДНА!!!',
				0,
				256 + 32
			);
			
			context.restore();
			
			context.globalAlpha = 1;
		}
	};
}
var spawn = null;

function RamBot(x, y)
{
	this.x = x;
	this.y = y;
	this.type = 'enemy';
	this.mask_alpha = 0;
	
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
				player.hp --;
				return 1;
			}
			
			if (this.hp <= 0)
			{
				var temp = choose([10, 15]);
				score += temp;
				spawn.texts.push(
					[60, 2.5, this.x, this.y, '+' + temp]
				);
				sound_play('enemy_death');
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

function BigBot(x, y)
{
	this.x = x;
	this.y = y;
	this.type = 'enemy';
	this.mask_alpha = 0;
	
	this.hp_max = 6;
	this.hp = this.hp_max;
	
	this.speed = 1.5;
	this.angle = -Math.PI * 0.5;
	
	this.vecx = Math.cos(this.angle) * this.speed;
	this.vecy = -Math.sin(this.angle) * this.speed;
	
	this.half_width = 32;
	this.half_height = 32;
	
	this.radius = 30;
	
	this.texture = 'bot0';
	
	this.anim = 0;
	this.anim_speed = 0.1;
	this.anim_max = 4;
	this.anims = [
		'big0',
		'big1',
		'big2',
		'big3'
	];
	
	
	this.upd = () =>
	{
		if (!PAUSE)
		{
			this.mask_alpha = Math.max(0, this.mask_alpha - 0.05);
			
			this.x += this.vecx;
			this.y += this.vecy;
			
			this.vecx = Math.cos(this.angle) * this.speed;
			this.vecy = -Math.sin(this.angle) * this.speed;
			
			this.anim += this.anim_speed;
			if (this.anim >= this.anim_max)
			{
				this.anim = 0;
			}
			
			this.texture = this.anims[Math.floor(this.anim)];
			
			if (this.y > surface.height + 32)
			{
				player.hp --;
				return 1;
			}
			
			if (this.hp <= 0)
			{
				var temp = choose([50, 55]);
				score += temp;
				spawn.texts.push(
					[60, 2.5, this.x, this.y, '+' + temp]
				);
				sound_play('enemy_death');
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
		
		context.globalAlpha = this.mask_alpha;
		context.drawImage(
			tex['bigmask'],
			-this.half_width,
			-this.half_height
		);
		context.globalAlpha = 1.0;
		
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
	this.mask_alpha = 0;
	
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
				player.hp --;
				return 1;
			}
			
			if (this.hp <= 0)
			{
				var temp = choose([70, 75]);
				score += temp;
				spawn.texts.push(
					[60, 2.5, this.x, this.y, '+' + temp]
				);
				sound_play('enemy_death');
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
	this.mask_alpha = 0;
	
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
					
					sound_play('enemy_shoot');
					
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
				player.hp --;
				return 1;
			}
			
			if (this.hp <= 0)
			{
				var temp = choose([60, 65]);
				score += temp;
				spawn.texts.push(
					[60, 2.5, this.x, this.y, '+' + temp]
				);
				sound_play('enemy_death');
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
						enemy.mask_alpha = 1.0;
						resul = 1;
						
						sound_play('enemy_hurt');
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
				player.hp --;
				resul = 1;
			}
			
			if (resul == 1)
			{
				bullets.splice(
					0,
					0,
					new Bullet2Destroy(
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

function Bullet2Destroy(x, y)
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
	
	this.texture = 'bullet2d0';
	
	this.anims = [
		'bullet2d0',
		'bullet2d1',
		'bullet2d2',
		'bullet2d3'
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

function Particle(x, y)
{
	this.img = choose(
		[
			'particle1',
			'particle2',
			'particle3',
			'particle4',
			'particle5'
		]
	);
	
	this.half_width = 8;
	this.half_height = 8;
	
	this.x = x;
	this.y = y;
	
	this.speed = choose([2, 3]);
	this.friction = 0.1;
	
	this.angle = Math.random() * Math.PI * 2.0;
	this.dir = Math.random() * Math.PI * 2.0;
	this.angle_speed = Math.random() * 0.07 * choose([-1, 1]);
	
	this.vecx = Math.cos(this.dir) * this.speed;
	this.vecy = -Math.sin(this.dir) * this.speed;
	
	
	this.upd = () =>
	{
		this.x += this.vecx;
		this.y += this.vecy;
		
		this.vecx = Math.cos(this.dir) * this.speed;
		this.vecy = -Math.sin(this.dir) * this.speed;
		
		this.angle += this.angle_speed;
		this.speed -= this.friction;
		
		if (this.speed <= 0)
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
		context.scale(
			1,
			1
		);
		context.rotate(this.angle);
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
							var n = 4 + irandom(3);
							for (var i = 0; i < n; i ++)
							{
								back_objects.push(
									new Particle(
										obj.x,
										obj.y
									)
								)
							}
							
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
						surface.height * 0.7
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
					score = 0;
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
		tex[back_tex],
		0,
		0
	);
	
	/*
	context.textAlign = 'left';
	context.textBaseline = 'top';
	
	context.font = '10px monospace';
	context.fillStyle = '#FFFFFF';
	context.fillText(
		'testvar=' + testvar,
		16,
		surface.height - 32
	);
	*/
	
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
			
			
			// draw buttons
			context.save();
			context.translate(
				surface.width * 0.5,
				surface.height * 0.9
			);
			context.drawImage(
				tex['group'],
				-160 - 64,
				-64
			);
			context.drawImage(
				tex['share'],
				160 - 64,
				-64
			);
			context.restore();
			
			context.save();
			context.translate(
				surface.width * 0.5,
				surface.height * 0.7
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
			
			var x = surface.width * 0.5;
			var y = 240;
			
			context.save();
			context.translate(
				x,
				y
			);
			context.scale(
				1.75 + Math.abs(Math.sin(T2 * 0.1)) * 0.5,
				1.75 + Math.abs(Math.sin(T2 * 0.1)) * 0.5,
			);
			context.rotate(
				Math.cos(T2 * 0.35) * Math.PI * 0.05
			);
			context.drawImage(
				tex['catlogo1'],
				-64,
				-64
			);
			context.restore();
			
			context.save();
			context.translate(
				x,
				y + 96
			);
			context.scale(
				1.5 + Math.abs(Math.cos(T2 * 0.05)) * 0.5,
				1.5 + Math.abs(Math.cos(T2 * 0.05)) * 0.5,
			);
			context.rotate(
				Math.sin(T2 * 0.55) * Math.PI * 0.05
			);
			context.drawImage(
				tex['catlogo2'],
				-64,
				-64
			);
			context.restore();
			
			// LOGO NAME
			
			context.globalAlpha = 0.5;
			context.save();
			context.translate(
				x,
				y - 80
			);
			context.scale(
				0.75 + Math.abs(Math.sin(1 + T2 * 0.1)) * 0.22,
				0.75 + Math.abs(Math.sin(1 + T2 * 0.1)) * 0.22,
			);
			context.rotate(
				Math.cos(T2 * 0.58 - 0.4) * Math.PI * 0.05
			);
			context.drawImage(
				tex['logoname'],
				-256,
				-256
			);
			context.restore();
			context.globalAlpha = 1.0;
			
			context.save();
			context.translate(
				x,
				y - 80
			);
			context.scale(
				0.75 + Math.abs(Math.sin(1 + T2 * 0.1)) * 0.25,
				0.75 + Math.abs(Math.sin(1 + T2 * 0.1)) * 0.25,
			);
			context.rotate(
				Math.cos(T2 * 0.58) * Math.PI * 0.05
			);
			context.drawImage(
				tex['logoname'],
				-256,
				-256
			);
			context.restore();
			
			context.fillStyle = '#FFFFFF';
			context.font = 'bold 20px "Press Start 2P"';
			context.textAlign = 'left';
			context.textBaseline = 'top';
			
			context.fillText(
				'Рекорд:' + max_score,
				8,
				8
			);
		}
		break
		
		case 'lose':
		{
			if (ship_time > 0)
			{
				ship_time --;
			}
			else
			{
				if (ship_x < surface.width + 32)
				{
					ship_x += 7;
				}
				
				if (
					distance(
						ship_x,
						0,
						surface.width * 0.5,
						0
					) < 8
				)
				{
					ship_catch = 1;
				}
			}
			
			if (!ship_catch)
			{
				context.save();
				context.translate(
					surface.width * 0.5,
					surface.height * 0.5
				);
				context.rotate(
					T2 * 0.05
				);
				context.drawImage(
					tex['fool'],
					-32,
					-32
				);
				context.restore();
			}
			
			context.save();
			context.translate(
				ship_x,
				surface.height * 0.5 - 16
			);
			context.rotate(
				Math.PI * 0.5
			);
			context.drawImage(
				tex['cat0'],
				-32,
				-32
			);
			context.restore();
			
			// Text
			var txt1 = 'твой счёт:' + l_score_draw + '!';
			if (l_score_time > 0)
			{
				l_score_time --;
			}
			else
			{
				if (l_score < txt1.length)
				{
					l_score += l_score_speed;
				}
				else
				{
					if (l_balpha < 1)
					{
						l_balpha += 0.02;
					}
					
					if (l_score_draw < score)
					{
						l_score_draw += Math.max(1, Math.floor(score * 0.01));
					}
					else
					{
						l_score_draw = score;
					}
				}
			}
			var txt2 = txt1.slice(0, l_score);
			
			context.font = 'bold 30px "Press Start 2P"';
			
			context.textAlign = 'center';
			context.textBaseline = 'middle';
			
			context.fillStyle = '#FFFFFF';
			
			context.save();
			context.translate(
				surface.width * 0.5,
				surface.height * 0.37
			);
			context.rotate(
				Math.sin(T2 * 0.14) * Math.PI * 0.05
			);
			context.fillText(
				'Ты проиграл!',
				0,
				0
			);
			context.font = 'bold 15px "Press Start 2P"';
			context.fillText(
				txt2,
				0,
				32
			);
			context.restore();
			
			// Button
			var temp_scale = 1;
			if (mouse_check)
			{
				if (
					distance(
						mouse_x,
						mouse_y,
						l_bx,
						l_by
					) < 64
				)
				{
					temp_scale = 0.75;
				}
			}
			
			l_bscale += (
				temp_scale - l_bscale
			) * 0.2;
			
			if (l_bscale > 0.95 && l_tomenu)
			{
				if (irandom(10) < 5)
				{
					showAd();
				}
				gotoMenu();
			}
			
			context.globalAlpha = 0.4 * l_balpha;
			context.save();
			context.translate(
				l_bx,
				l_by
			);
			context.scale(
				l_bscale,
				l_bscale
			);
			context.drawImage(
				tex['button3'],
				-64,
				-64
			)
			context.font = 'bold 18px "Press Start 2P"';
			context.fillText(
				'в меню',
				0,
				0
			);
			context.restore();
			
			context.globalAlpha = 1;
		}
		break
	}
	
	if (is_lose)
	{
		loosing();
		is_lose = 0;
	}
	requestAnimationFrame(paint);
}


// VK
function vkInit()
{
	vkBridge.send('VKWebAppInit');
	
	/*
	testvar = localStorage.getItem('testvar');
	if (testvar == null)
	{
		testvar = 0;
	}
	testvar ++;
	localStorage.setItem('testvar', testvar);
	*/
	
	running = localStorage.getItem('ACrun');
	if (running == null)
	{
		running = 0;
	}
	running ++;
	localStorage.setItem('ACrun', running);
	if (running > 1)
	{
		showAd();
	}
}

function showAd()
{
	vkBridge.send("VKWebAppShowNativeAds", {ad_format:"preloader"})
	.then(data => console.log(data.result))
	.catch(error => console.log(error));
}

function groupVK()
{
	vkBridge.send("VKWebAppJoinGroup", {"group_id": 203816953});
	/*
	.then(data => console.log(data.result))
	.catch(error => console.log(error));
	*/
}

function shareVK()
{
	vkBridge.send("VKWebAppShowInviteBox", {})
    .then(data => console.log(data.success))
    .catch(error => console.log(error));
}


// Start
vkInit();

audioLoad();
loadTextures();
starCreate();
setScreen();

gotoMenu();

requestAnimationFrame(paint);