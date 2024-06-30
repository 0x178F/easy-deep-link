export interface Options {
  urls: {
    iosApp: string;
    androidApp: string;
    iosStore: string;
    androidStore: string;
    fallback: string;
  };
  pageTitle?: string;
  headingText?: string;
}