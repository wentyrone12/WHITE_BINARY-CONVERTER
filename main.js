
        const homeSection = document.getElementById("homeSection");

        const textToBinarySection =
            document.getElementById("textToBinarySection");

        const decimalBinarySection =
            document.getElementById("decimalBinarySection");

        const decimalToBinarySection =
            document.getElementById("decimalToBinarySection");

        const binaryToDecimalSection =
            document.getElementById("binaryToDecimalSection");

        const binaryToTextSection =
            document.getElementById("binaryToTextSection");

        const textToBinaryCard =
            document.getElementById("textToBinaryCard");

        const decimalBinaryCard =
            document.getElementById("decimalBinaryCard");

        const binaryToTextCard =
            document.getElementById("binaryToTextCard");

        const decimalToBinaryOption =
            document.getElementById("decimalToBinaryOption");

        const binaryToDecimalOption =
            document.getElementById("binaryToDecimalOption");

        const textInput =
            document.getElementById("textInput");

        const decimalInput =
            document.getElementById("decimalInput");

        const binaryDecimalInput =
            document.getElementById("binaryDecimalInput");

        const binaryTextInput =
            document.getElementById("binaryTextInput");

        const textConvertBtn =
            document.getElementById("textConvertBtn");

        const decimalConvertBtn =
            document.getElementById("decimalConvertBtn");

        const binaryDecimalConvertBtn =
            document.getElementById("binaryDecimalConvertBtn");

        const binaryTextConvertBtn =
            document.getElementById("binaryTextConvertBtn");


        const resultOverlay =
            document.getElementById("resultOverlay");

        const closeResultBtn =
            document.getElementById("closeResultBtn");

        const resultTitle =
            document.getElementById("resultTitle");

        const resultSubtitle =
            document.getElementById("resultSubtitle");

        const resultOutput =
            document.getElementById("resultOutput");

        const resultCount =
            document.getElementById("resultCount");

        const copyBtn =
            document.getElementById("copyBtn");

        const numberBreakdown =
            document.getElementById("numberBreakdown");

        const bitRow =
            document.getElementById("bitRow");

        const formula =
            document.getElementById("formula");


        const allSections = [
            homeSection,
            textToBinarySection,
            decimalBinarySection,
            decimalToBinarySection,
            binaryToDecimalSection,
            binaryToTextSection
        ];


        function showSection(section) {

            allSections.forEach(item => {
                item.classList.remove("active");
                item.style.display = "none";
            });

            if (section === homeSection) {
                homeSection.style.display = "block";
            } else {
                section.style.display = "block";
                section.classList.add("active");
            }

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }


        function goHome() {
            showSection(homeSection);
        }

        textToBinaryCard.addEventListener("click", () => {
            showSection(textToBinarySection);
        });


        decimalBinaryCard.addEventListener("click", () => {
            showSection(decimalBinarySection);
        });


        binaryToTextCard.addEventListener("click", () => {
            showSection(binaryToTextSection);
        });

        decimalToBinaryOption.addEventListener("click", () => {
            showSection(decimalToBinarySection);
        });


        binaryToDecimalOption.addEventListener("click", () => {
            showSection(binaryToDecimalSection);
        });


        document.querySelectorAll("[data-back]").forEach(button => {

            button.addEventListener("click", () => {

                const currentSection =
                    button.closest(".converter-section");

                if (
                    currentSection === decimalToBinarySection ||
                    currentSection === binaryToDecimalSection
                ) {
                    showSection(decimalBinarySection);
                } else {
                    goHome();
                }

            });

        });

        textConvertBtn.addEventListener("click", () => {

            const text = textInput.value;

            if (!text.trim()) {
                showResult(
                    "No Text Entered",
                    "Please enter some text first.",
                    "Please type a word, sentence, or message."
                );

                return;
            }


            let binaryResult = [];


            for (let i = 0; i < text.length; i++) {

                const decimal =
                    text.charCodeAt(i);

                const binary =
                    decimal
                        .toString(2)
                        .padStart(8, "0");

                binaryResult.push(binary);
            }


            const output =
                binaryResult.join(" ");


            showResult(
                "Text → Binary",
                "Each character has been converted into an 8-bit binary value.",
                output
            );

        });

        decimalConvertBtn.addEventListener("click", () => {

            let value =
                decimalInput.value.trim();


            if (!value) {

                showResult(
                    "No Number Entered",
                    "Please enter a decimal whole number.",
                    "Please enter a number."
                );

                return;
            }

            if (!/^\d+$/.test(value)) {

                showResult(
                    "Invalid Decimal Number",
                    "Use whole numbers only.",
                    "Example: 10000"
                );

                return;
            }


            try {

                const decimal =
                    BigInt(value);


                const binary =
                    decimal.toString(2);


                showResult(
                    "Decimal → Binary",
                    `${decimal.toString()} converted into binary.`,
                    binary
                );


                showDecimalToBinaryBreakdown(
                    decimal,
                    binary
                );

            } catch (error) {

                showResult(
                    "Conversion Error",
                    "The number could not be converted.",
                    "Please try another whole number."
                );

            }

        });

        binaryDecimalConvertBtn.addEventListener("click", () => {

            const binary =
                binaryDecimalInput.value
                    .trim()
                    .replace(/\s+/g, "");


            if (!binary) {

                showResult(
                    "No Binary Entered",
                    "Please enter a binary number.",
                    "Example: 10011100010000"
                );

                return;
            }


            if (!/^[01]+$/.test(binary)) {

                showResult(
                    "Invalid Binary",
                    "Binary numbers can contain only 0 and 1.",
                    "Example: 10011100010000"
                );

                return;
            }


            try {

                const decimal =
                    BigInt("0b" + binary);


                showResult(
                    "Binary → Decimal",
                    "The binary number has been converted to decimal.",
                    decimal.toString()
                );


                showBinaryToDecimalBreakdown(
                    binary,
                    decimal
                );

            } catch (error) {

                showResult(
                    "Conversion Error",
                    "The binary number could not be converted.",
                    "Please check your input."
                );

            }

        });

        binaryTextConvertBtn.addEventListener("click", () => {

            let binary =
                binaryTextInput.value.trim();


            if (!binary) {

                showResult(
                    "No Binary Entered",
                    "Please enter binary text.",
                    "Example: 01001000 01101001"
                );

                return;
            }

            binary =
                binary.replace(/\s+/g, " ");


            const groups =
                binary.split(" ");


            let text = "";


            for (const group of groups) {

                if (!/^[01]{8}$/.test(group)) {

                    showResult(
                        "Invalid Binary Format",
                        "Binary → Text requires 8-bit groups.",
                        `Invalid group: ${group}`
                    );

                    return;
                }


                const decimal =
                    parseInt(group, 2);


                text +=
                    String.fromCharCode(decimal);
            }


            showResult(
                "Binary → Text",
                "The 8-bit binary groups have been converted into text.",
                text
            );

        });

        function showResult(
            title,
            subtitle,
            output
        ) {

            resultTitle.textContent =
                title;

            resultSubtitle.textContent =
                subtitle;

            resultOutput.textContent =
                output;

            resultCount.textContent =
                `${String(output).length.toLocaleString()} characters`;

            numberBreakdown.style.display =
                "none";


            copyBtn.textContent =
                "Copy Result";

            copyBtn.classList.remove("copied");


            resultOverlay.classList.add("show");

        }

        function showDecimalToBinaryBreakdown(
            decimal,
            binary
        ) {

            numberBreakdown.style.display =
                "block";


            bitRow.innerHTML = "";

            const weights = [];


            for (
                let i = binary.length - 1;
                i >= 0;
                i--
            ) {

                const weight =
                    2n ** BigInt(i);

                weights.push(weight);

            }

            for (let i = 0; i < binary.length; i++) {

                const bit =
                    binary[i];

                const weight =
                    weights[i];


                const box =
                    document.createElement("div");


                box.className =
                    "bit-box";


                if (bit === "1") {
                    box.classList.add("active");
                }


                box.innerHTML = `
                <span class="bit-value">${bit}</span>
                <span class="bit-weight">${weight.toString()}</span>
            `;


                bitRow.appendChild(box);

            }

            const selectedWeights = [];


            for (let i = 0; i < binary.length; i++) {

                if (binary[i] === "1") {

                    selectedWeights.push(
                        weights[i].toString()
                    );

                }

            }


            if (selectedWeights.length === 0) {

                formula.innerHTML = `
                <strong>0</strong> = 0
            `;

            } else {

                formula.innerHTML = `
                <strong>
                    ${selectedWeights.join(" + ")}
                </strong>
                = ${decimal.toString()}
            `;

            }

        }

        function showBinaryToDecimalBreakdown(
            binary,
            decimal
        ) {

            numberBreakdown.style.display =
                "block";


            bitRow.innerHTML = "";


            const weights = [];


            for (
                let i = binary.length - 1;
                i >= 0;
                i--
            ) {

                weights.push(
                    2n ** BigInt(i)
                );

            }

            for (let i = 0; i < binary.length; i++) {

                const bit =
                    binary[i];

                const weight =
                    weights[i];


                const box =
                    document.createElement("div");


                box.className =
                    "bit-box";


                if (bit === "1") {
                    box.classList.add("active");
                }


                box.innerHTML = `
                <span class="bit-value">${bit}</span>
                <span class="bit-weight">${weight.toString()}</span>
            `;


                bitRow.appendChild(box);

            }

            const selectedWeights = [];


            for (let i = 0; i < binary.length; i++) {

                if (binary[i] === "1") {

                    selectedWeights.push(
                        weights[i].toString()
                    );

                }

            }


            formula.innerHTML = `
            <strong>
                ${selectedWeights.length
                    ? selectedWeights.join(" + ")
                    : "0"
                }
            </strong>
            = ${decimal.toString()}
        `;

        }


        copyBtn.addEventListener("click", async () => {

            const text =
                resultOutput.textContent;


            try {

                await navigator.clipboard.writeText(text);


                copyBtn.textContent =
                    "✓ Copied!";

                copyBtn.classList.add("copied");


                setTimeout(() => {

                    copyBtn.textContent =
                        "Copy Result";

                    copyBtn.classList.remove("copied");

                }, 1800);

            } catch (error) {

                const temp =
                    document.createElement("textarea");


                temp.value = text;

                document.body.appendChild(temp);

                temp.select();

                document.execCommand("copy");

                temp.remove();


                copyBtn.textContent =
                    "✓ Copied!";

                copyBtn.classList.add("copied");

            }

        });

        closeResultBtn.addEventListener("click", () => {

            resultOverlay.classList.remove("show");

        });

        resultOverlay.addEventListener("click", event => {

            if (event.target === resultOverlay) {

                resultOverlay.classList.remove("show");

            }

        });

        document.addEventListener("keydown", event => {

            if (
                event.key === "Escape" &&
                resultOverlay.classList.contains("show")
            ) {

                resultOverlay.classList.remove("show");

            }

        });

        decimalInput.addEventListener("keydown", event => {

            if (event.key === "Enter") {

                decimalConvertBtn.click();

            }

        });


        binaryDecimalInput.addEventListener("keydown", event => {

            if (event.key === "Enter") {

                binaryDecimalConvertBtn.click();

            }

        });
