System.register(['react', '@emotion/core', '@builder.io/sdk', '@material-ui/core', 'mobx'], (function (exports) {
    'use strict';
    var useState, useRef, useEffect, jsx, Builder, Paper, Typography, TextField, Button, Divider, Grid, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, toJS;
    return {
        setters: [function (module) {
            useState = module.useState;
            useRef = module.useRef;
            useEffect = module.useEffect;
        }, function (module) {
            jsx = module.jsx;
        }, function (module) {
            Builder = module.Builder;
        }, function (module) {
            Paper = module.Paper;
            Typography = module.Typography;
            TextField = module.TextField;
            Button = module.Button;
            Divider = module.Divider;
            Grid = module.Grid;
            CircularProgress = module.CircularProgress;
            Dialog = module.Dialog;
            DialogTitle = module.DialogTitle;
            DialogContent = module.DialogContent;
            DialogActions = module.DialogActions;
        }, function (module) {
            toJS = module.toJS;
        }],
        execute: (function () {

            exports('default', AiGenerator);

            /******************************************************************************
            Copyright (c) Microsoft Corporation.

            Permission to use, copy, modify, and/or distribute this software for any
            purpose with or without fee is hereby granted.

            THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
            REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
            AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
            INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
            LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
            OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
            PERFORMANCE OF THIS SOFTWARE.
            ***************************************************************************** */

            function __awaiter(thisArg, _arguments, P, generator) {
                function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
                return new (P || (P = Promise))(function (resolve, reject) {
                    function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
                    function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
                    function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
                    step((generator = generator.apply(thisArg, _arguments || [])).next());
                });
            }

            typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
                var e = new Error(message);
                return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
            };

            /** @jsx jsx */
            function GeneratorForm({ lessonData, disabled, onGenerate }) {
                var _a, _b, _c;
                const [title, setTitle] = useState(lessonData.get('name') || '');
                const [learningObjective, setLearningObjective] = useState(((_a = lessonData.get('skill')) === null || _a === void 0 ? void 0 : _a.value.data.learningObjective) || '');
                const [learningGoal, setLearningGoal] = useState(((_b = lessonData.get('skill')) === null || _b === void 0 ? void 0 : _b.value.data.learningGoal) || '');
                const [targetWordCount, setTargetWordCount] = useState(300);
                const [vocabularyWords, setVocabularyWords] = useState(((_c = toJS(lessonData.get('vocabularyWords'))) === null || _c === void 0 ? void 0 : _c.map((w) => { var _a; return (_a = w === null || w === void 0 ? void 0 : w.word) === null || _a === void 0 ? void 0 : _a.Default; }).join(', ')) || '');
                const handleGenerate = () => {
                    onGenerate({
                        title,
                        learningObjective,
                        learningGoal,
                        targetWordCount,
                        vocabularyWords: vocabularyWords.split(',').map((w) => w.trim()).filter((w) => w),
                    });
                };
                return (jsx(Paper, { css: { padding: 24, height: '100%' } },
                    jsx(Typography, { variant: "h6", css: { marginBottom: 16 } }, "Content Generation Settings"),
                    jsx("div", { css: { marginBottom: 16 } },
                        jsx(TextField, { label: "Title", fullWidth: true, variant: "outlined", value: title, onChange: (e) => setTitle(e.target.value) })),
                    jsx("div", { css: { marginBottom: 16 } },
                        jsx(TextField, { label: "Learning Objective", fullWidth: true, multiline: true, rows: 2, variant: "outlined", value: learningObjective, onChange: (e) => setLearningObjective(e.target.value) })),
                    jsx("div", { css: { marginBottom: 16 } },
                        jsx(TextField, { label: "Learning Goal", fullWidth: true, multiline: true, rows: 2, variant: "outlined", value: learningGoal, onChange: (e) => setLearningGoal(e.target.value) })),
                    jsx("div", { css: { marginBottom: 16 } },
                        jsx(TextField, { label: "Target Word Count", fullWidth: true, type: "number", variant: "outlined", value: targetWordCount, onChange: (e) => setTargetWordCount(parseInt(e.target.value) || 300) })),
                    jsx("div", { css: { marginBottom: 24 } },
                        jsx(TextField, { label: "Vocabulary Words", fullWidth: true, multiline: true, rows: 3, variant: "outlined", placeholder: "Enter words separated by commas", value: vocabularyWords, onChange: (e) => setVocabularyWords(e.target.value), helperText: "Separate multiple words with commas" })),
                    jsx(Button, { variant: "contained", color: "primary", fullWidth: true, size: "large", onClick: handleGenerate, disabled: disabled }, "Generate Content")));
            }

            function Preview({ content, onCreateResource, isCreatingResource }) {
                if (!content) {
                    return jsx("div", null, "Preview");
                }
                return (jsx(Paper, { css: { padding: 24, height: '100%', overflow: 'auto' } },
                    jsx("div", { css: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 } },
                        jsx(Typography, { variant: "h6" }, "Generated Content"),
                        onCreateResource && (jsx(Button, { variant: "contained", color: "secondary", onClick: onCreateResource, disabled: isCreatingResource, size: "small" }, isCreatingResource ? 'Creating...' : 'Create Structured Resource'))),
                    jsx("div", { css: { marginBottom: 24 } },
                        jsx(Typography, { variant: "subtitle2", css: { marginBottom: 8, fontWeight: 'bold' } }, "Article:"),
                        jsx(Typography, { variant: "body2", css: { whiteSpace: 'pre-wrap', lineHeight: 1.6 } }, content.body)),
                    jsx(Divider, { css: { marginBottom: 16 } }),
                    jsx(Typography, { variant: "subtitle2", css: { marginBottom: 12, fontWeight: 'bold' } }, "Comprehension Questions:"),
                    content.questions.map((q, index) => (jsx("div", { key: index, css: { marginBottom: 12 } },
                        jsx(Typography, { variant: "body2", css: { fontWeight: 500 } },
                            index + 1,
                            ". ",
                            q.question),
                        jsx(Typography, { variant: "body2", color: "textSecondary", css: { marginLeft: 16 } },
                            "Answer: ",
                            q.answer))))));
            }

            const AUTH_URL = 'https://ice-auth-dev.auth.us-east-1.amazoncognito.com/oauth2/token';
            const AI_URL = 'https://06vso1ffs3.execute-api.us-east-1.amazonaws.com/dev';
            class AiceApi {
                constructor(clientId, clientSecret) {
                    this.clientId = clientId;
                    this.clientSecret = clientSecret;
                }
                generateArticle(title, learningObjectives, learningGoal, length, vocabularyList) {
                    return this.callApi('/generate/article', {
                        title,
                        learning_objectives: [learningObjectives],
                        learning_goal: [learningGoal],
                        word_count: length,
                        vocabulary_list: vocabularyList,
                        generate_images: false,
                    });
                }
                generationStatus(generationId) {
                    return this.callApi(`/status`, {
                        generation_id: generationId,
                    });
                }
                callApi(path, body) {
                    return __awaiter(this, void 0, void 0, function* () {
                        if (!this.accessToken || this.isTokenExpired()) {
                            yield this.auth();
                        }
                        const response = yield fetch(`${AI_URL}${path}`, {
                            method: 'POST',
                            body: JSON.stringify(body),
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${this.accessToken}`,
                            },
                        });
                        if (response.status === 401 || response.status === 403) {
                            this.accessToken = undefined;
                            this.accessTokenExpiration = undefined;
                        }
                        return response.json();
                    });
                }
                auth() {
                    return __awaiter(this, void 0, void 0, function* () {
                        const response = yield fetch(AUTH_URL, {
                            method: 'POST',
                            body: new URLSearchParams({
                                grant_type: 'client_credentials',
                                client_id: this.clientId,
                                client_secret: this.clientSecret,
                                scope: 'ice-m2m-resource-server-dev/read',
                            }),
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                            },
                        });
                        const data = yield response.json();
                        this.accessToken = data.access_token;
                        this.accessTokenExpiration = new Date(Date.now() + data.expires_in * 1000);
                    });
                }
                isTokenExpired() {
                    return this.accessTokenExpiration && this.accessTokenExpiration < new Date();
                }
            }

            function getS3Object(accessKeyId, secretAccessKey, s3Uri) {
                return __awaiter(this, void 0, void 0, function* () {
                    return Promise.resolve(mock);
                    // Convert s3://bucket/key to https://bucket.s3.region.amazonaws.com/key
                    // const match = s3Uri.match(/^s3:\/\/([^\/]+)\/(.+)$/);
                    // if (!match) {
                    //   throw new Error(`Invalid S3 URI format: ${s3Uri}`);
                    // }
                    // const bucket = match[1];
                    // const key = match[2];
                    // const region = 'us-east-1';
                    // const httpsUrl = `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
                    // const url = new URL(httpsUrl);
                    // const service = 's3';
                    // const now = new Date();
                    // const isoDate = now.toISOString().replace(/[:\-]|\.\d{3}/g, '');
                    // const dateStamp = isoDate.slice(0, 8);
                    // // Create canonical request
                    // const method = 'GET';
                    // const canonicalUri = `/${key}`;
                    // const canonicalQuerystring = '';
                    // const canonicalHeaders = `host:${url.hostname}\nx-amz-date:${isoDate}\n`;
                    // const signedHeaders = 'host;x-amz-date';
                    // const payloadHash = await sha256('');
                    // const canonicalRequest = [
                    //   method,
                    //   canonicalUri,
                    //   canonicalQuerystring,
                    //   canonicalHeaders,
                    //   signedHeaders,
                    //   toHex(payloadHash)
                    // ].join('\n');
                    // // Create string to sign
                    // const algorithm = 'AWS4-HMAC-SHA256';
                    // const credentialScope = `${dateStamp}/${region}/${service}/aws4_request`;
                    // const stringToSign = [
                    //   algorithm,
                    //   isoDate,
                    //   credentialScope,
                    //   toHex(await sha256(canonicalRequest))
                    // ].join('\n');
                    // // Calculate signature
                    // const kDate = await hmac(`AWS4${secretAccessKey}`, dateStamp);
                    // const kRegion = await hmac(kDate, region);
                    // const kService = await hmac(kRegion, service);
                    // const kSigning = await hmac(kService, 'aws4_request');
                    // const signature = toHex(await hmac(kSigning, stringToSign));
                    // // Create authorization header
                    // const authorization = `${algorithm} Credential=${accessKeyId}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;
                    // // Make the request
                    // const response = await fetch(httpsUrl, {
                    //   headers: {
                    //     'Authorization': authorization,
                    //     'x-amz-date': isoDate
                    //   }
                    // });
                    // if (!response.ok) {
                    //   throw new Error(`S3 request failed: ${response.status} ${response.statusText}`);
                    // }
                    // const text = await response.text();
                    // return JSON.parse(text);
                });
            }
            const mock = {
                article_text: '{"body": "A school has many people who work together. These people help to make school a good place to learn. They are called school leaders. Each leader has special jobs that keep the school running smoothly every day.\\n\\nThe principal is an important school leader. The principal makes sure the school is safe for everyone. They help teachers do their jobs well and solve big problems. When students have big problems, they can talk to the principal. Principals also make important rules for the school.\\n\\nTeachers are also school leaders. A teacher helps students learn new things in many subjects like reading and math. They make the class fun and exciting with interesting activities. Teachers help students when they don\'t understand something and cheer for them when they do well.\\n\\nSome schools have a counselor. A counselor helps students who feel sad or mad about things at school or home. They teach students how to be good friends and solve problems with words. A counselor makes sure school is fair for everyone and that all students have what they need to learn.\\n\\nThe school nurse is another leader you might see. The nurse helps when students get hurt or feel sick during the school day. They check students\' eyes and ears to make sure they can see and hear well. They teach students how to stay healthy by washing hands and eating good food too.\\n\\nStudents can be leaders too! Some students help their friends with hard work. Some keep the classroom clean by picking up trash and organizing books. Others make sure games at recess are fair for all kids by including everyone who wants to play.\\n\\nAll these leaders work together to make school a happy place. They help everyone learn and grow each day. Next time you are at school, look for all the leaders who help you every day!", "questions": [{"question": "A teacher helps students learn new things in _____.", "answer": "class"}, {"question": "School leaders work together to make ______ a good place to learn.", "answer": "school"}, {"question": "The counselor makes sure school is ______ for everyone.", "answer": "fair"}, {"question": "Some students ______ their friends with hard work.", "answer": "help"}, {"question": "Based on the article, school leaders probably want students to feel ______ at school.", "answer": "happy"}]}',
            };

            function GeneratorPane({ lessonData, clientId, clientSecret, awsAccessKeyId, awsSecretAccessKey, context }) {
                var _a, _b;
                const userId = context.user.id;
                const contentId = (_b = (_a = context.designerState) === null || _a === void 0 ? void 0 : _a.editingContentModel) === null || _b === void 0 ? void 0 : _b.id;
                const userContentId = `${userId}-${contentId}`;
                const settings = context.user.organization.value.settings.plugins;
                const [isGenerating, setIsGenerating] = useState(false);
                const [generationStatus, setGenerationStatus] = useState('');
                const [generatedContent, setGeneratedContent] = useState(null);
                const [error, setError] = useState(null);
                const [currentGenerationId, setCurrentGenerationId] = useState(null);
                const [isCreatingResource, setIsCreatingResource] = useState(false);
                const [title, setTitle] = useState('');
                const pollingIntervalRef = useRef(null);
                const apiRef = useRef(null);
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
                                const result = yield getS3Object(awsAccessKeyId, awsSecretAccessKey, status.output_location);
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
                useEffect(() => {
                    const storedGenerationId = settings.get(userContentId);
                    if (storedGenerationId && clientId && clientSecret && awsAccessKeyId && awsSecretAccessKey) {
                        setCurrentGenerationId(storedGenerationId);
                        setIsGenerating(true);
                        setGenerationStatus('Retrieving previous generation...');
                        const api = new AiceApi(clientId, clientSecret);
                        apiRef.current = api;
                        startPolling(api, storedGenerationId);
                    }
                }, [userContentId, clientId, clientSecret, awsAccessKeyId, awsSecretAccessKey]);
                // Cleanup polling on unmount
                useEffect(() => {
                    return () => {
                        if (pollingIntervalRef.current) {
                            clearInterval(pollingIntervalRef.current);
                        }
                    };
                }, []);
                // Persist currentGenerationId changes
                useEffect(() => {
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
                                pages: pages
                            }
                        });
                        console.log('Structured resource created:', createResult);
                        // Optionally navigate to the new resource or show success message
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
                    try {
                        const api = new AiceApi(clientId, clientSecret);
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
                return (jsx(Grid, { container: true, css: { height: '100%' } },
                    jsx(Grid, { item: true, xs: 12, lg: 6 },
                        jsx(GeneratorForm, { lessonData: lessonData, disabled: !clientId || !clientSecret || !awsAccessKeyId || !awsSecretAccessKey || isGenerating, onGenerate: onGenerate })),
                    jsx(Grid, { item: true, xs: 12, lg: 6 },
                        jsx("div", { css: { padding: 24, height: '100%' } },
                            isGenerating && (jsx("div", { css: { textAlign: 'center', padding: 20 } },
                                jsx(CircularProgress, { css: { marginBottom: 16 } }),
                                jsx(Typography, { variant: "body2", color: "textSecondary", css: { marginBottom: 16 } }, generationStatus),
                                jsx(Button, { variant: "outlined", onClick: stopGeneration, size: "small" }, "Cancel Generation"))),
                            error && (jsx("div", { css: { padding: 20, backgroundColor: '#ffebee', borderRadius: 4 } },
                                jsx(Typography, { variant: "body2", color: "error" },
                                    "Error: ",
                                    error))),
                            generatedContent && !isGenerating && (jsx(Preview, { content: generatedContent, onCreateResource: createStructuredResource, isCreatingResource: isCreatingResource })),
                            !isGenerating && !generatedContent && !error && (jsx("div", { css: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: '100%',
                                    color: '#666',
                                    textAlign: 'center'
                                } },
                                jsx(Typography, { variant: "body2" }, "Fill out the form and click \"Generate Content\" to create your lesson")))))));
            }

            /** @jsx jsx */
            function AiGenerator({ context }) {
                var _a, _b, _c, _d;
                console.log('context', context);
                const organisation = context.user.organization;
                const settings = organisation.value.settings.plugins;
                const [clientId, setClientId] = useState(settings.get('aiClientId'));
                const [clientSecret, setClientSecret] = useState(settings.get('aiClientSecret'));
                const [awsAccessKeyId, setAwsAccessKeyId] = useState(settings.get('aiAwsAccessKeyId'));
                const [awsSecretAccessKey, setAwsSecretAccessKey] = useState(settings.get('aiAwsSecretAccessKey'));
                const [modalOpen, setModalOpen] = useState(false);
                const [formData, setFormData] = useState({
                    clientId: clientId || '',
                    clientSecret: clientSecret || '',
                    awsAccessKeyId: awsAccessKeyId || '',
                    awsSecretAccessKey: awsSecretAccessKey || ''
                });
                const type = (_b = (_a = context.designerState) === null || _a === void 0 ? void 0 : _a.editingModel) === null || _b === void 0 ? void 0 : _b.name;
                if (type !== 'lesson') {
                    return jsx("div", { css: { padding: 16, height: '100vh' } },
                        jsx(Typography, { variant: "h4", css: { marginBottom: 16 } }, "Sorry, AI Generator is currently only available for lessons"));
                }
                const lessonData = (_d = (_c = context.designerState) === null || _c === void 0 ? void 0 : _c.editingContentModel) === null || _d === void 0 ? void 0 : _d.data;
                if (!lessonData) {
                    return jsx("div", { css: { padding: 16, height: '100vh' } },
                        jsx(Typography, { variant: "h4", css: { marginBottom: 16 } }, "No lesson data found"));
                }
                const requiresCredentials = !(clientId && clientSecret && awsAccessKeyId && awsSecretAccessKey);
                const handleSaveCredentials = () => {
                    setClientId(formData.clientId);
                    setClientSecret(formData.clientSecret);
                    setAwsAccessKeyId(formData.awsAccessKeyId);
                    setAwsSecretAccessKey(formData.awsSecretAccessKey);
                    settings.set('aiClientId', formData.clientId);
                    settings.set('aiClientSecret', formData.clientSecret);
                    settings.set('aiAwsAccessKeyId', formData.awsAccessKeyId);
                    settings.set('aiAwsSecretAccessKey', formData.awsSecretAccessKey);
                    organisation.save();
                    setModalOpen(false);
                };
                const model = lessonData.get('name');
                return (jsx("div", { css: { padding: 16, height: '100vh' } },
                    jsx("div", { css: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 } },
                        jsx(Typography, { variant: "h4" },
                            "Use AICE to generate lesson resources for ",
                            model),
                        jsx(Button, { variant: "outlined", onClick: () => setModalOpen(true) }, "Set Credentials")),
                    !requiresCredentials &&
                        jsx(GeneratorPane, { lessonData: lessonData, clientId: clientId, clientSecret: clientSecret, awsAccessKeyId: awsAccessKeyId, awsSecretAccessKey: awsSecretAccessKey, context: context }),
                    jsx(Dialog, { open: modalOpen, onClose: () => setModalOpen(false), maxWidth: "sm", fullWidth: true },
                        jsx(DialogTitle, null, "Set AI Credentials"),
                        jsx(DialogContent, { css: { paddingTop: 20 } },
                            jsx("div", { css: { marginBottom: 16 } },
                                jsx(TextField, { autoFocus: true, label: "Client ID", fullWidth: true, variant: "outlined", value: formData.clientId, onChange: (e) => setFormData(Object.assign(Object.assign({}, formData), { clientId: e.target.value })) })),
                            jsx("div", { css: { marginBottom: 16 } },
                                jsx(TextField, { label: "Client Secret", type: "password", fullWidth: true, variant: "outlined", value: formData.clientSecret, onChange: (e) => setFormData(Object.assign(Object.assign({}, formData), { clientSecret: e.target.value })) })),
                            jsx("div", { css: { marginBottom: 16 } },
                                jsx(TextField, { label: "AWS Access Key ID", fullWidth: true, variant: "outlined", value: formData.awsAccessKeyId, onChange: (e) => setFormData(Object.assign(Object.assign({}, formData), { awsAccessKeyId: e.target.value })) })),
                            jsx("div", { css: { marginBottom: 16 } },
                                jsx(TextField, { label: "AWS Secret Access Key", type: "password", fullWidth: true, variant: "outlined", value: formData.awsSecretAccessKey, onChange: (e) => setFormData(Object.assign(Object.assign({}, formData), { awsSecretAccessKey: e.target.value })) }))),
                        jsx(DialogActions, null,
                            jsx(Button, { onClick: () => setModalOpen(false) }, "Cancel"),
                            jsx(Button, { onClick: handleSaveCredentials, color: "primary" }, "Save")))));
            }
            Builder.register('editor.mainTab', {
                name: '✨ AI Generator',
                component: AiGenerator,
            });

        })
    };
}));
//# sourceMappingURL=plugin-ai-generator.system.js.map
