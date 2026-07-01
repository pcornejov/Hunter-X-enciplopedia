import { Component } from 'react';

// Catches render-time crashes anywhere below it in the tree and shows a
// recovery screen instead of a blank white page. Network/fetch errors are
// already handled per-page via ErrorBanner; this is the last-resort fallback
// for unexpected bugs.
export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('Hunterpedia crashed:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container not-found">
          <h1>Algo salió mal</h1>
          <p>Ocurrió un error inesperado al mostrar esta página.</p>
          <a href="/" className="btn btn-primary">
            Volver al inicio
          </a>
        </div>
      );
    }

    return this.props.children;
  }
}
