/// <reference types="react" />
interface PreviewProps {
    content?: {
        body: string;
        questions: Array<{
            question: string;
            answer: string;
        }>;
    };
    onCreateResource?: () => void;
    isCreatingResource?: boolean;
}
export default function Preview({ content, onCreateResource, isCreatingResource }: PreviewProps): JSX.Element;
export {};
