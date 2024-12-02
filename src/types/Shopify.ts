type Primitive = null | undefined | string | number | boolean | symbol | bigint;
type LiteralUnion<LiteralType, BaseType extends Primitive> =
  | LiteralType
  | (BaseType & Record<never, never>);

export interface Shopify {
  PaymentButton: {
    init(): any;
  };
  autoloadFeatures(param: any): any;
  /**
   * Only show in Theme previews, it's a class instance, yuck.
   */
  PreviewBarInjector(options: {
    targetNode: HTMLElement;
    iframeRoot: string;
    iframeSrc: string;
    previewToken: string;
    themeStoreId: string;
    permanentDomain: string;
  }): {
    /**
     * This is already invoked at runtime
     */
    init(): void;
    hideIframe(): void;
    postMessageBuffer(argument: any): any;
    postTrekkieData(param: any): any;
    sendPostMessage(param1: any, param2: any): any;
    postMessageHandler(param1: any, param2: any, param3: any, param4: any): any;
    teardown(): void;
  };
  /**
   * Set to `true` when active in theme editor
   */
  designMode?: boolean;
  /**
   * Related to web-pixels management
   */
  analytics: {
    /**
     * Store reference of some sort, see `publish` method.
     */
    replayQueue: Array<[any, any, any]>;
    /**
     * Inserts entries into the `replayQueue`
     */
    publish(param1: any, param2?: any, param3?: any): void;
  };
  /**
   * Routes reference
   */
  routes: {
    /**
     * The root path, typically `/` unless you are using sub-folder
     * markets then it would be something like `/en-us/` etc
     */
    root: string;
  };
  /**
   * Reference to CDN hostname, typically: `cdn.shopify.com`
   */
  cdnHost: string;
  /**
   * Currency Reference
   */
  currency: {
    /**
     * The current active current code, eg: `USD`, `SEK` etc
     */
    active: string;
    /**
     * The exchange rate
     */
    rate: string;
  };
  /**
   * The current 2 Letter ISO Country code, eg: `US` or `CA` or `NL` etc
   */
  country: string;
  /**
   * Customer Privacy Methods
   */
  customerPrivacy: {
    getRegulation(): any;
    getShopPrefs(): any;
    getTrackingConsent(): any;
    isRegulationEnforced(): any;
    setTrackingConsent(param1: any, param2: any): any;
    shouldShowGDPRBanner(): any;
    userCanBeTracked(): any;
    userDataCanBeSold(): any;
  };
  loadFeatures(
    params: Array<{
      name: LiteralUnion<"consent-tracking-api", string>;
      version: LiteralUnion<"0.1", string>;
    }>,
    callback: (error: Error) => void,
  ): any;
  /**
   * Two letter language code
   */
  locale: string;
  /**
   * The `myshopify.com` store domain
   */
  shop: string;
  modules: boolean;
  /**
   * Theme Information
   */
  theme: {
    handle: string;
    id: number;
    name: string;
    role: "published" | "unpublished";
    style: {
      id: number;
      handle: string;
    };
    theme_store_id: null | number;
  };
}

export interface BOOMR {
  /**
   * Timestamp, eg: `new Date().getTime()`
   */
  snippetStart: number;
  snippetExecuted: boolean;
  snippetVersion: number;
  /**
   * The application rederer, typically: `storefront-renderer`
   */
  application: string;
  /**
   * The name of the Theme
   */
  themeName: string;
  /**
   * The theme version
   */
  themeVersion: string;
  /**
   * Shop ID
   */
  shopId: number;
  /**
   * Theme ID
   */
  themeId: number;
  /**
   * Theme render region
   */
  renderRegion: string;
  /**
   * External scripting reference, typically:
   * `https://cdn.shopify.com/shopifycloud/boomerang/shopify-boomerang-1.0.0.min.js`
   */
  url: string;
}

export interface ShopifyAnalytics {
  /**
   * Holds some references, not just `currency`
   * Seems to change between navigations.
   */
  meta: {
    currency: string;
  };
  /**
   * Related to Google Analytics, **bleep** knows what.
   */
  merchantGoogleAnalytics(): void;
  /**
   * Seems to be what is used to publish to dashboard
   */
  lib: {
    /**
     * Likely an action reference, something like `Viewed Product Category`
     * as the first parameter and the 2nd being an object describing the action.
     */
    track(action: string, data: object): any;
    /**
     * Similar to `track`
     */
    page(action: string, data: object): any;
  };
}

declare global {
  interface Window {
    BOOMR: BOOMR;
    ShopifyAnalytics: ShopifyAnalytics;
    Shopify: Shopify;
  }
}

/**
 * The Shopify window object
 */
declare const Shopify: Window["Shopify"];

/**
 * The Shopify Analytics window object
 */
declare const ShopifyAnalytics: Window["ShopifyAnalytics"];

/**
 * The BOOMR window object
 */
declare const BOOMR: Window["BOOMR"];

// Export the Shopify object from the window
export const shopify = window.Shopify;
