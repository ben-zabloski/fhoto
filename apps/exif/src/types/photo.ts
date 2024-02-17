export interface Image {
  Make: string;
  Model: string;
  Orientation: number;
  XResolution: number;
  YResolution: number;
  ResolutionUnit: number;
  ModifyDate: string;
  Artist: string;
  YCbCrPositioning: number;
  Copyright: string;
  ExifOffset: number;
  GPSInfo: number;
  Padding: ArrayBuffer;
}

export interface Thumbnail {
  Compression: number;
  XResolution: number;
  YResolution: number;
  ResolutionUnit: number;
  ThumbnailOffset: number;
  ThumbnailLength: number;
}

export interface Exif {
  ExposureTime: number;
  FNumber: number;
  ExposureProgram: number;
  ISO: number;
  ExifVersion: ArrayBuffer;
  DateTimeOriginal: string;
  DateTimeDigitized: string;
  ComponentsConfiguration: ArrayBuffer;
  ShutterSpeedValue: number;
  ApertureValue: number;
  ExposureBiasValue: number;
  MeteringMode: number;
  Flash: number;
  FocalLength: number;
  MakerNote: ArrayBuffer;
  UserComment: ArrayBuffer;
  SubSecTime: string;
  SubSecTimeOriginal: string;
  SubSecTimeDigitized: string;
  FlashpixVersion: ArrayBuffer;
  ColorSpace: number;
  PixelXDimension: number;
  PixelYDimension: number;
  InteropOffset: number;
  FocalPlaneXResolution: number;
  FocalPlaneYResolution: number;
  FocalPlaneResolutionUnit: number;
  CustomRendered: number;
  ExposureMode: number;
  WhiteBalance: number;
  SceneCaptureType: number;
  Padding: ArrayBuffer;
  OffsetSchema: number;
}

export interface Gps {
  GPSVersionID: number[];
}

export interface Photo {
  bigEndian: boolean;
  image: Image;
  thumbnail: Thumbnail;
  exif: Exif;
  gps: Gps;
}
