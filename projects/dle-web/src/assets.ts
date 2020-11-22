import HomeHeader1x from '@cjo3/shared/assets/images/home-header-325w.jpg'
import ProfilePic3x from '@cjo3/shared/assets/images/profile-pic-144w.jpg'
import ProfilePic1x from '@cjo3/shared/assets/images/profile-pic-48w.jpg'
import ProfilePic2x from '@cjo3/shared/assets/images/profile-pic-96w.jpg'
import Environment from '@cjo3/shared/assets/images/environment.jpg'
import Geochemistry from '@cjo3/shared/assets/images/geochemistry.jpg'
import OilGas from '@cjo3/shared/assets/images/oil-gas.jpg'
import Pharmaceutical from '@cjo3/shared/assets/images/pharmaceutical.jpg'
import PaperPulp from '@cjo3/shared/assets/images/pulp-paper.jpg'
import FoodSafety from '@cjo3/shared/assets/images/food-safety.jpg'
import StarBg from '@cjo3/shared/assets/images/star-background.jpg'
import SpreadsheetBg from '@cjo3/shared/assets/images/spreadsheet-bg.jpg'

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

export const HomeHeader: ImageAsset = {
  alt: 'profile-photo',
  mimeType: 'image/jpeg',
  paths: [HomeHeader1x]
}

export const HomeEnvironment: ImageAsset = {
  alt: 'environmental-testing',
  mimeType: 'image/jpeg',
  paths: [Environment]
}

export const HomeGeochemistry: ImageAsset = {
  alt: 'geochemistry',
  mimeType: 'image/jpeg',
  paths: [Geochemistry]
}
export const HomeOilGas: ImageAsset = {
  alt: 'oil-and-gas',
  mimeType: 'image/jpeg',
  paths: [OilGas]
}
export const HomePharmaceutical: ImageAsset = {
  alt: 'pharmaceutical',
  mimeType: 'image/jpeg',
  paths: [Pharmaceutical]
}
export const HomePaperPulp: ImageAsset = {
  alt: 'pulp-and-paper',
  mimeType: 'image/jpeg',
  paths: [PaperPulp]
}
export const HomeFoodSafety: ImageAsset = {
  alt: 'food-safety',
  mimeType: 'image/jpeg',
  paths: [FoodSafety]
}

export const HomeStarBg: ImageAsset = {
  alt: 'star-background',
  mimeType: 'image/jpeg',
  paths: [StarBg]
}

export const HomeSpreadsheetBg: ImageAsset = {
  alt: 'spreadsheet-background',
  mimeType: 'image/jpeg',
  paths: [SpreadsheetBg]
}
