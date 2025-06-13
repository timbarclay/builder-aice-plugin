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
function GeneratorPane({ lessonData, clientId, clientSecret, awsAccessKeyId, awsSecretAccessKey, context }) {
    var _a, _b;
    const userId = context.user.id;
    const contentId = (_b = (_a = context.designerState) === null || _a === void 0 ? void 0 : _a.editingContentModel) === null || _b === void 0 ? void 0 : _b.id;
    const userContentId = `${userId}-${contentId}`;
    const settings = context.user.organization.value.settings.plugins;
    const [isGenerating, setIsGenerating] = (0, react_1.useState)(false);
    const [generationStatus, setGenerationStatus] = (0, react_1.useState)('');
    const [generatedContent, setGeneratedContent] = (0, react_1.useState)(null);
    const [error, setError] = (0, react_1.useState)(null);
    const [currentGenerationId, setCurrentGenerationId] = (0, react_1.useState)(null);
    const [isCreatingResource, setIsCreatingResource] = (0, react_1.useState)(false);
    const [isCreatingVisualResource, setIsCreatingVisualResource] = (0, react_1.useState)(false);
    const [title, setTitle] = (0, react_1.useState)('');
    const [createdResourceId, setCreatedResourceId] = (0, react_1.useState)(null);
    const [createdVisualResourceId, setCreatedVisualResourceId] = (0, react_1.useState)(null);
    const pollingIntervalRef = (0, react_1.useRef)(null);
    const apiRef = (0, react_1.useRef)(null);
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
    const stopGeneration = () => {
        if (pollingIntervalRef.current) {
            clearInterval(pollingIntervalRef.current);
            pollingIntervalRef.current = null;
        }
        setIsGenerating(false);
        setGenerationStatus('Generation cancelled');
        setCurrentGenerationId(null);
    };
    // Initialize from stored state and start polling if needed
    (0, react_1.useEffect)(() => {
        const storedGenerationId = settings.get(userContentId);
        if (storedGenerationId && clientId && clientSecret && awsAccessKeyId && awsSecretAccessKey) {
            setCurrentGenerationId(storedGenerationId);
            setIsGenerating(true);
            setGenerationStatus('Retrieving previous generation...');
            const api = new aiceApi_1.AiceApi(clientId, clientSecret);
            apiRef.current = api;
            startPolling(api, storedGenerationId);
        }
    }, [userContentId, clientId, clientSecret, awsAccessKeyId, awsSecretAccessKey]);
    // Cleanup polling on unmount
    (0, react_1.useEffect)(() => {
        return () => {
            if (pollingIntervalRef.current) {
                clearInterval(pollingIntervalRef.current);
            }
        };
    }, []);
    // Persist currentGenerationId changes
    (0, react_1.useEffect)(() => {
        if (currentGenerationId) {
            settings.set(userContentId, currentGenerationId);
            context.user.organization.save();
        }
    }, [currentGenerationId, userContentId]);
    const createStructuredResource = () => __awaiter(this, void 0, void 0, function* () {
        if (!generatedContent)
            return;
        setIsCreatingResource(true);
        try {
            // Split content by paragraphs and group into pages with 2 paragraphs each
            const paragraphs = generatedContent.body
                .split('\n\n')
                .filter(p => p.trim())
                .map(p => `<p>${p}</p>`);
            const pages = [];
            for (let i = 0; i < paragraphs.length; i += 2) {
                const textContent = paragraphs.slice(i, i + 2).join('');
                const textBlock = {
                    type: 'Text',
                    text: textContent
                };
                pages.push({
                    blocks: [textBlock]
                });
            }
            const articleName = `${title || 'Article'} - AI generated by ${context.user.data.displayName}`;
            const slug = articleName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
            const createResult = yield context.createContent('resource-structured', {
                name: articleName,
                data: {
                    name: articleName,
                    slug: slug,
                    pages: pages,
                    generatedByAi: true
                }
            });
            console.log('Structured resource created:', createResult);
            // Store the created resource ID
            if (createResult.id) {
                setCreatedResourceId(createResult.id);
            }
            // Show success message
            alert(`Structured resource "${articleName}" created successfully!`);
        }
        catch (err) {
            console.error('Error creating structured resource:', err);
            alert(`Error creating structured resource: ${err instanceof Error ? err.message : 'Unknown error'}`);
        }
        finally {
            setIsCreatingResource(false);
        }
    });
    const createVisualResource = () => __awaiter(this, void 0, void 0, function* () {
        var _c;
        if (!generatedContent)
            return;
        setIsCreatingVisualResource(true);
        try {
            // Split content into paragraphs and group them into pages (2 paragraphs per page)
            const paragraphs = generatedContent.body.split('\n\n').filter(p => p.trim());
            const pageList = [];
            for (let i = 0; i < paragraphs.length; i += 2) {
                // Combine 2 paragraphs for each page, wrap each in <p> tags
                const pageText = paragraphs.slice(i, i + 2).map(p => `<p>${p}</p>`).join('');
                const page = {
                    blocks: [
                        {
                            '@type': '@builder.io/sdk:Element',
                            component: {
                                name: 'Text',
                                options: {
                                    text: pageText
                                }
                            }
                        }
                    ]
                };
                pageList.push(page);
            }
            // Create the ResourcePages component
            const resourcePagesBlock = {
                '@type': '@builder.io/sdk:Element',
                component: {
                    name: 'ResourcePages',
                    options: {
                        pageList: pageList
                    }
                }
            };
            const articleName = `${title || 'Article'} - AI visual resource by ${((_c = context.user.data) === null || _c === void 0 ? void 0 : _c.displayName) || 'User'}`;
            const slug = articleName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
            const createResult = yield context.createContent('resource', {
                name: articleName,
                data: {
                    title: articleName,
                    slug: slug,
                    blocks: [resourcePagesBlock],
                    generatedByAi: true
                }
            });
            console.log('Visual resource created:', createResult);
            // Store the created visual resource ID
            if (createResult.id) {
                setCreatedVisualResourceId(createResult.id);
            }
            // Show success message
            alert(`Visual resource "${articleName}" created successfully!`);
        }
        catch (err) {
            console.error('Error creating visual resource:', err);
            alert(`Error creating visual resource: ${err instanceof Error ? err.message : 'Unknown error'}`);
        }
        finally {
            setIsCreatingVisualResource(false);
        }
    });
    const onGenerate = (parameters) => __awaiter(this, void 0, void 0, function* () {
        if (!clientId || !clientSecret || !awsAccessKeyId || !awsSecretAccessKey) {
            setError('Missing credentials');
            return;
        }
        setIsGenerating(true);
        setError(null);
        setGeneratedContent(null);
        setGenerationStatus('Starting generation...');
        setTitle(parameters.title);
        setCreatedResourceId(null); // Reset created resource ID for new generation
        setCreatedVisualResourceId(null); // Reset created visual resource ID for new generation
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
                generatedContent && !isGenerating && ((0, core_1.jsx)(Preview_1.default, { content: generatedContent, onCreateResource: createStructuredResource, onCreateVisualResource: createVisualResource, isCreatingResource: isCreatingResource, isCreatingVisualResource: isCreatingVisualResource, createdResourceId: createdResourceId, createdVisualResourceId: createdVisualResourceId })),
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