/// <reference types="react" />
import { EngineParameters } from './GeneratorPane';
interface GeneratorFormProps {
    lessonData: Map<string, any>;
    disabled: boolean;
    onGenerate: (parameters: EngineParameters) => void;
}
export default function GeneratorForm({ lessonData, disabled, onGenerate }: GeneratorFormProps): JSX.Element;
export {};
