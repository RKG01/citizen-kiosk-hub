

# Citizen Utility Service Kiosk

## Overview
A full-screen, touch-optimized kiosk interface designed for public self-service terminals (like railway ticket machines). The design prioritizes accessibility for elderly and low-literacy users with large touch targets, high contrast, and clean civic aesthetics.

## Screen Layout

### Header Section
- Government emblem placeholder (shield/crest icon) centered at top
- Bold heading: **"Citizen Utility Service Kiosk"** in a clean sans-serif font
- Subtle separator line beneath

### Main Content — Service Buttons Grid
Five large, touch-friendly buttons in a 2-column grid (last button centered):

1. **Pay Bill** — Wallet/credit card icon
2. **Register Complaint** — Clipboard/alert icon
3. **Track Status** — Search/tracking icon
4. **Apply for Service** — File/form icon
5. **Help** — Help circle icon

Button styling:
- Dark blue background with white text
- Minimum 80px+ height, large bold text
- Rounded corners with soft shadow
- Subtle scale-up animation on hover/touch for feedback
- Icon displayed above the label text

### Footer Section
- **Language toggle**: English / Hindi / Marathi selector buttons
- **Live date & time** display (updates every second)
- Instruction text: *"Touch a service to begin"*
- Minimal styling so it doesn't distract from the main buttons

## Design Principles
- Light background (very light blue/white)
- Centered container with soft drop shadow and rounded corners
- High-contrast dark blue buttons on light background
- Large, readable typography throughout
- No clutter — professional, civic, trustworthy appearance
- Fully responsive but optimized for large touch displays

## Technical Approach
- Single-page React component (no backend needed)
- Tailwind CSS for all styling
- Lucide React icons for button icons
- `useState` for language selection, `useEffect` for live clock
- All content is static/frontend-only for this initial version

