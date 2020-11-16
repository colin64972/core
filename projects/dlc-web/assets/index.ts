import ProfilePic3x from './images/profile-pic-144w.jpg'
import ProfilePic1x from './images/profile-pic-48w.jpg'
import ProfilePic2x from './images/profile-pic-96w.jpg'

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
