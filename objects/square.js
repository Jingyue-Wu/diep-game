class Square {
    constructor() {
        this.pos = createVector(random(width), -60);
        this.size = 30;
        this.vel = p5.Vector.random2D();
        this.angle = 0;
        this.spinAmount = random(-0.03, 0.03);
        this.health = 1; //1 hit to kill
    }

    display() {
        push();
        translate(this.pos.x, this.pos.y);
        stroke(70);
        strokeWeight(3);
        fill(247, 235, 66);
        this.angle += this.spinAmount;
        rotate(this.angle);
        rectMode(CENTER);
        rect(0, 0, this.size, this.size);
        pop();

        //wrap around edges
        if (this.pos.x > width + 60) this.pos.x = -60;
        else if (this.pos.x < -60) this.pos.x = width + 60;
        if (this.pos.y > height + 60) this.pos.y = -60;
        else if (this.pos.y < -60) this.pos.y = height + 60;
    }

    update() {
        this.pos.add(this.vel);
    }
}