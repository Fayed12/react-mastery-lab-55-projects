import styles from './error.module.css';

const NotFoundSvg = () => {
    return (
        <svg
            className={styles.svg}
            viewBox="0 0 800 600"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
            </defs>

            {/* Background Elements (Stars) */}
            <circle cx="100" cy="100" r="2" fill="#fff" opacity="0.8">
                <animate attributeName="opacity" values="0.8;0.2;0.8" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="700" cy="200" r="3" fill="#fff" opacity="0.6">
                <animate attributeName="opacity" values="0.6;0.1;0.6" dur="4s" repeatCount="indefinite" />
            </circle>
            <circle cx="500" cy="50" r="2" fill="#fff" opacity="0.9">
                <animate attributeName="opacity" values="0.9;0.3;0.9" dur="2.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="50" cy="500" r="2" fill="#fff" opacity="0.7">
                <animate attributeName="opacity" values="0.7;0.2;0.7" dur="3.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="750" cy="550" r="2.5" fill="#fff" opacity="0.5">
                <animate attributeName="opacity" values="0.5;0.1;0.5" dur="5s" repeatCount="indefinite" />
            </circle>

            {/* Ghost Body */}
            <g className={styles.ghost}>
                <path
                    d="M400 150 C 300 150, 250 250, 250 350 C 250 450, 300 500, 320 500 L 340 480 L 360 500 L 380 480 L 400 500 L 420 480 L 440 500 L 460 480 L 480 500 C 500 500, 550 450, 550 350 C 550 250, 500 150, 400 150 Z"
                    fill="#e0e0e0"
                    filter="url(#glow)"
                />

                {/* Eyes */}
                <ellipse cx="370" cy="300" rx="15" ry="20" fill="#121212" />
                <ellipse cx="430" cy="300" rx="15" ry="20" fill="#121212" />

                {/* Mouth (O shape) */}
                <ellipse cx="400" cy="360" rx="10" ry="15" fill="#121212" />

                {/* Blush */}
                <ellipse cx="350" cy="330" rx="10" ry="5" fill="#ffb7b2" opacity="0.5" />
                <ellipse cx="450" cy="330" rx="10" ry="5" fill="#ffb7b2" opacity="0.5" />
            </g>

            {/* Shadow */}
            <ellipse cx="400" cy="550" rx="100" ry="10" fill="#000" opacity="0.3" className={styles.shadow} />

            {/* 404 Text */}
            <text x="50%" y="45%" textAnchor="middle" dy="180" fontSize="40" fill="#bb86fc" fontFamily="monospace" fontWeight="bold" letterSpacing="5">
                404
            </text>
        </svg>
    );
};

export default NotFoundSvg;
