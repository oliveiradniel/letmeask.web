import { Component, type ErrorInfo } from "react";

interface IErrorBoundaryState {
  hasError: boolean;
}

interface IErrorBoundaryProps {
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export class ErrorBoundary extends Component<
  IErrorBoundaryProps,
  IErrorBoundaryState
> {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError(): IErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.log(error, info);
  }

  componentDidUpdate(prevProps: IErrorBoundaryProps) {
    if (prevProps.children !== this.props.children && this.state.hasError) {
      this.setState({ hasError: false });
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? <h1>Algo deu errado.</h1>;
    }

    return this.props.children;
  }
}
