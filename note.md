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