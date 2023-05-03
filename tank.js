class Tank {
    constructor() {
        this.pos = createVector(width / 2, height / 2);
        this.vel = createVector(0, 0);
        this.accel = createVector(0, 0);
        this.friction = 0.95;
        this.accelSpeed = 3;
        this.maxSpeed = 6;

        this.bullets = [];
        this.shootTimer = millis();
        this.fireRate = 700;
        this.shooting = false;

        this.health = 10;
        this.bodyDamage = false;
        this.clickShoot = true;

        this.autoFire = false;
    }


    display() {
        //draw shooter
        this.mouse = createVector(mouseX, mouseY);
        this.mouse.sub(this.pos);

        this.mouse.normalize();
        this.mouse.mult(40);
        translate(this.pos.x, this.pos.y);
        strokeWeight(20);
        stroke(70);
        line(0, 0, this.mouse.x, this.mouse.y);
        translate(-this.pos.x, -this.pos.y);

        //draw body
        fill(66, 157, 206);
        strokeWeight(3.5);
        ellipse(this.pos.x, this.pos.y, 50, 50);

        //wrap edges
        if (this.pos.x > width + 50) this.pos.x = -50;
        else if (this.pos.x < -50) this.pos.x = width + 50;
        if (this.pos.y > height + 50) this.pos.y = -50;
        else if (this.pos.y < -50) this.pos.y = height + 50;

        this.healthBar();
    }


    //movement
    update() {
        this.accel.normalize();
        this.vel.add(this.accel);
        this.vel.mult(this.friction);
        this.vel.limit(this.maxSpeed);
        this.pos.add(this.vel);
        this.accel.mult(0);
    }


    move() {
        //wasd movement
        if (keyIsDown(68)) { //d
            this.force = createVector(this.accelSpeed, 0);
            this.accel.add(this.force);
        }

        if (keyIsDown(65)) { //a
            this.force = createVector(-this.accelSpeed, 0);
            this.accel.add(this.force);
        }

        if (keyIsDown(83)) { //s
            this.force = createVector(0, this.accelSpeed);
            this.accel.add(this.force);
        }

        if (keyIsDown(87)) { //w
            this.force = createVector(0, -this.accelSpeed);
            this.accel.add(this.force);
        }
    }


    shoot() {
        //hold left click to shoot
        this.mousePos = createVector(mouseX, mouseY);
        this.mouseHeading = createVector(this.pos.x, this.pos.y);
        this.mouseHeading.sub(this.mousePos);
        this.heading = this.mouseHeading.heading();

        for (var i = 0; i < this.bullets.length; i++) {
            this.bullets[i].display();
            this.bullets[i].update();
        }

        //reload speed timer
        if (millis() - this.shootTimer > this.fireRate) {
            if (mouseIsPressed || this.autoFire == true) {
                this.bullets[i] = new Bullet(this.pos, this.heading);
            }

            //reset timer
            this.shootTimer = millis(); 
            this.shooting = false;
        }
        
        //remove bullet if off screen
        if (this.pos.x > width+100 || this.pos.y > height+100 || this.pos.x < -100, this.pos.y < -100) {
            this.bullets.splice(j, 1);
        }
    }

    checkHealth(sx, sy, damage) {
        //check collision with shapes
        this.distance = dist(this.pos.x, this.pos.y, sx, sy);

        if (this.distance < 50) {
            this.health -= damage;
            this.bodyDamage = true;
        }

        else {
            this.bodyDamage = false;
        }

        if (this.health <= 0) stage = 2;
    }

    healthBar() {
        //draw tank health bar
        stroke(70);
        strokeWeight(1);

        fill(70);
        rect(this.pos.x - 25, this.pos.y + 35, 50, 5, 5);

        fill(69, 244, 120);
        rect(this.pos.x - 25, this.pos.y + 35, this.health * 5, 5, 5);
    }
}

