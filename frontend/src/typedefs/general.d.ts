interface Document {
  webkitFullscreenElement: HTMLElement
  webkitCancelFullScreen: () => void
}

interface HTMLElement {
  webkitRequestFullscreen: () => void
}

interface HTMLAudioElement {
  sinkId: string
  setSinkId(sinkId: string): Promise<void>
}

interface VideoFrameMetadata {
  presentationTime: DOMHighResTimeStamp;
  expectedDisplayTime: DOMHighResTimeStamp;
  width: number;
  height: number;
  mediaTime: number;
  presentedFrames: number;
  processingDuration?: number;
  captureTime?: DOMHighResTimeStamp;
  receiveTime?: DOMHighResTimeStamp;
  rtpTimestamp?: number;
};
type VideoFrameRequestCallbackId = number;
interface HTMLVideoElement extends HTMLMediaElement {
  requestVideoFrameCallback(callback: (now: DOMHighResTimeStamp, metadata: VideoFrameMetadata) => any): VideoFrameRequestCallbackId;
  cancelVideoFrameCallback(handle: VideoFrameRequestCallbackId): void;
}

interface WindowCypress extends Cypress {
  // These variables aim at emulating native browser behaviour during Cypress testing
  cypressStubs: {
    notificationPermission: NotificationPermission
    notificationPermissionAfterPrompt: 'granted' | 'denied'
  }
}

interface Errorception {
  meta: any
  push: (e: Error) => void
}

interface RTCPeers {
  forceSwitchToPeerToPeer(): void
  forceSwitchToSoup(): void
  getCurrentType(): 'peer-to-peer' | 'sfu'
  reconnectSignalingSocket(): void
  soup: any
  peerToPeer: any

  currentlyPreferred: {
    sendTransport: {
      closed: boolean
      connectionState: string
    }
    producers: any[]
  }
}

interface Window {
  fbq?: () => void
  canLeavePage?: () => string
  jitsi: any
  rtcpeers?: RTCPeers
  _errs: Errorception
  console: Console // allow overriding
  ReactNativeWebView?: { postMessage: (string) => void }

  WindowPeerConnection: Type<WindowPeerConnection>
  Cypress: WindowCypress

  getScreenMedia?: (callback: (error: Error, sources: Electron.DesktopCapturerSource[]) => void, options?: Electron.SourcesOptions) => void
  startScreenshare?: (
    source: string,
    onStream: (stream: MediaStream) => void,
    onError: (error: MediaStreamError) => void
  ) => void

  find?: (text: string, caseSensitive?: boolean, backwards?: boolean, wrapAround?: boolean) => boolean
  versionCheck?: () => void
  getMediaAccessStatus?: (mediaType: "screen" | "camera" | "microphone") => "not-determined" | "granted" | "denied" | "restricted" | "unknown"

  MediaRecorder: MediaRecorder
}

class MediaRecorder {
  constructor(stream: MediaStream)
  ondataavailable: (e: any) => void
  state: string
  start(interval: number)
  stop()
}

interface MediaDevices {
  getDisplayMedia?: ({ video: boolean }) => Promise<MediaStream>
}

interface MediaTrackConstraints {
  mediaSource?: string
}

interface RTCConfiguration {
  sdpSemantics?: string
}

namespace React {
  export const memo: (any) => any
}

class WindowPeerConnection {
  constructor(public windowName: string)

  attachStream(channelId: string, stream: MediaStream): void

  removeStream(channelId: string): void

  onReceivedTrack(callback: (channelId: string, track: MediaStreamTrack) => void): void

  onReady(targetChannel: string, callback: () => void): void

  ready(channel: string, receiverName: string): void

  sendStream(channelId: string, receiverName: string): Promise<void>

  handleLeave(): void
}

interface Type<T> extends Function {
  new(...args: any[]): T
}

interface RTCRtpEncodingParameters {
  //ssrc: number;
  //rtx: RTCRtpRtxParameters;
  //fec: RTCRtpFecParameters;
  dtx?: RTCDtxStatus;
  //active: boolean;
  //priority: RTCPriorityType;
  maxBitrate?: number;
  maxFramerate?: number;
  rid?: string;
  scaleResolutionDownBy?: number; // default = 1
}

interface RTCRtpParameters {
  encodings: Partial<RTCRtpEncodingParameters>[]
}

