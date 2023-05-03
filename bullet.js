class Bullet {
    constructor(shipPos, bulletHeading) {
        this.pos = createVector(shipPos.x, shipPos.y);
        this.vel = p5.Vector.fromAngle(bulletHeading + PI);
        this.vel.mult(8);
        this.hit = false;
    }

    update() {
        this.pos.add(this.vel);
    }

    display() {
        push();
        stroke(70);
        strokeWeight(3);
        fill(66, 157, 206);
        ellipse(this.pos.x, this.pos.y, 15, 15);
        pop();
    }

    checkCollision(sx, sy) {
        //check if hit shape
        this.distance = dist(this.pos.x, this.pos.y, sx, sy);
        if (this.distance < 30) {
    
            console.log('HIT');
            this.hit = true;
        }
    }  
}
