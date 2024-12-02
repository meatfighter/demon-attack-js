import { TAU } from '@/math';

export enum ButtonType {
    LEFT,
    RIGHT,
    FIRE,
    OTHER,
}

export class Button {

    buttonType = ButtonType.OTHER;
    x = 0;
    y = 0;
    width = 0;
    height = 0;
    down = false;
    clicked = false;
    hovered = false;

    render(ctx: CanvasRenderingContext2D) {
        ctx.imageSmoothingEnabled = true;
        ctx.strokeStyle = '#ffffff7f';
        ctx.beginPath();
        ctx.arc(this.x + 22, this.y + 22, 22, 0, TAU);
        ctx.stroke();
    }
}