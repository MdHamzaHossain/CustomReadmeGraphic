import { registerWindow, Svg, SVG, Text } from "@svgdotjs/svg.js";
import { createSVGWindow } from "svgdom";
import { StreakCard } from "./streakCard.js";
export interface ColorPalette {
    primary: string;
    secondary: string;
    outline: string;
    contrast: string;
}
export class CanvasBase {
    public canvas: Svg;
    public borderRadius = 20;
    private pointerX = 0;
    private pointerY = 0;
    public constructor(
        public width: number,
        public height: number,
        public color: ColorPalette,
    ) {
        const window = createSVGWindow();
        const document = window.document;
        registerWindow(window, document);

        this.canvas = (SVG(document.documentElement) as Svg)
            .size(this.width, this.height)
            .viewbox(0, 0, this.width, this.height);
    }
    /**
     * In place
     * @param {import("@svgdotjs/svg.js").Text} text
     * @param {Number} aX The upper left corner of the box (x)
     * @param {Number} aY The upper left corner of the box (y)
     * @param {Number} bX The lower right corner of the box (x)
     * @param {Number} bY The lower right corner of the box (x)
     */
    public centerAlignText(text: Text, aX: number, aY: number, bX: number, bY: number) {
        text.font({ size: 1 });
        const widthDiff = bX - aX;
        const heightDiff = bY - aY;
        const scale = Math.min(widthDiff / text.bbox().width, heightDiff / text.bbox().height);
        text.font({ size: scale });
        text.move(aX + (widthDiff - text.bbox().width) / 2, aY + (heightDiff - text.bbox().height) / 2);
    }
    public initializeAll() {
        const streak = new StreakCard(this.width / 2, this.height / 4, this.pointerX, this.pointerY, this.color, this);
    }
}
