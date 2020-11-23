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

import HomeBg600 from '@cjo3/shared/assets/images/home-bg-600w.jpg'
import HomeBg960 from '@cjo3/shared/assets/images/home-bg-960w.jpg'
import HomeBg1280 from '@cjo3/shared/assets/images/home-bg-1280w.jpg'
import HomeBg1920 from '@cjo3/shared/assets/images/home-bg-1920w.jpg'
import HomeBg2880 from '@cjo3/shared/assets/images/home-bg-2880w.jpg'

import ConverterBg600 from '@cjo3/shared/assets/images/converter-bg-600w.jpg'
import ConverterBg960 from '@cjo3/shared/assets/images/converter-bg-960w.jpg'
import ConverterBg1280 from '@cjo3/shared/assets/images/converter-bg-1280w.jpg'
import ConverterBg1920 from '@cjo3/shared/assets/images/converter-bg-1920w.jpg'
import ConverterBg2880 from '@cjo3/shared/assets/images/converter-bg-2880w.jpg'

import GuideBg600 from '@cjo3/shared/assets/images/guide-bg-600w.jpg'
import GuideBg960 from '@cjo3/shared/assets/images/guide-bg-960w.jpg'
import GuideBg1280 from '@cjo3/shared/assets/images/guide-bg-1280w.jpg'
import GuideBg1920 from '@cjo3/shared/assets/images/guide-bg-1920w.jpg'
import GuideBg2880 from '@cjo3/shared/assets/images/guide-bg-2880w.jpg'

import NotFoundBg600 from '@cjo3/shared/assets/images/not-found-bg-600w.jpg'
import NotFoundBg960 from '@cjo3/shared/assets/images/not-found-bg-960w.jpg'
import NotFoundBg1280 from '@cjo3/shared/assets/images/not-found-bg-1280w.jpg'
import NotFoundBg1920 from '@cjo3/shared/assets/images/not-found-bg-1920w.jpg'
import NotFoundBg2880 from '@cjo3/shared/assets/images/not-found-bg-2880w.jpg'

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

export const HomeBg: ImageAsset = {
  alt: 'home-bg',
  mimeType: 'image/jpeg',
  paths: [HomeBg600, HomeBg960, HomeBg1280, HomeBg1920, HomeBg2880]
}

export const ConverterBg: ImageAsset = {
  alt: 'converter-bg',
  mimeType: 'image/jpeg',
  paths: [
    ConverterBg600,
    ConverterBg960,
    ConverterBg1280,
    ConverterBg1920,
    ConverterBg2880
  ]
}

export const GuideBg: ImageAsset = {
  alt: 'guide-bg',
  mimeType: 'image/jpeg',
  paths: [GuideBg600, GuideBg960, GuideBg1280, GuideBg1920, GuideBg2880]
}

export const NotFoundBg: ImageAsset = {
  alt: 'not-found-bg',
  mimeType: 'image/jpeg',
  paths: [
    NotFoundBg600,
    NotFoundBg960,
    NotFoundBg1280,
    NotFoundBg1920,
    NotFoundBg2880
  ]
}
