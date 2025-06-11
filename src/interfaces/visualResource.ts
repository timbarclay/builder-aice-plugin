interface BuilderBlock {
  '@type': '@builder.io/sdk:Element';
  tagName?: string;
  responsiveStyles?: {
    large?: Record<string, string>;
    medium?: Record<string, string>;
    small?: Record<string, string>;
  };
  component?: {
    name: string;
    options?: Record<string, any>;
  };
  children?: BuilderBlock[];
}

export interface VisualResource {
  blocks: BuilderBlock[];
  title: string;
  slug: string;
}