import React from 'react';
import { theme } from '../../styles/theme';

export default function BotAvatar({ size = 130, isListening = false, isTalking = false }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        filter: 'drop-shadow(0 10px 20px rgba(0, 199, 166, 0.25))',
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Antennas / Headset */}
        <path
          d="M40 70 C40 35, 120 35, 120 70"
          stroke="#00A389"
          strokeWidth="6"
          strokeLinecap="round"
        />
        {/* Headphone Cushions */}
        <rect x="32" y="62" width="12" height="26" rx="6" fill="#00C7A6" />
        <rect x="116" y="62" width="12" height="26" rx="6" fill="#00C7A6" />

        {/* Robot Head Outer Body */}
        <rect
          x="44"
          y="42"
          width="72"
          height="64"
          rx="22"
          fill="url(#botGradient)"
          stroke="#FFFFFF"
          strokeWidth="3"
        />

        {/* Screen Bezel / Digital Face Screen */}
        <rect
          x="52"
          y="50"
          width="56"
          height="48"
          rx="14"
          fill="#111827"
        />

        {/* Digital Eyes (Teal Glow) */}
        <circle cx="68" cy="68" r="5" fill={isListening ? '#34D399' : '#00C7A6'}>
          {isListening && (
            <animate attributeName="r" values="5;6.5;5" dur="1s" repeatCount="indefinite" />
          )}
        </circle>
        <circle cx="92" cy="68" r="5" fill={isListening ? '#34D399' : '#00C7A6'}>
          {isListening && (
            <animate attributeName="r" values="5;6.5;5" dur="1s" repeatCount="indefinite" />
          )}
        </circle>

        {/* Digital Smile */}
        <path
          d="M72 82 Q80 90 88 82"
          stroke="#00C7A6"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Stethoscope around neck */}
        <path
          d="M58 106 C58 126, 102 126, 102 106"
          stroke="#374151"
          strokeWidth="4.5"
          fill="none"
          strokeLinecap="round"
        />
        {/* Stethoscope Chest Piece */}
        <circle cx="80" cy="126" r="7" fill="#00C7A6" stroke="#FFFFFF" strokeWidth="2.5" />

        {/* Gradients */}
        <defs>
          <linearGradient id="botGradient" x1="44" y1="42" x2="116" y2="106" gradientUnits="userSpaceOnUse">
            <stop stopColor="#00C7A6" />
            <stop offset="1" stopColor="#00A389" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
