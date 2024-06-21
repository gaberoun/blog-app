import { Component } from 'react'

export default class ErrorBoundary extends Component {
  state = {
    hasError: false,
    error: null
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error })
    console.log(error, errorInfo);
  }

  reloadPage() {
    window.location.reload();
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='h-screen flex flex-col place-items-center justify-center'>
          <h1 className='font-semibold text-2xl text-black'>Something went wrong...</h1>
          <p className='text-slate-700'>{this.state.error && this.state.error.toString()}</p>
          <button onClick={this.reloadPage} className='my-5 flex justify-center rounded-md bg-neutral-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-neutral-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-600'>
            Refresh Page
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
