document.addEventListener('DOMContentLoaded', () => {
    let blockNumber = 0;


    // Function to fetch block height and transaction count
    function fetchBlockData() {
        return Promise.all([
            fetch('https://blockchain.info/q/getblockcount').then(response => response.text()),
            fetch('https://blockchain.info/q/totalbc').then(response => response.text())
        ]);
    }

    // Function to generate card ID
    function generateCardID() {
        const maxCards = 20000;
        const cardID = (blockNumber % maxCards) + 1;
        return cardID.toString().padStart(5, '0');
    }

    // Function to genrate SVG body parts/content
    function generateSVGContent() {
        const blockNumberStr = blockNumber.toString();
        console.log("Block number length:", blockNumberStr.length);

        const blockNumberDigits = blockNumberStr.padStart(7, '0').split('').map(Number);
        // Testing Purposes
        const specialCondition = blockNumberStr.includes('5');
        const gradientConditions = {
            'gradient-platinum': blockNumberStr.includes('11'),
            'gradient-gold': blockNumberStr.includes('22'),
            'gradient-gear-5-luffy': blockNumberStr.includes('33'),
            'gradient-sun-god': blockNumberStr.includes('44'),
            'gradient-holographic-bubble': blockNumberStr.includes('55'),
            'gradient-code': blockNumberStr.includes('88')
        };
    
        const activeGradient = Object.keys(gradientConditions).find(gradient => gradientConditions[gradient]);
    

    
        const colorMap = {
            0: "#D62828", // Red
            1: "#F77F00", // Orange
            2: "#FCBF49", // Yellow
            3: "#EAB308", // Yellow-Green
            4: "#15803D", // Green
            5: "#38A169", // Lime Green
            6: "#4299E1", // Blue
            7: "#667EEA", // Indigo
            8: "#9F7AEA", // Violet
            9: "#C53030", // Crimson
            "default": "#718096" // Grey (default)
        };
    
        const colorMap2 = {
            0: "#1F2937", // Dark Blue
            1: "gradient-platinum", // Platinum
            2: "gradient-gold", // Gold
            3: "#533737", // Burgundy
            4: "#505337", // Olive
            5: "#473753", // Plum
            6: "gradient-gear-5-luffy", // Gear 5
            7: "gradient-sun-god", // SunGod
            8: "gradient-holographic-bubble", // Holographic Bubble
            9: "gradient-code", // Code blue
            "default": "#C597E1" // Light purple
        };
        
        const gradientDefinitions = `
        <defs>
            <linearGradient id="gradient-platinum" x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0" stop-color="#E5E4E2"/>
                <stop offset="0.2" stop-color="#D8D8D8"/>
                <stop offset="0.4" stop-color="#BEBEBE"/>
                <stop offset="0.6" stop-color="#A9A9A9"/>
                <stop offset="0.8" stop-color="#9E9E9E"/>
                <stop offset="1" stop-color="#A9A8D6"/>
            </linearGradient>
            <linearGradient id="gradient-gold" x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0" stop-color="#FFD700"/>
                <stop offset="0.1" stop-color="#FFCE00"/>
                <stop offset="0.2" stop-color="#FFBF00"/>
                <stop offset="0.3" stop-color="#FFB400"/>
                <stop offset="0.4" stop-color="#FFAA00"/>
                <stop offset="0.5" stop-color="#FFA000"/>
                <stop offset="0.6" stop-color="#FF9600"/>
                <stop offset="0.7" stop-color="#FF8C00"/>
                <stop offset="0.8" stop-color="#FF8000"/>
                <stop offset="0.9" stop-color="#FF7800"/>
                <stop offset="1" stop-color="#FF6F00"/>
            </linearGradient>
            <linearGradient id="gradient-gear-5-luffy" x1="0" y1="0" x2="0" y2="1"> 
                <stop offset="0" stop-color="#FFFFFF"/>
                <stop offset="0.5" stop-color="#E0E0E0"/>
                <stop offset="1" stop-color="#D3D3D3"/>
            </linearGradient>
            <linearGradient id="gradient-sun-god" x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse">
                <stop stop-color="#FFD700"/>
                <stop offset="0.15" stop-color="#FFB800"/>
                <stop offset="0.3" stop-color="#FF8C00"/>
                <stop offset="0.45" stop-color="#FF4500"/>
                <stop offset="0.6" stop-color="#FF0000"/>
                <stop offset="0.75" stop-color="#DC143C"/>
                <stop offset="0.9" stop-color="#B22222"/>
                <stop offset="1" stop-color="#8B0000"/>
            </linearGradient>
            <linearGradient id="gradient-holographic-bubble" x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0" stop-color="#00FFF7"/>
                <stop offset="0.25" stop-color="#00B3FF"/>
                <stop offset="0.5" stop-color="#9D00FF"/>
                <stop offset="0.75" stop-color="#FF0000"/>
                <stop offset="1" stop-color="#FFD000"/>
            </linearGradient>
            <linearGradient id="gradient-code" x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stop-color="#282C34" />
                <stop offset="20%" stop-color="#ABB2BF" />
                <stop offset="40%" stop-color="#528BFF" />
                <stop offset="60%" stop-color="#E06C75" />
                <stop offset="80%" stop-color="#C678DD" />
                <stop offset="100%" stop-color="#56B6C2" />
            </linearGradient>
        </defs>
    `;

        //Color Map for card
        const cardColorMap = {
            0: "#E06C75", // Atom Red
            1: "#98C379", // Atom Green
            2: "#56B6C2", // Atom Cyan
            3: "#ABB2BF", // Atom Gray
            4: "#61AFEF", // Atom Blue
            5: "#C678DD", // Atom Purple
            6: "#D19A66", // Atom Yellow
            7: "#E5C07B", // Atom Light Yellow
            8: "#BE5046", // Atom Light Red
            9: "#7F848E", // Atom Dark Gray
            "default": "#282C34" // Atom Dark Background
        };

        function isGradient(color) {
            return color.startsWith('gradient');
        }
    
        let svgs = [];
    
        // Card
        let cardColor;
        const selectedSVG = displayLegendarySVG() || displayCC();

        if (selectedSVG) {
            const svgContainer = document.getElementById('svg-container');
            svgContainer.style.zIndex = '1';

            const bodyParts = document.querySelectorAll('.body-part');
                bodyParts.forEach(part => {
                    part.style.zIndex = '-1';
            });

            const legendaryGradients = {
                'static/svg/NAT.svg': ['#1abc9c', '#d7ffd9', '#1abc9c'],
                'static/svg/blue.svg': ['#01a7b3', '#016a88', '#011627'],
                'static/svg/dracula.svg': ['#8BE9FD', '#6272A4', '#44475A'],
                'static/svg/mono.svg': ['#75715E', '#49483E', '#3E3D32'],
                'static/svg/nord.svg': ['#ECEFF4', '#434C5E', '#3B4252'],
                'static/svg/cyberpunk.svg': ['#9900FF', '#00FFFF', '#FF007F'],
                'static/svg/solarized.svg': ['#268BD2', '#CB4B16', '#002B36'],
                'static/svg/AO.svg': ['#E06C75', '#4F5B66', '#282C34'],
                'static/svg/oceanic.svg': ['#5FB3B3', '#4F5B66', '#1B2B34'],
                'static/svg/orange.svg': ['#D65D0E', '#3C3836', '#282828'],
                'static/svg/CC.svg': ['#ff6ec7', '#7b2cbf', '#3615d3', '#0c0d6b', '#0c0033']
            };


            const gradientColors = legendaryGradients[selectedSVG];


            svgs.push(`
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 550">
                ${gradientDefinitions}
                <defs>
                    <linearGradient id="card-gradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="${gradientColors[0]}" />
                        ${gradientColors.length === 5
                            ? `
                                <stop offset="20%" stop-color="${gradientColors[1]}" />
                                <stop offset="40%" stop-color="${gradientColors[2]}" />
                                <stop offset="60%" stop-color="${gradientColors[3]}" />
                                <stop offset="80%" stop-color="${gradientColors[4]}" />
                            `
                            : `
                                <stop offset="50%" stop-color="${gradientColors[1]}" />
                                <stop offset="100%" stop-color="${gradientColors[2]}" />
                            `}
                    </linearGradient>
                </defs>

                        <rect x="0" y="0" width="400" height="550" fill="url(#card-gradient)" rx="20" />
                        <text x="50%" y="15%" text-anchor="middle" font-family="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" font-size="36px" font-weight="bold" fill="#000" text-shadow="2px 2px 4px rgba(0, 0, 0, 0.5)">Coding Temple</text>
                        <line x1="0" y1="35%" x2="100%" y2="35%" stroke="#000" stroke-width="2" />
                        <text x="50%" y="90%" text-anchor="middle" font-size="18px" font-weight="bold" fill="#000">Student</text>
                        <line x1="0" y1="85%" x2="100%" y2="85%" stroke="#000" stroke-width="2" />
                        <text x="50%" y="70%" text-anchor="middle" font-size="10px" font-weight="bold" fill="#000">ID Number:</text>
                        <rect x="10%" y="72%" width="80%" height="50" rx="25" stroke="#000" stroke-width="2" fill="none" />
                        <text id="id-number" x="50%" y="77%" text-anchor="middle" font-size="10px" fill="#000">${generateCardID(blockNumber)}</text>
            </svg>
        `);
        } else {
            const svgContainer = document.getElementById('svg-container');
            svgContainer.style.zIndex = '';
    
            const bodyParts = document.querySelectorAll('.body-part');
            bodyParts.forEach(part => {
                part.style.zIndex = '';
            });
    
            // Change the card color based on the blockNumberDigits[1] (second digit)
            const cardColorDigit = blockNumberDigits[5];

            cardColor = specialCondition
                ? 'url(#gradient-gear-5-luffy)'
                : activeGradient
                ? `url(#${activeGradient})`
                : cardColorMap[cardColorDigit] || cardColorMap["default"];    

            svgs.push(`
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 550">
                    <rect x="0" y="0" width="400" height="550" fill="${cardColor}" rx="20" />
                    <text x="50%" y="15%" text-anchor="middle" font-family="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" font-size="36px" font-weight="bold" fill="#000" text-shadow="2px 2px 4px rgba(0, 0, 0, 0.5)">Coding Temple</text>
                    <line x1="0" y1="35%" x2="100%" y2="35%" stroke="#000" stroke-width="2" />
                    <text x="50%" y="90%" text-anchor="middle" font-size="18px" font-weight="bold" fill="#000">Student</text>
                    <line x1="0" y1="85%" x2="100%" y2="85%" stroke="#000" stroke-width="2" />
                    <text x="50%" y="70%" text-anchor="middle" font-size="10px" font-weight="bold" fill="#000">ID Number:</text>
                    <rect x="10%" y="72%" width="80%" height="50" rx="25" stroke="#000" stroke-width="2" fill="none" />
                    <text id="id-number" x="50%" y="77%" text-anchor="middle" font-size="10px" fill="#000">${generateCardID(blockNumber)}</text>

                    <linearGradient id="card-gradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="${cardColor}" />
                        <stop offset="50%" stop-color="${cardColor}" />
                        <stop offset="100%" stop-color="${cardColor}" />
                    </linearGradient>
                </svg>
            `);
        }

        // Fibonacci path & color generation
        const fibonacciNumbers = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765];
        if (fibonacciNumbers.includes(blockNumber)) {
            const fibonacciDigit = blockNumberDigits[5];
            const fibonacciColor = colorMap4[fibonacciDigit] || colorMap4[0];
            svgs.push(`
                <div class="fiboncci-trait" style="position: absolute; top: 0; left: 50%; width: 100%; height: 36%; transform: translate(-50%, 50%);">
                    <svg width="390" height="272" viewBox="0 0 390 272" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g style="mix-blend-mode:color-dodge">
                            <path d="M2.28213 269.691C2.28214 198.58 27.3975 130.381 72.1031 80.0975C116.809 29.8142 177.442 1.56528 240.666 1.56528" stroke="${fibonacciColor}" stroke-width="2.66667"/>
                        </g>
                        <g style="mix-blend-mode:color-dodge">
                            <path d="M388 167.282C388 123.331 372.477 81.1802 344.847 50.1023C317.216 19.0244 279.741 1.56506 240.666 1.56506" stroke="${fibonacciColor}" stroke-width="2.66667"/>
                        </g>
                        <g style="mix-blend-mode:color-dodge">
                            <path d="M296.951 269.691C321.099 269.691 344.258 258.901 361.333 239.696C378.408 220.49 388 194.442 388 167.282" stroke="${fibonacciColor}" stroke-width="2.66667"/>
                        </g>
                        <g style="mix-blend-mode:color-dodge">
                            <path d="M240.666 206.383C240.666 223.173 246.596 239.276 257.151 251.148C267.707 263.021 282.023 269.69 296.951 269.69" stroke="${fibonacciColor}" stroke-width="2.66667"/>
                        </g>
                        <g style="mix-blend-mode:color-dodge">
                            <path d="M240.666 206.384C240.666 196.013 244.329 186.068 250.848 178.735C257.368 171.402 266.21 167.282 275.43 167.282" stroke="${fibonacciColor}" stroke-width="2.66667"/>
                        </g>
                        <g style="mix-blend-mode:color-dodge">
                            <path d="M296.951 191.487C296.951 188.309 296.394 185.161 295.312 182.224C294.231 179.288 292.646 176.619 290.647 174.371C288.649 172.124 286.277 170.341 283.666 169.124C281.055 167.908 278.256 167.282 275.43 167.282" stroke="${fibonacciColor}" stroke-width="2.66667"/>
                        </g>
                        <g style="mix-blend-mode:color-dodge">
                            <path d="M296.951 191.487C296.951 193.443 296.608 195.38 295.943 197.187C295.277 198.995 294.302 200.637 293.072 202.02C291.842 203.403 290.382 204.5 288.775 205.249C287.169 205.997 285.447 206.383 283.707 206.383" stroke="${fibonacciColor}" stroke-width="2.66667"/>
                        </g>
                        <g style="mix-blend-mode:color-dodge">
                            <path d="M275.43 197.073C275.43 198.296 275.644 199.506 276.06 200.636C276.476 201.765 277.086 202.792 277.855 203.656C278.623 204.521 279.536 205.206 280.54 205.674C281.544 206.142 282.62 206.383 283.707 206.383" stroke="${fibonacciColor}" stroke-width="2.66667"/>
                        </g>
                        <g style="mix-blend-mode:color-dodge">
                            <path d="M275.43 197.074C275.43 195.592 275.954 194.171 276.885 193.124C277.816 192.076 279.08 191.488 280.397 191.488" stroke="${fibonacciColor}" stroke-width="2.66667"/>
                        </g>
                        <g style="mix-blend-mode:color-dodge">
                            <path d="M283.707 195.211C283.707 194.224 283.358 193.277 282.737 192.578C282.117 191.88 281.274 191.488 280.396 191.488" stroke="${fibonacciColor}" stroke-width="2.66667"/>
                        </g>
                        <g style="mix-blend-mode:color-dodge">
                            <path d="M283.707 195.212C283.707 195.456 283.664 195.698 283.581 195.924C283.498 196.15 283.376 196.355 283.222 196.528C283.069 196.701 282.886 196.838 282.685 196.932C282.485 197.025 282.269 197.073 282.052 197.073" stroke="${fibonacciColor}" stroke-width="2.66667"/>
                        </g>
                        <g style="mix-blend-mode:color-dodge">
                            <path d="M280.4 195.208C280.4 195.453 280.442 195.695 280.526 195.921C280.609 196.147 280.731 196.352 280.884 196.525C281.038 196.698 281.221 196.835 281.421 196.928C281.622 197.022 281.837 197.07 282.055 197.07" stroke="${fibonacciColor}" stroke-width="2.66667"/>
                        </g>
                    </svg>
                </div>
            `);
        }



        // Background
        svgs.push(`
            <div style="position: absolute; top: 34.9%; left: 50%; transform: translate(-50%, -50%);">
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="60" cy="60" r="60" fill="black"></circle>
                </svg>
            </div>
        `)

        // special conditions
        if (activeGradient || (specialCondition && activeGradient !== 'gradient-holographic-bubble')) {
            svgs.push(`
                <style>
                    .body-part > svg > path:first-child {
                        fill: ${specialCondition ? 'url(#gradient-gear-5-luffy)' : `url(#${activeGradient})`};
                    }
                    #eyes-part > svg > path:first-child {
                        fill: #FFFFFF;
                    }
                    #nose > svg > path:first-child {
                        fill: #000000;
                    }
                    #laptop-path-1,
                    #laptop-path-2,
                    #laptop-path-3 {
                        fill: ${specialCondition ? 'url(#gradient-gear-5-luffy)' : `url(#${activeGradient})`};
                    }
                </style>
            `);
        }

        if (specialCondition) {
            // G5
            svgs.push(`
                <div class="special-condition-svg" style="position: absolute; top: -34%; left: 0; width: 100%; height: 100%;">
                    <svg width="400" height="523" viewBox="0 0 707 523" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#filter0_f_114_2)">
                            <path d="M240 235.5C200 243.5 180.8 260.6 234 323C238 331 176.5 311 178 254.5C180.208 171.313 268.5 219 277 203C285.5 187 206.5 214.5 219 168C229 130.8 261.833 140.5 277 150C288.5 159 214.9 177.7 288.5 184.5C362.1 191.3 286 226.3 240 235.5Z" fill="url(#paint0_linear_114_2)"/>
                        </g>
                        <g filter="url(#filter1_f_114_2)">
                            <path d="M18.5 372C-34.3 416 71 533.5 151 516.5C90 511 17.5 426 44.5 404.5C60.5 396.5 118.9 337.8 60.5 305C2.10003 272.2 186 231.5 200.5 187C210.054 157.68 141.7 114.2 214.5 51C287.3 -12.2 202.5 9.33332 151 28C126.5 40 181 65.1 87 105.5C-7 145.9 47.8333 161 87 163.5C128 167.333 187 181.5 95 207.5C3 233.5 5.66669 275.667 18.5 293.5C30.5 306.5 71.3 328 18.5 372Z" fill="url(#paint1_linear_114_2)"/>
                        </g>
                        <g filter="url(#filter2_f_114_2)">
                            <path d="M684.277 372.202C746.5 404.702 631.777 533.702 551.777 516.702C612.777 511.202 685.277 426.202 658.277 404.702C642.277 396.702 583.877 338.002 642.277 305.202C700.677 272.402 462.5 233.04 502.277 187.202C573 105.703 421.423 39.9331 488.277 51.2026C537.5 59.5 395.223 -31.2025 496 19.4999C552 42.4999 718.091 105.703 615.777 105.703C531 105.703 684.277 163.702 615.777 163.702C574.777 167.536 515.777 181.702 607.777 207.702C699.777 233.702 697.11 275.869 684.277 293.702C672.277 306.702 623.356 340.383 684.277 372.202Z" fill="url(#paint2_linear_114_2)"/>
                        </g>
                        <g filter="url(#filter3_f_114_2)">
                            <path d="M424.5 232.5C450 218 493.173 230.57 439.968 323.483C435.967 335.395 550.004 231.948 495.973 221.487C416 206.003 385.463 161 396.964 144.804C411.609 124.18 439.968 123.5 454.969 92.6893C479.609 42.0829 263 -19.5 302 36.4999C302 49 459.07 107.133 385.463 117.258C311.856 127.383 399 247 424.5 232.5Z" fill="url(#paint3_linear_114_2)"/>
                        </g>
                        <defs>
                            <filter id="filter0_f_114_2" x="173.973" y="137.345" width="149.203" height="191.346" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                                <feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur_114_2"/>
                            </filter>
                            <filter id="filter1_f_114_2" x="0.265686" y="4.79752" width="246.511" height="517.371" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                                <feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur_114_2"/>
                            </filter>
                            <filter id="filter2_f_114_2" x="454.965" y="0.00836182" width="251.106" height="522.23" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                                <feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur_114_2"/>
                            </filter>
                            <filter id="filter3_f_114_2" x="293.287" y="10.2928" width="221.245" height="318.144" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                                <feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur_114_2"/>
                            </filter>
                            <linearGradient id="paint0_linear_114_2" x1="244.296" y1="141.345" x2="244.296" y2="323.014" gradientUnits="userSpaceOnUse">
                                <stop stop-color="white"/>
                                <stop offset="0.5" stop-color="#E0E0E0"/>
                                <stop offset="1" stop-color="#D3D3D3"/>
                            </linearGradient>
                            <linearGradient id="paint1_linear_114_2" x1="123.521" y1="8.79752" x2="123.521" y2="518.168" gradientUnits="userSpaceOnUse">
                                <stop stop-color="white"/>
                                <stop offset="0.5" stop-color="#E0E0E0"/>
                                <stop offset="1" stop-color="#D3D3D3"/>
                            </linearGradient>
                            <linearGradient id="paint2_linear_114_2" x1="579.256" y1="9" x2="579.256" y2="518.371" gradientUnits="userSpaceOnUse">
                                <stop stop-color="white"/>
                                <stop offset="0.5" stop-color="#E0E0E0"/>
                                <stop offset="1" stop-color="#D3D3D3"/>
                            </linearGradient>
                            <linearGradient id="paint3_linear_114_2" x1="429.671" y1="53" x2="429.671" y2="323.504" gradientUnits="userSpaceOnUse">
                                <stop stop-color="white"/>
                                <stop offset="0.5" stop-color="#E0E0E0"/>
                                <stop offset="1" stop-color="#D3D3D3"/>
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
            `);
        }
    

    

        // Generate hair color and path
        const hairDigit = blockNumberDigits[5];
        const hairColor = colorMap2[hairDigit] || colorMap2["default"];
    
        svgs.push(`
            <div class="body-part" style="position: absolute; top: 24.89%; left: 49.78%; transform: translateX(-50%);">
                <svg width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                ${isGradient(hairColor) ? `
                    <path d="M0.565491 2.58581C0.565491 1.50917 1.42369 0.636383 2.48239 0.636383H13.2172C14.276 0.636383 15.1342 1.50917 15.1342 2.58581V8.43403H0.565491V2.58581Z" fill="url(#${hairColor})"/>
                `:`
                    <path d="M0.565491 2.58581C0.565491 1.50917 1.42369 0.636383 2.48239 0.636383H13.2172C14.276 0.636383 15.1342 1.50917 15.1342 2.58581V8.43403H0.565491V2.58581Z" fill="${hairColor}"/>
                `}
                    <g style="mix-blend-mode:multiply">
                    <path d="M1.3382 3.75487C1.2354 2.64036 2.1529 1.70466 3.2492 1.80601C2.5554 2.44743 2.0139 3.24074 1.6656 4.1261L1.4281 4.73014L1.3382 3.75487Z" fill="black" fill-opacity="0.3"/>
                    </g>
                    <g style="mix-blend-mode:lighten">
                    <path d="M1.0881 3.37459C0.926304 2.32132 1.8345 1.42039 2.8658 1.61108C2.1819 2.11694 1.68 2.83692 1.4369 3.66068L1.2364 4.34028L1.0881 3.37459Z" fill="url(#paint1_linear_114_2)"/>
                    </g>
                    <path d="M1.14651 3.55995C1.04381 2.44545 1.96121 1.50974 3.05751 1.61109C2.36381 2.25251 1.82221 3.04583 1.47391 3.93118L1.23641 4.53523L1.14651 3.55995Z" fill="black"/>
                    ${gradientDefinitions}
                    <defs>
                    <linearGradient id="paint0_linear_114_2" x1="7.84979" y1="0.636383" x2="7.84979" y2="8.43403" gradientUnits="userSpaceOnUse">
                        <stop stop-color="${hairColor}"/>
                        <stop offset="0.5" stop-color="${hairColor}"/>
                        <stop offset="1" stop-color="${hairColor}"/>
                    </linearGradient>
                    <linearGradient id="paint1_linear_114_2" x1="1.8115" y1="1.22119" x2="1.8115" y2="4.34028" gradientUnits="userSpaceOnUse">
                        <stop stop-color="${hairColor}"/>
                        <stop offset="1" stop-color="${hairColor}"/>
                    </linearGradient>
                    </defs>                    
                </svg>
            </div>
        `);
    
        // Generate head color and path
        if (blockNumberStr.length >= 1) {
            const headDigit = blockNumberDigits[6];
            const headColor = colorMap[headDigit] || colorMap["default"];
    
            svgs.push(`
                <div class="body-part" style="position: absolute; top: 25.9%; left: 45.48%;">
                    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    ${isGradient(headColor) ? `
                        <path d="M0.747604 0.874542H31.9936V28.9462H16.3706H0.747604V0.874542Z" fill="url(#${headColor})"/>
                    `:`
                        <path d="M0.747604 0.874542H31.9936V28.9462H16.3706H0.747604V0.874542Z" fill="${headColor}"/>
                    `}
                        <g style="mix-blend-mode:multiply">
                            <path d="M4.5121 4.94143C4.9942 4.45116 5.6118 4.12207 6.2825 3.99811L9.3788 3.42557C9.8247 3.34309 10.0499 3.95143 9.6613 4.18858L8.1241 4.73235C6.3234 5.36926 4.9393 6.85645 4.4133 8.72001L3.6443 11.4439C3.5243 11.8685 2.903 11.7428 2.9521 11.304L3.563 6.8778C3.664 6.14468 3.9974 5.46496 4.5121 4.94143Z" fill="black" fill-opacity="0.2"/>
                        </g>
                        <g style="mix-blend-mode:multiply">
                            <path d="M21.5024 10.5095C20.0726 10.4204 18.8107 9.52807 18.231 8.19587L16.9631 5.28282C16.8863 5.10607 16.9484 4.89862 17.109 4.7954L17.8267 4.33441C18.0372 4.19936 18.3172 4.30309 18.3958 4.54309C19.2851 7.25326 21.3057 9.45211 23.9114 10.5205L24.3115 10.6844L21.5024 10.5095Z" fill="black" fill-opacity="0.2"/>
                        </g>
                        <g style="mix-blend-mode:lighten">
                            <path d="M3.09071 5.75234C3.12151 5.29695 3.46501 4.92749 3.91051 4.87085L3.62301 5.55312L3.14381 8.67221L2.95211 10.1343L2.76041 10.6217L3.09071 5.75234Z" fill="url(#paint1_linear_114_2)"/>
                        </g>
                        <path d="M4.3204 4.35657C4.8025 3.86641 5.4201 3.53732 6.0909 3.41325L9.1871 2.84071C9.633 2.75834 9.8582 3.36658 9.4696 3.60373C6.705 4.58163 4.5803 6.86498 3.7725 9.72607L3.4526 10.8591C3.3326 11.2836 2.7113 11.1579 2.7604 10.7191L3.3713 6.29295C3.4723 5.55983 3.8057 4.8801 4.3204 4.35657Z" fill="black"/>
                        <g style="mix-blend-mode:lighten">
                            <path d="M19.0543 4.28601L21.4505 7.60004L24.9968 10.1343L23.1757 9.35449L21.3546 7.98994L20.3003 6.6253L19.6294 5.45571L19.0543 4.28601Z" fill="url(#paint2_linear_114_2)"/>
                        </g>
                        <path d="M4.1022 15.2029C5.0471 14.5782 6.3159 15.0755 6.6042 16.1834L6.822 17.0202C6.8619 17.1727 6.91691 17.3209 6.98631 17.462L7.84451 19.2077C8.41111 20.3602 9.1969 21.3869 10.1563 22.2288L13.5911 25.2424L15.2726 25.388C17.1153 25.5475 18.964 25.1612 20.5959 24.2762L23.2085 22.8592C24.5722 22.1195 25.7398 21.0558 26.6116 19.758L29.2141 15.8851L30.4601 15.2029L29.4477 19.5632C29.0488 21.2811 28.0742 22.8041 26.6916 23.8711C26.2658 24.1994 25.8067 24.4805 25.3221 24.7094L24.5149 25.0905C23.7533 25.4501 22.9484 25.7063 22.121 25.8527L18.2952 26.5293C17.2744 26.7098 16.2318 26.7208 15.2076 26.5619L13.1137 26.2372C11.7855 26.031 10.5146 25.5433 9.3838 24.8057L9.16261 24.6612C7.14101 23.3424 5.68011 21.2999 5.06881 18.9377L4.1022 15.2029Z" fill="black" fill-opacity="0.3"/>
                        <g clip-path="url(#clip0_114_2)">
                            <path d="M22.2424 10.2295C21.1319 10.0454 20.1571 9.37472 19.5761 8.39509L17.0693 4.16876C16.952 3.97086 17.0287 3.71306 17.2344 3.61462L18.138 3.18221C18.3274 3.0916 18.5532 3.17214 18.6454 3.36313L19.528 5.1916C20.5221 7.25082 22.1985 8.8876 24.2622 9.81374L26.9137 11.0038L22.2424 10.2295Z" fill="black"/>
                        </g>
                        ${gradientDefinitions}
                        <defs>
                            <linearGradient id="paint0_linear_114_2" x1="16.3706" y1="0.874542" x2="16.3706" y2="28.9462" gradientUnits="userSpaceOnUse">
                                <stop offset="0.115" stop-color="${headColor}"/>
                                <stop offset="0.54" stop-color="${headColor}"/>
                                <stop offset="0.665" stop-color="${headColor}"/>
                                <stop offset="1" stop-color="${headColor}"/>
                            </linearGradient>
                            <linearGradient id="paint1_linear_114_2" x1="3.19171" y1="5.35817" x2="3.19171" y2="10.4267" gradientUnits="userSpaceOnUse">
                                <stop stop-color="${headColor}"/>
                                <stop offset="1" stop-color="${headColor}"/>
                            </linearGradient>
                            <linearGradient id="paint2_linear_114_2" x1="19.0543" y1="7.21015" x2="24.9968" y2="7.21015" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#50FBD9"/>
                                <stop offset="1" stop-color="#106857"/>
                            </linearGradient>
                            <clipPath id="clip0_114_2">
                                <rect width="10" height="9.15254" fill="white" transform="translate(17 2.2034)"/>
                            </clipPath>
                        </defs>
                    </svg>
                </div>
            `);
        }
    
        // Generate torso color and path
        const torsoDigit = blockNumberDigits[5];
        const torsoColor = colorMap2[torsoDigit] || colorMap2["default"];

        svgs.push(`
            <div class="body-part" style="position: absolute; top: 30.7%; left: 41.7%;">
                <svg width="64" height="43" viewBox="0 0 64 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                ${isGradient(torsoColor) ? `
                    <path d="M0.603806 11.6934C0.603806 6.31025 4.89511 1.94621 10.1885 1.94621H54.2779C59.5714 1.94621 63.8626 6.31025 63.8626 11.6934V35.8661C63.8626 39.6344 60.8588 42.6892 57.1533 42.6892H7.3131C3.6077 42.6892 0.603806 39.6344 0.603806 35.8661V11.6934Z" fill="url(#${torsoColor})"/>
                `:`
                    <path d="M0.603806 11.6934C0.603806 6.31025 4.89511 1.94621 10.1885 1.94621H54.2779C59.5714 1.94621 63.8626 6.31025 63.8626 11.6934V35.8661C63.8626 39.6344 60.8588 42.6892 57.1533 42.6892H7.3131C3.6077 42.6892 0.603806 39.6344 0.603806 35.8661V11.6934Z" fill="${torsoColor}"/>
                `}
                    <path d="M15.3562 1.06532C15.4842 1.00522 15.6303 0.998202 15.7635 1.04579L31.0831 6.52735L47.0801 1.00776C47.1485 0.984165 47.2225 0.982846 47.2919 1.0041C47.5953 1.09664 47.6293 1.51969 47.3446 1.66105L33.8019 8.39254C32.0847 9.24607 30.078 9.25329 28.3549 8.41227L15.3487 2.06335C14.935 1.86139 14.9394 1.26078 15.3562 1.06532Z" fill="black"/>
                    <path d="M16.131 1.94621L30.7955 6.91726L47.1853 1.5563H47.4728L43.5431 5.35776L39.6523 9.83051C39.3075 10.227 38.9314 10.5942 38.5279 10.9286L28.7827 19.0037C27.9136 19.9349 26.4439 18.8664 27.0291 17.7288L29.5311 12.8642C29.7569 12.4254 29.6076 11.8838 29.1907 11.6281L24.0303 8.46394C23.6208 8.21306 23.2305 7.93116 22.8625 7.62078L16.131 1.94621Z" fill="black"/>
                    <path d="M4.4316 27.6156C4.348 28.0831 3.6709 28.0211 3.6709 27.5459V17.4853C3.6709 14.9001 4.6808 12.4209 6.4783 10.5929L11.3074 5.68187C11.6912 5.29167 12.3165 5.30296 12.6865 5.70648L15.1219 8.36447C15.5408 8.82169 15.4344 9.55604 14.9036 9.87099L10.5493 12.454C8.1305 13.889 6.4497 16.3279 5.9486 19.1298L4.4316 27.6156Z" fill="black"/>
                    <path d="M57.0885 27.4238C57.1721 27.8913 57.8492 27.8291 57.8492 27.3541L57.849 17.2933C57.849 14.7081 56.8393 12.2291 55.0418 10.4011L50.2125 5.48986C49.8289 5.09986 49.2034 5.11095 48.8337 5.51467L46.3982 8.17267C45.9792 8.62979 46.0855 9.36413 46.6163 9.67898L50.9707 12.2622C53.3896 13.697 55.0704 16.1359 55.5713 18.9378L57.0885 27.4238Z" fill="black"/>
                    <g style="mix-blend-mode:multiply">
                    <path d="M17.5687 1.94621H31.1789H44.7891L39.6134 7.89201L23.607 7.11221L17.5687 1.94621Z" fill="black" fill-opacity="0.5"/>
                    </g>
                    <g style="mix-blend-mode:multiply">
                    <path d="M55.5125 25.2083C55.6315 25.6766 56.3164 25.5491 56.2647 25.0682L55.6394 19.2631C55.4279 17.3008 54.6357 15.4501 53.3672 13.9557L49.9357 9.91257C49.5372 9.44315 48.8147 9.46654 48.4463 9.96047L47.5282 11.192C47.2087 11.6206 47.2911 12.2316 47.7123 12.5569L50.7671 14.9169C52.4826 16.2424 53.709 18.1169 54.2484 20.2381L55.5125 25.2083Z" fill="black" fill-opacity="0.3"/>
                    </g>
                    <g style="mix-blend-mode:multiply">
                    <path d="M5.89591 25.2083C5.77671 25.6766 5.09171 25.5491 5.14351 25.0682L5.76901 19.2631C5.98021 17.3008 6.77251 15.4501 8.04091 13.9557L11.4724 9.91257C11.871 9.44315 12.5935 9.46654 12.9619 9.96047L13.8799 11.192C14.1995 11.6206 14.117 12.2316 13.6959 12.5569L10.6411 14.9169C8.92561 16.2424 7.6992 18.1169 7.1597 20.2381L5.89591 25.2083Z" fill="black" fill-opacity="0.3"/>
                    </g>
                    <g style="mix-blend-mode:multiply">
                    <path d="M36.163 12.3756L47.2812 1.45889L41.8179 12.9605L28.016 19.2961L36.163 12.3756Z" fill="#D9D9D9"/>
                    </g>
                    <g style="mix-blend-mode:multiply">
                    <path d="M61.1789 41.3246H3.0959V42.6892H61.1789V41.3246Z" fill="#D9D9D9"/>
                    </g>
                    ${gradientDefinitions}
                    <defs>
                        <linearGradient id="paint0_linear_114_2" x1="0.603806" y1="22.3177" x2="63.8626" y2="22.3177" gradientUnits="userSpaceOnUse">
                            <stop stop-color="${torsoColor}"/>
                            <stop offset="0.425" stop-color="${torsoColor}"/>
                            <stop offset="0.52" stop-color="${torsoColor}"/>
                            <stop offset="0.67" stop-color="${torsoColor}"/>
                            <stop offset="1" stop-color="${torsoColor}"/>
                        </linearGradient>
                    </defs>                
                </svg>
            </div>
        `);
    
        // Generate left leg color and path
        const leftLegDigit = blockNumberDigits[5];
        const leftLegColor = colorMap[leftLegDigit] || colorMap2[leftLegDigit] || colorMap["default"] || colorMap2["default"];
        svgs.push(`
            <div class="body-part" style="position: absolute; top: 41.74%; left: 41.5%;">
                <svg width="37" height="15" viewBox="0 0 37 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                ${isGradient(leftLegColor) ? `
                    <path d="M35.1515 13.7019C35.1147 13.9144 34.9159 14.0558 34.7073 14.0182L3.16877 8.36291C1.08347 7.98868 -0.308733 5.96698 0.0588672 3.84664L0.790368 -0.372879L36.4822 6.02698L35.1515 13.7019Z" fill="url(#${leftLegColor})"/>
                `:`
                    <path d="M35.1515 13.7019C35.1147 13.9144 34.9159 14.0558 34.7073 14.0182L3.16877 8.36291C1.08347 7.98868 -0.308733 5.96698 0.0588672 3.84664L0.790368 -0.372879L36.4822 6.02698L35.1515 13.7019Z" fill="${leftLegColor}"/>
                `}
                    ${gradientDefinitions}
                    <defs>
                        <linearGradient id="paint0_linear_117_211" x1="0.0918671" y1="3.65647" x2="35.8193" y2="9.85077" gradientUnits="userSpaceOnUse">
                            <stop stop-color="${leftLegColor}"/>
                            <stop offset="0.5" stop-color="${leftLegColor}"/>
                            <stop offset="1" stop-color="${leftLegColor}"/>
                        </linearGradient>
                    </defs>                
                </svg>
            </div>
        `);
    
        // Generate right leg color and path
        const rightLegDigit = blockNumberDigits[4];
        const rightLegColor = colorMap[rightLegDigit] || colorMap2[rightLegDigit] || colorMap["default"] || colorMap2["default"];
        svgs.push(`
            <div class="body-part" style="position: absolute; top: 41.56%; right: 40.7%;">
                <svg width="38" height="16" viewBox="0 0 38 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                ${isGradient(rightLegColor) ? `
                    <path d="M2.1391 14.6987C2.1759 14.9112 2.3746 15.0526 2.5832 15.015L34.1217 9.35971C36.207 8.98547 37.5992 6.96378 37.2316 4.84344L36.5001 0.623917L0.808304 7.02378L2.1391 14.6987Z" fill="url(#${rightLegColor})"/>
                `:`
                    <path d="M2.1391 14.6987C2.1759 14.9112 2.3746 15.0526 2.5832 15.015L34.1217 9.35971C36.207 8.98547 37.5992 6.96378 37.2316 4.84344L36.5001 0.623917L0.808304 7.02378L2.1391 14.6987Z" fill="${rightLegColor}"/>
                `}
                    ${gradientDefinitions}
                        <defs>
                            <linearGradient id="paint0_linear_117_213" x1="37.1988" y1="4.65327" x2="1.47139" y2="10.8476" gradientUnits="userSpaceOnUse">
                                <stop stop-color="${rightLegColor}"/>
                                <stop offset="1" stop-color="${rightLegColor}"/>
                            </linearGradient>
                        </defs>         
                </svg>
            </div>
        `);
    
        // Generate quads color and path
        const quadDigit = blockNumberDigits[6];
        const quadColor = colorMap2[quadDigit] || colorMap2["default"];
        svgs.push(`
            <div class="body-part" style="position: absolute; top: 38.34%; left: 39.46%;">
                <svg width="82" height="26" viewBox="0 0 82 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    ${isGradient(quadColor) ?  `
                        <path d="M0.594208 10.4363C0.594208 5.05318 4.88551 0.689148 10.1789 0.689148H43.5855H71.7124C77.0059 0.689148 81.2971 5.05318 81.2971 10.4363V21.1581C81.2971 23.3112 79.5807 25.0573 77.4632 25.0573H4.42811C2.31071 25.0573 0.594208 23.3112 0.594208 21.1581V10.4363Z" fill="url(#${quadColor})"/>
                    `:`
                        <path d="M0.594208 10.4363C0.594208 5.05318 4.88551 0.689148 10.1789 0.689148H43.5855H71.7124C77.0059 0.689148 81.2971 5.05318 81.2971 10.4363V21.1581C81.2971 23.3112 79.5807 25.0573 77.4632 25.0573H4.42811C2.31071 25.0573 0.594208 23.3112 0.594208 21.1581V10.4363Z" fill="${quadColor}"/>
                    `}
                    <g style="mix-blend-mode:multiply">
                    <path d="M8.6454 25.0573H78.0383V25.8363H8.6454V25.0573Z" fill="#D9D9D9"/>
                    </g>
                    ${gradientDefinitions}
                    <defs>
                        <linearGradient id="paint0_linear_114_2" x1="0.594208" y1="12.8731" x2="81.2971" y2="12.8731" gradientUnits="userSpaceOnUse">
                            <stop stop-color="${quadColor}"/>
                            <stop offset="0.59" stop-color="${quadColor}"/>
                            <stop offset="0.93" stop-color="${quadColor}"/>
                        </linearGradient>
                    </defs>
                </svg>
            </div>
        `);

        // Laptop
        const laptopDigit = blockNumberDigits[5];
        const laptopColor = colorMap2[laptopDigit] || colorMap2["default"];
        svgs.push(`
            <div class="laptop-part" style="position: absolute; top: 36.6%; right: 44.5%;">
                <svg width="45" height="28" viewBox="0 0 45 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.8722 0.392998H44.4696L43.1278 2.1182H0.284302L2.8722 0.392998Z" fill="black"/>
                    <path d="M35.8435 23.5879H8.23959V26.4633H35.8435V23.5879Z" fill="black"/>
                ${isGradient(laptopColor) ? `
                    <path id="laptop-path-1" d="M22.5679 25.8882H34.5016V24.9297L28.5348 25.8882L22.0415 24.9297L22.5679 25.8882Z" fill="url(#${laptopColor})" fill-opacity="0.44"/>
                ` : `
                    <path id="laptop-path-1" d="M22.5679 25.8882H34.5016V24.9297L28.5348 25.8882L22.0415 24.9297L22.5679 25.8882Z" fill="${laptopColor}" fill-opacity="0.44"/>
                `}
                ${isGradient(laptopColor) ? `
                    <path id="laptop-path-2" d="M12.6486 25.5116C12.6494 25.0882 11.8351 24.7434 10.8297 24.7415C9.8244 24.7395 9.0087 25.0812 9.0079 25.5045C9.0071 25.9279 9.82141 26.2727 10.8268 26.2746C11.8321 26.2766 12.6478 25.9349 12.6486 25.5116Z" fill="url(#${laptopColor})" fill-opacity="0.54"/>
                ` : `
                    <path id="laptop-path-2" d="M12.6486 25.5116C12.6494 25.0882 11.8351 24.7434 10.8297 24.7415C9.8244 24.7395 9.0087 25.0812 9.0079 25.5045C9.0071 25.9279 9.82141 26.2727 10.8268 26.2746C11.8321 26.2766 12.6478 25.9349 12.6486 25.5116Z" fill="${laptopColor}" fill-opacity="0.54"/>
                `}
                <path d="M-0.00320435 4.2268H43.2236L41.9776 20.7125H1.147L-0.00320435 4.2268Z" fill="black"/>
                ${isGradient(laptopColor) ? `
                    <path id="laptop-path-3" d="M21.9457 15.1534C24.0101 15.1534 25.6837 14.0376 25.6837 12.6613C25.6837 11.285 24.0101 10.1693 21.9457 10.1693C19.8812 10.1693 18.2077 11.285 18.2077 12.6613C18.2077 14.0376 19.8812 15.1534 21.9457 15.1534Z" fill="url(#${laptopColor})" fill-opacity="0.54"/>
                ` : `
                    <path id="laptop-path-3" d="M21.9457 15.1534C24.0101 15.1534 25.6837 14.0376 25.6837 12.6613C25.6837 11.285 24.0101 10.1693 21.9457 10.1693C19.8812 10.1693 18.2077 11.285 18.2077 12.6613C18.2077 14.0376 19.8812 15.1534 21.9457 15.1534Z" fill="${laptopColor}" fill-opacity="0.54"/>
                `}
                    <g style="mix-blend-mode:multiply">
                        <path d="M35.8435 26.4633H8.23959V27.6134H35.8435V26.4633Z" fill="black" fill-opacity="0.2"/>
                    </g>
                    <g style="mix-blend-mode:multiply">
                        <path d="M41.9776 20.7125H1.147V21.8626H41.9776V20.7125Z" fill="black" fill-opacity="0.3"/>
                    </g>
                    <defs>
                        ${isGradient(laptopColor) ? `
                            <linearGradient id="${laptopColor}" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stop-color="${colorMap2[laptopDigit] || colorMap2["default"]}"/>
                                <stop offset="100%" stop-color="${colorMap2[laptopDigit] || colorMap2["default"]}"/>
                            </linearGradient>
                        `: " "}
                    </defs>
                    ${gradientDefinitions}
                </svg>
            </div>
        `);

        // Face
        svgs.push(`
            <div class="face-part" style="position: absolute; top: 33.9%; left: 56.27%; transform: translate(-50%, -50%);">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.527191 10.0575L3.32759 9.3007C3.82409 9.1665 4.30889 8.9924 4.77739 8.7806L5.94919 8.2504C7.36139 7.6117 8.59739 6.64 9.55169 5.4186L9.78269 5.1229C10.256 4.5171 10.6547 3.8565 10.9702 3.1554L12.2205 0.376999L14.5194 4.6213C15.456 6.3505 16.902 7.7497 18.6608 8.6292L19.9737 9.2855C20.9946 9.796 22.0988 10.1202 23.2338 10.2423L27.7476 10.7284L26.5246 14.948C26.0699 16.5164 25.2121 17.9384 24.0366 19.0719C23.446 19.6412 22.7766 20.134 22.0583 20.5303C20.9492 21.1424 19.7183 21.5315 18.4583 21.6641L14.1995 22.1125C13.4578 22.1905 12.7095 22.1817 11.9697 22.0864L10.1471 21.8512C8.19049 21.5988 6.35939 20.7486 4.90389 19.4169L4.62359 19.1604C3.32359 17.9712 2.37659 16.4464 1.88659 14.754L0.527191 10.0575Z" fill="black"></path>
                </svg>
            </div>
        `)

        // Left ear
        const leftEarDigit = blockNumberDigits[4];
        const leftEarColor = colorMap2[leftEarDigit] || colorMap2["default"];
        svgs.push(`
            <div class="body-part" style="position: absolute; top: 28.37%; left: 44.73%;">
                <svg width="4" height="9" viewBox="0 0 4 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                ${isGradient(leftEarColor) ? `
                    <path d="M3.74759 0.153397H0.872192V8.9712H3.74759V0.153397Z" fill="url(#${leftEarColor})"/>
                `:`
                    <path d="M3.74759 0.153397H0.872192V8.9712H3.74759V0.153397Z" fill="${leftEarColor}"/>
                `}
                    <path d="M2.0224 3.9872L3.1725 4.9457V6.8626H2.0224V3.9872Z" fill="black"/>
                    ${gradientDefinitions}
                    <defs>
                        <linearGradient id="paint0_linear_17_959" x1="2.30989" y1="8.9712" x2="2.30989" y2="0.153397" gradientUnits="userSpaceOnUse">
                            <stop stop-color="${leftEarColor}"/>
                            <stop offset="1" stop-color="${leftEarColor}"/>
                        </linearGradient>
                    </defs>
                </svg>
            </div>
        `)

        // Right ear
        const rightEarDigit = blockNumberDigits[5];
        const rightEarColor = colorMap[rightEarDigit] || colorMap["default"] ;
        svgs.push(`
            <div class="body-part" style="position: absolute; top: 28.37%; right: 45.73%;">
                <svg width="3" height="9" viewBox="0 0 3 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                ${isGradient(rightEarColor) ? `
                    <path d="M2.869 0.153397H-0.00640106V8.9712H2.869V0.153397Z" fill="url(#${rightEarColor})"/>
                `:`
                    <path d="M2.869 0.153397H-0.00640106V8.9712H2.869V0.153397Z" fill="${rightEarColor}"/>
                `}
                    <path d="M0.760399 3.9872L1.9105 4.9457V6.8626H0.760399V3.9872Z" fill="black"/>
                    ${gradientDefinitions}
                    <defs>
                        <linearGradient id="paint0_linear_17_959" x1="1.4313" y1="8.9712" x2="1.4313" y2="0.153397" gradientUnits="userSpaceOnUse">
                            <stop stop-color="${rightEarColor}"/>
                            <stop offset="1" stop-color="${rightEarColor}"/>
                        </linearGradient>ffset="1" stop-color="${rightEarColor}"/>
                    </defs>
                </svg>
            </div>
        `)

        // Left Eye
        const leftEyeDigit = blockNumberDigits[6]
        const leftEyeColor = colorMap[leftEyeDigit] || colorMap["default"]
        svgs.push(`
            <div id="eyes-part" class="body-part" style="position: absolute; top: 28.85%; left: 47.2%;">
                <svg width="8" height="3" viewBox="0 0 8 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                ${isGradient(leftEyeColor) ? `
                    <path d="M4.26992 0.269559L7.28839 0.26955C7.46484 0.269536 7.16016 0.26955 7.28839 0.26955C6.0564 2.41328 3.154 2.77216 1.4527 0.990872L0.785151 0.26956C1 0.500014 0.699051 0.179357 0.785151 0.26956L4.26992 0.269559Z" fill="url(#${leftEyeColor})"/>
                `:`
                    <path d="M4.26992 0.269559L7.28839 0.26955C7.46484 0.269536 7.16016 0.26955 7.28839 0.26955C6.0564 2.41328 3.154 2.77216 1.4527 0.990872L0.785151 0.26956C1 0.500014 0.699051 0.179357 0.785151 0.26956L4.26992 0.269559Z" fill="${leftEyeColor}"/>
                `}
                    ${gradientDefinitions}
                    <defs>
                        <linearGradient id="paint0_linear_114_47" x1="3.7831" y1="1.63958" x2="3.7831" y2="-1.28456" gradientUnits="userSpaceOnUse">
                            <stop stop-color="${leftEyeColor}"/>
                            <stop offset="0.4"/>
                        </linearGradient>
                    </defs>
                </svg>
            </div>
        `)
 
        // Right Eye
        const rightEyeDigit = blockNumberDigits[5]
        const rightEyeColor = colorMap[rightEyeDigit] || colorMap["default"]
        svgs.push(`
            <div id="eyes-part" class="body-part" style="position: absolute; top: 28.899%; left: 50.15%;">
                <svg width="7" height="2" viewBox="0 0 7 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                ${isGradient(rightEyeColor) ? `
                    <path d="M3.07502 0.0164615L0.0565505 0.0164525C0.184784 0.0164529 -0.119904 0.0164381 0.0565505 0.0164525C1.28854 2.16018 4.19094 2.51906 5.89224 0.737774L6.55979 0.0164625C6.64589 -0.0737409 6.34494 0.246917 6.55979 0.0164625L3.07502 0.0164615Z" fill="url(#${rightEyeColor})"/>
                `:`
                    <path d="M3.07502 0.0164615L0.0565505 0.0164525C0.184784 0.0164529 -0.119904 0.0164381 0.0565505 0.0164525C1.28854 2.16018 4.19094 2.51906 5.89224 0.737774L6.55979 0.0164625C6.64589 -0.0737409 6.34494 0.246917 6.55979 0.0164625L3.07502 0.0164615Z" fill="${rightEyeColor}"/>
                `}
                    ${gradientDefinitions}
                    <defs>
                        <linearGradient id="paint0_linear_150_401" x1="3.56184" y1="1.38648" x2="3.56184" y2="-1.53765" gradientUnits="userSpaceOnUse">
                            <stop stop-color="${rightEyeColor}"/>
                            <stop offset="0.4"/>
                        </linearGradient>
                    </defs>
                </svg>
            </div>
        `)

        // Nose
        const noseDigit = blockNumberDigits[5];
        const noseColor = colorMap2[noseDigit] || colorMap2["default"];
        svgs.push(`
            <div class="body-part" style="position: absolute; top: 29.12%; left: 49%;">
                <svg width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                ${isGradient(noseColor) ? `
                    <path d="M1.3575 1.76359C1.7422 0.348193 3.7692 0.404894 4.0742 1.83969C4.1407 2.15199 4.3119 2.43229 4.5595 2.63369L5.2847 3.22379C5.7571 3.60789 5.6522 4.3563 5.0925 4.5959L4.8036 4.71969C3.5689 5.24839 2.1733 5.25779 0.931597 4.74599L0.5357 4.58289C-0.0439996 4.34399 -0.1778 3.58279 0.2857 3.16029L0.896498 2.60399C1.0983 2.41999 1.2436 2.18229 1.3153 1.91869L1.3575 1.76359Z" fill="url(#${noseColor})"/>
                `:`
                    <path d="M1.3575 1.76359C1.7422 0.348193 3.7692 0.404894 4.0742 1.83969C4.1407 2.15199 4.3119 2.43229 4.5595 2.63369L5.2847 3.22379C5.7571 3.60789 5.6522 4.3563 5.0925 4.5959L4.8036 4.71969C3.5689 5.24839 2.1733 5.25779 0.931597 4.74599L0.5357 4.58289C-0.0439996 4.34399 -0.1778 3.58279 0.2857 3.16029L0.896498 2.60399C1.0983 2.41999 1.2436 2.18229 1.3153 1.91869L1.3575 1.76359Z" fill="${noseColor}"/>
                `}
                    <path d="M1.69971 4.9713H3.80831V7.9571C3.80831 8.004 3.77441 8.0439 3.72821 8.0518L2.65811 8.23L1.78591 8.1428C1.73711 8.1378 1.69971 8.0966 1.69971 8.0475V4.9713Z" fill="url(#paint1_linear_nose)"/>
                    <g style="mix-blend-mode:multiply">
                        <path d="M3.80831 4.9713H1.69971V5.5463H3.80831V4.9713Z" fill="black" fill-opacity="0.3"/>
                    </g>
                ${gradientDefinitions}
                    <defs>
                        <linearGradient id="paint0_linear_17_959" x1="2.8698" y1="6.73139" x2="2.8694" y2="-3.81001" gradientUnits="userSpaceOnUse">
                            <stop stop-color="${noseColor}"/>
                            <stop offset="0.492422"/>
                        </linearGradient>
                        <linearGradient id="paint1_linear_nose" x1="2.75401" y1="4.9713" x2="2.75401" y2="8.23" gradientUnits="userSpaceOnUse">
                            <stop stop-color="${noseColor}"/>
                            <stop offset="1" stop-color="${noseColor}"/>
                        </linearGradient>
                    </defs>
                </svg>
            </div>
        `);

    
        // Combine SVG elements
        const svgContent = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 550" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
                <defs>
                    ${gradientDefinitions}
                </defs>
                ${svgs.join('')}
            </svg>
        `;

        
        return svgContent;
    }

    // Testing purposes
    function displayCC() {
        const blockNumberStr = blockNumber.toString();
        if (blockNumberStr.includes('3')){
            return 'static/svg/CC.svg';
        }
        return null;
      }


    // Function to update the ID number and traits in the DOM
    function updateCardID() {
        fetchBlockData()
            .then(([blockHeight, txCount]) => {
                const idNumberElement = document.getElementById('id-number');
                const cardID = generateCardID(blockNumber);
                idNumberElement.textContent = `ID: ${cardID.toString().padStart(5, '0')}`;

                displayTraits(blockHeight, txCount);

            })
            .catch(error => console.error('Error fetching Bitcoin block data:', error));
    }

    // Prime numbers
    function isPrime(num) {
        if (num <= 1) return false;
        if (num <= 3) return true;
        if (num % 2 === 0 || num % 3 === 0) return false;
    
        for (let i = 5; i * i <= num; i += 6) {
            if (num % i === 0 || num % (i + 2) === 0) {
                return false;
            }
        }
    
        return true;
    }
    
    function getHueRotateValue() {
        const primeHueRotateValues = [40, 80, 120, 160, 200, 240, 280, 320];
        const blockNumberStr = blockNumber.toString().padStart(5, '0');
        const blockNumberDigits = blockNumberStr.split('').map(Number);
    
        for (let i = 0; i < blockNumberDigits.length; i++) {
            const digit = blockNumberDigits[i];
            if (isPrime(digit)) {
                return primeHueRotateValues[i % primeHueRotateValues.length];
            }
        }
    
        return 0; // Default value if no prime digit is found
    }

    // Function to display traits based on block height and transaction count/blockNumbers
    function displayTraits(blockHeight, txCount) {
        const traitsContainer = document.getElementById('traits-container');
        traitsContainer.innerHTML = '';
        
        traitsContainer.style.position = 'absolute';
        traitsContainer.style.top = '0%';
        traitsContainer.style.left = '50%';
        traitsContainer.style.transform = 'translateX(-50%)';

        const combinedValue = blockHeight + txCount;
        // const bookOccurrence = combinedValue % 10 < 1;

        let graduationCapDisplayed = false;
        let vrGogglesDisplayed = false;
        let jsLogoDisplayed = false;
        let pythonLogoDisplayed = false;
        let btcLaptopDisplayed = false;
        let bookDisplayDisplayed = false;

        // Color Map for traits
        const traitsColorMap = {
            0: "hue-rotate(10deg)",
            1: "hue-rotate(40deg)",
            2: "hue-rotate(80deg)",
            3: "hue-rotate(120deg)",
            4: "hue-rotate(160deg)",
            5: "hue-rotate(200deg)",
            6: "hue-rotate(240deg)",
            7: "hue-rotate(280deg)",
            8: "hue-rotate(320deg)",
            "default": "hue-rotate(25deg)"
        };

        // Color Map for python logo
        const pythonLogoColorMap = {
            0: "#D62828", // Red
            1: "#F77F00", // Orange
            2: "#FCBF49", // Yellow
            3: "#EAB308", // Yellow-Green
            4: "#15803D", // Green
            5: "#38A169", // Lime Green
            6: "#4299E1", // Blue
            7: "#667EEA", // Indigo
            8: "#9F7AEA", // Violet
            9: "#C53030", // Crimson
            "default": "#718096" // Grey (default)
        };


    
        const blockNumberStr = blockNumber.toString();
        const blockNumberDigits = blockNumberStr.padStart(7, '0').split('').map(Number);
        const hasCamouflageFace = blockNumberDigits.some(isPrime);

        // Camouflage Trait from prime numbers
        if (hasCamouflageFace) {
            const camouflageSVG = 'static/svg/traits/camo.svg';
               
        
            const camouflageFaceElement = document.createElement('img');
            camouflageFaceElement.src = camouflageSVG
            camouflageFaceElement.alt = 'Camouflage face'
            camouflageFaceElement.style.position = 'absolute';
            camouflageFaceElement.style.top = '28.65%';
            camouflageFaceElement.style.left = '49.6%';
            camouflageFaceElement.style.transform = 'translate(-50%, -50%)';
            camouflageFaceElement.style.pointerEvents = 'none';

            const hueRotateValue = getHueRotateValue();
            camouflageFaceElement.style.filter = `hue-rotate(${hueRotateValue}deg)`;

            traitsContainer.appendChild(camouflageFaceElement);
        }

        // Graduation cap trait
        if (blockNumberStr.includes('5')) {
            const graduationCapSVG = 'static/svg/traits/grad.svg';
            const graduationCapElement = document.createElement('img');
            graduationCapElement.src = graduationCapSVG;
            graduationCapElement.alt = 'Graduation Cap';
            graduationCapElement.style.position = 'absolute';
            graduationCapElement.style.top = '20.59%';
            graduationCapElement.style.left = '49.3%';
            graduationCapElement.style.transform = 'translateX(-50%)';
            graduationCapElement.style.width = '55px';
            graduationCapElement.style.height = 'auto';
            traitsContainer.appendChild(graduationCapElement);
            graduationCapDisplayed = true;
        }

        // BTC laptop 1% chance of generating
        if (combinedValue % 1000 === 0){
            const btcLaptop = 'static/svg/traits/laptop.svg';
            const btcLaptopElement = document.createElement('img');
            btcLaptopElement.src = btcLaptop;
            btcLaptopElement.alt = 'Laptop';
            btcLaptopElement.style.position = 'absolute';
            btcLaptopElement.style.top = '26.34%';
            btcLaptopElement.style.left = '49.4%';
            btcLaptopElement.style.transform = 'translateX(-50%)';
            btcLaptopElement.style.width = '60px';
            btcLaptopElement.style.height = 'auto';
            traitsContainer.appendChild(btcLaptopElement);
            btcLaptopDisplayed = true;
        }

        // Vr Goggles
        if (blockNumberStr.includes('40') && !graduationCapDisplayed) {
            const vrGoggles = 'static/svg/traits/vr.svg';
            const vrGogglesElement = document.createElement('img');
            vrGogglesElement.src = vrGoggles;
            vrGogglesElement.alt = 'Vr';
            vrGogglesElement.style.position = 'absolute';
            vrGogglesElement.style.top = '24.7%';
            vrGogglesElement.style.left = '49.6%';
            vrGogglesElement.style.transform = 'translateX(-50%)';
            vrGogglesElement.style.width = '40px';
            vrGogglesElement.style.height = 'auto';
            traitsContainer.appendChild(vrGogglesElement);
            vrGogglesDisplayed = true;
        }

        // Left earring
        if (blockNumberStr.includes('60')) {
            const leftEarring = 'static/svg/traits/earrings.svg';
            const leftEarringElement = document.createElement('img');
            leftEarringElement.src = leftEarring;
            leftEarringElement.alt = 'earring';
            leftEarringElement.style.position = 'absolute';
            leftEarringElement.style.top = '29.69%';
            leftEarringElement.style.left = '44.7%';
            leftEarringElement.style.transform = 'translateX(-50%)';
            leftEarringElement.style.width = '5px';
            leftEarringElement.style.height = 'auto';
            traitsContainer.appendChild(leftEarringElement);
        }

        // Right earring chances of generation 40%
        if (combinedValue % 10 < 4) {
            const rightEarring = 'static/svg/traits/earrings.svg';
            const rightEarringElement = document.createElement('img');
            rightEarringElement.src = rightEarring;
            rightEarringElement.alt = 'earring';
            rightEarringElement.style.position = 'absolute';
            rightEarringElement.style.top = '29.69%';
            rightEarringElement.style.right = '44.7%';
            rightEarringElement.style.transform = 'translateX(-50%)';
            rightEarringElement.style.width = '5px';
            rightEarringElement.style.height = 'auto';
            traitsContainer.appendChild(rightEarringElement);
        }

        // Book trait
        if (blockNumberStr.includes('20') && !btcLaptopDisplayed) {
            const bookSVG = 'static/svg/traits/book.svg';
            const bookElement = document.createElement('img');
            bookElement.src = bookSVG;
            bookElement.alt = 'Book';
            bookElement.style.position = 'absolute';
            bookElement.style.top = '34.8%';
            bookElement.style.left = '49.69%';
            bookElement.style.transform = 'translateX(-50%)';
            bookElement.style.width = '60px';
            bookElement.style.height = 'auto';
            traitsContainer.appendChild(bookElement);
            bookDisplayDisplayed = true;
        }


        // Js Logo
        if (blockNumberStr.includes(5) && !pythonLogoDisplayed) {
            // if(true && !pythonLogoDisplayed) {
            const jsContainer = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            jsContainer.setAttribute('width', '20');
            jsContainer.setAttribute('height', '17');
            jsContainer.setAttribute('viewBox', '0 0 14 12');
            jsContainer.setAttribute('fill', 'none');
            jsContainer.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
            jsContainer.style.position = 'absolute';
            jsContainer.style.top = '34.8%';
            jsContainer.style.left = '60.9%';
            jsContainer.style.transform = 'translateX(-50%)';
    
            const traitsColorDigit = blockNumberDigits[6];
            const traitsColor = traitsColorMap[traitsColorDigit] || traitsColorMap["default"];
            jsContainer.style.filter = `${traitsColor} saturate(1)`;
    
            const svgContent = `
                <g clip-path="url(#clip0_74_1340)">
                    <path d="M1.17227 10.743L0 0.02005L14 0.0415984L12.7604 10.743L7.05284 11.98L1.17227 10.743Z" fill="#E9CA32"/>
                    <path d="M7.05284 10.9444V1.04126L12.8181 1.05563L11.79 9.91587L7.05284 10.9444Z" fill="#FFDE25"/>
                    <path d="M6.43548 2.21713H4.91129V8.80838L3.7258 8.63938V7.75209L2.31451 7.58309V9.56891L6.43548 10.3717V2.21713ZM7.57885 2.21713H11.7984L11.5161 3.48046H9.18964V5.55357H11.5161L11.2339 9.73792L7.57885 10.3717V9.06189L10.0484 8.42812L10.191 6.6958L7.57885 6.97889V2.21713Z" fill="white"/>
                </g>
                <defs>
                    <clipPath id="clip0_74_1340">
                        <rect width="14" height="12" fill="white"/>
                    </clipPath>
                </defs>
            `;
    
            jsContainer.innerHTML = svgContent;
            traitsContainer.appendChild(jsContainer);
            jsLogoDisplayed = true;
        }

        // Python trait
        if (blockNumberStr.includes('2') && !jsLogoDisplayed) {
            const pythonContainer = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            pythonContainer.setAttribute('width', '20');
            pythonContainer.setAttribute('height', '18');
            pythonContainer.setAttribute('viewBox', '0 0 19 17');
            pythonContainer.setAttribute('fill', 'none');
            pythonContainer.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
            pythonContainer.style.position = 'absolute';
            pythonContainer.style.top = '34.8%';
            pythonContainer.style.left = '60.9%';
            pythonContainer.style.transform = 'translateX(-50%)';
    
            const traitsColorDigit = blockNumberDigits[6];
            const pythonLogoColor = pythonLogoColorMap[traitsColorDigit] || pythonLogoColorMap["default"];

    
            const svgContent = `
                <path d="M9.37146 0C4.5788 0 4.87805 1.77751 4.87805 1.77751L4.88337 3.61906H9.45692V4.17194H3.06682C3.06682 4.17194 0 3.87448 0 8.01019C0 12.146 2.6768 11.9994 2.6768 11.9994H4.2743V10.0802C4.2743 10.0802 4.18818 7.79087 6.90838 7.79087H11.4445C11.4445 7.79087 13.9931 7.82609 13.9931 5.68436V2.14312C13.9931 2.14312 14.3801 0 9.37146 0ZM6.84961 1.23841C6.95768 1.23832 7.06472 1.25647 7.16459 1.2918C7.26445 1.32713 7.35519 1.37896 7.43162 1.44432C7.50804 1.50968 7.56864 1.58728 7.60995 1.67269C7.65127 1.75811 7.67248 1.84965 7.67238 1.94208C7.67248 2.03451 7.65127 2.12605 7.60995 2.21146C7.56864 2.29687 7.50804 2.37447 7.43162 2.43983C7.35519 2.50519 7.26445 2.55702 7.16459 2.59235C7.06472 2.62768 6.95768 2.64583 6.84961 2.64574C6.74153 2.64583 6.6345 2.62768 6.53463 2.59235C6.43476 2.55702 6.34402 2.50519 6.2676 2.43983C6.19118 2.37447 6.13058 2.29687 6.08926 2.21146C6.04795 2.12605 6.02673 2.03451 6.02683 1.94208C6.02673 1.84965 6.04795 1.75811 6.08926 1.67269C6.13058 1.58728 6.19118 1.50968 6.2676 1.44432C6.34402 1.37896 6.43476 1.32713 6.53463 1.2918C6.6345 1.25647 6.74153 1.23832 6.84961 1.23841Z" fill="${pythonLogoColor}"/>
                <path d="M9.62861 17C14.4213 17 14.122 15.2225 14.122 15.2225L14.1167 13.381H9.54308V12.8281H15.9332C15.9332 12.8281 19 13.1256 19 8.98974C19 4.85397 16.3232 5.00064 16.3232 5.00064H14.7257V6.91977C14.7257 6.91977 14.8118 9.20906 12.0916 9.20906H7.55548C7.55548 9.20906 5.00693 9.17385 5.00693 11.3156V14.8569C5.00693 14.8569 4.61994 17 9.62854 17H9.62861ZM12.1505 15.7617C12.0424 15.7618 11.9354 15.7437 11.8355 15.7083C11.7356 15.673 11.6449 15.6212 11.5685 15.5558C11.492 15.4904 11.4314 15.4128 11.3901 15.3274C11.3488 15.242 11.3276 15.1505 11.3277 15.0581C11.3276 14.9656 11.3488 14.8741 11.3901 14.7886C11.4314 14.7032 11.492 14.6256 11.5684 14.5603C11.6449 14.4949 11.7356 14.4431 11.8355 14.4077C11.9353 14.3724 12.0424 14.3542 12.1505 14.3543C12.2585 14.3542 12.3656 14.3724 12.4654 14.4077C12.5653 14.443 12.6561 14.4949 12.7325 14.5602C12.8089 14.6256 12.8695 14.7032 12.9108 14.7886C12.9521 14.874 12.9733 14.9656 12.9732 15.058C12.9733 15.1504 12.9521 15.242 12.9108 15.3274C12.8695 15.4128 12.8089 15.4904 12.7325 15.5557C12.6561 15.6211 12.5653 15.6729 12.4654 15.7083C12.3656 15.7436 12.2585 15.7618 12.1505 15.7617Z" fill="${pythonLogoColor}"/>
                <defs>
                    <linearGradient id="paint0_linear_17_959" x1="181.426" y1="144.468" x2="973.117" y2="1060.93" gradientUnits="userSpaceOnUse">
                        <stop stop-color="${pythonLogoColor}"/>
                        <stop offset="1" stop-color="${pythonLogoColor}"/>
                    </linearGradient>
                    <linearGradient id="paint1_linear_17_959" x1="272.792" y1="251.948" x2="1129.11" y2="1198.48" gradientUnits="userSpaceOnUse">
                        <stop stop-color="${pythonLogoColor}"/>
                        <stop offset="1" stop-color="${pythonLogoColor}"/>
                    </linearGradient>
                </defs>
            `;
    
            pythonContainer.innerHTML = svgContent;
            traitsContainer.appendChild(pythonContainer);
            pythonLogoDisplayed = true;
        }
        
        // Solidity Trait chances of generating 70%
        if (combinedValue % 10 < 7) {
            const solidityContainer = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            solidityContainer.setAttribute('width', '20');
            solidityContainer.setAttribute('height', '24');
            solidityContainer.setAttribute('viewBox', '0 0 14 17');
            solidityContainer.setAttribute('fill', 'none');
            solidityContainer.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
            solidityContainer.style.position = 'absolute';
            solidityContainer.style.top = '33.8%';
            solidityContainer.style.right = '57%';
            solidityContainer.style.transform = 'translateX(-50%)';
    
            const traitsColorDigit = blockNumberDigits[5];
            const traitsColor = traitsColorMap[traitsColorDigit] || traitsColorMap["default"];
            solidityContainer.style.filter = `${traitsColor} saturate(1)`;
    
            const svgContent = `
                <g clip-path="url(#clip0_79_1354)">
                    <path opacity="0.45" d="M10.4734 0.000259399L6.98076 4.85768H0L3.48998 0.000259399H10.4734Z" fill="white"/>
                    <path opacity="0.6" d="M6.98077 4.85768H13.9634L10.4737 0.000259399H3.48999L6.98077 4.85768Z" fill="#D65D0E"/>
                    <path opacity="0.8" d="M3.48998 9.713L6.98076 4.85768L3.48998 0.000259399L0 4.85768L3.48998 9.713Z" fill="#FE8019"/>
                    <path opacity="0.45" d="M3.52417 16.9996L7.01682 12.1422H14L10.5073 16.9996H3.52417Z" fill="white"/>
                    <path opacity="0.6" d="M7.01684 12.1422H0.0342102L3.52419 16.9996H10.5074L7.01684 12.1422Z" fill="#D65D0E"/>
                    <path opacity="0.8" d="M10.5074 7.28648L7.01685 12.1422L10.5074 16.9996L14 12.1422L10.5074 7.28648Z" fill="#FE8019"/>
                </g>
                <defs>
                    <clipPath id="clip0_79_1354">
                        <rect width="14" height="17" fill="white"/>
                    </clipPath>
                </defs>
            `;
    
            solidityContainer.innerHTML = svgContent;
            traitsContainer.appendChild(solidityContainer);
        }

        // ColorList for monocle
        const colorList = [
            ['#00FF00', '#0000FF', '#FFFF00'],
            ['#FF0000', '#00FF00', '#0000FF'],
            ['#FF00FF', '#00FFFF', '#FFFF00'],
            ['#FFFFFF', '#000000', '#808080'],
            ['#5E81AC', '#88C0D0', '#A3BE8C'],
            ['#FF00FF', '#00FF00', '#FFFF00'],
            ['#CB4B16', '#B58900', '#859900'],
            ['#E06C75', '#98C379', '#61AFEF'],
            ['#5FB3B3', '#99C794', '#C594C5'],
            ['#D65D0E', '#FE8019', '#A89984']
        ];



        // Mononcle trait
        if (!vrGogglesDisplayed) {
            const colorIndex = blockNumber % colorList.length;
            const rightEyeColors = colorList[colorIndex];
            
            if (blockNumber % 5 === 0) { 
                const rightEyeColor = rightEyeColors[blockNumber % rightEyeColors.length];
                
                const monocleSVG = `
                    <svg viewBox="0 0 11 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_104_1791)">
                            <path d="M5 2L5.5 1.5C5.77614 1.22386 6.22386 1.22386 6.5 1.5C6.77614 1.77614 6.77614 2.22386 6.5 2.5L6 3" stroke="url(#paint2_linear_104_1791)" stroke-width="0.29643"/>
                            <path d="M7.5 1.27487C7.36193 1.27487 7.25 1.3868 7.25 1.52487C7.25 1.66294 7.36193 1.77487 7.5 1.77487C7.63807 1.77487 7.75 1.66294 7.75 1.52487C7.75 1.3868 7.63807 1.27487 7.5 1.27487Z" fill="${rightEyeColor}"/>
                            <path d="M6 1.57794C7.11111 2.13349 11 0.466827 11 0.466827" stroke="url(#paint2_linear_104_1791)" stroke-width="0.01"/>
                            <path d="M8.5 1C8.36193 1 8.25 1.11193 8.25 1.25C8.25 1.38807 8.36193 1.5 8.5 1.5C8.63807 1.5 8.75 1.38807 8.75 1.25C8.75 1.11193 8.63807 1 8.5 1Z" fill="${rightEyeColor}"/>
                            <path d="M9.5 0.699997C9.36193 0.699997 9.25 0.811926 9.25 0.949997C9.25 1.08807 9.36193 1.2 9.5 1.2C9.63807 1.2 9.75 1.08807 9.75 0.949997C9.75 0.811926 9.63807 0.699997 9.5 0.699997Z" fill="${rightEyeColor}"/>
                            <path d="M10.5 0.400002C10.3619 0.400002 10.25 0.51193 10.25 0.650002C10.25 0.788073 10.3619 0.900002 10.5 0.900002C10.6381 0.900002 10.75 0.788073 10.75 0.650002C10.75 0.51193 10.6381 0.400002 10.5 0.400002Z" fill="${rightEyeColor}"/>
                            <path d="M2.86251 0.897769C1.28159 1.39359 0.334947 2.86353 0.748136 4.18097C1.16132 5.49841 2.77787 6.16446 4.3588 5.66863C5.93972 5.1728 6.88636 3.70286 6.47317 2.38543C6.05998 1.06799 4.44343 0.401943 2.86251 0.897769Z" fill="${rightEyeColor}"/>
                            <path d="M0.843556 4.15103C0.451779 2.90184 1.3472 1.47781 2.89246 0.99318C4.43772 0.508549 5.98599 1.16617 6.37777 2.41536C6.76954 3.66456 5.87413 5.08858 4.32887 5.57321C2.78361 6.05784 1.23534 5.40022 0.843556 4.15103Z" stroke="url(#paint2_linear_104_1791)" stroke-width="0.2"/>
                            <g filter="url(#filter0_f_104_1791)">
                                <path d="M3.5 4C4.32843 4 5 3.55228 5 3C5 2.44772 4.32843 2 3.5 2C2.67157 2 2 2.44772 2 3C2 3.55228 2.67157 4 3.5 4Z" fill="white"/>
                            </g>
                        </g>
                        <defs>
                            <filter id="filter0_f_104_1791" x="1" y="1" width="5" height="4" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                                <feGaussianBlur stdDeviation="0.5" result="effect1_foregroundBlur_104_1791"/>
                            </filter>
                            <clipPath id="clip0_104_1791">
                                <rect width="11" height="6" fill="white"/>
                            </clipPath>
                        </defs>
                    </svg>
                `;
                
                const monocleElement = document.createElement('div');
                monocleElement.innerHTML = monocleSVG;
                monocleElement.style.position = 'absolute';
                monocleElement.style.top = '28.2%';
                monocleElement.style.left = '49.9%';
                monocleElement.style.width = '14px';
                monocleElement.style.opacity = '0.6';
                
                traitsContainer.appendChild(monocleElement);
            }
        }

        // Tie trait
        if(blockNumberStr.includes('8')) {
            const tieSVG = `
                <svg width="9" height="25" viewBox="0 0 9 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.162408 19.9503L3.12375 4.65H5.87625L8.83956 19.9604L4.98756 24.7754L0.162408 19.9503Z" fill="black" stroke="#7A7A7A" stroke-width="0.3"/>
                    <path d="M1.34376 18.4648L4 20L4.00001 23L1.34376 18.4648Z" fill="#D9D9D9"/>
                    <path d="M2.5 0.15H6.5C6.96944 0.15 7.35 0.530558 7.35 1V3C7.35 4.02173 6.52173 4.85 5.5 4.85H3.5C2.47827 4.85 1.65 4.02173 1.65 3V1C1.65 0.530558 2.03056 0.15 2.5 0.15Z" fill="black" stroke="#7A7A7A" stroke-width="0.3"/>
                    <path d="M4 5.5V19L1.5 18L4 5.5Z" fill="#D9D9D9"/>
                </svg>`;
        

            const tieElement = document.createElement('div');
            tieElement.innerHTML = tieSVG;
            tieElement.style.position = 'absolute';
            tieElement.style.top = '31.1%';
            tieElement.style.left = '48.59%';
            tieElement.style.width = '14px';
        
            traitsContainer.appendChild(tieElement);
        }

        // Combo traits testing purposes
        if (blockNumberStr.includes('5')) {
            const graduationCapSVG = 'static/svg/traits/grad.svg';
            const graduationCapElement = document.createElement('img');
            graduationCapElement.src = graduationCapSVG;
            graduationCapElement.alt = 'Graduation Cap';
            graduationCapElement.style.position = 'absolute';
            graduationCapElement.style.top = '20.59%';
            graduationCapElement.style.left = '49.3%';
            graduationCapElement.style.transform = 'translateX(-50%)';
            graduationCapElement.style.width = '55px';
            graduationCapElement.style.height = 'auto';
            traitsContainer.appendChild(graduationCapElement);

            // Tie trait
            const tieSVG = `
                <svg width="9" height="25" viewBox="0 0 9 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.162408 19.9503L3.12375 4.65H5.87625L8.83956 19.9604L4.98756 24.7754L0.162408 19.9503Z" fill="black" stroke="#7A7A7A" stroke-width="0.3"/>
                    <path d="M1.34376 18.4648L4 20L4.00001 23L1.34376 18.4648Z" fill="#D9D9D9"/>
                    <path d="M2.5 0.15H6.5C6.96944 0.15 7.35 0.530558 7.35 1V3C7.35 4.02173 6.52173 4.85 5.5 4.85H3.5C2.47827 4.85 1.65 4.02173 1.65 3V1C1.65 0.530558 2.03056 0.15 2.5 0.15Z" fill="black" stroke="#7A7A7A" stroke-width="0.3"/>
                    <path d="M4 5.5V19L1.5 18L4 5.5Z" fill="#D9D9D9"/>            
                </svg>
            `;
            const tieElement = document.createElement('div');
            tieElement.innerHTML = tieSVG;
            tieElement.style.position = 'absolute';
            tieElement.style.top = '31.1%';
            tieElement.style.left = '48.59%';
            tieElement.style.width = '14px';
            traitsContainer.appendChild(tieElement);
        }

    // More...
    }

    // Function to display Legendary SVG's
    function displayLegendarySVG() {
        const blockNumberStr = blockNumber.toString();
        if (blockNumberStr.includes('19990')) {
            return 'static/svg/oceanic.svg';
        } else if (blockNumberStr.includes('19991')) {
            return 'static/svg/nord.svg';
        } else if (blockNumberStr.includes('19992')) {
            return 'static/svg/dracula.svg';
        } else if (blockNumberStr.includes('19993')) {
            return 'static/svg/mono.svg';
        } else if (blockNumberStr.includes('19994')) {
            return 'static/svg/cyberpunk.svg';
        } else if (blockNumberStr.includes('19995')) {
            return 'static/svg/solarized.svg';
        } else if (blockNumberStr.includes('19996')) {
            return 'static/svg/AO.svg';
        } else if (blockNumberStr.includes('19997')) {
            return 'static/svg/blue.svg';
        } else if (blockNumberStr.includes('19998')) {
            return 'static/svg/orange.svg';
        } else if (blockNumberStr.includes('19999')) {
            return 'static/svg/NAT.svg';
        }
    
        return null;
    }
    
    // Function to update card background
    function updateCardBackground(selectedSVG) {
        const cardContainer = document.getElementById('card-container');
        if (!cardContainer) {
            return;
        }


        const existingLegendaryBackground = cardContainer.querySelector('.legendary-background');
        if (existingLegendaryBackground) {
            existingLegendaryBackground.remove();
        }
    
        if (selectedSVG) {
            const legendaryBackground = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            legendaryBackground.setAttribute('class', 'legendary-background');
            legendaryBackground.setAttribute('x', '0');
            legendaryBackground.setAttribute('y', '0');
            legendaryBackground.setAttribute('width', '400');
            legendaryBackground.setAttribute('height', '550');
            legendaryBackground.setAttribute('fill', 'url(#card-gradient)');
            legendaryBackground.style.pointerEvents = 'none';
    
            const cardGradient = document.getElementById('card-gradient');
            const stopElements = cardGradient.querySelectorAll('stop');
    
            if (selectedSVG === 'static/svg/CC.svg') {
                stopElements[0].setAttribute('stop-color', '#ff6ec7');
                stopElements[1].setAttribute('stop-color', '#7b2cbf');
                stopElements[2].setAttribute('stop-color', '#3615d3');
            } else if (selectedSVG === 'static/svg/NAT.svg') {
                stopElements[0].setAttribute('stop-color', '#1abc9c');
                stopElements[1].setAttribute('stop-color', '#d7ffd9');
                stopElements[2].setAttribute('stop-color', '#1abc9c');
            } else if (selectedSVG === 'static/svg/blue.svg') {
                stopElements[0].setAttribute('stop-color', '#01a7b3');
                stopElements[1].setAttribute('stop-color', '#016a88');
                stopElements[2].setAttribute('stop-color', '#011627');
            } else if (selectedSVG === 'static/svg/dracula.svg') {
                stopElements[0].setAttribute('stop-color', '#8BE9FD');
                stopElements[1].setAttribute('stop-color', '#6272A4');
                stopElements[2].setAttribute('stop-color', '#44475A');
            } else if (selectedSVG === 'static/svg/mono.svg') {
                stopElements[0].setAttribute('stop-color', '#75715E');
                stopElements[1].setAttribute('stop-color', '#49483E');
                stopElements[2].setAttribute('stop-color', '#3E3D32');
            } else if (selectedSVG === 'static/svg/nord.svg') {
                stopElements[0].setAttribute('stop-color', '#ECEFF4');
                stopElements[1].setAttribute('stop-color', '#434C5E');
                stopElements[2].setAttribute('stop-color', '#3B4252');
            } else if (selectedSVG === 'static/svg/cyberpunk.svg') {
                stopElements[0].setAttribute('stop-color', '#9900FF');
                stopElements[1].setAttribute('stop-color', '#00FFFF');
                stopElements[2].setAttribute('stop-color', '#FF007F');
            } else if (selectedSVG === 'static/svg/solarized.svg') {
                stopElements[0].setAttribute('stop-color', '#268BD2');
                stopElements[1].setAttribute('stop-color', '#CB4B16');
                stopElements[2].setAttribute('stop-color', '#002B36');
            } else if (selectedSVG === 'static/svg/AO.svg') {
                stopElements[0].setAttribute('stop-color', '#E06C75');
                stopElements[1].setAttribute('stop-color', '#4F5B66');
                stopElements[2].setAttribute('stop-color', '#282C34');
            } else if (selectedSVG === 'static/svg/oceanic.svg') {
                stopElements[0].setAttribute('stop-color', '#5FB3B3');
                stopElements[1].setAttribute('stop-color', '#4F5B66');
                stopElements[2].setAttribute('stop-color', '#1B2B34');
            } else if (selectedSVG === 'static/svg/orange.svg') {
                stopElements[0].setAttribute('stop-color', '#D65D0E');
                stopElements[1].setAttribute('stop-color', '#3C3836');
                stopElements[2].setAttribute('stop-color', '#282828');
            }
    
            cardContainer.appendChild(legendaryBackground);
            
        } else {
            return;
        }
    }
    

    // BinarySequence background generation
    function generateBinarySequence(binarySequenceBackground, blockNumberStr) {
        console.log('Generating binary sequence...');
        console.log('Block number:', blockNumberStr);
      
        // Clear existing binary sequence
        while (binarySequenceBackground.firstChild) {
          binarySequenceBackground.removeChild(binarySequenceBackground.firstChild);
        }
      
        const numRows = 20;
        const cellHeight = 40;
        const offsetX = 20;
        const offsetY = 20;
      
        for (let row = 0; row < numRows; row++) {
          // Left column
          const textLeft = document.createElementNS('http://www.w3.org/2000/svg', 'text');
          textLeft.setAttribute('x', offsetX);
          textLeft.setAttribute('y', offsetY + row * cellHeight);
          textLeft.setAttribute('text-anchor', 'start');
          textLeft.setAttribute('dominant-baseline', 'middle');
          textLeft.setAttribute('font-size', '24');
          textLeft.setAttribute('style', 'position: absolute; z-index: 2');
          binarySequenceBackground.appendChild(textLeft);
      
          // Right column
          const textRight = document.createElementNS('http://www.w3.org/2000/svg', 'text');
          textRight.setAttribute('x', 400 - offsetX);
          textRight.setAttribute('y', offsetY + row * cellHeight);
          textRight.setAttribute('text-anchor', 'end');
          textRight.setAttribute('dominant-baseline', 'middle');
          textRight.setAttribute('font-size', '24');
          textRight.setAttribute('style', 'position: absolute; z-index: 2');
      
          binarySequenceBackground.appendChild(textRight);
        }
      
        console.log('Binary sequence generated.');
      }


    
    const colorMap3 = {
        0: "#A3D2D5", // Mint
        1: "#7FCDB8", // Teal
        2: "#8E96B5", // Lavender
        3: "#00FF75", // Lime
        4: "#0000FF", // Blue
        5: "#4B0082", // Indigo
        6: "#9400D3", // Violet
        7: "#FF1493", // Deep Pink
        8: "#00FFFF", // Cyan
        9: "#FF00FF", // Magenta
        "default": "#64787C" // Silver (default)
    };
    
    const colorMap4 = {
        0: "#FF4136", // Red
        1: "#FF851B", // Orange
        2: "#FFDC00", // Yellow
        3: "#2ECC40", // Green
        4: "#0074D9", // Blue
        5: "#B10DC9", // Purple
        6: "#F012BE", // Fuchsia
        7: "#85144B", // Maroon
        8: "#39CCCC", // Teal
        9: "#AAAAAA", // Gray
        "default": "#FFFFFF" // White (default)
    };

    // Function to animate binary sequence
    function animateBinarySequence(binarySequenceBackground, blockNumberStr, colorMap3, colorMap4) {
        console.log('Animating binary sequence...');
        console.log('Block number:', blockNumberStr);
      
        const binaryArray = blockNumberStr.split('').map(Number).map(digit => digit.toString(2).padStart(4, '0')).join('').split('').map(Number);
        const blockNumberDigits = blockNumberStr.padStart(3, '0').split('').map(Number);
      
        let index = 0;
        setInterval(() => {
          const texts = binarySequenceBackground.querySelectorAll('text');
          texts.forEach((text, i) => {
            text.textContent = binaryArray[(index + i) % binaryArray.length];
            const digitIndex = (index + i) % blockNumberDigits.length;
            const color = colorMap3[blockNumberDigits[digitIndex]] || colorMap3["default"];
            const legendaryColor = colorMap4[blockNumberDigits[digitIndex]] || colorMap4["default"];
            const legendaryTrait = document.querySelector('#traits-container img[alt="Legendary SVG"]');
      
            if (legendaryTrait) {
              const legendaryImageSrc = legendaryTrait.src;
              if (legendaryImageSrc.includes('static/svg/oceanic.svg')) {
                text.setAttribute('fill', legendaryColor);
              } else if (legendaryImageSrc.includes('static/svg/nord.svg')) {
                text.setAttribute('fill', legendaryColor);
              } else {
                text.setAttribute('fill', color);
              }
            } else {
              text.setAttribute('fill', color);
            }
          });
          index++;
        }, 100);
      
        console.log('Binary sequence animation started.');
      }

      // Function to mint a new card
      async function mintNewCard() {
        try {
          blockNumber = (blockNumber + 1) % 1000;
          const [blockHeight, txCount] = await fetchBlockData();
          console.log('Minting new card...');
          console.log('Block height:', blockHeight);
          console.log('Transaction count:', txCount);
      
          const blockNumberStr = blockNumber.toString();
          const binarySequenceBackground = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
          const generatedSVGContainer = document.getElementById('generated-svg-container');
          const svgImageElement = document.getElementById('svg-image');
      
          const selectedSVG = displayLegendarySVG(blockNumberStr) || displayCC(blockNumberStr);
          const svgContent = generateSVGContent();
      
          if (selectedSVG) {
            svgImageElement.src = selectedSVG;
            svgImageElement.style.visibility = 'visible';
            svgImageElement.style.zIndex = '1';
            generatedSVGContainer.style.visibility = 'hidden';
          } else {
            svgImageElement.src = 'static/svg/NAT.svg';
            svgImageElement.style.visibility = 'hidden';
            generatedSVGContainer.style.visibility = 'visible';
            generatedSVGContainer.style.zIndex = '1';
          }
      
          generatedSVGContainer.innerHTML = svgContent;
      
          const newSVGContainer = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
          newSVGContainer.setAttribute('viewBox', '0 0 400 550');
          newSVGContainer.innerHTML = svgContent;
      
          const traitsContainer = document.getElementById('traits-container');
          traitsContainer.appendChild(newSVGContainer);
      
          // Use requestAnimationFrame to modify the style after the element has been rendered
          requestAnimationFrame(() => {
            newSVGContainer.style.position = 'absolute';
            newSVGContainer.style.top = '0';
            newSVGContainer.style.left = '0';
            newSVGContainer.style.width = '100%';
            newSVGContainer.style.height = '100%';
          });
      
          updateCardID();
      
          const cardContainer = document.getElementById('card-container');
      
          // Remove existing binary sequence background
          const existingBinarySequenceBackground = document.getElementById('binary-sequence-background');
          if (existingBinarySequenceBackground && existingBinarySequenceBackground.parentNode === cardContainer) {
            cardContainer.removeChild(existingBinarySequenceBackground);
          }
      
          binarySequenceBackground.setAttribute('id', 'binary-sequence-background');
          binarySequenceBackground.setAttribute('viewBox', '0 0 400 550');
          binarySequenceBackground.setAttribute('style', 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 2;');
      
          const binarySequencePattern = document.createElementNS('http://www.w3.org/2000/svg', 'pattern');
          binarySequencePattern.setAttribute('id', 'binary-sequence-pattern');
          binarySequencePattern.setAttribute('x', '0');
          binarySequencePattern.setAttribute('y', '0');
          binarySequencePattern.setAttribute('width', '400');
          binarySequencePattern.setAttribute('height', '550');
          binarySequencePattern.setAttribute('patternUnits', 'userSpaceOnUse');
      
          const binarySequenceRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
          binarySequenceRect.setAttribute('x', '0');
          binarySequenceRect.setAttribute('y', '0');
          binarySequenceRect.setAttribute('width', '400');
          binarySequenceRect.setAttribute('height', '550');
          binarySequenceRect.setAttribute('fill', 'transparent');
      
          const binarySequenceDefs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
          binarySequenceDefs.appendChild(binarySequencePattern);
          binarySequencePattern.appendChild(binarySequenceRect);
      
          const binarySequenceBackgroundRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
          binarySequenceBackgroundRect.setAttribute('x', '0');
          binarySequenceBackgroundRect.setAttribute('y', '0');
          binarySequenceBackgroundRect.setAttribute('width', '400');
          binarySequenceBackgroundRect.setAttribute('height', '550');
          binarySequenceBackgroundRect.setAttribute('fill', 'url(#binary-sequence-pattern)');
      
          binarySequenceBackground.appendChild(binarySequenceDefs);
          binarySequenceBackground.appendChild(binarySequenceBackgroundRect);
      
          cardContainer.appendChild(binarySequenceBackground);
      
          // Check for specific block numbers to animate the binary sequence
          if (blockNumber % 2 === 0 || blockNumberStr.includes('5')) {
            generateBinarySequence(binarySequenceBackground, blockNumberStr);
            animateBinarySequence(binarySequenceBackground, blockNumberStr, colorMap3, colorMap4);
          }
      
          updateCardBackground(selectedSVG);
      
          console.log('New card minted.');
        } catch (error) {
          console.error('Error minting new card:', error);
        }
      }

    // function mintNewCard() {
    //     blockNumber = (blockNumber + 1) % 1000;
    //     fetchBlockData()
    //       .then(([blockHeight, txCount]) => {
    //         console.log('Minting new card...');
    //         console.log('Block height:', blockHeight);
    //         console.log('Transaction count:', txCount);
      
    //         const blockNumberStr = blockNumber.toString();
    //         const binarySequenceBackground = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    //         const generatedSVGContainer = document.getElementById('generated-svg-container');
    //         const svgImageElement = document.getElementById('svg-image');
      
    //         const selectedSVG = displayLegendarySVG(blockNumberStr) || displayCC(blockNumberStr);
    //         const svgContent = generateSVGContent();
      
    //         if (selectedSVG) {
    //           svgImageElement.src = selectedSVG;
    //           svgImageElement.style.visibility = 'visible';
    //           svgImageElement.style.zIndex = '1';
    //           generatedSVGContainer.style.visibility = 'hidden';
    //         } else {
    //           svgImageElement.src = 'static/svg/NAT.svg';
    //           svgImageElement.style.visibility = 'hidden';
    //           generatedSVGContainer.style.visibility = 'visible';
    //           generatedSVGContainer.style.zIndex = '1';
    //         }
      
    //         generatedSVGContainer.innerHTML = svgContent;
      
    //         const newSVGContainer = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    //         newSVGContainer.setAttribute('viewBox', '0 0 400 550');
    //         newSVGContainer.innerHTML = svgContent;
      
    //         const traitsContainer = document.getElementById('traits-container');
    //         traitsContainer.appendChild(newSVGContainer);
      
    //         // Use requestAnimationFrame to modify the style after the element has been rendered
    //         requestAnimationFrame(() => {
    //           newSVGContainer.style.position = 'absolute';
    //           newSVGContainer.style.top = '0';
    //           newSVGContainer.style.left = '0';
    //           newSVGContainer.style.width = '100%';
    //           newSVGContainer.style.height = '100%';
    //         });
      
    //         updateCardID();
      
    //         const cardContainer = document.getElementById('card-container');
      
    //         // Remove existing binary sequence background
    //         const existingBinarySequenceBackground = document.getElementById('binary-sequence-background');
    //         if (existingBinarySequenceBackground && existingBinarySequenceBackground.parentNode === cardContainer) {
    //           cardContainer.removeChild(existingBinarySequenceBackground);
    //         }
      
    //         binarySequenceBackground.setAttribute('id', 'binary-sequence-background');
    //         binarySequenceBackground.setAttribute('viewBox', '0 0 400 550');
    //         binarySequenceBackground.setAttribute('style', 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 2;');
      
    //         const binarySequencePattern = document.createElementNS('http://www.w3.org/2000/svg', 'pattern');
    //         binarySequencePattern.setAttribute('id', 'binary-sequence-pattern');
    //         binarySequencePattern.setAttribute('x', '0');
    //         binarySequencePattern.setAttribute('y', '0');
    //         binarySequencePattern.setAttribute('width', '400');
    //         binarySequencePattern.setAttribute('height', '550');
    //         binarySequencePattern.setAttribute('patternUnits', 'userSpaceOnUse');
      
    //         const binarySequenceRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    //         binarySequenceRect.setAttribute('x', '0');
    //         binarySequenceRect.setAttribute('y', '0');
    //         binarySequenceRect.setAttribute('width', '400');
    //         binarySequenceRect.setAttribute('height', '550');
    //         binarySequenceRect.setAttribute('fill', 'transparent');
      
    //         const binarySequenceDefs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    //         binarySequenceDefs.appendChild(binarySequencePattern);
    //         binarySequencePattern.appendChild(binarySequenceRect);
      
    //         const binarySequenceBackgroundRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    //         binarySequenceBackgroundRect.setAttribute('x', '0');
    //         binarySequenceBackgroundRect.setAttribute('y', '0');
    //         binarySequenceBackgroundRect.setAttribute('width', '400');
    //         binarySequenceBackgroundRect.setAttribute('height', '550');
    //         binarySequenceBackgroundRect.setAttribute('fill', 'url(#binary-sequence-pattern)');
      
    //         binarySequenceBackground.appendChild(binarySequenceDefs);
    //         binarySequenceBackground.appendChild(binarySequenceBackgroundRect);
      
    //         cardContainer.appendChild(binarySequenceBackground);
      
    //         // Check for specific block numbers to animate the binary sequence
    //         if (blockNumber % 2 === 0 || blockNumberStr.includes('5')){
    //           generateBinarySequence(binarySequenceBackground, blockNumberStr);
    //           animateBinarySequence(binarySequenceBackground, blockNumberStr, colorMap3, colorMap4);
    //         }
      
    //         updateCardBackground(selectedSVG);
      
    //         console.log('New card minted.');
    //       })
    //       .catch(error => console.error('Error fetching Bitcoin block data:', error));
    //   }


    // Attach event listener for minting new card
    const mintCardButton = document.getElementById('mint-card-button');
    if (mintCardButton) {
        mintCardButton.addEventListener('click', mintNewCard);
    }
}); 