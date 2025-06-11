export interface TextBlock {
  type: 'Text';
  text: string; // This is HTML
}

export interface Page {
  blocks: TextBlock[];
}