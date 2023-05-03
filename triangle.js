class Triangle {

    constructor() {
        this.pos = createVector(random(width), height + 60);
        this.size = 30;
        this.vel = p5.Vector.random2D();
        this.angle = 0;
        this.spinAmount = random(-0.03, 0.03);
        this.health = 3; //3 hits to kill
        this.drawSize = 18;
    }

    display() {
        push();
        translate(this.pos.x, this.pos.y);
        stroke(70);
        strokeWeight(3);
        fill(240, 104, 104);
        this.angle += this.spinAmount;
        rotate(this.angle);
        rectMode(CENTER);
        triangle(-this.drawSize, this.drawSize - 6, this.drawSize, this.drawSize - 6, 0, -this.drawSize);
        pop();

        //wrap around edges
        if (this.pos.x > width + 60) this.pos.x = -60;
        else if (this.pos.x < -60) this.pos.x = width + 60;
        if (this.pos.y > height + 60) this.pos.y = -60;
        else if (this.pos.y < -60) this.pos.y = height + 60;

        this.healthBar();
    }

    update() {
        this.pos.add(this.vel);
    }

    healthBar() {
        //display triangle health bar
        if (this.health < 3) {
            stroke(70);
            strokeWeight(1);

            fill(70);
            rect(this.pos.x - 20, this.pos.y + 30, 36, 5, 5);

            fill(69, 244, 120);
            rect(this.pos.x - 20, this.pos.y + 30, this.health * 12, 5, 5);
        }
    }

    resetHealth(){
        //reset health when game resets
        if (stage == 2) {
        this.health = 3;
        }
    }
}