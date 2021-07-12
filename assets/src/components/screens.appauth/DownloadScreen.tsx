import React, { useEffect, useState } from 'react'
import { appService, tracker } from 'services'

import { API } from '@gowiki/api'
import { config, getOS, isWindows, OS, setCopyAdd } from '@gowiki/core'
import { Button, ButtonProps, Icon, Loader } from '@gowiki/web'

import OsIcon from 'components/core/OsIcon'
import { InfoBoxContainer } from 'components/global/InfoBox'
import AppAuthLayout from 'components/screens.appauth/AppAuthLayout'
import { openTandem } from 'components/screens.appauth/openTandem'
import LightboxVideo from 'components/screens.landing/video/LightboxVideo'
import { useAuthWebStore } from 'stores/authWebStore'
import { usePageView } from 'utils/usePageView'

import styled from 'styled-components'
import { Box, BoxProps, c, Column, m, Row } from 'styles'
import { PageTitle } from './styles'

import TandemInfoSection from './TandemInfoSection'

const USE_STAGING = config.env == 'dogfood'

const IOS_TESTFLIGHT_LINK = 'https://testflight.apple.com/join/hYxf05xN'
const IOS_APPCENTER_LINK = 'https://install.appcenter.ms/orgs/tandem-chat/apps/tandem-dogfood/distribution_groups/alpha-testers'
const IOS_DOGFOOD_BUNDLE_IDENTIFIER = 'chat.tandem-dogfood.ios'
const IOS_BUNDLE_IDENTIFIER = 'chat.tandem.ios'

export default function DownloadScreen(props: { os?: OS }) {
  const [steps, setSteps] = useState(new Set())
  usePageView('downloadScreen')

  const search = new URLSearchParams(location.search)
  const force = search.get('force') == 'true'
  const os = props.os || (force ? 'ios' : search.get('os') || getOS()) as OS

  const supported = ['mac', 'windows', 'linux', 'ios'].indexOf(os) > -1

  const [downloaded, setDownloaded] = useState<OS>()
  const clickDownload = () => {
    setDownloaded(os)
    setSteps(setCopyAdd(steps, 1))
    if (os == 'ios') {
      appService.openUrl(USE_STAGING ? IOS_APPCENTER_LINK : IOS_TESTFLIGHT_LINK)
    }
  }

  const layout = { mt: '8vh' }

  const supportedContent = !downloaded ? (
    <PreDownload {...layout} os={os} supported={supported} onClickDownload={clickDownload} downloaded={downloaded} />
  ) : (
    <PostDownload os={downloaded} {...layout} />
  )

  return (
    <AppAuthLayout title="Download Tandem">
      {supported ? supportedContent : <NotSupported {...layout} /> }
      <AvailablePlatforms />
    </AppAuthLayout>
  )
}

type DownloadAppProps = {
  onClickDownload: () => void
  os: OS
  supported: boolean
  downloaded: OS
} & BoxProps

export function PreDownload(props: DownloadAppProps) {
  const { onClickDownload, os, supported, downloaded, ...rest } = props

  const layoutStyle = downloaded ? { aifs: true } : { hCenter: true}

  return (
    <m.ResponsiveRow w="100%" jcc flxWrap mb={60} {...rest}>
      <Column {...layoutStyle} flex1>
        <PageTitle w={[300, 'auto']} center mb={40}>Download Tandem {USE_STAGING ? 'Staging' : ''} for {getOsString(os)}</PageTitle>
        {os == 'mac' && <DownloadLinksMac onClick={onClickDownload} />}
        {os == 'windows' && <DownloadLinksWin list={WINDOWS_LINKS} os='windows' onClick={onClickDownload} />}
        {os == 'linux' && <DownloadLinksLinux onClick={onClickDownload} />}
        {os == 'ios' && <DownloadLinksiOS onClick={onClickDownload} />}

        <Version os={os} mv={12} />

        {os == 'linux' && !downloaded && <>
          <m.T14 maxw={500} mt={30} paragraph op={0.8} mr={8}>
            Download Tandem by installing the .deb / .rpm file or going to the Snap store and
            following the instructions for your distro. For Snap installations, you will have to
            connect camera and audio permissions for Tandem to work.
            <br/><br />
            You will need to do a few additional steps to get browser status working on Tandem.
            Please see our <m.Anchor href="/linux_faq" target="_blank">Linux FAQ</m.Anchor> for
            more information.
          </m.T14>
        </>}

        {(os != 'ios' && os != 'android') && <m.T14 mt={30} tCenter color={c.black70}>
          Download not working? Try <m.Anchor onClick={onClickDownload} href="https://dl.todesktop.com/200527auaqaacsy">this mirror</m.Anchor>.
          <br /><br />
          <m.Anchor target="_blank" href="https://www.notion.so/tandemchat/Tandem-Desktop-Release-Notes-4157d20d9bcd40bd9b2cbb572ff85103">Release notes &amp; previous versions</m.Anchor>.
        </m.T14>}

        {!downloaded && <LightboxVideo noButton /> }
      </Column>
    </m.ResponsiveRow>
  )
}

const URL_BASE = USE_STAGING ? 'https://dl.todesktop.com/200606cf26nnqzn' : 'https://downloads.tandem.chat'

const MAC_LINKS = [
  { link: 'mac/zip/x64', label: 'Intel Macs (.zip)' },
  { link: 'https://dl.todesktop.com/200527auaqaacsy/mac/zip/arm64', label: 'Apple Silicon (beta)' },
  { link: 'mac/dmg/x64', label: 'or Intel DMG file' }
]
const WINDOWS_LINKS = !isWindows || (navigator.userAgent.indexOf('WOW64') > -1 || navigator.userAgent.indexOf('Win64') > -1) ? [
  { link: 'windows/msi/x64', label: 'Download for Windows (64-bit msi)' },
  { link: 'windows/msi/ia32', label: '32-bit msi' },
  { link: 'windows/nsis/x64', label: 'Executable Installer (.exe)' },
] : [
  { link: 'windows/msi/ia32', label: 'Download for Windows (32-bit msi)' },
  { link: 'windows/msi/x64', label: '64-bit msi' },
  { link: 'windows/nsis/x64', label: 'Executable Installer (.exe)' },
]
const LINUX_LINKS = [
  { link: 'linux/deb/x64', label: '64-bit .deb' },
  { link: 'linux/rpm/x64', label: '64-bit .rpm' },
  { link: 'https://snapcraft.io/tandem', label: 'Download from Snap Store' },
]

const IOS_DOWNLOAD_LINK = [
  { link: USE_STAGING ? IOS_APPCENTER_LINK : IOS_TESTFLIGHT_LINK,
    label: `Download from ${USE_STAGING ? 'AppCenter' : 'Testflight'}` },
  { link: `${config.protocol}/app/main`,
    label: `If Downloaded, Launch the App` },
]

type DownloadProps = {
  os?: OS,
  href?: string,
  download: { link: string, label: string },
  onClick: () => void,
  text?: string
} & ButtonProps

const DownloadLinksWin = ({ os, list, onClick }) => <>
  <DownloadLink os={os} download={list[0]} onClick={onClick} />
  <Row vCenter mt={12}>
    {list.slice(1).map((d, i) => <DownloadLink download={d} onClick={onClick} key={i}
      bg={c.lightPurple} color={c.brand} />)}
  </Row>
</>

const DownloadLinksMac = ({ onClick }) => <>
  <Row mb={8}>
    <DownloadLink h={54} os='mac' download={MAC_LINKS[0]} text='Most Common' onClick={onClick} />
    <DownloadLink h={54} download={MAC_LINKS[1]} text='For M1 Processors' onClick={onClick} />
  </Row>
  <DownloadLink download={MAC_LINKS[2]} onClick={onClick} bg={c.lightPurple} color={c.brand} />
</>

const DownloadLinksLinux = ({ onClick }) => <>
  <Row mb={8}>
    <DownloadLink h={54} os='linux' download={LINUX_LINKS[0]} text='Debian, Ubuntu' onClick={onClick} />
    <DownloadLink h={54} download={LINUX_LINKS[1]} text='Redhat, Fedora, SUSE' onClick={onClick} />
  </Row>
  <DownloadLink download={LINUX_LINKS[2]} onClick={onClick} bg={c.lightPurple} color={c.brand} />
</>

const DownloadLinksiOS = ({ onClick }) => <>
  <Row mb={8}>
    <DownloadLink h={54} os='ios' download={IOS_DOWNLOAD_LINK[0]} onClick={onClick} />
  </Row>
  <DownloadLink download={IOS_DOWNLOAD_LINK[1]} href={IOS_DOWNLOAD_LINK[1].link} onClick={() => openTandem({})}
    bg={c.lightPurple} color={c.brand} ml={8} mb={8} />
</>

const DownloadLink = ({ os, download, text, onClick, ...rest }: DownloadProps) => {
  const href = download.link.startsWith('http') ? download.link : `${URL_BASE}/${download.link}`
  return <DownloadAnchor data-testid="download" href={href} target="_blank" onClick={onClick}>
    <Button bg={c.brand} color={c.white} {...rest}>
      {os && <OsIcon os={os} color={c.white} p={4} br={4} mr={10} size={25} />}
      <Column>
        <m.Text bold>{download.label}</m.Text>
        {text && <m.T12 mt={5}>{text}</m.T12>}
      </Column>
    </Button>
  </DownloadAnchor>
}

export const DownloadAnchor = styled.a` margin-right:8px; &:last-child{ margin-right:0; } `

type PostDownloadProps = {
  os: OS
} & BoxProps

function PostDownload({ os, ...rest }: PostDownloadProps ) {
  const [showLoader, setShowLoader] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => setShowLoader(false), 5000)
    return () => clearTimeout(timeout)
  }, [])
  return (
    <m.ResponsiveRow w='100%' {...rest}>
      <Column hCenter flex1 >
        <PageTitle mb={40}>Downloading</PageTitle>

        {showLoader && <Box center mb={24}>
          <Loader size={80} thickness={4} bg={c.lightTeal} color={c.purple} />
          <Icon name='file_download' size={28} pabs />
        </Box>}


        <InfoBoxContainer col type='info' maxw={380} mb={24}>
          <m.T16 semi mb={8}>Instructions</m.T16>
          <div><Instructions os={os} /></div>
        </InfoBoxContainer>

        {(os != 'ios' && os != 'android') && <m.T14 mt={30}>
          Download not working? Try <m.Anchor href="https://dl.todesktop.com/200527auaqaacsy">this mirror</m.Anchor>.
        </m.T14>}

      </Column>

      <TandemInfoSection horizontal />
    </m.ResponsiveRow>
  )
}

function Instructions({ os }: { os: OS }) {
  switch (os) {
    case 'mac':
      return <>Open the downloaded file and double-click to run it.</>

    case 'windows':
      return <>
        Run the installer file you downloaded. If Windows shows a dialog box saying "Windows protected your PC",
        click "More Info" and then "Run anyway".
      </>

    case 'linux':
      return <>
          Please see our <m.Anchor href="/linux_faq" target="_blank">Linux FAQ</m.Anchor> for information
          on how to get browser status from Chrome / Firefox and other common issues.
          <br /><br />
          Important note for users of Ubuntu 20.04 and up - Software Installer is not able to install
          .deb files directly from the browser.
          <br /><br />
          If you see a message like "Failed to install file: not supported" when installing Tandem:
          <ol>
            <li>Save the .deb file to your hard drive</li>
            <li>Use <code>sudo dpkg -i /path/to/deb-file</code> from the terminal or right-click on the file
          and open with Software Installer.</li>
          </ol>
      </>

    case 'ios':
      return <>
        Install the Alpha version from {`${USE_STAGING ? 'AppCenter' : 'Testflight'}`}
        <br /><br />
        Direct link: <m.Anchor href={`/${IOS_TESTFLIGHT_LINK}`} target="_blank">Testflight</m.Anchor>
      </>
  }

  return <>Unknown platform</>
}

function NotSupported(p) {
  return (
    <Column {...p}>
      <PageTitle>Download Tandem</PageTitle>
      <Column w="auto" bg={c.orange20} p={20} br={6}>
        <m.T14 op={0.8}>
          Tandem mobile app is available only on iOS devices (smartphones and tablets).
          <br/><br />
          Our Android app is coming soon! Until then, we have sent you an email with a link to download Tandem on your computer.
        </m.T14>
        <Button mt={20} onClick={() => location.href = '/app/main'}>
          Try the mobile website (beta)
        </Button>
      </Column>
    </Column>
  )
}


const DOWNLOAD_PLATFORMS = ['mac', 'windows', 'linux', 'ios']
function AvailablePlatforms() {
  return (
    <Column hCenter mt='10vh'>
      <m.T14 op={0.5}>Available for:</m.T14>
      <Row mt={20}>
        {DOWNLOAD_PLATFORMS.map(item =>
          <a href={location.pathname + `?os=${item}`} key={item}>
            <m.Pressable w={80} column center>
              <OsIcon os={item as OS} bgColor={item == 'ios' ? c.black : null} color={item == 'ios' ? c.white : c.black} size={32} />
              <m.Text mt={12} medium op={0.9}>{getOsString(item as OS)}</m.Text>
            </m.Pressable>
          </a>
        )}
      </Row>
    </Column>
  )
}

const Version = (p) => {
  const [latestVersion, setLatestVersion] = useState('')
  useEffect(() => {
    API.appVersion().then((response) => setLatestVersion(response.version))
  }, [])

  return <m.T14 op={0.6} {...p}>{latestVersion ? `Version: ${latestVersion}` : ''}</m.T14>
}


const getOsString = (os: OS) => {
  switch (os) {
    case 'windows': return 'Windows'
    case 'linux': return 'Linux'
    case 'mac': return 'macOS'
    case 'ios': return 'iOS'
    default: return os
  }
}