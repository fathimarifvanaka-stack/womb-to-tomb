/* =========================================================
   WOMB TO TOMB - Life Simulation Engine
   Cartoon Character SVGs & Dynamic Mechanics
========================================================= */

// Game State Object
let gameState = {
    health: 82,
    energy: 76,
    activity: 64,
    gender: 'boy', // 'boy' or 'girl'
    currentStageIndex: 0,
    timeLeft: 60,
    timerInterval: null,
    splashTimeout: null,
    screenTimeCount: 0,
    healthyChoicesCount: 0,
    unhealthyChoicesCount: 0
};

// SVG Cartoon Character Generator Function for All Life Stages
function getCharacterCartoonSVG(stageIndex, gender = 'boy', health = 80, energy = 80, isDirtyDiaper = false) {
    const isGirl = gender === 'girl';
    const isLowEnergy = energy < 45 || health < 45;

    // Color definitions
    const skinColor = "#fbcfe8";
    const hairColor = isGirl ? (stageIndex > 5 ? "#475569" : "#e11d48") : "#1e293b";
    const shirtColor = isGirl ? "#ec4899" : "#3b82f6";
    const pantsColor = isGirl ? "#f472b6" : "#1d4ed8";

    switch (stageIndex) {
        case 0: { // Age 0 Infant (Detailed Cartoon Baby with Realistic Face Expressions & Movements)
            const isDirty = isDirtyDiaper || health < 50;
            const isHappy = !isDirty && health >= 70;
            const isCrying = isDirty || health < 40;

            return `
            <div class="detailed-baby-container ${isCrying ? 'crying-state' : (isHappy ? 'happy-state' : 'neutral-state')}">
                ${isHappy ? `
                    <div class="baby-particles">
                        <span class="particle p1">❤️</span>
                        <span class="particle p2">✨</span>
                        <span class="particle p3">💖</span>
                    </div>
                ` : ''}

                ${isCrying ? `
                    <div class="baby-tears">
                        <span class="tear tear-left">💧</span>
                        <span class="tear tear-right">💧</span>
                    </div>
                ` : ''}

                <svg viewBox="0 0 160 180" class="cartoon-char-svg baby-detailed-svg">
                    <ellipse cx="80" cy="165" rx="45" ry="12" fill="#000000" opacity="0.1" />

                    <!-- Kicking Baby Legs -->
                    <g class="baby-leg-left">
                        <ellipse cx="52" cy="142" rx="14" ry="18" fill="#fbcfe8" />
                        <circle cx="46" cy="154" r="8" fill="#fbcfe8" />
                    </g>
                    <g class="baby-leg-right">
                        <ellipse cx="108" cy="142" rx="14" ry="18" fill="#fbcfe8" />
                        <circle cx="114" cy="154" r="8" fill="#fbcfe8" />
                    </g>

                    <!-- Breathing Baby Torso -->
                    <g class="baby-torso">
                        <ellipse cx="80" cy="115" rx="36" ry="32" fill="${isGirl ? '#f472b6' : '#38bdf8'}" />
                        <path d="M 65 88 Q 80 98 95 88" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round"/>
                        <circle cx="80" cy="105" r="3" fill="#ffffff"/>
                        <circle cx="80" cy="120" r="3" fill="#ffffff"/>
                        <!-- Diaper: Dirty brown stain if dirty, Crisp Pampers White if clean -->
                        <path d="M 48 128 Q 80 148 112 128 Q 100 152 60 152 Z" fill="${isDirty ? '#854d0e' : '#ffffff'}" stroke="#cbd5e1" stroke-width="2"/>
                    </g>

                    <!-- Reaching Baby Arms -->
                    <g class="baby-arm-left">
                        <path d="M 48 98 Q 28 85 32 68" fill="none" stroke="#fbcfe8" stroke-width="12" stroke-linecap="round"/>
                        <circle cx="32" cy="65" r="7" fill="#fbcfe8"/>
                    </g>
                    <g class="baby-arm-right">
                        <path d="M 112 98 Q 132 85 128 68" fill="none" stroke="#fbcfe8" stroke-width="12" stroke-linecap="round"/>
                        <circle cx="128" cy="65" r="7" fill="#fbcfe8"/>
                    </g>

                    <!-- Tilting Baby Head with Detailed Face Expressions -->
                    <g class="baby-head">
                        <circle cx="80" cy="58" r="40" fill="#fbcfe8" />
                        ${isGirl ?
                    '<path d="M 68 20 Q 80 8 92 20 Q 92 30 80 24 Q 68 30 68 20 Z" fill="#ec4899" />' :
                    '<path d="M 75 22 Q 80 8 85 22 M 72 26 Q 80 14 88 26" fill="none" stroke="#1e293b" stroke-width="4" stroke-linecap="round"/>'
                }

                        ${isCrying ? `
                            <path d="M 58 50 L 68 56 L 58 62" fill="none" stroke="#0f172a" stroke-width="4" stroke-linecap="round"/>
                            <path d="M 102 50 L 92 56 L 102 62" fill="none" stroke="#0f172a" stroke-width="4" stroke-linecap="round"/>
                        ` : `
                            <circle cx="63" cy="54" r="6.5" fill="#0f172a" />
                            <circle cx="97" cy="54" r="6.5" fill="#0f172a" />
                            <circle cx="65" cy="51" r="2.5" fill="#ffffff" />
                            <circle cx="99" cy="51" r="2.5" fill="#ffffff" />
                        `}

                        <!-- Rosy Blushing Cheeks -->
                        <ellipse cx="54" cy="64" rx="8" ry="5.5" fill="#f43f5e" opacity="0.6"/>
                        <ellipse cx="106" cy="64" rx="8" ry="5.5" fill="#f43f5e" opacity="0.6"/>

                        ${isCrying ? `
                            <path d="M 68 68 Q 80 92 92 68 Z" fill="#991b1b" stroke="#e11d48" stroke-width="2.5"/>
                        ` : (isHappy ? `
                            <!-- Bright Joyful Smiling Face 😊 -->
                            <path d="M 66 66 Q 80 84 94 66" fill="#f43f5e" stroke="#e11d48" stroke-width="3.5" stroke-linecap="round"/>
                            <path d="M 70 70 Q 80 78 90 70" fill="#ffffff"/>
                        ` : `
                            <path d="M 70 68 Q 80 80 90 68" fill="#f43f5e" stroke="#e11d48" stroke-width="3" stroke-linecap="round"/>
                        `)}
                    </g>
                </svg>
            </div>`;
        }

        case 1: // Age 3 Toddler
            return `
            <svg viewBox="0 0 120 160" class="cartoon-char-svg toddler-anim">
                <!-- Legs & Shoes -->
                <rect x="42" y="115" width="12" height="25" rx="6" fill="${pantsColor}" />
                <rect x="66" y="115" width="12" height="25" rx="6" fill="${pantsColor}" />
                <ellipse cx="48" cy="140" rx="10" ry="6" fill="#ef4444" />
                <ellipse cx="72" cy="140" rx="10" ry="6" fill="#ef4444" />
                <!-- Shirt / Dress -->
                <path d="M 35 75 Q 60 70 85 75 L 88 115 Q 60 120 32 115 Z" fill="${shirtColor}" />
                <!-- Head -->
                <circle cx="60" cy="45" r="28" fill="${skinColor}" />
                <!-- Hair -->
                <path d="M 34 40 Q 60 15 86 40 Q 86 25 60 22 Q 34 25 34 40 Z" fill="${hairColor}" />
                ${isGirl ? '<circle cx="34" cy="30" r="7" fill="#f43f5e"/><circle cx="86" cy="30" r="7" fill="#f43f5e"/>' : ''}
                <!-- Eyes -->
                <circle cx="48" cy="42" r="4.5" fill="#0f172a" />
                <circle cx="72" cy="42" r="4.5" fill="#0f172a" />
                <!-- Mouth -->
                <path d="M 52 53 Q 60 60 68 53" fill="none" stroke="#e11d48" stroke-width="3" stroke-linecap="round"/>
            </svg>`;

        case 2: // Age 6 Kid
            return `
            <svg viewBox="0 0 120 180" class="cartoon-char-svg kid-anim">
                <!-- Legs -->
                <rect x="42" y="125" width="12" height="35" rx="6" fill="${pantsColor}" />
                <rect x="66" y="125" width="12" height="35" rx="6" fill="${pantsColor}" />
                <ellipse cx="48" cy="160" rx="10" ry="6" fill="#10b981" />
                <ellipse cx="72" cy="160" rx="10" ry="6" fill="#10b981" />
                <!-- Torso -->
                <path d="M 32 70 Q 60 65 88 70 L 86 125 Q 60 128 34 125 Z" fill="${shirtColor}" />
                <!-- Arms -->
                <path d="M 32 75 L 18 105" fill="none" stroke="${skinColor}" stroke-width="9" stroke-linecap="round"/>
                <path d="M 88 75 L 102 105" fill="none" stroke="${skinColor}" stroke-width="9" stroke-linecap="round"/>
                <!-- Head -->
                <circle cx="60" cy="42" r="26" fill="${skinColor}" />
                <!-- Hair -->
                <path d="M 34 38 C 30 15, 90 15, 86 38 Z" fill="${hairColor}" />
                <!-- Eyes & Face -->
                <circle cx="48" cy="40" r="4" fill="#0f172a" />
                <circle cx="72" cy="40" r="4" fill="#0f172a" />
                <path d="M 52 50 Q 60 56 68 50" fill="none" stroke="#e11d48" stroke-width="3" stroke-linecap="round"/>
            </svg>`;

        case 3: // Age 9 Older Kid
            return `
            <svg viewBox="0 0 120 190" class="cartoon-char-svg kid-anim">
                <rect x="42" y="130" width="12" height="42" rx="6" fill="${pantsColor}" />
                <rect x="66" y="130" width="12" height="42" rx="6" fill="${pantsColor}" />
                <ellipse cx="48" cy="172" rx="11" ry="6" fill="#6366f1" />
                <ellipse cx="72" cy="172" rx="11" ry="6" fill="#6366f1" />
                <path d="M 30 68 Q 60 62 90 68 L 86 130 Q 60 133 34 130 Z" fill="${shirtColor}" />
                <!-- Cool Graphic Stripe -->
                <rect x="45" y="80" width="30" height="20" rx="4" fill="#facc15"/>
                <circle cx="60" cy="40" r="25" fill="${skinColor}" />
                <path d="M 34 35 C 30 10, 90 10, 86 35 Z" fill="${hairColor}" />
                <circle cx="48" cy="38" r="4" fill="#0f172a" />
                <circle cx="72" cy="38" r="4" fill="#0f172a" />
                <path d="M 52 48 Q 60 55 68 48" fill="none" stroke="#e11d48" stroke-width="3" stroke-linecap="round"/>
            </svg>`;

        case 4: // Age 12 Teenager
            return `
            <svg viewBox="0 0 120 200" class="cartoon-char-svg teen-anim">
                <rect x="42" y="135" width="12" height="48" rx="6" fill="#1e293b" />
                <rect x="66" y="135" width="12" height="48" rx="6" fill="#1e293b" />
                <ellipse cx="48" cy="183" rx="12" ry="6" fill="#ec4899" />
                <ellipse cx="72" cy="183" rx="12" ry="6" fill="#ec4899" />
                <!-- Hoodie -->
                <path d="M 28 65 Q 60 60 92 65 L 88 135 Q 60 138 32 135 Z" fill="${shirtColor}" />
                <!-- Hoodie Strings -->
                <path d="M 54 75 L 54 95" stroke="#ffffff" stroke-width="2"/>
                <path d="M 66 75 L 66 95" stroke="#ffffff" stroke-width="2"/>
                <circle cx="60" cy="38" r="24" fill="${skinColor}" />
                <path d="M 34 32 C 30 5, 90 5, 86 32 Z" fill="${hairColor}" />
                <!-- Cool Headphones -->
                <path d="M 34 35 A 26 26 0 0 1 86 35" fill="none" stroke="#f59e0b" stroke-width="5"/>
                <rect x="30" y="30" width="8" height="16" rx="4" fill="#f59e0b"/>
                <rect x="82" y="30" width="8" height="16" rx="4" fill="#f59e0b"/>
                <circle cx="48" cy="36" r="3.5" fill="#0f172a" />
                <circle cx="72" cy="36" r="3.5" fill="#0f172a" />
                <path d="M 54 45 Q 60 50 66 45" fill="none" stroke="#e11d48" stroke-width="3" stroke-linecap="round"/>
            </svg>`;

        case 5: // Age 18 Young Adult
            return `
            <svg viewBox="0 0 120 210" class="cartoon-char-svg adult-anim">
                <rect x="42" y="140" width="12" height="55" rx="6" fill="#0f172a" />
                <rect x="66" y="140" width="12" height="55" rx="6" fill="#0f172a" />
                <ellipse cx="48" cy="195" rx="12" ry="6" fill="#3b82f6" />
                <ellipse cx="72" cy="195" rx="12" ry="6" fill="#3b82f6" />
                <path d="M 26 62 Q 60 56 94 62 L 88 140 Q 60 144 32 140 Z" fill="${shirtColor}" />
                <circle cx="60" cy="35" r="23" fill="${skinColor}" />
                <path d="M 35 28 C 30 2, 90 2, 85 28 Z" fill="${hairColor}" />
                <circle cx="48" cy="33" r="3.5" fill="#0f172a" />
                <circle cx="72" cy="33" r="3.5" fill="#0f172a" />
                <path d="M 52 42 Q 60 48 68 42" fill="none" stroke="#e11d48" stroke-width="3" stroke-linecap="round"/>
            </svg>`;

        case 6: // Age 30 Adult
            return `
            <svg viewBox="0 0 120 210" class="cartoon-char-svg adult-anim">
                <rect x="42" y="140" width="12" height="55" rx="6" fill="#334155" />
                <rect x="66" y="140" width="12" height="55" rx="6" fill="#334155" />
                <ellipse cx="48" cy="195" rx="12" ry="6" fill="#1e293b" />
                <ellipse cx="72" cy="195" rx="12" ry="6" fill="#1e293b" />
                <path d="M 26 62 Q 60 56 94 62 L 88 140 Q 60 144 32 140 Z" fill="${shirtColor}" />
                <!-- Collar -->
                <polygon points="50,62 60,78 70,62" fill="#ffffff" />
                <circle cx="60" cy="35" r="23" fill="${skinColor}" />
                <path d="M 35 28 C 30 2, 90 2, 85 28 Z" fill="${hairColor}" />
                <circle cx="48" cy="33" r="3.5" fill="#0f172a" />
                <circle cx="72" cy="33" r="3.5" fill="#0f172a" />
                <path d="M 52 43 Q 60 48 68 43" fill="none" stroke="#e11d48" stroke-width="3" stroke-linecap="round"/>
            </svg>`;

        default: // Old Age (Senior)
            return `
            <svg viewBox="0 0 130 210" class="cartoon-char-svg senior-anim">
                <!-- Legs -->
                <rect x="42" y="140" width="12" height="55" rx="6" fill="#475569" />
                <rect x="66" y="140" width="12" height="55" rx="6" fill="#475569" />
                <ellipse cx="48" cy="195" rx="12" ry="6" fill="#1e293b" />
                <ellipse cx="72" cy="195" rx="12" ry="6" fill="#1e293b" />
                <!-- Walking Stick (If Low Energy) -->
                ${isLowEnergy ? '<path d="M 98 110 L 98 195 M 90 110 L 105 110" fill="none" stroke="#78350f" stroke-width="5" stroke-linecap="round"/>' : ''}
                <!-- Sweater -->
                <path d="M 26 65 Q 60 60 94 65 L 88 140 Q 60 144 32 140 Z" fill="${isLowEnergy ? '#64748b' : '#15803d'}" />
                <!-- Senior Head -->
                <circle cx="60" cy="36" r="24" fill="${skinColor}" />
                <!-- Grey/White Hair -->
                <path d="M 34 32 C 30 5, 90 5, 86 32 Z" fill="#94a3b8" />
                <!-- Glasses -->
                <circle cx="48" cy="34" r="7" fill="none" stroke="#475569" stroke-width="2"/>
                <circle cx="72" cy="34" r="7" fill="none" stroke="#475569" stroke-width="2"/>
                <line x1="55" y1="34" x2="65" y2="34" stroke="#475569" stroke-width="2"/>
                <!-- Wrinkle / Smile -->
                <path d="M 52 45 Q 60 50 68 45" fill="none" stroke="#e11d48" stroke-width="2.5" stroke-linecap="round"/>
            </svg>`;
    }
}

// Life Stages Data Array
const lifeStages = [
    {
        stageName: "NEWBORN (Age 0)",
        title: "Welcome to Life",
        description: "You are a newborn. Your first need is simple: milk and love.",
        bgClass: "hospital-room",
        choices: [
            {
                name: "🥛 Warm Milk",
                img: "🥛",
                health: 5, energy: 10, activity: 0,
                expression: "😊",
                isHealthy: true,
                message: "The baby is happy and satisfied after feeding!"
            },
            {
                name: "🍼 Extra Bottle",
                img: "🍼",
                health: 3, energy: 8, activity: 0,
                expression: "😋",
                isHealthy: true,
                message: "The baby enjoys the extra milk!"
            }
        ]
    },
    {
        stageName: "TODDLER (Age 3)",
        title: "Discovering Tastes",
        description: "You are a growing child! What food would you like to eat today?",
        bgClass: "kitchen-room",
        choices: [
            {
                name: "🍎 Fresh Fruits",
                img: "🍎",
                health: 10, energy: 5, activity: 2,
                expression: "😖",
                isHealthy: true,
                message: "You make a cute face ('I don't like fruits!'), but it's very healthy!"
            },
            {
                name: "🥛 Chocolate Milk",
                img: "🥛",
                health: 5, energy: 10, activity: 2,
                expression: "😋",
                isHealthy: true,
                message: "Yummy! You love chocolate milk."
            },
            {
                name: "🍟 Lays Chips",
                img: "🍟",
                health: -8, energy: 4, activity: -2,
                expression: "😋",
                isHealthy: false,
                message: "Tasty chips! But not the best for your tummy."
            },
            {
                name: "🍭 Kolumittayi (Lollipop)",
                img: "🍭",
                health: -6, energy: 6, activity: 0,
                expression: "😋",
                isHealthy: false,
                message: "Sweet candy joy!"
            },
            {
                name: "🍦 Ice Cream",
                img: "🍦",
                health: -4, energy: 5, activity: 0,
                expression: "😋",
                isHealthy: false,
                message: "Cool and sweet treat!"
            }
        ]
    },
    {
        stageName: "CHILDHOOD (Age 6)",
        title: "Living Room Decision",
        description: "You are sitting in your living room with an olive green sofa and wooden table. What do you want to do?",
        bgClass: "living-room",
        hasLivingRoomProps: true,
        showThoughtBubble: true,
        choices: [
            {
                name: "🎮 Play Mobile Games",
                img: "📱",
                health: -6, energy: -12, activity: -8,
                expression: "🎮",
                isHealthy: false,
                isScreenTime: true,
                message: "You played on the mobile phone! You smiled, but your energy dropped and dark circles appeared under your eyes."
            },
            {
                name: "⚽ Go Outside to Play",
                img: "🚪",
                health: 10, energy: 8, activity: 12,
                expression: "😊",
                isHealthy: true,
                isOutdoorMinigame: true,
                message: "You walked out the door into the fresh air to play outdoor games!"
            }
        ]
    },
    {
        stageName: "SCHOOL AGE (Age 9)",
        title: "Daily Choices & Food",
        description: "Your daily habits and food choices start shaping your energy and health.",
        bgClass: "school-room",
        choices: [
            {
                name: "🍛 Dosa & Sambar",
                img: "🍛",
                health: 10, energy: 8, activity: 4,
                expression: "😊",
                isHealthy: true,
                message: "A delicious, traditional healthy meal!"
            },
            {
                name: "🍟 Burger & Fast Food",
                img: "🍔",
                health: -10, energy: 4, activity: -4,
                expression: "😋",
                isHealthy: false,
                message: "Greasy burger treat! Tasty but lowers long term health."
            },
            {
                name: "🥤 Coca Cola",
                img: "🥤",
                health: -8, energy: -4, activity: -2,
                expression: "😋",
                isHealthy: false,
                message: "Sugary drink gives quick sugar high then energy crash."
            },
            {
                name: "💧 Pure Water",
                img: "💧",
                health: 8, energy: 6, activity: 4,
                expression: "😊",
                isHealthy: true,
                message: "Staying hydrated keeps you feeling great!"
            },
            {
                name: "📕 Study Books",
                img: "📚",
                health: 4, energy: 2, activity: 2,
                expression: "🙂",
                isHealthy: true,
                message: "Learning expands your knowledge!"
            },
            {
                name: "⚽ Outdoor Play",
                img: "⚽",
                health: 8, energy: 10, activity: 14,
                expression: "😄",
                isHealthy: true,
                message: "Playing outdoor games keeps you fit and energized!"
            }
        ]
    },
    {
        stageName: "TEENAGER (Age 12)",
        title: "Teen Years & Lifestyle",
        description: "School, sports, and food options compete for your time.",
        bgClass: "teen-room",
        choices: [
            {
                name: "⚽ Sports Practice",
                img: "⚽",
                health: 10, energy: 10, activity: 14,
                expression: "😄",
                isHealthy: true,
                message: "Active sports training builds strong stamina!"
            },
            {
                name: "🎮 Late Night Gaming",
                img: "🎮",
                health: -6, energy: -10, activity: -8,
                expression: "😴",
                isHealthy: false,
                isScreenTime: true,
                message: "Gaming late drained your sleep and energy."
            },
            {
                name: "🥗 Healthy Balanced Meals",
                img: "🥗",
                health: 10, energy: 8, activity: 4,
                expression: "😊",
                isHealthy: true,
                message: "Good nutrition keeps your body strong!"
            }
        ]
    },
    {
        stageName: "YOUNG ADULT (Age 18)",
        title: "Independent Living",
        description: "You are becoming a young adult. Your daily routines build long term health.",
        bgClass: "adult-room",
        choices: [
            {
                name: "🏋️ Gym & Fitness",
                img: "🏋️",
                health: 12, energy: 10, activity: 15,
                expression: "😄",
                isHealthy: true,
                message: "Working out builds great posture and vitality!"
            },
            {
                name: "🍕 Fast Food & Soda",
                img: "🍕",
                health: -12, energy: -5, activity: -6,
                expression: "😋",
                isHealthy: false,
                message: "Frequent fast food leads to lower energy over time."
            },
            {
                name: "😴 Proper 8-Hour Sleep",
                img: "😴",
                health: 8, energy: 15, activity: 4,
                expression: "😊",
                isHealthy: true,
                message: "Restorative sleep recharges your mind and body!"
            }
        ]
    },
    {
        stageName: "ADULTHOOD (Age 30)",
        title: "Career & Life Balance",
        description: "Balancing work, exercise, and food determines your aging process.",
        bgClass: "office-room",
        choices: [
            {
                name: "🏃 Daily Jogging",
                img: "🏃",
                health: 10, energy: 10, activity: 12,
                expression: "😊",
                isHealthy: true,
                message: "Consistent outdoor runs keep your heart healthy!"
            },
            {
                name: "💻 Work All Night No Sleep",
                img: "💻",
                health: -8, energy: -15, activity: -8,
                expression: "😫",
                isHealthy: false,
                isScreenTime: true,
                message: "Overworking without rest causes burnout!"
            },
            {
                name: "🥗 Home Cooked Diet",
                img: "🍲",
                health: 10, energy: 8, activity: 2,
                expression: "😊",
                isHealthy: true,
                message: "Wholesome home cooked food maintains your health!"
            }
        ]
    }
];

/* =========================================================
   1. SPLASH SCREEN LOGIC (5s hold auto transition)
========================================================= */
function initMainMenuPage() {
    initLogoSplash();
    initMenuEvents();
}

function initLogoSplash() {
    const splash = document.getElementById("logoScreen");
    const menu = document.getElementById("menuScreen");
    if (!splash || !menu) return;

    if (gameState.splashTimeout) {
        clearTimeout(gameState.splashTimeout);
    }

    gameState.splashTimeout = setTimeout(() => {
        splash.classList.remove("active");
        menu.classList.add("active");
    }, 5000);

    splash.addEventListener("click", () => {
        if (gameState.splashTimeout) {
            clearTimeout(gameState.splashTimeout);
        }
        splash.classList.remove("active");
        menu.classList.add("active");
    });
}

function initMenuEvents() {
    const boyBtn = document.getElementById("genderBoyBtn");
    const girlBtn = document.getElementById("genderGirlBtn");
    const startBtn = document.getElementById("startButton");

    if (boyBtn && girlBtn) {
        boyBtn.addEventListener("click", () => {
            boyBtn.classList.add("active");
            girlBtn.classList.remove("active");
            gameState.gender = "boy";
            localStorage.setItem("wt_gender", "boy");
        });

        girlBtn.addEventListener("click", () => {
            girlBtn.classList.add("active");
            boyBtn.classList.remove("active");
            gameState.gender = "girl";
            localStorage.setItem("wt_gender", "girl");
        });
    }

    if (startBtn) {
        startBtn.addEventListener("click", () => {
            localStorage.setItem("wt_gender", gameState.gender || "boy");
            window.location.href = "hospital.html";
        });
    }
}

/* =========================================================
   3. CINEMATIC HD HOSPITAL INTRO CUTSCENE (5-Second Pacing)
========================================================= */
let cutsceneTimeouts = [];

function clearCutsceneTimeouts() {
    cutsceneTimeouts.forEach(t => clearTimeout(t));
    cutsceneTimeouts = [];
}

function startHospitalIntroPage() {
    clearCutsceneTimeouts();

    const thar = document.getElementById("cinematicThar");
    const couple = document.getElementById("cinematicCouple");
    const nurse = document.getElementById("cinematicNurse");
    const progressFill = document.getElementById("cutsceneProgressFill");
    const skipBtn = document.getElementById("btnSkipCutscene");

    if (thar) thar.classList.remove("arrived");
    if (couple) couple.classList.add("hidden");
    if (nurse) {
        nurse.classList.remove("rushed-in");
        nurse.classList.add("hidden");
    }
    if (progressFill) progressFill.style.width = "0%";

    const finishCutscene = () => {
        clearCutsceneTimeouts();
        window.location.href = "game.html";
    };

    if (skipBtn) {
        skipBtn.onclick = finishCutscene;
    }

    const startTime = Date.now();
    const duration = 20000;
    const progressInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const pct = Math.min(100, (elapsed / duration) * 100);
        if (progressFill) progressFill.style.width = `${pct}%`;
        if (elapsed >= duration) {
            clearInterval(progressInterval);
        }
    }, 100);

    cutsceneTimeouts.push(setTimeout(() => {
        if (thar) thar.classList.add("arrived");
    }, 300));

    cutsceneTimeouts.push(setTimeout(() => {
        if (couple) couple.classList.remove("hidden");
    }, 5000));

    cutsceneTimeouts.push(setTimeout(() => {
        if (nurse) {
            nurse.classList.remove("hidden");
            nurse.classList.add("rushed-in");
        }
    }, 10000));

    cutsceneTimeouts.push(setTimeout(() => {
        clearInterval(progressInterval);
        finishCutscene();
    }, 20000));
}

/* =========================================================
   4. GAME CONTROLS & STAGE ENGINE
========================================================= */
function resetGameState() {
    gameState.health = 82;
    gameState.energy = 76;
    gameState.activity = 64;
    gameState.currentStageIndex = 0;
    gameState.screenTimeCount = 0;
    gameState.healthyChoicesCount = 0;
    gameState.unhealthyChoicesCount = 0;
    updateHUD();
}

function updateHUD() {
    gameState.health = Math.min(100, Math.max(0, gameState.health));
    gameState.energy = Math.min(100, Math.max(0, gameState.energy));
    gameState.activity = Math.min(100, Math.max(0, gameState.activity));

    document.getElementById("healthVal").textContent = `${gameState.health}%`;
    document.getElementById("healthFill").style.width = `${gameState.health}%`;

    document.getElementById("energyVal").textContent = `${gameState.energy}%`;
    document.getElementById("energyFill").style.width = `${gameState.energy}%`;

    document.getElementById("activityVal").textContent = `${gameState.activity}%`;
    document.getElementById("activityFill").style.width = `${gameState.activity}%`;
}

function loadStage(index) {
    if (index >= lifeStages.length) {
        showOldAgeEnding();
        return;
    }

    gameState.currentStageIndex = index;
    const stage = lifeStages[index];

    document.getElementById("darkCirclesOverlay").classList.add("hidden");
    document.getElementById("stageTag").textContent = stage.stageName;
    document.getElementById("eventTitle").textContent = stage.title;
    document.getElementById("eventDesc").textContent = stage.description;

    // Render Animated Cartoon SVG for Character Avatar (Side emoji badge hidden - Face SVG shows expressions!)
    const avatarGraphic = document.getElementById("avatarGraphic");
    const isNewbornCrying = index === 0;
    avatarGraphic.innerHTML = getCharacterCartoonSVG(index, gameState.gender, gameState.health, gameState.energy, isNewbornCrying, false, isNewbornCrying);

    const exprBadge = document.getElementById("expressionBadge");
    if (exprBadge) exprBadge.classList.add("hidden");

    // Set Scene BG
    const sceneBg = document.getElementById("sceneBg");
    sceneBg.className = `scene-bg ${stage.bgClass || ''}`;

    // Props setup
    const sceneProps = document.getElementById("sceneProps");
    sceneProps.innerHTML = "";
    if (stage.hasLivingRoomProps) {
        sceneProps.innerHTML = `
            <div class="prop-sofa"></div>
            <div class="prop-table"></div>
        `;
    }

    // Thought Bubble
    const thoughtBubble = document.getElementById("thoughtBubble");
    if (stage.showThoughtBubble) {
        thoughtBubble.classList.remove("hidden");
    } else {
        thoughtBubble.classList.add("hidden");
    }

    // Choices
    renderChoicesGrid(stage.choices);
    startStageTimer();
}

function renderChoicesGrid(choices) {
    const grid = document.getElementById("choicesGrid");
    grid.innerHTML = "";

    choices.forEach(choice => {
        const card = document.createElement("div");
        card.className = "choice-card";
        card.innerHTML = `
            <div class="choice-img">${choice.img}</div>
            <div class="choice-name">${choice.name}</div>
        `;

        card.addEventListener("click", () => {
            handleChoiceClick(choice);
        });

        grid.appendChild(card);
    });
}

function handleChoiceClick(choice) {
    stopStageTimer();

    gameState.health += (choice.health || 0);
    gameState.energy += (choice.energy || 0);
    gameState.activity += (choice.activity || 0);

    if (choice.isHealthy) {
        gameState.healthyChoicesCount++;
    } else {
        gameState.unhealthyChoicesCount++;
    }

    if (choice.isScreenTime) {
        gameState.screenTimeCount++;
        document.getElementById("darkCirclesOverlay").classList.remove("hidden");
    }

    updateHUD();

    if (choice.isOutdoorMinigame) {
        showMinigameModal();
        return;
    }

    setTimeout(() => {
        nextStage();
    }, 1200);
}

function nextStage() {
    loadStage(gameState.currentStageIndex + 1);
}

/* =========================================================
   5. TIMER & FASTING MECHANIC (60s countdown)
========================================================= */
function startStageTimer() {
    stopStageTimer();
    gameState.timeLeft = 60; // 60-Second Window Timeout
    updateTimerUI();

    gameState.timerInterval = setInterval(() => {
        gameState.timeLeft--;
        updateTimerUI();

        if (gameState.timeLeft <= 0) {
            stopStageTimer();
            // Fasting penalty: missed choice/meal
            gameState.health -= 10;
            gameState.energy -= 10;
            updateHUD();
            nextStage();
        }
    }, 1000);
}

function stopStageTimer() {
    if (gameState.timerInterval) {
        clearInterval(gameState.timerInterval);
        gameState.timerInterval = null;
    }
}

function updateTimerUI() {
    const timerText = document.getElementById("timerText");
    if (timerText) timerText.textContent = `${gameState.timeLeft}s`;
    const pct = (gameState.timeLeft / 60) * 100;
    const bar = document.getElementById("timerProgressBar");
    if (bar) bar.style.width = `${pct}%`;
}

function showMinigameModal() {
    const modal = document.getElementById("minigameModal");
    const ball = document.getElementById("footballBall");
    const kickBtn = document.getElementById("btnKickMinigame");
    const resultText = document.getElementById("minigameResultText");

    modal.classList.remove("hidden");
    ball.classList.remove("kicked");
    resultText.classList.add("hidden");
    kickBtn.disabled = false;

    kickBtn.onclick = () => {
        kickBtn.disabled = true;
        ball.classList.add("kicked");

        const isWin = Math.random() > 0.3;

        setTimeout(() => {
            resultText.classList.remove("hidden");
            const exprBadge = document.getElementById("expressionBadge");
            if (isWin) {
                resultText.textContent = "🎉 GOAL! YOU WON THE GAME!";
                resultText.style.color = "#16a34a";
                if (exprBadge) exprBadge.textContent = "😄";
                gameState.activity += 15;
                gameState.health += 10;
            } else {
                resultText.textContent = "⚽ Nice Kick! Missed by an inch!";
                resultText.style.color = "#dc2626";
                if (exprBadge) exprBadge.textContent = "😢";
                gameState.activity += 8;
            }
            updateHUD();

            setTimeout(() => {
                modal.classList.add("hidden");
                nextStage();
            }, 1800);
        }, 700);
    };
}

/* =========================================================
   7. OLD AGE ENDING PAYOFF
========================================================= */
function initGameEnginePage() {
    gameState.gender = localStorage.getItem("wt_gender") || "boy";
    resetGameState();
    loadStage(0);
}

function showOldAgeEnding() {
    stopStageTimer();
    const finalData = {
        health: gameState.health,
        energy: gameState.energy,
        activity: gameState.activity,
        gender: gameState.gender,
        healthyChoices: gameState.healthyChoicesCount,
        unhealthyChoices: gameState.unhealthyChoicesCount
    };
    localStorage.setItem("wt_final_stats", JSON.stringify(finalData));
    window.location.href = "ending.html";
}

function initEndingPage() {
    const rawData = localStorage.getItem("wt_final_stats");
    let stats = { health: 80, energy: 75, activity: 65, gender: "boy", healthyChoices: 3, unhealthyChoices: 1 };
    if (rawData) {
        try {
            stats = JSON.parse(rawData);
        } catch (e) { }
    }

    const endingAvatar = document.getElementById("endingAvatar");
    const endingBadge = document.getElementById("endingBadge");
    const endingTitle = document.getElementById("endingTitle");
    const endingMsg = document.getElementById("endingMessage");

    const isHealthyOutcome = (stats.health >= 60) && (stats.healthyChoices >= stats.unhealthyChoices);

    if (endingAvatar) {
        endingAvatar.innerHTML = getCharacterCartoonSVG(7, stats.gender, stats.health, stats.energy);
    }

    if (endingBadge && endingTitle && endingMsg) {
        if (isHealthyOutcome) {
            endingBadge.textContent = "🌱 HEALTHY LIFESTYLE CHAMPION";
            endingBadge.style.background = "#79a85b";
            endingTitle.textContent = "You Aged with Vitality!";
            endingMsg.textContent = "Your healthy choices, nutritious food, and active lifestyle gave you high energy and joy in your senior years!";
        } else {
            endingBadge.textContent = "⚠️ TIRED JOURNEY";
            endingBadge.style.background = "#ef7d78";
            endingTitle.textContent = "Your Choices Shaped Your Journey";
            endingMsg.textContent = "High junk food, excessive screen time, and lower activity left your body feeling tired with lower energy in senior years.";
        }
    }

    const hVal = document.getElementById("finalHealthVal");
    const eVal = document.getElementById("finalEnergyVal");
    const aVal = document.getElementById("finalActivityVal");

    if (hVal) hVal.textContent = `${stats.health}%`;
    if (eVal) eVal.textContent = `${stats.energy}%`;
    if (aVal) aVal.textContent = `${stats.activity}%`;

    const btnAgain = document.getElementById("btnPlayAgain");
    const btnExit = document.getElementById("btnExitGame");

    if (btnAgain) {
        btnAgain.onclick = () => { window.location.href = "index.html"; };
    }
    if (btnExit) {
        btnExit.onclick = () => { window.location.href = "index.html"; };
    }
}