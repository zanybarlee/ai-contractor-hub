
/// <reference types="vite/client" />

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'flowise-fullchatbot': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}
