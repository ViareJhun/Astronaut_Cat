// Graphics
var surface = document.getElementById('surface');
var context = surface.getContext('2d');

// Textures
var tex_path = [];
var tex = [];

function loadTextures()
{
	tex_path['PlayerBullet1'] = 'img/bullet1.png';
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


// Game
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
	
	this.upd = () =>
	{
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

addEventListener(
	'mousemove',
	(e) =>
	{
		mouse_x = (e.clientX - xoffset) / asp;
		mouse_y = (e.clientY - yoffset) / asp;
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

// Objects
var objects = [];

function PlayerBullet(x, y, vecx, vecy, speed, angle)
{
	this.x = x;
	this.y = y;
	this.vecx = vecx;
	this.vecy = vecy;
	this.speed = speed;
	this.angle = angle;
	
	this.texture = 'PlayerBullet1';
	
	this.half_width = 8;
	this.half_height = 8;
	
	
	this.upd = () =>
	{
		this.x += this.vecx * this.speed;
		this.y += this.vecy * this.speed;
		
		if (
			((this.x - this.half_width) < 0) ||
			((this.y - this.half_height) < 0) ||
			((this.x + this.half_width) > surface.width) ||
			((this.y + this.half_height) > surface.height)
		)
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
	
	var temp = [-1, 1];
	shuffle(temp);
	this.angle = -Math.PI * 0.5 + (irandom(10) / 100) * temp[0];
	
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
	objects.forEach(
		(obj) =>
		{
			switch (obj.upd())
			{
				case 1:
				{
					var num = objects.indexOf(obj);
					delete objects[num];
					objects.splice(num, 1);
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
	
	objects.forEach(
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