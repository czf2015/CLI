export function customElementRegister(customs) {
    Object.entries(customs).forEach(custom => window.customElements.define(...custom))
}