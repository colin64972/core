import ProfilePic3x from '@cjo3/shared/assets/images/profile-pic-144w.jpg'
import ProfilePic1x from '@cjo3/shared/assets/images/profile-pic-48w.jpg'
import ProfilePic2x from '@cjo3/shared/assets/images/profile-pic-96w.jpg'

import LogoHaru60 from '@cjo3/shared/assets/images/logo-haru-60w.png'
import LogoHaru120 from '@cjo3/shared/assets/images/logo-haru-120w.png'
import LogoHaru180 from '@cjo3/shared/assets/images/logo-haru-180w.png'

import LogoBir60 from '@cjo3/shared/assets/images/logo-bir-60w.png'
import LogoBir120 from '@cjo3/shared/assets/images/logo-bir-120w.png'
import LogoBir180 from '@cjo3/shared/assets/images/logo-bir-180w.png'

import LogoApollo60 from '@cjo3/shared/assets/images/logo-apollo-60w.png'
import LogoApollo120 from '@cjo3/shared/assets/images/logo-apollo-120w.png'
import LogoApollo180 from '@cjo3/shared/assets/images/logo-apollo-180w.png'

import LogoJumpfactor60 from '@cjo3/shared/assets/images/logo-jumpfactor-60w.png'
import LogoJumpfactor120 from '@cjo3/shared/assets/images/logo-jumpfactor-120w.png'
import LogoJumpfactor180 from '@cjo3/shared/assets/images/logo-jumpfactor-180w.png'

import LogoEuroptimum60 from '@cjo3/shared/assets/images/logo-europtimum-60w.png'
import LogoEuroptimum120 from '@cjo3/shared/assets/images/logo-europtimum-120w.png'
import LogoEuroptimum180 from '@cjo3/shared/assets/images/logo-europtimum-180w.png'

interface ImageAsset {
  alt: string
  mimeType: string
  paths: string[]
}

export const ProfilePic: ImageAsset = {
  alt: 'profile-photo',
  mimeType: 'image/jpeg',
  paths: [ProfilePic1x, ProfilePic2x, ProfilePic3x]
}

export const LogoHaru: ImageAsset = {
  alt: 'logo-haru',
  mimeType: 'image/png',
  paths: [LogoHaru60, LogoHaru120, LogoHaru180]
}
export const LogoBir: ImageAsset = {
  alt: 'logo-bir',
  mimeType: 'image/png',
  paths: [LogoBir60, LogoBir120, LogoBir180]
}

export const LogoApollo: ImageAsset = {
  alt: 'logo-apollo',
  mimeType: 'image/png',
  paths: [LogoApollo60, LogoApollo120, LogoApollo180]
}

export const LogoJumpfactor: ImageAsset = {
  alt: 'logo-jumpfactor',
  mimeType: 'image/png',
  paths: [LogoJumpfactor60, LogoJumpfactor120, LogoJumpfactor180]
}

export const LogoEuroptimum: ImageAsset = {
  alt: 'logo-europtimum',
  mimeType: 'image/png',
  paths: [LogoEuroptimum60, LogoEuroptimum120, LogoEuroptimum180]
}
