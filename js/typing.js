$(async () => {
    const typingText = "Budi izvrstan u onom što vidiš!/voliš!-ZAISKRI.";
    const p = $("#typing_p1");
    await typeText(p, typingText);
});

const typeText = async (p, typingText) => {
    let letterIndex = 0;

    while (letterIndex < typingText.length) {
        const letter = typingText[letterIndex];
        if (letter === "/") {
            p.text("Budi izvrstan u onom što ");
        } else if (letter === "-") {
            p.css({ 'animation': 'none' });
            p = $("#typing_p2");
        } else {
            p.append(letter);
        }

        letterIndex++;
        await new Promise(resolve => setTimeout(resolve, 300));
    }
};
