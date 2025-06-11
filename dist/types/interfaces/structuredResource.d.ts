export interface TextBlock {
    type: 'Text';
    text: string;
}
export interface Page {
    blocks: TextBlock[];
}
