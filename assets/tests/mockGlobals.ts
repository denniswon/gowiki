Object.defineProperty(window, 'ResizeObserver', {
  writable: false,
  value: jest.fn().mockImplementation(() => ({
    observe: () => {},
    unobserve: () => {},
    disconnect: () => {},
  })),
})
Object.defineProperty(window, 'AudioContext', {
  writable: false,
  value: jest.fn().mockImplementation(() => ({
    createMediaStreamSource: () => {},
    createMediaStreamDestination: () => {},
    createStereoPanner: () => {},
  })),
})
Object.defineProperty(window, 'MediaStream', {
  writable: false,
  value: jest.fn().mockImplementation(() => ({
    getTracks: () => []
  })),
})
Object.defineProperty(window, 'RTCPeerConnection', {
  writable: false,
  value: jest.fn().mockImplementation(() => ({

  })),
})
Object.defineProperty(navigator, 'mediaDevices', {
  writable: false,
  value: {
    enumerateDevices: () => Promise.resolve([])
  },
})
Object.defineProperty(navigator, 'getUserMedia', {
  writable: false,
  value: () => {},
})
Object.defineProperty(window, 'getIntercom', {
  writable: false,
  value: jest.fn().mockImplementation(() => () => {})
})
Object.defineProperty(window, 'open', {
  writable: false,
  value: jest.fn().mockImplementation(() => {})
})
