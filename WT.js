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
        case 0: { // Age 0 Infant (High Quality HD 2D Cartoon Baby matching reference images with high chair & accessories)
            const isDirty = isDirtyDiaper || health < 50;
            const isHappy = !isDirty && health >= 70;
            const isCrying = isDirty || health < 40;

            const skinColor = "#ffe4d6";
            const skinShadow = "#f7c5b0";

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

                <svg viewBox="0 0 200 210" class="cartoon-char-svg baby-detailed-svg">
                    <defs>
                        <!-- High Chair Pattern & Gradients -->
                        <radialGradient id="sunflowerBg" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stop-color="#9a4d00" />
                            <stop offset="100%" stop-color="#542600" />
                        </radialGradient>
                        <radialGradient id="cheekBlush" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stop-color="#ff7b92" stop-opacity="0.8" />
                            <stop offset="100%" stop-color="#ff7b92" stop-opacity="0" />
                        </radialGradient>
                    </defs>

                    <!-- 1. High Chair Backrest (Golden Wood Arch Frame with Sunflowers) -->
                    <path d="M 45 35 Q 100 10 155 35 Q 165 100 155 160 L 45 160 Q 35 100 45 35 Z" fill="#d97706" stroke="#b45309" stroke-width="4"/>
                    <path d="M 50 40 Q 100 18 150 40 Q 158 100 150 155 L 50 155 Q 42 100 50 40 Z" fill="url(#sunflowerBg)"/>
                    <!-- Sunflower Pattern Petals -->
                    <g opacity="0.35">
                        <circle cx="70" cy="50" r="10" fill="#fbbf24"/><circle cx="130" cy="50" r="10" fill="#fbbf24"/>
                        <circle cx="60" cy="90" r="12" fill="#fbbf24"/><circle cx="140" cy="90" r="12" fill="#fbbf24"/>
                        <circle cx="80" cy="130" r="10" fill="#fbbf24"/><circle cx="120" cy="130" r="10" fill="#fbbf24"/>
                    </g>

                    <!-- 2. Kicking Baby Legs (Lower Body) -->
                    <g class="baby-leg-left">
                        <ellipse cx="68" cy="162" rx="14" ry="18" fill="${skinColor}" stroke="${skinShadow}" stroke-width="1.5"/>
                        <circle cx="62" cy="174" r="8" fill="${skinColor}"/>
                    </g>
                    <g class="baby-leg-right">
                        <ellipse cx="132" cy="162" rx="14" ry="18" fill="${skinColor}" stroke="${skinShadow}" stroke-width="1.5"/>
                        <circle cx="138" cy="174" r="8" fill="${skinColor}"/>
                    </g>

                    <!-- 3. Breathing Baby Torso & Bib/Onesie -->
                    <g class="baby-torso">
                        <ellipse cx="100" cy="130" rx="38" ry="32" fill="${isGirl ? '#3b82f6' : '#2563eb'}"/>
                        <!-- Checkered Onesie Pattern -->
                        <path d="M 75 110 L 125 110 M 72 125 L 128 125 M 78 140 L 122 140" stroke="#60a5fa" stroke-width="2" opacity="0.6"/>
                        
                        <!-- Checkered Bib (Boy: Blue Checkered / Girl: Yellow Checkered with Red Trim) -->
                        ${isGirl ? `
                            <path d="M 72 100 Q 100 128 128 100 C 122 124 78 124 72 100 Z" fill="#ffd166" stroke="#ef476f" stroke-width="3"/>
                            <path d="M 82 104 L 118 104 M 86 112 L 114 112" stroke="#f77f00" stroke-width="1.5"/>
                        ` : `
                            <path d="M 72 100 Q 100 128 128 100 C 122 124 78 124 72 100 Z" fill="#60a5fa" stroke="#ffffff" stroke-width="3"/>
                            <path d="M 82 104 L 118 104 M 86 112 L 114 112" stroke="#ffffff" stroke-width="1.5" stroke-dasharray="3,3"/>
                        `}

                        <!-- Diaper: Dirty brown stain if dirty, Crisp White Onesie/Diaper if clean -->
                        <path d="M 70 142 Q 100 162 130 142 Q 118 165 82 165 Z" fill="${isDirty ? '#854d0e' : '#ffffff'}" stroke="#cbd5e1" stroke-width="2"/>
                    </g>

                    <!-- 4. Reaching Baby Arms -->
                    <g class="baby-arm-left">
                        <path d="M 68 112 Q 42 98 46 80" fill="none" stroke="${skinColor}" stroke-width="14" stroke-linecap="round"/>
                        <circle cx="46" cy="76" r="8" fill="${skinColor}"/>
                    </g>
                    <g class="baby-arm-right">
                        <path d="M 132 112 Q 158 98 154 80" fill="none" stroke="${skinColor}" stroke-width="14" stroke-linecap="round"/>
                        <circle cx="154" cy="76" r="8" fill="${skinColor}"/>
                    </g>

                    <!-- 5. Tilting Head & Rich Character Face (Matching Reference Images 2 & 3) -->
                    <g class="baby-head">
                        <!-- Ears -->
                        <circle cx="56" cy="72" r="11" fill="${skinColor}" stroke="${skinShadow}" stroke-width="1.5"/>
                        <circle cx="144" cy="72" r="11" fill="${skinColor}" stroke="${skinShadow}" stroke-width="1.5"/>
                        <circle cx="56" cy="72" r="6" fill="#f7c5b0"/>
                        <circle cx="144" cy="72" r="6" fill="#f7c5b0"/>

                        <!-- Head Base -->
                        <circle cx="100" cy="70" r="45" fill="${skinColor}" stroke="${skinShadow}" stroke-width="1.5"/>

                        <!-- Hair Artwork (Boy: Fluffy Brown Hair Ref Image 2 / Girl: Blonde Pigtails & Pink Bows Ref Image 3) -->
                        ${isGirl ? `
                            <!-- Girl Pigtails & Bows -->
                            <g>
                                <circle cx="52" cy="30" r="14" fill="#e6b800"/>
                                <circle cx="148" cy="30" r="14" fill="#e6b800"/>
                                <!-- Pink Bows -->
                                <path d="M 44 26 C 36 20 36 34 48 30 C 36 34 50 42 52 32 Z" fill="#ff4d88"/>
                                <path d="M 156 26 C 164 20 164 34 152 30 C 164 34 150 42 148 32 Z" fill="#ff4d88"/>
                                <circle cx="48" cy="28" r="4" fill="#ff75a0"/>
                                <circle cx="152" cy="28" r="4" fill="#ff75a0"/>
                                <!-- Blonde Bangs -->
                                <path d="M 60 48 Q 100 25 140 48 Q 125 35 100 38 Q 75 35 60 48 Z" fill="#e6b800"/>
                            </g>
                        ` : `
                            <!-- Boy Fluffy Brown Layered Hair (Ref Image 2) -->
                            <g>
                                <path d="M 58 50 C 45 20, 75 18, 92 25 C 105 15, 140 22, 142 50 C 130 35, 110 32, 100 38 Q 75 35 58 50 Z" fill="#5c3d2e"/>
                                <!-- Soft Hair Highlights -->
                                <path d="M 85 24 Q 100 18 115 25" stroke="#7c523e" stroke-width="4" stroke-linecap="round" fill="none"/>
                            </g>
                        `}

                        <!-- Eyelashes & Brows -->
                        <path d="M 72 52 Q 82 46 90 52" stroke="#5c3d2e" stroke-width="2.5" fill="none" stroke-linecap="round"/>
                        <path d="M 110 52 Q 118 46 128 52" stroke="#5c3d2e" stroke-width="2.5" fill="none" stroke-linecap="round"/>

                        <!-- Eyes Expression (Crying vs Big Glossy Brown Eyes matching Reference Images) -->
                        ${isCrying ? `
                            <!-- Squeezed Crying Eyes (> <) -->
                            <path d="M 74 60 L 84 66 L 74 72" fill="none" stroke="#261408" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M 126 60 L 116 66 L 126 72" fill="none" stroke="#261408" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                        ` : `
                            <!-- Big Glossy Brown Eyes (Ref Images 2 & 3) -->
                            <g>
                                <circle cx="81" cy="65" r="10" fill="#4a2e1b"/>
                                <circle cx="119" cy="65" r="10" fill="#4a2e1b"/>
                                <circle cx="81" cy="65" r="6" fill="#261408"/>
                                <circle cx="119" cy="65" r="6" fill="#261408"/>
                                <!-- Double Sparkle Highlights -->
                                <circle cx="78" cy="62" r="3.5" fill="#ffffff"/>
                                <circle cx="116" cy="62" r="3.5" fill="#ffffff"/>
                                <circle cx="84" cy="68" r="1.5" fill="#ffffff"/>
                                <circle cx="122" cy="68" r="1.5" fill="#ffffff"/>
                                <!-- Top Eyelash Accent -->
                                <path d="M 70 60 Q 81 54 92 60" stroke="#261408" stroke-width="2" stroke-linecap="round" fill="none"/>
                                <path d="M 108 60 Q 119 54 130 60" stroke="#261408" stroke-width="2" stroke-linecap="round" fill="none"/>
                            </g>
                        `}

                        <!-- Rosy Blushing Cheeks -->
                        <ellipse cx="68" cy="74" rx="9" ry="6" fill="url(#cheekBlush)"/>
                        <ellipse cx="132" cy="74" rx="9" ry="6" fill="url(#cheekBlush)"/>

                        <!-- Mouth Expression -->
                        ${isCrying ? `
                            <path d="M 85 82 Q 100 106 115 82 Z" fill="#800f2f" stroke="#c9184a" stroke-width="2.5"/>
                        ` : (isHappy ? `
                            <!-- Cheerful Giggling Open Smile -->
                            <path d="M 82 80 Q 100 102 118 80 Z" fill="#e63946" stroke="#c9184a" stroke-width="2.5"/>
                            <path d="M 88 92 Q 100 100 112 92" fill="#ff85a1"/>
                        ` : `
                            <path d="M 86 82 Q 100 94 114 82" fill="none" stroke="#c9184a" stroke-width="3" stroke-linecap="round"/>
                        `)}
                    </g>

                    <!-- 6. Front White Feeding Tray & Accessories (Ref Images 2 & 3) -->
                    <g>
                        <!-- White Tray Frame Base sitting in front -->
                        <path d="M 30 160 Q 100 148 170 160 L 180 185 Q 100 200 20 185 Z" fill="#f8fafc" stroke="#cbd5e1" stroke-width="3"/>
                        <path d="M 35 163 Q 100 152 165 163 L 174 182 Q 100 195 26 182 Z" fill="#ffffff"/>

                        <!-- Pink Fresh Baby Food / Wipes Box -->
                        <rect x="36" y="166" width="28" height="15" rx="5" fill="#ff85a1" stroke="#ff4d88" stroke-width="1.5"/>
                        <rect x="42" y="164" width="16" height="4" rx="2" fill="#ffffff"/>

                        <!-- Red & Yellow Rattle Toy -->
                        <circle cx="82" cy="173" r="6" fill="#ffd166" stroke="#ef476f" stroke-width="1.5"/>
                        <line x1="86" y1="177" x2="94" y2="183" stroke="#ef476f" stroke-width="3" stroke-linecap="round"/>

                        <!-- Yellow Rubber Ducky -->
                        <path d="M 116 177 C 112 173 116 166 122 168 C 126 168 128 171 127 174 C 130 174 133 177 126 179 Z" fill="#ffd166"/>
                        <circle cx="123" cy="170" r="1" fill="#000000"/>
                        <path d="M 125 171 L 129 172 L 125 173 Z" fill="#f77f00"/>

                        <!-- Baby Milk Bottle (Clear Blue Bottle, Pink Cap, Yellow Nipple) -->
                        <rect x="148" y="164" width="16" height="22" rx="4" fill="#e0f2fe" stroke="#38bdf8" stroke-width="1.5"/>
                        <rect x="146" y="160" width="20" height="5" rx="2" fill="#ff4d88"/>
                        <path d="M 152 160 C 152 153 160 153 160 160 Z" fill="#ffb703"/>
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
                name: "🧼 Change Diaper",
                img: "🧼",
                health: 15, energy: 10, activity: 5,
                expression: "😊",
                isHealthy: true,
                isDiaperChange: true,
                message: "You changed the diaper! The baby is clean, happy, and satisfied! 😊"
            },
            {
                name: "❌ Don't Change",
                img: "❌",
                health: -15, energy: -10, activity: -5,
                expression: "😭",
                isHealthy: false,
                isDiaperRefuse: true,
                message: "Diaper stayed dirty! The baby cries loudly in intense discomfort! 😭"
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

    // In Stage 0 Newborn Infant: Option to Change Diaper (Happy state) vs Don't Change (Intense Crying state)
    if (gameState.currentStageIndex === 0) {
        const avatarGraphic = document.getElementById("avatarGraphic");
        if (choice.isDiaperChange) {
            if (avatarGraphic) {
                avatarGraphic.innerHTML = getCharacterCartoonSVG(0, gameState.gender, 95, 95, false);
            }
        } else if (choice.isDiaperRefuse) {
            if (avatarGraphic) {
                avatarGraphic.innerHTML = getCharacterCartoonSVG(0, gameState.gender, 20, 20, true);
            }
        } else {
            if (avatarGraphic) {
                avatarGraphic.innerHTML = getCharacterCartoonSVG(0, gameState.gender, 95, 95, false);
            }
        }
        setTimeout(() => {
            nextStage();
        }, 1800);
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