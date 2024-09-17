import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hasError: false,
    }
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
    }
  }

  componentDidCatch(error, info) {
    console.log(error, info)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }

    return this.props.children
  }
}
