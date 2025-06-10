/// <reference types="react" />
interface PreviewProps {
    content?: {
        body: string;
        questions: Array<{
            question: string;
            answer: string;
        }>;
    };
}
export default function Preview({ content }: PreviewProps): JSX.Element;
export {};
