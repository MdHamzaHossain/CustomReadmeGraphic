import { SVG, Svg, registerWindow } from "@svgdotjs/svg.js";
import { createSVGWindow } from "svgdom";

// Setup virtual DOM
const window = createSVGWindow();
const document = window.document;
registerWindow(window, document);

const cWid = 500;
const cHei = 200;
const draw = (SVG(document.documentElement) as Svg).size(cWid, cHei).viewbox(0, 0, cWid, cHei);

// Colors
const bgColor = "#282a36";
const outlineColor = "#ffffff";

draw.rect(cWid, cHei).fill(bgColor).radius(20).stroke({ color: outlineColor, width: 1 });

// // Outer ring
// draw.circle(radius * 2)
//     .stroke({ width: 6, color: yellow })
//     .fill("none")
//     .center(centerX, centerY);

// // Flame icon (simplified as a triangle)
// draw.polygon("0,0 10,20 20,0")
//     .fill("orange")
//     .move(centerX - 10, centerY - 60);

// // Streak count
// draw.text("407")
//     .font({ size: 28, fill: blue })
//     .center(centerX, centerY + 10);
// draw.text("Current Streak")
//     .font({ size: 14, fill: "#333" })
//     .center(centerX, centerY + 50);
// draw.text("Dec 7, 2024 - Jan 17")
//     .font({ size: 12, fill: "#666" })
//     .center(centerX, centerY + 70);

// // Right: Longest Streak
// draw.text("407").font({ size: 36, fill: pink }).move(480, 30);
// draw.text("Longest Streak").font({ size: 14, fill: "#333" }).move(480, 70);
// draw.text("Dec 7, 2024 - Jan 17").font({ size: 12, fill: "#666" }).move(480, 90);

// // Optional animation (e.g. pulsing ring)
// draw.circle(radius * 2)
//     .stroke({ width: 6, color: yellow })
//     .fill("none")
//     .center(centerX, centerY)
//     .attr("r", radius)
//     .attr("stroke-opacity", 0.5)
//     .attr("stroke-dasharray", "5,5")
//     .attr("stroke-dashoffset", "0")
//     .attr("transform", `rotate(0 ${centerX} ${centerY})`)
//     .attr(
//         "style",
//         `
//     animation: pulse 2s infinite;
//   `,
//     );

// // Embed animation style
// draw.defs().element("style").words(`
//   @keyframes pulse {
//     0% { stroke-opacity: 0.5; transform: rotate(0deg); }
//     50% { stroke-opacity: 1; transform: rotate(180deg); }
//     100% { stroke-opacity: 0.5; transform: rotate(360deg); }
//   }
// `);

export const cardCanvas = draw;
