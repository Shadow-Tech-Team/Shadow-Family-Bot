// Import packages
import { registerFont } from "canvas";

// Convert TTF font to context texture font
export default async function ApplyFont(Canvas, Text) {
    const context = Canvas.getContext('2d');
    registerFont('./Assets/Fonts/Quicksand-Bold.ttf', {family:'QuicksandLocal'});
    let fontSize = 85;
    do {
        context.font = `${fontSize -= 10}px QuicksandLocal`;
    } while (context.measureText(Text).width > Canvas.width - 300);
    return context.font;
}