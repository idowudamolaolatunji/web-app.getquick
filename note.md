transform: scale(0);
transition: transform .2s ease;
box-shadow: 0 0 20px #0000000d;



@media (prefers-reduced-motion: no-preference) {
    .theme-toggle[data-ready] {
        opacity: 1;
        transition: opacity .3s var(--ease), transform .3s var(--ease), box-shadow var(--theme-switch-speed) var(--ease), background var(--theme-switch-speed) var(--ease);
    }
}

.dark .theme-toggle {
    background: #071a27;
    box-shadow: inset 0 0 0 1px #ffffff1a, 0 0 0 1px #fff0, 0 0 4px #00000026, inset 0 4px 4px #00000040;
}




export function generateColors() {
	const backgroundColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  
	// Calculate text color based on background color brightness
	const textColor = getTextColor(backgroundColor);
  
	return { backgroundColor, textColor };
}
  
function getTextColor(backgroundColor) {
	const contrastRatio = calculateContrastRatio(backgroundColor, '#000000');
	return contrastRatio >= 4.5 ? '#000000' : '#FFFFFF';
  }
  
  function calculateContrastRatio(color1, color2) {
	const lum1 = calculateRelativeLuminance(color1);
	const lum2 = calculateRelativeLuminance(color2);
	const contrastRatio = (Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05);
	return contrastRatio;
  }
  
  function calculateRelativeLuminance(color) {
	const hex = color.replace('#', '');
	const r = parseInt(hex.substring(0, 2), 16) / 255;
	const g = parseInt(hex.substring(2, 4), 16) / 255;
	const b = parseInt(hex.substring(4, 6), 16) / 255;
	const rLinear = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
	const gLinear = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
	const bLinear = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);
	return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
  }
  