$(async () => {
    const typingText = "Budi izvrstan u onom što vidiš!/voliš!-ZAISKRI.";
    const line = $("#typing_p1");
    await typeText(line, typingText);
});

const typeText = async (line, typingText) => {
    let charIndex = 0;
    while (charIndex < typingText.length) {
        const letter = typingText[charIndex];
        if (letter === "/") {
            line.text("Budi izvrstan u onom što ");
        } else if (letter === "-") {
            line.css({ 'animation': 'none' });
            line = $("#typing_p2");
        } else {
            line.append(letter);
        }
        charIndex++;
        await new Promise((resolve, reject) => setTimeout(resolve, 300));
    }
};
