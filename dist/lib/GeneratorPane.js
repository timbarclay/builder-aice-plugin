"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/** @jsx jsx */
const react_1 = require("react");
const core_1 = require("@emotion/core");
const core_2 = require("@material-ui/core");
const GeneratorForm_1 = __importDefault(require("./GeneratorForm"));
const Preview_1 = __importDefault(require("./Preview"));
const aiceApi_1 = require("./api/aiceApi");
const resultBucketApi_1 = require("./api/resultBucketApi");
function GeneratorPane({ lessonData, clientId, clientSecret, awsAccessKeyId, awsSecretAccessKey }) {
    const [isGenerating, setIsGenerating] = (0, react_1.useState)(false);
    const [generationStatus, setGenerationStatus] = (0, react_1.useState)('');
    const [generatedContent, setGeneratedContent] = (0, react_1.useState)(null);
    const [error, setError] = (0, react_1.useState)(null);
    const [currentGenerationId, setCurrentGenerationId] = (0, react_1.useState)(null);
    const pollingIntervalRef = (0, react_1.useRef)(null);
    const apiRef = (0, react_1.useRef)(null);
    // Cleanup polling on unmount
    (0, react_1.useEffect)(() => {
        return () => {
            if (pollingIntervalRef.current) {
                clearInterval(pollingIntervalRef.current);
            }
        };
    }, []);
    const stopGeneration = () => {
        if (pollingIntervalRef.current) {
            clearInterval(pollingIntervalRef.current);
            pollingIntervalRef.current = null;
        }
        setIsGenerating(false);
        setGenerationStatus('Generation cancelled');
        setCurrentGenerationId(null);
    };
    const startPolling = (api, generationId) => {
        setCurrentGenerationId(generationId);
        const pollStatus = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const status = yield api.generationStatus(generationId);
                setGenerationStatus(`Status: ${status.generation_status}`);
                if (status.generation_status === 'COMPLETED') {
                    if (pollingIntervalRef.current) {
                        clearInterval(pollingIntervalRef.current);
                        pollingIntervalRef.current = null;
                    }
                    // Get generated content from S3
                    setGenerationStatus('Retrieving generated content...');
                    const result = yield (0, resultBucketApi_1.getS3Object)(awsAccessKeyId, awsSecretAccessKey, status.output_location);
                    const content = JSON.parse(result.article_text);
                    setGeneratedContent(content);
                    setGenerationStatus('Generation completed successfully!');
                    setIsGenerating(false);
                    setCurrentGenerationId(null);
                }
                else if (status.generation_status === 'FAILED') {
                    if (pollingIntervalRef.current) {
                        clearInterval(pollingIntervalRef.current);
                        pollingIntervalRef.current = null;
                    }
                    throw new Error('Generation failed');
                }
            }
            catch (err) {
                if (pollingIntervalRef.current) {
                    clearInterval(pollingIntervalRef.current);
                    pollingIntervalRef.current = null;
                }
                const errorMessage = err instanceof Error ? err.message : 'Status check failed';
                setError(errorMessage);
                setGenerationStatus('');
                setIsGenerating(false);
                setCurrentGenerationId(null);
            }
        });
        // Start polling immediately, then every 10 seconds
        pollStatus();
        pollingIntervalRef.current = window.setInterval(pollStatus, 10000);
    };
    const onGenerate = (parameters) => __awaiter(this, void 0, void 0, function* () {
        if (!clientId || !clientSecret || !awsAccessKeyId || !awsSecretAccessKey) {
            setError('Missing credentials');
            return;
        }
        setIsGenerating(true);
        setError(null);
        setGeneratedContent(null);
        setGenerationStatus('Starting generation...');
        try {
            const api = new aiceApi_1.AiceApi(clientId, clientSecret);
            apiRef.current = api;
            // Start generation
            setGenerationStatus('Submitting generation request...');
            const response = yield api.generateArticle(parameters.title, parameters.learningObjective, parameters.learningGoal, parameters.targetWordCount, parameters.vocabularyWords);
            // Start polling for completion
            setGenerationStatus('Generation in progress...');
            startPolling(api, response.generation_id);
        }
        catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Generation failed';
            setError(errorMessage);
            setGenerationStatus('');
            setIsGenerating(false);
        }
    });
    return ((0, core_1.jsx)(core_2.Grid, { container: true, css: { height: '100%' } },
        (0, core_1.jsx)(core_2.Grid, { item: true, xs: 12, lg: 6 },
            (0, core_1.jsx)(GeneratorForm_1.default, { lessonData: lessonData, disabled: !clientId || !clientSecret || !awsAccessKeyId || !awsSecretAccessKey || isGenerating, onGenerate: onGenerate })),
        (0, core_1.jsx)(core_2.Grid, { item: true, xs: 12, lg: 6 },
            (0, core_1.jsx)("div", { css: { padding: 24, height: '100%' } },
                isGenerating && ((0, core_1.jsx)("div", { css: { textAlign: 'center', padding: 20 } },
                    (0, core_1.jsx)(core_2.CircularProgress, { css: { marginBottom: 16 } }),
                    (0, core_1.jsx)(core_2.Typography, { variant: "body2", color: "textSecondary", css: { marginBottom: 16 } }, generationStatus),
                    (0, core_1.jsx)(core_2.Button, { variant: "outlined", onClick: stopGeneration, size: "small" }, "Cancel Generation"))),
                error && ((0, core_1.jsx)("div", { css: { padding: 20, backgroundColor: '#ffebee', borderRadius: 4 } },
                    (0, core_1.jsx)(core_2.Typography, { variant: "body2", color: "error" },
                        "Error: ",
                        error))),
                generatedContent && !isGenerating && ((0, core_1.jsx)(Preview_1.default, { content: generatedContent })),
                !isGenerating && !generatedContent && !error && ((0, core_1.jsx)("div", { css: {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                        color: '#666',
                        textAlign: 'center'
                    } },
                    (0, core_1.jsx)(core_2.Typography, { variant: "body2" }, "Fill out the form and click \"Generate Content\" to create your lesson")))))));
}
exports.default = GeneratorPane;
//# sourceMappingURL=GeneratorPane.js.map