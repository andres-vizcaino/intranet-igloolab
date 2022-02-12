import buildUrl from 'cloudinary-build-url'

export const getUrlCloudnaryLowQuality = (imageId: string): string =>
  buildUrl(imageId, {
    cloud: {
      cloudName: 'open-igloolab-co',
    },
    transformations: {
      quality: 60,
    },
  })
