/* eslint-disable */
/* auto-generated from chat.yml — do not edit by hand. */
/* Regenerate via: npm run generate */

export interface paths {
    "/chat/completions": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Create chat completion
         * @description OpenAI 兼容 chat completions。支持流式（`stream: true` 返回 SSE）与非流式。
         *
         *     **扩展字段**（网关额外支持，非 OpenAI 标准）：
         *     - `thinking` / `thinking_budget` — 思考链控制
         *     - `enable_search` — 联网搜索
         *     - `conversation_id` — 关联网关托管的会话用于消息持久化
         */
        post: operations["createChatCompletion"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/responses": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Create response
         * @description OpenAI Responses API 透传入口。仅对配置为 `api_format=responses` 的模型生效，
         *     请求体与响应体按 OpenAI `/v1/responses` 协议原样透传；`stream: true` 时返回 SSE。
         */
        post: operations["createResponse"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/messages": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Create message (Anthropic format, under /v1)
         * @description Anthropic Messages API 的历史暴露路径。**新集成请使用 `/anthropic/v1/messages`**
         *     （见 anthropic.yml）。本端点保留是因为部分早期客户端硬编码了 `/v1/messages`。
         *
         *     请求/响应格式与 `/anthropic/v1/messages` **完全相同**，但鉴权方式为
         *     `Authorization: Bearer`（OpenAI 风格），而非 `x-api-key`。
         */
        post: operations["createMessageViaV1"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/models": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List models
         * @description 返回网关当前支持的全部文本和图像模型（不包含视频生成模型，OpenAI 兼容格式）
         */
        get: operations["listModels"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/videos/models": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List video generation models
         * @description 返回网关当前支持的视频生成模型列表（OpenAI 兼容格式）
         */
        get: operations["listVideoModels"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/images/models": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * 列出图像生成模型
         * @description 返回网关当前支持的图像生成模型列表；字段结构与 `/videos/models` 一致，`object` 为 `image`。
         */
        get: operations["listImageModels"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/videos/generations": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List video generation tasks */
        get: operations["listVideoGenerations"];
        put?: never;
        /**
         * Create a video generation task
         * @description 创建异步视频生成任务。返回任务 ID（HTTP 202 Accepted），使用 `GET /videos/generations/{id}` 轮询状态。
         *
         *     **响应消息国际化**：错误响应的 `error.message` 会根据请求 `Accept-Language` 头返回对应语言文案（支持
         *     en/zh/zh-Hant/ja/ko/fr/de）。`error.code` 字段保持稳定，客户端按 code 做分支判断。
         */
        post: operations["createVideoGeneration"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/videos/generations/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get video generation task */
        get: operations["getVideoGeneration"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/videos/generations/{id}/cancel": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Cancel video generation task */
        post: operations["cancelVideoGeneration"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/images/generations/async": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * 创建图像生成任务
         * @description 推荐创建异步图像生成任务路径。返回任务 ID，使用 `GET /images/generations/{id}` 轮询状态。
         *
         *     生成结果为 OpenAI ImagesResponse 兼容 JSON，结果图片以 `b64_json` 返回。任务完成后结果只允许成功领取一次；
         *     首次成功 `GET` 后服务端会删除本地临时结果文件。结果文件 TTL 默认 30 分钟，过期或已领取后返回 `410`。
         */
        post: operations["createAsyncImageGeneration"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/images/edits": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * 创建图像编辑任务（i_edit / mask_edit）
         * @description 基于源图（必填）+ prompt 创建图像编辑任务，请求体为 `multipart/form-data`。
         *     - 不提供 `mask` 时按 i_edit（整图编辑）处理
         *     - 提供 `mask` 时按 mask_edit（局部编辑）处理；`mask` 透明区域为编辑区
         *     - 源图 / mask 各 ≤ 25MB，MIME ∈ `image/png` / `image/jpeg` / `image/webp`
         *     - 上游路径 `POST /v1/images/edits`；网关侧 24h R2 临时素材保留 + 任务结束 fail-soft 删除
         *     - 返回任务 ID（前缀 `igen_iedit_` 或 `igen_mask_`），使用 `GET /images/generations/{id}` 轮询
         */
        post: operations["createImageEdit"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/images/variations": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * 创建图像变体任务（variation）
         * @description 基于源图（必填）创建图像变体任务，不接受 `prompt` / `mask`，请求体为 `multipart/form-data`。
         *     - 上游路径 `POST /v1/images/variations`；仅 dall-e-2 等支持 variations 的模型有效，
         *       不支持的模型上游返 4xx 错误透传到网关
         *     - 源图 ≤ 25MB，MIME ∈ `image/png` / `image/jpeg` / `image/webp`
         *     - 返回任务 ID（前缀 `igen_ivar_`），使用 `GET /images/generations/{id}` 轮询
         */
        post: operations["createImageVariation"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/images/generations": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * 创建图像生成任务（旧异步路径）
         * @description 兼容旧创建路径，行为与 `POST /images/generations/async` 完全一致。新接入推荐使用 `/images/generations/async`。
         *
         *     返回任务 ID，使用 `GET /images/generations/{id}` 轮询状态。结果图片以 `b64_json` 返回；首次成功 `GET` 后服务端会删除本地临时结果文件。
         */
        post: operations["createImageGeneration"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/images/generations/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * 查询图像生成任务或领取完成结果
         * @description 查询图像生成任务状态。`queued` / `processing` / `failed` / `cancelled` 返回任务信封；
         *     `completed` 首次成功调用会返回 OpenAI ImagesResponse 兼容 JSON 含 `b64_json` + `r2_url`，
         *     并立刻删除服务端临时结果文件。
         *
         *     二次及之后的查询：
         *       - R2 URL 仍在 `r2_url_expires_at` 之前 → 返 200，data 含 `r2_url` 但**不含** `b64_json`
         *         （`b64_json` 仍是一次性 delivery，跨刷新可访问 R2 URL 即可）
         *       - R2 URL 已过期 → 返 `410 image_expired`
         *       - 旧任务/R2 上传失败导致无 `r2_url` 兜底 → 返 `410 image_already_retrieved`
         *
         *     其他过期场景：本机临时文件 TTL（30min）过期但任务未 delivered → `410 image_expired`。
         */
        get: operations["getImageGeneration"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/portrait/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Call portrait action
         * @description 火山方舟 Assets API 的私域人像代理入口（LivenessFace 真人 + AIGC 虚拟）。
         *     协议层使用火山官方 `Action + Version + JSON body` 形式；鉴权使用 AllToken
         *     API Key，不暴露火山 AK/SK。
         *
         *     当前开放 12 个 Action：`CreateVisualValidateSession`、`GetVisualValidateResult`、
         *     `CreateAssetGroup`（仅 AIGC）、`GetAssetGroup`、`ListAssetGroups`、
         *     `UpdateAssetGroup`、`DeleteAssetGroup`、`CreateAsset`、`GetAsset`、
         *     `ListAssets`、`UpdateAsset`、`DeleteAsset`。
         *
         *     业务错误也返回 HTTP 200，错误内容位于 `ResponseMetadata.Error`。`ListAssetGroups`
         *     和 `ListAssets` 会按当前 API Key 所属客户做多租户过滤。
         *
         *     **多租户隔离（Wave 2.9.1 / 2.9.2）**：
         *     - 任意 Action 跨 API Key 客户访问对方 GroupId / AssetId 一律返
         *       `ResponseMetadata.Error.Code=Forbidden`，不暴露资源存在性。
         *     - 客户传入的 `Name` 字段网关只在响应层暴露原值；落到火山侧时会自动加
         *       `{customerID}-{category}-{name}` 三段前缀（category=liveface/aigc，未传 Name 时用 default 占位）做内部隔离，客户协议层不受影响（请求/响应 Name 始终
         *       是客户原始 Name）。`Name` 长度上限 **50 字符**（火山 64 减去前缀余量）。
         *     - LivenessFace 真人组由 `CreateVisualValidateSession` + H5 自动产生；
         *       `CreateAssetGroup` 仅接受 `GroupType=AIGC`，传 `LivenessFace` 会被网关
         *       拦截返 `InvalidParameter`。
         *
         *     **配额（Wave 2.5 + 2.9）**：每客户 50 个活跃组、50 个活跃素材。
         */
        post: operations["callPortraitAction"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/portrait/upload": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Upload portrait asset (multipart)
         * @description 把本地图片 multipart 上传到 AllToken R2 对象存储，再自动调火山 `CreateAsset`
         *     以 R2 URL 注册成 portrait 素材。适合没自建 CDN 的小客户 / 联调场景；
         *     有自建 CDN 的客户可继续用 `/portrait/?Action=CreateAsset` 直接传 URL。
         *
         *     工作流：multipart 上传 → R2 落盘 → 调火山 `CreateAsset(URL=R2_URL)` → 落 DB。
         *     火山或 DB 失败时 R2 文件会进入孤儿状态，由 worker `portrait:orphan_scan`
         *     凌晨清理。
         *
         *     **限制**：
         *     - 文件类型：`image/jpeg`、`image/png`、`image/webp`（火山 LivenessFace 限制）
         *     - 单文件大小：≤ 10 MB
         *     - 配额：每客户 50 个活跃素材（跟 `/portrait/?Action=CreateAsset` 共享）
         *
         *     **多租户**：GroupId 必须属于当前 API Key 客户，否则返
         *     `ResponseMetadata.Error.Code=Forbidden`，不暴露资源存在性。
         */
        post: operations["uploadPortraitAsset"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        ChatCompletionRequest: {
            /** @example gpt-4o-mini */
            model: string;
            messages: components["schemas"]["ChatMessage"][];
            /** @default false */
            stream: boolean;
            stream_options?: {
                include_usage?: boolean;
            };
            max_tokens?: number;
            temperature?: number;
            top_p?: number;
            top_k?: number;
            stop?: string[];
            user?: string;
            tools?: components["schemas"]["Tool"][];
            /** @description `auto` / `none` / `required` / `{type: function, function: {name: ...}}` */
            tool_choice?: unknown;
            response_format?: {
                /** @enum {string} */
                type?: "text" | "json_object";
            };
            /** @description 网关扩展 —— 启用联网搜索 */
            enable_search?: boolean;
            frequency_penalty?: number;
            presence_penalty?: number;
            n?: number;
            /** @description 网关扩展 —— 启用思考链 */
            thinking?: boolean;
            /** @description 网关扩展 —— 思考链 token 预算 */
            thinking_budget?: number;
            /**
             * Format: int64
             * @description 网关扩展 —— 关联网关托管的会话 ID（自动持久化消息）
             */
            conversation_id?: number;
        };
        ChatMessage: {
            /** @enum {string} */
            role: "system" | "user" | "assistant" | "tool";
            /**
             * @description 消息内容：字符串，或 ContentPart 数组（多模态），或 null（assistant 返回 tool_calls 时）。
             *     JSON 层允许 null；SDK 用 Union/any 类型接收。
             */
            content?: string | components["schemas"]["ContentPart"][];
            name?: string;
            tool_calls?: components["schemas"]["ToolCall"][];
            /** @description role=tool 时必填 */
            tool_call_id?: string;
        };
        /** @description 多模态消息内容块（文本 / 图片 URL） */
        ContentPart: {
            /** @enum {string} */
            type: "text" | "image_url";
            /** @description type=text 时的文本内容 */
            text?: string;
            /** @description type=image_url 时的图片对象 */
            image_url?: {
                /** Format: uri */
                url?: string;
                /** @enum {string} */
                detail?: "auto" | "low" | "high";
            };
        };
        Tool: {
            /** @enum {string} */
            type: "function";
            function: {
                name: string;
                description?: string;
                /** @description JSON Schema */
                parameters?: Record<string, never>;
            };
        };
        ToolCall: {
            id: string;
            /** @enum {string} */
            type: "function";
            function: {
                name?: string;
                /** @description JSON 字符串 */
                arguments?: string;
            };
        };
        ChatCompletionResponse: {
            id: string;
            /** @enum {string} */
            object: "chat.completion";
            /** Format: int64 */
            created: number;
            model: string;
            choices: components["schemas"]["Choice"][];
            usage?: components["schemas"]["Usage"];
            system_fingerprint?: string;
            /** @description 网关扩展 —— 请求 ID（便于排查） */
            "x-gateway-request-id"?: string;
            /**
             * Format: int64
             * @description 网关扩展 —— 若请求触发自动建会话，返回新会话 ID
             */
            conversation_id?: number;
        };
        ResponsesRequest: {
            /** @example gpt-5.4-pro */
            model: string;
            /** @description OpenAI Responses API input，字符串或多模态数组/对象。 */
            input?: unknown;
            /** @default false */
            stream: boolean;
        } & {
            [key: string]: unknown;
        };
        Choice: {
            index: number;
            message: components["schemas"]["ChatMessage"];
            /** @enum {string|null} */
            finish_reason?: "stop" | "length" | "tool_calls" | "content_filter" | null;
        };
        Usage: {
            prompt_tokens: number;
            completion_tokens: number;
            total_tokens: number;
            prompt_tokens_details?: {
                cached_tokens?: number;
                cache_creation_input_tokens?: number;
            };
            completion_tokens_details?: {
                reasoning_tokens?: number;
            };
            cache_read_input_tokens?: number;
            /** @description Cache write 按 TTL 拆分，key=秒数（如 300、3600） */
            cache_creation_by_ttl?: {
                [key: string]: number;
            };
            server_tool_use?: {
                [key: string]: number;
            };
        };
        ModelList: {
            /** @enum {string} */
            object: "list";
            data: components["schemas"]["ModelInfo"][];
        };
        ModelInfo: {
            id: string;
            /** @enum {string} */
            object: "model" | "video" | "image";
            /** Format: int64 */
            created?: number;
            owned_by?: string;
            /**
             * @description Top-level modality classification (R1 / 2026-05-14):
             *     - `text` — text-only chat models
             *     - `vision` — multimodal chat (image/video input, text output)
             *     - `image` — image generation models (e.g. `gpt-image-2`)
             *     - `video` — video generation models (e.g. `seedance` / `happyhorse`)
             *     `/v1/models` now returns text + image + video models together; legacy clients
             *     ignoring this field still work (additive).
             * @enum {string}
             */
            modality?: "text" | "vision" | "image" | "video";
            display_name?: string;
            brand?: string;
            family?: string;
            series?: string;
            /** Format: uri */
            logo_url?: string;
            description?: string;
            input_modalities?: string[];
            output_modalities?: string[];
        };
        VideoGenerationRequest: {
            /** @example seedance-1.5-pro */
            model: string;
            prompt: string;
            content?: components["schemas"]["VideoContentItem"][];
            /** @enum {string} */
            ratio?: "16:9" | "9:16" | "4:3" | "3:4" | "21:9" | "1:1" | "adaptive";
            /**
             * @description 视频时长（秒）。**取值范围按模型差异化**：
             *     - `seedance-1.0-pro` / `seedance-1.0-pro-fast`：`[2, 12]` 任意整数
             *     - `seedance-1.5-pro`：`[4, 12]` 任意整数 或 `-1`
             *     - `seedance-2.0` / `seedance-2.0-fast`：`[4, 15]` 任意整数 或 `-1`
             *
             *     **`-1`（智能时长）**：由模型在有效范围内自主选择，**仅 1.5-pro / 2.0 系列支持**。
             *
             *     **`0` 或不传**：使用上游默认值（5）。
             *
             *     超出范围会被网关 fail-fast 拦截为 `400 invalid_request`，错误消息按 `Accept-Language` 渲染。
             * @example 5
             */
            duration?: number;
            /** @enum {string} */
            resolution?: "480p" | "720p" | "1080p";
            /**
             * @description 视频帧数（小数秒方案，与 duration 二选一，frames 优先级高于 duration）。
             *
             *     **仅 `seedance-1.0-pro` / `seedance-1.0-pro-fast` 支持**。其他模型（1.5-pro / 2.0 系列）
             *     传 frames 会被网关**静默忽略**（silently drop），不会报错，符合 Postel 原则。
             *
             *     **取值约束**：`[29, 289]` 且必须满足 `25 + 4n` 格式（n 为正整数），如 29、33、37、...、289。
             *
             *     **计算公式**：帧数 = 时长 × 24（fps）。例如生成 2.4 秒 → 帧数 ≈ 57.6，取最接近的合法值 57（实际生成 57/24=2.375 秒）。
             *
             *     超出范围或格式错误会被网关 fail-fast 拦截为 `400 invalid_request`。
             */
            frames?: number;
            /** @description 是否生成音频 */
            generate_audio?: boolean;
            /** @description 输入是否包含视频（图生视频） */
            input_has_video?: boolean;
            /** Format: int64 */
            seed?: number;
            camera_fixed?: boolean;
            /** @default false */
            watermark: boolean;
            /** Format: uri */
            callback_url?: string;
            return_last_frame?: boolean;
            /** @enum {string} */
            service_tier?: "default" | "flex";
            execution_expires_after?: number;
            draft?: boolean;
            tools?: {
                /** @enum {string} */
                type?: "web_search";
            }[];
            safety_identifier?: string;
        };
        VideoContentItem: {
            /** @enum {string} */
            type: "text" | "image_url" | "video_url" | "audio_url" | "draft_task" | "image" | "video" | "audio";
            text?: string;
            image_url?: {
                /** Format: uri */
                url?: string;
            };
            video_url?: {
                /** Format: uri */
                url?: string;
            };
            audio_url?: {
                /** Format: uri */
                url?: string;
            };
            draft_task?: {
                id?: string;
            };
            /** @enum {string} */
            role?: "first_frame" | "last_frame" | "reference_image" | "reference_video" | "reference_audio";
            /** @description 简化格式（type=image/video/audio 时） */
            url?: string;
        };
        VideoTaskResponse: {
            /** @example vgen_01abc */
            id: string;
            /** @enum {string} */
            status: "queued" | "processing" | "completed" | "failed" | "expired" | "cancelled";
            model: string;
            /** @enum {string} */
            input_type?: "text" | "image_first_frame" | "image_first_last_frame" | "image_reference" | "video_reference" | "multimodal" | "draft_task";
            /** Format: uri */
            video_url?: string;
            /** Format: date-time */
            video_url_expires_at?: string;
            /** @description 视频 URL 剩余有效秒数 */
            video_url_ttl?: number;
            /** @description 生成视频 URL 或任务是否已过期 */
            is_expired: boolean;
            /** Format: uri */
            last_frame_url?: string;
            duration?: number;
            frames?: number;
            fps?: number;
            resolution?: string;
            ratio?: string;
            /** Format: int64 */
            seed?: number;
            generate_audio?: boolean;
            input_has_video?: boolean;
            draft?: boolean;
            draft_task_id?: string;
            service_tier?: string;
            execution_expires_after?: number;
            safety_identifier?: string;
            tools?: Record<string, never>[];
            usage?: {
                completion_tokens?: number;
                total_tokens?: number;
                tool_usage?: {
                    web_search?: number;
                };
            };
            error?: {
                code?: string;
                message?: string;
            };
            /** Format: date-time */
            created_at: string;
            /** Format: date-time */
            updated_at?: string;
            /** Format: date-time */
            completed_at?: string;
        };
        VideoListResponse: {
            items: components["schemas"]["VideoTaskResponse"][];
            total: number;
        };
        ImageEditMultipartRequest: {
            /** @example gpt-image-2 */
            model: string;
            /**
             * Format: binary
             * @description 源图，必填。≤ 25MB，MIME ∈ `image/png` / `image/jpeg` / `image/webp`。
             */
            image: string;
            /** @description 编辑提示词，必填。 */
            prompt: string;
            /**
             * Format: binary
             * @description 可选 mask 图；提供则按 mask_edit 处理（透明区域为编辑区）。≤ 25MB，同 MIME 约束。
             */
            mask?: string;
            /**
             * @default auto
             * @enum {string}
             */
            size: "auto" | "1024x1024" | "1536x1024" | "1024x1536";
            /**
             * @default auto
             * @enum {string}
             */
            quality: "auto" | "low" | "medium" | "high";
            /**
             * @default png
             * @enum {string}
             */
            output_format: "png" | "jpeg" | "webp";
            /**
             * @description `transparent` 当前不支持。
             * @default auto
             * @enum {string}
             */
            background: "auto" | "opaque";
            /**
             * @default auto
             * @enum {string}
             */
            moderation: "auto" | "low";
            /** @description 透传上游用于滥用监控。 */
            user?: string;
        };
        ImageVariationMultipartRequest: {
            /** @example dall-e-2 */
            model: string;
            /**
             * Format: binary
             * @description 源图，必填。≤ 25MB，MIME ∈ `image/png` / `image/jpeg` / `image/webp`。
             */
            image: string;
            /**
             * @default auto
             * @enum {string}
             */
            size: "auto" | "1024x1024" | "1536x1024" | "1024x1536";
            /** @description 透传上游用于滥用监控。 */
            user?: string;
        };
        ImageGenerationRequest: {
            /** @example gpt-image-2 */
            model: string;
            prompt: string;
            /**
             * @default auto
             * @enum {string}
             */
            size: "auto" | "1024x1024" | "1536x1024" | "1024x1536";
            /**
             * @default auto
             * @enum {string}
             */
            quality: "auto" | "low" | "medium" | "high";
            /**
             * @default png
             * @enum {string}
             */
            output_format: "png" | "jpeg" | "webp";
            /**
             * @description `transparent` 当前不支持。
             * @default auto
             * @enum {string}
             */
            background: "auto" | "opaque";
            /**
             * @default auto
             * @enum {string}
             */
            moderation: "auto" | "low";
            /** @description 透传上游用于滥用监控。 */
            user?: string;
        };
        ImageCreateResponse: {
            /** @example igen_a7b68c38c4b7832ee386a13e */
            id: string;
            /** @enum {string} */
            status: "queued";
            model: string;
            /** Format: date-time */
            created_at: string;
        };
        ImageTaskStatusResponse: {
            /** @example igen_a7b68c38c4b7832ee386a13e */
            id: string;
            /** @enum {string} */
            status: "queued" | "processing" | "failed" | "cancelled";
            model: string;
            /** @description queued/processing 状态建议轮询间隔毫秒数。 */
            next_poll_after_ms?: number;
            error?: components["schemas"]["ImageError"];
            /** Format: date-time */
            created_at?: string;
            /** Format: date-time */
            updated_at?: string;
        };
        ImageGenerationResponse: {
            /** @example igen_a7b68c38c4b7832ee386a13e */
            id: string;
            /** @enum {string} */
            status: "completed";
            model: string;
            /** Format: int64 */
            created: number;
            data: components["schemas"]["ImageDataItem"][];
            usage?: components["schemas"]["ImageUsage"];
            size?: string;
            quality?: string;
            output_format?: string;
            /** Format: date-time */
            completed_at?: string;
            /**
             * Format: date-time
             * @description 本地临时结果文件领取截止时间。
             */
            expires_at?: string;
        };
        ImageDataItem: {
            /**
             * @deprecated
             * @description **【已弃用 / Deprecated，未来版本将移除】**
             *
             *     Base64 编码图片数据，仅在 `completed` 首次 GET 返回（一次性 delivery，二次 GET 不返回）。
             *     推荐使用 `r2_url` 替代 —— R2 公开 URL 至少保留 30 天，跨刷新可访问且省 ~33% 流量（无 base64 膨胀）。
             *     R2 上传失败时 `r2_url` 不存在，旧客户端仍可 fallback 到本字段。
             */
            b64_json?: string;
            /**
             * Format: uri
             * @description 上游返回 URL 时的原始图片地址；服务端会同步下载并填充 b64_json。
             */
            url?: string;
            revised_prompt?: string;
            /**
             * Format: uri
             * @description R2 公开 URL，至少保留 30 天，跨刷新可访问。首次 GET 同时返回 `b64_json` + `r2_url`；
             *     二次 GET 不再返回 `b64_json`（一次性 delivery），但 `r2_url` 仍随 200 响应返回直到
             *     `r2_url_expires_at` 过期（之后返 `410 image_expired`）。R2 上传失败时该字段不存在，
             *     客户端应保留首次 GET 拿到的 `b64_json` 用于显示（旧任务/无 R2 兜底 → `410 image_already_retrieved`）。
             */
            r2_url?: string;
            /**
             * Format: date-time
             * @description R2 URL 过期时间（RFC3339 UTC）。过期后由 R2 lifecycle 自动清理对象。
             */
            r2_url_expires_at?: string;
            /** @description 图片 MIME 类型（`image/png` / `image/jpeg` / `image/webp`），便于客户端下载命名与浏览器解码。 */
            mime_type?: string;
        };
        ImageUsage: {
            input_tokens?: number;
            output_tokens?: number;
            total_tokens?: number;
            input_tokens_details?: {
                text_tokens?: number;
                image_tokens?: number;
            };
        };
        ImageError: {
            code: string;
            type?: string;
            message: string;
        };
        /** @description 请求体由 `Action` query 参数决定。 */
        PortraitActionRequest: components["schemas"]["CreateVisualValidateSessionRequest"] | components["schemas"]["GetVisualValidateResultRequest"] | components["schemas"]["PortraitIDRequest"] | components["schemas"]["ListAssetGroupsRequest"] | components["schemas"]["CreateAssetGroupRequest"] | components["schemas"]["UpdateAssetGroupRequest"] | components["schemas"]["CreateAssetRequest"] | components["schemas"]["ListAssetsRequest"] | components["schemas"]["UpdateAssetRequest"];
        PortraitEnvelope: {
            ResponseMetadata: components["schemas"]["PortraitResponseMetadata"];
            Result?: (components["schemas"]["CreateVisualValidateSessionResult"] | components["schemas"]["GetVisualValidateResultResult"] | components["schemas"]["CreateAssetGroupResult"] | components["schemas"]["AssetGroupItem"] | components["schemas"]["ListAssetGroupsResult"] | components["schemas"]["CreateAssetResult"] | components["schemas"]["AssetItem"] | components["schemas"]["ListAssetsResult"] | Record<string, never>) | null;
        };
        PortraitResponseMetadata: {
            RequestId: string;
            Action: string;
            /** @example 2024-01-01 */
            Version: string;
            /** @example ark */
            Service: string;
            /** @example cn-beijing */
            Region: string;
            Error?: {
                Code: components["schemas"]["PortraitErrorCode"];
                Message: string;
            };
        };
        CreateVisualValidateSessionRequest: {
            /**
             * Format: uri
             * @description 认证完成回调地址，推荐 HTTPS。
             */
            CallbackURL: string;
            /** @default default */
            ProjectName: string;
        };
        CreateVisualValidateSessionResult: {
            /** @description 真人认证凭证，网关按 120 秒校验。 */
            BytedToken: string;
            /**
             * Format: uri
             * @description 火山 H5 认证页面链接。
             */
            H5Link: string;
            /** Format: uri */
            CallbackURL: string;
        };
        GetVisualValidateResultRequest: {
            BytedToken: string;
            /** @default default */
            ProjectName: string;
        };
        GetVisualValidateResultResult: {
            /** @example group-20260331145705-xxxxx */
            GroupId: string;
        };
        /** @description Get/Delete 类 Action 的通用请求体。 */
        PortraitIDRequest: {
            Id: string;
            /** @default default */
            ProjectName: string;
        };
        /**
         * @description 创建虚拟人像素材组（仅 AIGC 路径）。
         *
         *     **路径约束**：`GroupType` 必须为 `AIGC`。LivenessFace 真人组由
         *     `CreateVisualValidateSession` + H5 自动产生，传 `LivenessFace` 会被网关
         *     拦截返 `InvalidParameter`。
         *
         *     **Name mapping**：客户传入的 `Name` 仅暴露在客户协议层；落到火山侧时
         *     会自动加 `{customerID}-{category}-{name}` 三段前缀（category=liveface/aigc，未传 Name 时用 default 占位）做内部隔离（客户视角看不到前缀）。
         *
         *     **配额**：每客户活跃组上限 50；`DeleteAssetGroup` 后立即释放。
         */
        CreateAssetGroupRequest: {
            /** @description 仅支持 `AIGC`。 */
            GroupType: components["schemas"]["PortraitGroupType"];
            /** @description 客户原始 Name（≤50 字符；火山 64 字符上限 - {customerID}-{category}- 前缀余量）。 */
            Name?: string;
            Title?: string;
            Description?: string;
            /** @default default */
            ProjectName: string;
        };
        /** @description 火山返回的 group id（注意字段名是 `Id` 不是 `GroupId`）。 */
        CreateAssetGroupResult: {
            /** @example group-20260518163348-xtzxl */
            Id: string;
        };
        ListAssetGroupsRequest: {
            Filter: {
                Name?: string;
                GroupIds?: string[];
                GroupType: components["schemas"]["PortraitGroupType"];
            };
            /** @default 1 */
            PageNumber: number;
            /** @default 10 */
            PageSize: number;
            /** @default default */
            ProjectName: string;
        };
        ListAssetGroupsResult: {
            TotalCount: number;
            Items: components["schemas"]["AssetGroupItem"][];
            PageNumber: number;
            PageSize: number;
        };
        UpdateAssetGroupRequest: components["schemas"]["PortraitIDRequest"] & {
            /** @description 客户原始 Name（≤50 字符；网关会自动给火山侧加 {customerID}-{category}- 前缀，category=liveface/aigc）。 */
            Name?: string;
            Description?: string;
        };
        CreateAssetRequest: {
            /** @example group-20260331145705-xxxxx */
            GroupId: string;
            /**
             * Format: uri
             * @description 火山可访问的公网素材 URL。
             */
            URL: string;
            AssetType: components["schemas"]["PortraitAssetType"];
            /** @description 客户原始 Name（≤50 字符；网关会自动给火山侧加 {customerID}-{category}- 前缀，category=liveface/aigc）。 */
            Name?: string;
            /** @default default */
            ProjectName: string;
        };
        CreateAssetResult: {
            /** @example asset-20260318035710-xxxxx */
            Id: string;
        };
        ListAssetsRequest: {
            Filter: {
                Name?: string;
                GroupIds?: string[];
                GroupType: components["schemas"]["PortraitGroupType"];
                Statuses?: components["schemas"]["PortraitAssetStatus"][];
            };
            /** @default 1 */
            PageNumber: number;
            /** @default 10 */
            PageSize: number;
            SortBy?: string;
            /** @enum {string} */
            SortOrder?: "Asc" | "Desc";
            /** @default default */
            ProjectName: string;
        };
        ListAssetsResult: {
            TotalCount: number;
            Items: components["schemas"]["AssetItem"][];
            PageNumber: number;
            PageSize: number;
        };
        UpdateAssetRequest: components["schemas"]["PortraitIDRequest"] & {
            /** @description 客户原始 Name（≤50 字符；网关会自动给火山侧加 {customerID}-{category}- 前缀，category=liveface/aigc）。 */
            Name?: string;
        };
        AssetGroupItem: {
            Id?: string;
            Name?: string;
            Title?: string;
            Description?: string;
            GroupType?: components["schemas"]["PortraitGroupType"];
            ProjectName?: string;
            /** Format: date-time */
            CreateTime?: string;
            /** Format: date-time */
            UpdateTime?: string;
        };
        AssetItem: {
            Id?: string;
            /** @description 当前 `ListAssets` 实现中可能为空；最新单素材信息以 `GetAsset` 为准。 */
            GroupId?: string;
            Name?: string;
            AssetType?: components["schemas"]["PortraitAssetType"];
            Status?: components["schemas"]["PortraitAssetStatus"];
            /**
             * Format: uri
             * @description 火山签名 URL，官方示例为 12 小时有效。
             */
            URL?: string;
            ProjectName?: string;
            /** Format: date-time */
            CreateTime?: string;
            /** Format: date-time */
            UpdateTime?: string;
            FailedReason?: string;
        };
        /**
         * @description `ResponseMetadata.Error.Code` 枚举值。网关业务错误用预定义码（PascalCase），
         *     火山原错误码原样透传。
         *
         *     **网关业务错误码**：
         *     - `Unauthorized` — API Key 无效或缺失
         *     - `Forbidden` — 跨客户访问对方 GroupId / AssetId（**不暴露存在性**）
         *     - `MissingParameter` / `MissingParameter.<field>` — 必填参数缺失
         *     - `InvalidParameter` — 参数格式错（含 CreateAssetGroup 传 LivenessFace、Name 超 50 字符）
         *     - `QuotaExceeded` — 活跃组 50/customer 或活跃素材 50/customer 超额
         *     - `RateLimitExceeded` — 客户出方向限流
         *     - `TokenExpired` — BytedToken 已过期（>120s，由网关本地 session 检查）
         *     - `InvalidToken` — BytedToken 不存在 / 已使用 / 不属于本客户
         *     - `ValidatePending` — H5 真人认证未完成 / 已过期 / 失败（上游 200 + GroupId=""）
         *     - `NotFound` — 同租户素材已过期（区分跨租户 Forbidden）
         *     - `UpstreamUnavailable` — 火山 5xx 或熔断
         *
         *     **火山原错误码（透传）**：
         *     - `SubscriptionRequired` — 火山套餐订阅未生效
         *     - `AIGCNotAvailable` — 当前权益不含 AIGC（2026-05-18 前的状态；现已开通）
         *     - `InvalidAccessKey` — 火山 AK 在火山查不到（网关运维事故）
         *     - 其他火山业务码原样
         * @example Forbidden
         */
        PortraitErrorCode: string;
        /**
         * @description `LivenessFace` 真人组由 `CreateVisualValidateSession` + H5 自动产生；
         *     `AIGC` 虚拟组由客户调用 `CreateAssetGroup` 主动创建（2026-05-18 解锁）。
         * @enum {string}
         */
        PortraitGroupType: "LivenessFace" | "AIGC";
        /** @enum {string} */
        PortraitAssetType: "Image" | "Video" | "Audio";
        /** @enum {string} */
        PortraitAssetStatus: "Processing" | "Active" | "Failed";
        /**
         * @description `/portrait/upload` 的 multipart 表单字段。`file` 是二进制文件流；
         *     其它字段都是普通 text part。
         */
        PortraitUploadRequest: {
            /**
             * Format: binary
             * @description 图片文件，image/jpeg | image/png | image/webp，单文件 ≤ 10 MB。
             */
            file: string;
            /**
             * @description 火山 asset group ID（CreateAssetGroup 返回或 CreateVisualValidateSession 自动创建）。
             * @example group-20260331145705-xxxxx
             */
            GroupId: string;
            /** @description 素材名称；省略时网关自动生成 `uploaded-{unix_ts}`。客户协议层最大 50 字符。 */
            Name?: string;
            /**
             * @description 素材类型；省略默认 `Image`。
             * @default Image
             */
            AssetType: components["schemas"]["PortraitAssetType"];
        };
        PortraitUploadResult: {
            /**
             * @description 火山返回的 asset ID。
             * @example asset-20260520120000-abcde
             */
            Id: string;
            GroupId: string;
            Name: string;
            /** @example Image */
            AssetType: string;
            /**
             * @description 落库时初始状态；后续状态可通过 `/portrait/?Action=GetAsset` 查询。
             * @example processing
             */
            Status: string;
            /**
             * Format: uri
             * @description R2 公开 URL，同时是传给火山 `CreateAsset(URL=...)` 的 URL。
             */
            UploadedURL: string;
            /**
             * @description R2 object key，用于排障 / 后续 lifecycle 操作。
             * @example portrait-uploads/12/9a3fce.jpg
             */
            R2Key: string;
        };
        /**
         * @description `/portrait/upload` 响应 envelope。结构与 `/portrait/` envelope 一致
         *     （ResponseMetadata + 可选 Result + 业务失败时 ResponseMetadata.Error 不为空），
         *     但 Result 是固定形状（不像 `/portrait/` 那样按 Action oneOf 多分支）。
         */
        PortraitUploadEnvelope: {
            ResponseMetadata: components["schemas"]["PortraitResponseMetadata"];
            Result?: components["schemas"]["PortraitUploadResult"];
        };
        ErrorResponse: {
            error: {
                code?: string;
                message: string;
                param?: string | null;
                type: string;
                request_id?: string;
                /** @description Idempotency-Key 命中时返回原任务 ID。 */
                task_id?: string;
            };
        };
    };
    responses: {
        /** @description 请求参数错误 */
        BadRequest: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["ErrorResponse"];
            };
        };
        /** @description 鉴权失败 */
        Unauthorized: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["ErrorResponse"];
            };
        };
        /** @description 余额不足（网关扩展的 402） */
        InsufficientBalance: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["ErrorResponse"];
            };
        };
        /** @description 超出限流 */
        RateLimited: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["ErrorResponse"];
            };
        };
        /** @description 资源不存在 */
        NotFound: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["ErrorResponse"];
            };
        };
        /** @description 资源已过期或图像结果已被领取 */
        Gone: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["ErrorResponse"];
            };
        };
        /** @description 网关或上游错误 */
        ServerError: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["ErrorResponse"];
            };
        };
    };
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    createChatCompletion: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ChatCompletionRequest"];
            };
        };
        responses: {
            /** @description 非流式返回 JSON；流式返回 SSE */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ChatCompletionResponse"];
                    /**
                     * @example data: {"id":"chatcmpl-1","object":"chat.completion.chunk","created":1700000000,"model":"gpt-4o-mini","choices":[{"index":0,"delta":{"role":"assistant","content":"Hi"},"finish_reason":null}]}
                     *
                     *     data: {"id":"chatcmpl-1","object":"chat.completion.chunk","created":1700000000,"model":"gpt-4o-mini","choices":[{"index":0,"delta":{},"finish_reason":"stop"}],"usage":{"prompt_tokens":10,"completion_tokens":1,"total_tokens":11}}
                     *
                     *     data: [DONE]
                     */
                    "text/event-stream": string;
                };
            };
            400: components["responses"]["BadRequest"];
            401: components["responses"]["Unauthorized"];
            402: components["responses"]["InsufficientBalance"];
            429: components["responses"]["RateLimited"];
            500: components["responses"]["ServerError"];
        };
    };
    createResponse: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                /**
                 * @example {
                 *       "model": "gpt-5.4-pro",
                 *       "input": "Explain the image generation pipeline in one paragraph."
                 *     }
                 */
                "application/json": components["schemas"]["ResponsesRequest"];
            };
        };
        responses: {
            /** @description OpenAI Responses API JSON 或 SSE 透传响应 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        [key: string]: unknown;
                    };
                    "text/event-stream": string;
                };
            };
            400: components["responses"]["BadRequest"];
            401: components["responses"]["Unauthorized"];
            402: components["responses"]["InsufficientBalance"];
            429: components["responses"]["RateLimited"];
            500: components["responses"]["ServerError"];
        };
    };
    createMessageViaV1: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": Record<string, never>;
            };
        };
        responses: {
            /** @description 同 anthropic.yml 的 MessageResponse（或 SSE 流） */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": Record<string, never>;
                    "text/event-stream": string;
                };
            };
            400: components["responses"]["BadRequest"];
            401: components["responses"]["Unauthorized"];
            500: components["responses"]["ServerError"];
        };
    };
    listModels: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 模型列表 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "object": "list",
                     *       "data": [
                     *         {
                     *           "id": "gpt-4o-mini",
                     *           "object": "model",
                     *           "created": 1700000000,
                     *           "owned_by": "openai"
                     *         },
                     *         {
                     *           "id": "claude-sonnet-4-5",
                     *           "object": "model",
                     *           "created": 1700000000,
                     *           "owned_by": "anthropic"
                     *         }
                     *       ]
                     *     }
                     */
                    "application/json": components["schemas"]["ModelList"];
                };
            };
            401: components["responses"]["Unauthorized"];
        };
    };
    listVideoModels: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 视频生成模型列表 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "object": "list",
                     *       "data": [
                     *         {
                     *           "id": "seedance-1.5-pro",
                     *           "object": "video",
                     *           "created": 1700000000,
                     *           "display_name": "Seedance 1.5 Pro",
                     *           "brand": "bytedance",
                     *           "family": "bytedance",
                     *           "series": "Seedance",
                     *           "input_modalities": [
                     *             "text",
                     *             "image"
                     *           ],
                     *           "output_modalities": [
                     *             "video"
                     *           ]
                     *         },
                     *         {
                     *           "id": "seedance-2.0",
                     *           "object": "video",
                     *           "created": 1700000000,
                     *           "display_name": "Seedance 2.0",
                     *           "brand": "bytedance",
                     *           "family": "bytedance",
                     *           "series": "Seedance",
                     *           "input_modalities": [
                     *             "text",
                     *             "image",
                     *             "video"
                     *           ],
                     *           "output_modalities": [
                     *             "video"
                     *           ]
                     *         }
                     *       ]
                     *     }
                     */
                    "application/json": components["schemas"]["ModelList"];
                };
            };
            401: components["responses"]["Unauthorized"];
        };
    };
    listImageModels: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 图像生成模型列表 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "object": "list",
                     *       "data": [
                     *         {
                     *           "id": "gpt-image-2",
                     *           "object": "image",
                     *           "created": 1778122410,
                     *           "display_name": "GPT Image 2",
                     *           "brand": "openai",
                     *           "family": "openai",
                     *           "series": "GPT Image",
                     *           "description": "OpenAI 图像生成模型，支持文本/图片输入到图片输出",
                     *           "input_modalities": [
                     *             "text",
                     *             "image"
                     *           ],
                     *           "output_modalities": [
                     *             "image"
                     *           ]
                     *         }
                     *       ]
                     *     }
                     */
                    "application/json": components["schemas"]["ModelList"];
                };
            };
            401: components["responses"]["Unauthorized"];
        };
    };
    listVideoGenerations: {
        parameters: {
            query?: {
                limit?: number;
                /** @description queued / processing / completed / failed / expired / cancelled */
                status?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 任务列表 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["VideoListResponse"];
                };
            };
            401: components["responses"]["Unauthorized"];
        };
    };
    createVideoGeneration: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["VideoGenerationRequest"];
            };
        };
        responses: {
            /**
             * @description 任务已创建（异步排队）。响应包含 `id`（task_id）+ `status: queued`，
             *     后续用 `GET /videos/generations/{id}` 轮询直至 `succeeded` / `failed` / `cancelled` / `expired`。
             */
            202: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["VideoTaskResponse"];
                };
            };
            /**
             * @description 入参非法。可能的 `error.code`：
             *     - `invalid_request` — 网关 fail-fast 校验未通过（如 seedance-2.0 传 `duration=3` 落在 [4, 15] 之外、
             *       1.0-pro 传 `duration=-1` 不支持智能时长、1.0-pro 传非 25+4n 格式的 frames 等）
             *     - `upstream_invalid_parameter` — 上游拒绝的参数错误（漏网未被网关本地校验拦截的边界）
             *     - `upstream_content_violation` — 提示词或参考素材含违规内容
             */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            401: components["responses"]["Unauthorized"];
            402: components["responses"]["InsufficientBalance"];
            /**
             * @description 模型不可用。可能的 `error.code`：
             *     - `upstream_model_not_found` — 上游服务暂时不可用该模型
             */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            429: components["responses"]["RateLimited"];
            /**
             * @description 上游服务异常。可能的 `error.code`：
             *     - `upstream_error` — 上游 5xx / 网络错 / 解析错（不透传上游内部细节，仅用 i18n 通用文案）
             *     - `upstream_auth_failed` — 上游鉴权问题（网关侧 key 失效，对外仅显示"服务暂时不可用"）
             *     - `unknown_api_format` — 配置错（mapping.api_format 未在 adapter registry 注册）
             */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    getVideoGeneration: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 任务详情 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["VideoTaskResponse"];
                };
            };
            404: components["responses"]["NotFound"];
        };
    };
    cancelVideoGeneration: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 已取消 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["VideoTaskResponse"];
                };
            };
            404: components["responses"]["NotFound"];
            /** @description 任务已完成或已取消，无法再取消 */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    createAsyncImageGeneration: {
        parameters: {
            query?: never;
            header?: {
                /** @description 60 秒短期去重；命中时返回 `409 duplicate_request` 和原任务 ID。 */
                "Idempotency-Key"?: string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ImageGenerationRequest"];
            };
        };
        responses: {
            /** @description 任务已创建 */
            202: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "id": "igen_a7b68c38c4b7832ee386a13e",
                     *       "status": "queued",
                     *       "model": "gpt-image-2",
                     *       "created_at": "2026-05-07T02:54:12Z"
                     *     }
                     */
                    "application/json": components["schemas"]["ImageCreateResponse"];
                };
            };
            400: components["responses"]["BadRequest"];
            401: components["responses"]["Unauthorized"];
            402: components["responses"]["InsufficientBalance"];
            /** @description Idempotency-Key 命中或结果领取冲突 */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            429: components["responses"]["RateLimited"];
            500: components["responses"]["ServerError"];
        };
    };
    createImageEdit: {
        parameters: {
            query?: never;
            header?: {
                /** @description 60 秒短期去重；命中时返回 `409 duplicate_request` 和原任务 ID。 */
                "Idempotency-Key"?: string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "multipart/form-data": components["schemas"]["ImageEditMultipartRequest"];
            };
        };
        responses: {
            /** @description 任务已创建 */
            202: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "id": "igen_iedit_a7b68c38c4b7832ee386a13e",
                     *       "status": "queued",
                     *       "model": "gpt-image-2",
                     *       "created_at": "2026-05-15T03:00:00Z"
                     *     }
                     */
                    "application/json": components["schemas"]["ImageCreateResponse"];
                };
            };
            400: components["responses"]["BadRequest"];
            401: components["responses"]["Unauthorized"];
            402: components["responses"]["InsufficientBalance"];
            /** @description 上传文件过大（image / mask > 25MB） */
            413: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            429: components["responses"]["RateLimited"];
            500: components["responses"]["ServerError"];
            /** @description 网关 R2 storage 未配置或上游 storage 不可用 */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    createImageVariation: {
        parameters: {
            query?: never;
            header?: {
                /** @description 60 秒短期去重；命中时返回 `409 duplicate_request` 和原任务 ID。 */
                "Idempotency-Key"?: string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "multipart/form-data": components["schemas"]["ImageVariationMultipartRequest"];
            };
        };
        responses: {
            /** @description 任务已创建 */
            202: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "id": "igen_ivar_a7b68c38c4b7832ee386a13e",
                     *       "status": "queued",
                     *       "model": "dall-e-2",
                     *       "created_at": "2026-05-15T03:00:00Z"
                     *     }
                     */
                    "application/json": components["schemas"]["ImageCreateResponse"];
                };
            };
            400: components["responses"]["BadRequest"];
            401: components["responses"]["Unauthorized"];
            402: components["responses"]["InsufficientBalance"];
            /** @description 上传文件过大（image > 25MB） */
            413: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            429: components["responses"]["RateLimited"];
            500: components["responses"]["ServerError"];
            /** @description 网关 R2 storage 未配置或上游 storage 不可用 */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    createImageGeneration: {
        parameters: {
            query?: never;
            header?: {
                /** @description 60 秒短期去重；命中时返回 `409 duplicate_request` 和原任务 ID。 */
                "Idempotency-Key"?: string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ImageGenerationRequest"];
            };
        };
        responses: {
            /** @description 任务已创建 */
            202: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "id": "igen_a7b68c38c4b7832ee386a13e",
                     *       "status": "queued",
                     *       "model": "gpt-image-2",
                     *       "created_at": "2026-05-07T02:54:12Z"
                     *     }
                     */
                    "application/json": components["schemas"]["ImageCreateResponse"];
                };
            };
            400: components["responses"]["BadRequest"];
            401: components["responses"]["Unauthorized"];
            402: components["responses"]["InsufficientBalance"];
            /** @description Idempotency-Key 命中或结果领取冲突 */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            429: components["responses"]["RateLimited"];
            500: components["responses"]["ServerError"];
        };
    };
    getImageGeneration: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 任务状态或首次领取的图像结果 */
            200: {
                headers: {
                    /** @description queued/processing 状态建议等待秒数 */
                    "Retry-After"?: number;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ImageTaskStatusResponse"] | components["schemas"]["ImageGenerationResponse"];
                };
            };
            401: components["responses"]["Unauthorized"];
            404: components["responses"]["NotFound"];
            /** @description 另一个请求正在领取结果 */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            410: components["responses"]["Gone"];
            500: components["responses"]["ServerError"];
        };
    };
    callPortraitAction: {
        parameters: {
            query: {
                /** @description 火山 Action 名。 */
                Action: "CreateVisualValidateSession" | "GetVisualValidateResult" | "CreateAssetGroup" | "GetAssetGroup" | "ListAssetGroups" | "UpdateAssetGroup" | "DeleteAssetGroup" | "CreateAsset" | "GetAsset" | "ListAssets" | "UpdateAsset" | "DeleteAsset";
                /** @description 火山 Assets API 版本；当前仅支持 `2024-01-01`。 */
                Version?: "2024-01-01";
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["PortraitActionRequest"];
            };
        };
        responses: {
            /** @description 火山风格 envelope；成功时包含 Result，业务失败时包含 ResponseMetadata.Error。 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PortraitEnvelope"];
                };
            };
            401: components["responses"]["Unauthorized"];
            429: components["responses"]["RateLimited"];
            500: components["responses"]["ServerError"];
        };
    };
    uploadPortraitAsset: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "multipart/form-data": components["schemas"]["PortraitUploadRequest"];
            };
        };
        responses: {
            /** @description 上传 + 注册结果；envelope 风格，业务失败时 `ResponseMetadata.Error` 不为空。 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PortraitUploadEnvelope"];
                };
            };
            401: components["responses"]["Unauthorized"];
            /** @description multipart body 超过上限（10 MB + form fields buffer） */
            413: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            429: components["responses"]["RateLimited"];
            500: components["responses"]["ServerError"];
        };
    };
}
