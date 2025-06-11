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
    onCreateVisualResource?: () => void;
    isCreatingResource?: boolean;
    isCreatingVisualResource?: boolean;
    createdResourceId?: string | null;
    createdVisualResourceId?: string | null;
}
export default function Preview({ content, onCreateResource, onCreateVisualResource, isCreatingResource, isCreatingVisualResource, createdResourceId, createdVisualResourceId }: PreviewProps): JSX.Element;
export {};
