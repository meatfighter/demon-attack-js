export class Easer {
    
    v = 0;
    v0 = 0;
    v1 = 0;
    steps = 0;
    s = 0;

    reset(v0: number, v1: number, steps: number) {
        this.v = v0;
        this.v0 = v0;
        this.v1 = v1;
        this.steps = steps;
        this.s = 0;       
    }

    update(): boolean {
        if (++this.s >= this.steps) {
            this.s = this.steps;
            this.v = this.v1;
            return true;
        }

        const t = this.s / this.steps;
        let k = 0;
        if (t <= .5) {
            const u = 2 * t;
            k = u * u / 2;
        } else {
            const u = 2 * (t - 1);
            k = 1 - u * u / 2;
        }
        this.v = this.v0 + k * (this.v1 - this.v0);

        return false;
    }

    getMin(): number {
        return (this.v1 > this.v0) ? this.v : this.v1;
    }

    getMax(): number {
        return (this.v1 > this.v0) ? this.v1 : this.v;
    }
}