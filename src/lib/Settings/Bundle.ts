export type BundleBuilderShopifySectionSettings = {
  title: string;
  background_image: string;
  logo: string;
  loading_image: string;
};

export type BundleBuilderShopifyBlockSettings = {
  block_type: BlockTypes;
  title: string;
  is_popular: boolean;
  bundle_page_background_image: string;
  cta_text: string;
  min_products: number;
  whats_the_difference_image: string;
  show_upsell_page: boolean;
  upsell_page_title: string;
  upsell_page_background_image: string;
  upsell_page_description: string;
  final_page_background_image: string;
  final_page_description: string;
};

export type BlockTypes = "all" | "cans" | "oils" | "";
type BundleBuilderShopifyBlockType = BlockTypes[];

export type Env = "development" | "production";

const sectionSettingsData = document
  .querySelector("[data-section-settings]")
  ?.getAttribute("data-section-settings");

const blockSettingsData = document
  .querySelector("[data-block-settings]")
  ?.getAttribute("data-block-settings");

const blockTypeData = document
  .querySelector("[data-block-type]")
  ?.getAttribute("data-block-type");

const envData = document.querySelector("[data-env]")?.getAttribute("data-env");

const parsedBlockType = JSON.parse(
  blockTypeData ?? "[]",
) as BundleBuilderShopifyBlockType;

const parsedBlockSettings = JSON.parse(
  blockSettingsData ?? "[]",
) as BundleBuilderShopifyBlockSettings[];

export const shopifySectionSettings = JSON.parse(
  sectionSettingsData ?? "{}",
) as BundleBuilderShopifySectionSettings;

// combine block settings with block type
export const shopifyBlockSettings = parsedBlockSettings.map(
  (blockSetting, index) => ({
    ...blockSetting,
    block_type: parsedBlockType[index],
  }),
) as BundleBuilderShopifyBlockSettings[];

export const env = envData as Env;
