// @flow
import React from 'react'
import Helmet from 'react-helmet'

import { config } from '@gowiki/core'

export const siteName = 'tandem.chat'
export const mainTitle = `Tandem | A virtual office for remote teams`
const siteUrl = window.location.hostname == 'localhost' ? '' : `https://${siteName}`
// tslint:disable-next-line:max-line-length
const mainDescription = `Re-discover the flow of working together in-person. Easily see who's available to talk, who's in a conversation, and who's busy. Start conversations as easily as tapping someone on the shoulder. Unlock spontaneous collaboration in your team. Interactive screen-sharing and online co-working. `
const facebookImg = `${siteUrl}/meta/social-facebook.png`
const twitterImg = `${siteUrl}/meta/social-twitter.png`
const themeColor = `#3B334F`
const support_email = 'support@gowiki.chat'

type Props = {
  title?: string
  description?: string
}

const HeadMeta = (props: Props) => {
  const { title, description } = props
  const composedDescription = description ? description : mainDescription

  const composedTitle = (config.dev ? '[D] ' : '') + (title ? `${title} | ${mainTitle}` : mainTitle)

  return (
    <>
      <Helmet
        key={1}
        // is necessary to not use mainTitle var in order for the emoji to render on google resutls
        title={composedTitle}
        link={[
          { rel: 'canonical', href: siteUrl },
          { rel: 'icon', type: 'image/png', href: `/meta/favicon-16x16.png?v=2`, size: '16x16' },
          { rel: 'icon', type: 'image/png', href: `/meta/favicon-32x32.png?v=2`, size: '32x32' },
          { rel: 'shortcut icon', type: 'image/ico', href: `/favicon.ico?v=2` }

          //iOS Homescreen App meta link
          // { rel: 'apple-touch-icon', href: `${siteUrl}/meta/apple-icon.png`},
          // { rel: 'apple-touch-startup-image', href: `${siteUrl}/meta/ios-web-app-launch-image.png`},

          // Android Homescreen App meta link
          // { rel: 'manifest', href: `${siteUrl}/meta/android-manifest.json`},
        ]}
        meta={[
          { name: 'description', content: composedDescription },

          //Social Meta data from: https://moz.com/blog/meta-data-templates-123

          // Schema.org markup for Google+
          { itemprop: 'name', content: mainTitle },
          { itemprop: 'description', content: mainDescription },
          { itemprop: 'image', content: facebookImg },

          // Facebook Open Graph data
          { property: 'og:title', content: mainTitle },
          { property: 'og:type', content: 'website' },
          { property: 'og:url', content: siteUrl },
          { property: 'og:image', content: facebookImg },
          { property: 'og:description', content: mainDescription },
          { property: 'og:image:width', content: '1200' },
          { property: 'og:image:height', content: '630' },
          { property: 'og:site_name', content: siteName },
          { property: 'og:logo', content: '//tandem.chat/meta/logo-icon.png',     size: '256x234' },
          { property: 'og:logo', content: '//tandem.chat/meta/favicon-32x32.png', size: '32x32'   },
          { property: 'og:logo', content: '//tandem.chat/meta/favicon-16x16.png', size: '16x16'   },

          // twitter card tags additive with the og: tags
          { property: 'twitter:card', content: 'summary_large_image' },
          { property: 'twitter:domain', content: siteName },
          { property: 'twitter:title', content: mainTitle },
          { property: 'twitter:description', content: mainDescription },
          { property: 'twitter:image', content: twitterImg },
          { property: 'twitter:url', content: siteUrl },

          // iOS Homescreen App meta
          { name: 'apple-mobile-web-app-capable', content: 'yes' },
          { name: 'apple-mobile-web-app-title', content: mainTitle },
          { name: 'apple-mobile-web-app-status-bar-style', content: themeColor },

          // Android Homescreen App meta
          { name: 'theme-color', content: themeColor }
        ]}
        script={[
          {
            type: 'application/ld+json',
            innerHTML: JSON.stringify(googleStructuredData)
          }
        ]}
      />
      {/*
    // This is a small hack to add a unicode char to the title, which only works if it's
    // a raw string. If there's a title coming from a sub page, we will override the title
    // prop
    */}
      {title && title != undefined && title != null ? <Helmet title={composedTitle} key={2} /> : null}
    </>
  )
}

export default HeadMeta

const googleStructuredData = {
  '@context': 'http://www.schema.org',
  '@type': 'sofwtare',
  url: siteUrl,
  name: mainTitle,
  contactPoint: [{ '@type': 'ContactPoint', email: support_email, contactType: 'customer service', url: siteUrl }]
}
