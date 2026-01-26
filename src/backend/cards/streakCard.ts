import { CanvasBase, ColorPalette } from "./base.js";

export class StreakCard {
    public borderRadius = 20;
    public constructor(
        public width: number,
        public height: number,
        private pointerX: number,
        private pointerY: number,
        public color: ColorPalette,
        public base: CanvasBase,
    ) {
        return;
    }
    addStreakCard() {
        const oldPointerX = this.pointerX;
        const oldPointerY = this.pointerY;

        const cardWidth = this.width / 2;
        const cardHeight = this.height / 4;
        this.base.canvas
            .rect(cardWidth, cardHeight)
            .move(this.pointerX, this.pointerY)
            .fill(this.color.primary)
            .radius(this.borderRadius)
            .stroke(this.color.outline);
        const streakWidthSpacer = cardWidth * 0.05;
        this.pointerX += streakWidthSpacer;

        const sectionWidth = (cardWidth - streakWidthSpacer * 2) / 3;
        this.pointerX += sectionWidth;
        this.pointerX += sectionWidth * 0.1;
        const outerCircleDia = sectionWidth * 0.8;
        const outerCirclePosX = this.pointerX + sectionWidth / 2 - outerCircleDia / 2;
        const outerCirclePosY = this.pointerY + sectionWidth * 0.2;

        this.base.canvas.circle(outerCircleDia).move(outerCirclePosX, outerCirclePosY).fill(this.color.contrast);
        this.pointerY = outerCirclePosY;
        const circleCrossRatio = 0.1;
        this.pointerY += outerCircleDia * circleCrossRatio;
        const innerCircleDia = outerCircleDia * (1 - circleCrossRatio);
        const innerCirclePosX = outerCirclePosX + (outerCircleDia * circleCrossRatio) / 2;
        this.pointerY -= (outerCircleDia * circleCrossRatio) / 2;
        this.base.canvas.circle(innerCircleDia).move(innerCirclePosX, this.pointerY).fill(this.color.primary);

        this.pointerX = outerCirclePosX;
        this.pointerY = outerCirclePosY;
        // TODO Streak Add, variable streak count
        const daysCountText = this.base.canvas.text("124").fill(this.color.secondary);
        this.base.centerAlignText(
            daysCountText,
            this.pointerX,
            this.pointerY,
            this.pointerX + outerCircleDia,
            this.pointerY + outerCircleDia,
        );

        this.pointerX = oldPointerX + sectionWidth + streakWidthSpacer;
        this.pointerY = outerCirclePosY + outerCircleDia;
        // TODO Add, variable streak range
        const streakRangeText = this.base.canvas
            .text("Dec 7, 2024- Jan 1 2025")
            .fill(this.color.outline)
            .font({ weight: "bold" });
        this.base.canvas.text(`DEBUG ${this.pointerY} ${cardHeight + oldPointerY}`).move(50, 50);
        this.pointerY += sectionWidth * 0.2;
        this.base.centerAlignText(
            streakRangeText,
            this.pointerX,
            this.pointerY,
            this.pointerX + sectionWidth,
            oldPointerY + cardHeight,
        );

        this.pointerX += (outerCircleDia - daysCountText.bbox().width) / 2;
        streakRangeText.move(this.pointerX, this.pointerY);
    }
}
