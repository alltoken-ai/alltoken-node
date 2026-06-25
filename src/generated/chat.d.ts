/* eslint-disable */
/* auto-generated from chat.yml — do not edit by hand. */
/* Regenerate via: npm run generate */

export interface paths {
    "/feedback": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List own submitted feedback
         * @description 仅返本人提交的全部反馈（含私密）。支持 status/category/q/date_from/date_to/limit/offset/sort 过滤。
         */
        get: operations["listOwnFeedback"];
        put?: never;
        /**
         * Submit AI assistant feedback
         * @description AI 助手在踩到能力缺口时机器化提交反馈（plan §A.1）。
         *     - 支持 11 个 category 枚举（见 GET /feedback/categories）
         *     - 携 webhook_url 时首次返回明文 `ai_webhook_secret`（wsk_ 前缀 + 64 字符 hex）
         *     - 跨用户 `evidence.request_ids` 静默丢弃，response 仅返 accepted/dropped count
         *     - body ≤ 32KB，summary 10-200 字符，details ≤ 4000 字符
         */
        post: operations["submitFeedback"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/feedback/{feedback_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get feedback by ID
         * @description 权限规则：
         *     - 自己提交的 → Self 视图（含完整字段，不含 ai_webhook_secret / 内部 triage_notes）
         *     - 公开（is_public=true 且非 pending_public_review）→ Public 脱敏视图
         *     - 其余 → 404（不区分"不存在"与"无权限"）
         */
        get: operations["getFeedback"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/feedback/public": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List public feedback
         * @description 返 is_public=true AND pending_public_review=0 AND delsign=0 的反馈。严格脱敏：
         *     不暴露 user_id / api_key_id_hint / webhook_url / request_ids / public_share_note / triage_notes 内部。
         *     q 短查询 fallback：rune≤1 → 400；中文≤3 → LIKE；ASCII≤3 → BOOLEAN +q*；≥4 → NATURAL MODE。
         */
        get: operations["listPublicFeedback"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/feedback/categories": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List feedback category enum metadata
         * @description 返 11 个 category 元数据（含 i18n 描述），便于 AI 助手运行时拿枚举避免硬编码。
         */
        get: operations["listFeedbackCategories"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
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
    "/embeddings": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * 创建文本向量
         * @description OpenAI 兼容的文本向量（embeddings）。把文本转成向量，用于语义检索 / 聚类 / 分类 / RAG。无流式。input 接受字符串或字符串数组；网关转发给上游 embedding 模型（如 text-embedding-v4）并把响应归一回 OpenAI 格式。
         */
        post: operations["createEmbedding"];
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
         * @deprecated
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
    "/audio/speech": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Create speech audio
         * @description OpenAI-compatible text-to-speech endpoint. The first release supports synchronous binary responses.
         *     `stream=true` is rejected, `speed` must be 1.0, and `response_format` supports `wav`, `pcm`, and `mp3`.
         */
        post: operations["createSpeech"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/audio/voices": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List audio voices
         * @description Returns builtin voices plus the current user's cloned/designed voices only.
         */
        get: operations["listAudioVoices"];
        put?: never;
        /**
         * Create an audio voice task
         * @description Creates a voice clone or voice design task. Clone requests must include explicit consent and base64 audio.
         *     Remote sample URLs are rejected to avoid SSRF. Use `Idempotency-Key` for 24-hour request deduplication.
         */
        post: operations["createAudioVoiceTask"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/audio/voices/upload-presign": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Create R2 upload presign for voice sample
         * @description Issues a short-lived (300s) presigned R2 PUT URL for uploading a voice clone sample
         *     (up to 10 MiB, audio/wav only in this release). Client uploads directly to R2 with
         *     Content-Type, Content-MD5 and Content-Length headers as instructed, then submits the
         *     returned `upload_id` to `POST /audio/voices` instead of inlining base64.
         *     Avoids 10 MiB base64 round-trips through the gateway. MP3/M4A support will land in a
         *     follow-up release.
         *     Error codes (returned inside ErrorResponse.error.code):
         *     `invalid_purpose`, `invalid_content_type`, `invalid_content_md5`,
         *     `invalid_checksum_sha256`, `payload_too_large`, `quota_exceeded`, `presign_failed`.
         */
        post: operations["createVoiceSampleUploadPresign"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/audio/voices/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get audio voice task status
         * @description Returns queued/running/completed/failed task state for the current user. Cross-user task IDs return 404.
         *     Completed task sample URLs expire; after expiry the endpoint returns 410 while the voice_id remains usable.
         */
        get: operations["getAudioVoiceTask"];
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
    "/uploads/presign": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * 创建媒体输入素材 R2 直传 presign
         * @description 为图生图、图生视频、视频生视频、视频音频参考等输入素材签发短期 R2 PUT URL。
         *     客户端按返回的 `required_headers` 直接 PUT 到 R2，再把 `upload_id` 提交给
         *     `/images/edits`、`/images/variations` 或 `/videos/generations`。
         *
         *     presign URL 有效期 5 分钟；未绑定 claim 2 小时自动过期并删除临时对象；
         *     任务成功、失败、取消或过期后，已绑定 active 输入对象会立即删除。该路径避免
         *     大图片/视频字节穿过网关和 Cloudflare 边缘层。
         */
        post: operations["createMediaUploadPresign"];
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
         * @description 基于源图（必填）+ prompt 创建图像编辑任务，仅支持 `application/json`
         *     + `image_upload_id`。客户端 multipart/form-data 已下线；必须先走 `/uploads/presign` 直传 R2，再提交 JSON。
         *     - 不提供 `mask_upload_id` 时按 i_edit（整图编辑）处理
         *     - 提供 `mask_upload_id` 时按 mask_edit（局部编辑）处理；mask 透明区域为编辑区
         *     - 源图 / mask 各 <= 25MB，MIME in `image/png` / `image/jpeg` / `image/webp`
         *     - `upload_id` 未使用 claim 2 小时过期删除；任务成功 / 失败 / 取消后输入 active object 立即 fail-soft 删除
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
         * @description 基于源图（必填）创建图像变体任务，不接受 `prompt` / `mask`，仅支持
         *     `application/json` + `image_upload_id`。客户端 multipart/form-data 已下线；必须先走 `/uploads/presign` 直传 R2，再提交 JSON。
         *     - 上游路径 `POST /v1/images/variations`；仅支持 variations 的模型有效
         *     - 源图 <= 25MB，MIME in `image/png` / `image/jpeg` / `image/webp`
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
    "/3d/generations/async": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * 创建 3D 生成任务（推荐异步路径）
         * @description 创建异步 3D 资产生成任务。返回任务 ID（HTTP 202 Accepted），使用 `GET /3d/generations/{id}` 轮询状态。
         *
         *     **模型矩阵**：
         *     - `tripo-h3.1` / `tripo-p1.0`（阿里云百炼）：支持文生 / 单图 / 多图三模式，输出 PBR 模型 + 基础几何 + 预览图三 URL，2h 过期
         *     - `seed3d-2.0`（火山方舟）：仅单图，输出单 zip URL（含 GLB/OBJ/USD/USDZ 任一），24h 过期
         *
         *     **input 三选一互斥**：`prompt` xor `image` xor `images`（按模型 capability 校验）。
         *
         *     **parameters.detail_level**：公共档位 `low` / `medium` / `high`（默 medium）。tripo-h3.1 接受全部三档；tripo-p1.0 不接受 high；seed3d-2.0 接受全部三档。
         *
         *     **Idempotency-Key**：可选，24h 内同 key 同 API Key 返既有任务 ID（不重复扣费/上游）。
         */
        post: operations["createAsync3DGeneration"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/3d/generations": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * 创建 3D 生成任务（兼容路径）
         * @description 与 `POST /3d/generations/async` 完全一致；新接入推荐使用 async 路径。
         */
        post: operations["create3DGeneration"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/3d/generations/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * 查询 3D 生成任务状态
         * @description 查询任务状态：
         *       - `queued` / `processing` / `cancelling`：仅返任务信封（无 assets）
         *       - `completed` 且未过期：200 + assets[] + usage
         *       - `completed` 但 URL 过期：**HTTP 410** + `status='completed'` + `is_expired=true` + `error.code='result_expired'`
         *         （注：status 保留为 completed，不伪装为 expired；过期信号靠 HTTP 状态码 + is_expired 字段表达）
         *       - `failed` / `cancelled` / `expired`：返 error.{code,message}，无 assets
         *
         *     鉴权：必须任务归属当前 API Key 所属 user；不匹配返 404（避免存在性泄漏）。
         */
        get: operations["get3DGeneration"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/3d/generations/{id}/cancel": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * 取消 3D 生成任务
         * @description 仅 `queued` 与 `processing` 未首次轮询的任务可取消；其他状态返 `409 invalid_status`。
         *     seed3d-2.0 调用上游 cancel；tripo 系列 v1 仅本地状态机 + 退款。
         */
        post: operations["cancel3DGeneration"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/usage": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * 获取账户 API 使用额度
         * @description 返回当前 API Key 关联账户的 USD API 使用额度与 token grant 额度。
         *
         *     - `usage_quota` 是 USD API 使用额度数值，前端展示用 `usage_quota_str`（`$x.xx`，2 位小数 + 美元符号）。
         *     - `token_quota.total_remaining` 是所有有效（`remaining_tokens > 0`）的 grant token 总和。
         *     - `token_quota.by_model[]` 按 `restrict_model` 维度聚合；`model=null` 表示通用 grant（可对任意模型生效）。
         */
        get: operations["getUsage"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/billing/transactions": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List billing transactions
         * @description 列出当前 API Key 关联账户的流水（API 使用购买 / 扣款 / 兑换码 / 退款 / 手续费 / 退手续费等全类型）。
         *
         *     **过滤 & 分页**：
         *     - `limit` 默认 20，最大 100（超过自动截断）。
         *     - `offset` 非负整数，超过 100 万返 400。
         *     - `source` × `direction` 组合（如 `source=grant&direction=deduct`）解析为内部 `change_type` 集合；也可直接传 `change_type` 精确单选。
         *     - `billing_type` 0=全部 / 1=Web / 2=API（注：当前 chat 服务只过滤数值，前端可按业务再聚合）。
         *     - `date_from` / `date_to` 仅 `YYYY-MM-DD`；`date_from > date_to` 返 400。
         *
         *     **数值字段**：
         *     - `tokens_delta` 已带正负号（add=正，deduct=负）。
         *     - `cost` / `cost_str` 仅扣款/退款类有值；非扣款类（grant_add / exchange_in 等）返 `null`。
         *     - `cost_str` 4 位小数 + $ 符号前置（如 `$-0.0123`，已处理负零边界为 `$0.0000`）。
         *
         *
         *     **i18n**：`description` / `billing_type_label` 按 `Accept-Language`（en / zh / zh-Hant / de / fr / ja / ko）切换翻译。
         */
        get: operations["listTransactions"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/billing/transactions/{request_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get transaction by request_id
         * @description 按 `request_id`（即上游模型调用的 `chatcmpl-id` 等同 ID）拉取**同一笔账单的多行 ledger**。
         *     通常一次模型调用会产生 1~N 条 ledger（主扣款 + 手续费 + 缓存命中分摊等），本接口返回所有行 + 聚合 summary。
         *
         *     **响应字段语义**：
         *     - `summary.total_tokens_delta` 全部 ledger 行 `tokens_delta` 之和（含正负）。
         *     - `summary.total_cost` 全部 ledger 行 `cost` 绝对值聚合后带原方向符号。
         *     - `summary.fee_rate` 手续费占比（仅含 fee 的笔有值）：`|sum(fee_cost)| / |sum(deduct_cost)|`。
         *     - `summary.first_created_at` 最早一行的创建时间，便于排序。
         *     - `ledgers[]` 数组按 `id ASC` 排，方便审计。
         *
         *     **错误码**：
         *     - 404 跨 user 越权 / request_id 不存在 → `{"error":{"code":"not_found","message":"transaction not found"}}`（不区分两种语义，防资源存在性泄露）。
         *     - 400 `request_id` 空 / 长度 > 256 → `invalid_request_id` i18n。
         */
        get: operations["getTransactionByRequestID"];
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
        FeedbackSubmitRequest: {
            /** @enum {string} */
            category: "missing_endpoint" | "missing_capability" | "missing_model" | "model_quality" | "performance" | "reliability" | "pricing" | "documentation" | "error_message" | "business_gap" | "out_of_scope";
            summary: string;
            details?: string;
            /** @description 触发上下文（model / endpoint / user_intent / tried_approach / wished_for 等）；JSON marshal ≤ 8KB */
            context?: {
                [key: string]: unknown;
            };
            evidence?: {
                /** @description 跨用户的 request_id 服务端静默丢弃；response 仅返 accepted/dropped count */
                request_ids?: string[];
                frequency_estimate?: string;
            };
            competitor_examples?: string[];
            suggested_solution?: string;
            /** @enum {string} */
            ai_priority?: "low" | "medium" | "high" | "critical";
            /**
             * @description 默认私密；PR-2 起，若 PII 扫描命中则强制 false + 进 admin 审核队列
             * @default false
             */
            is_public: boolean;
            public_share_note?: string;
            ai_assistant: {
                name: string;
                version?: string;
                /**
                 * Format: uri
                 * @description 必须 HTTPS；完整 SSRF + IP denylist + DNS rebinding 防护在 PR-2 worker 接通
                 */
                webhook_url?: string;
            };
        };
        FeedbackSubmitResponse: {
            /** @example fb_20260516_ABCDEFGH */
            feedback_id: string;
            /** @enum {string} */
            status: "received" | "duplicate";
            is_public?: boolean;
            /** @description PR-2 起：PII 扫描命中时 true */
            pending_public_review?: boolean;
            /** @description PR-2 dedup 命中时指向已有 feedback_id */
            dedup_with?: string | null;
            /** @description 关联反馈的当前 status */
            dedup_with_status?: string | null;
            /** @description 本人命中并保留的 request_ids 数量 */
            evidence_request_ids_accepted_count?: number;
            /** @description 不命中静默丢弃的数量；不返具体哪些被丢，防跨用户探测 */
            evidence_request_ids_dropped_count?: number;
            /** Format: date-time */
            acknowledged_at: string;
            next_steps: string;
            /**
             * @description 仅当本次 Submit 携 `ai_assistant.webhook_url` 时返回（首次明文，一次性，
             *     wsk_ 前缀 + 64 字符 hex）；后续 GET / list 永不再返。
             *     AI 助手用此 secret 校验 webhook payload 的 HMAC-SHA256 签名（PR-2 接通）。
             * @example wsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
             */
            ai_webhook_secret?: string;
        };
        /** @description Self 视图：用户看自己提交的全部字段（不含 secret / 内部 triage_notes） */
        FeedbackSelfItem: {
            feedback_id?: string;
            /** @description 末 4 位 mask（***1234） */
            api_key_id_hint?: string;
            ai_assistant?: {
                name?: string;
                version?: string;
                webhook_url?: string;
            };
            category?: string;
            summary?: string;
            details?: string;
            context?: {
                [key: string]: unknown;
            };
            evidence?: {
                request_ids?: string[];
                frequency_estimate?: string;
            };
            competitor_examples?: string[];
            suggested_solution?: string;
            ai_priority?: string;
            internal_priority?: string;
            is_public?: boolean;
            pending_public_review?: boolean;
            public_share_note?: string;
            /** Format: date-time */
            published_at?: string | null;
            /** @enum {string} */
            status?: "received" | "triaging" | "planned" | "in_progress" | "shipped" | "wontfix" | "duplicate" | "needs_more_info";
            /** Format: date-time */
            status_changed_at?: string | null;
            dedup_with?: string | null;
            /** @description admin 显式标公开的备注（与内部 triage_notes 分离） */
            triage_notes_public?: string;
            resolution_url?: string;
            webhook_failed?: boolean;
            webhook_last_error?: string;
            /** Format: date-time */
            created_at?: string;
            /** Format: date-time */
            updated_at?: string;
        };
        /**
         * @description Public 视图：他人看公开反馈（严格脱敏）。
         *     不暴露：user_id / api_key_id_hint / webhook_url / request_ids / public_share_note /
         *     triage_notes 内部 / webhook_failed / webhook_last_error。
         */
        FeedbackPublicItem: {
            feedback_id?: string;
            /** @description 无 webhook_url 字段 */
            ai_assistant?: {
                name?: string;
                version?: string;
            };
            category?: string;
            summary?: string;
            details?: string;
            context?: {
                [key: string]: unknown;
            };
            /** @description 无 request_ids 字段 */
            evidence?: {
                frequency_estimate?: string;
            };
            competitor_examples?: string[];
            suggested_solution?: string;
            ai_priority?: string;
            internal_priority?: string;
            /** @example true */
            is_public?: boolean;
            /** Format: date-time */
            published_at?: string | null;
            status?: string;
            /** Format: date-time */
            status_changed_at?: string | null;
            dedup_with?: string | null;
            triage_notes_public?: string;
            resolution_url?: string;
            /** Format: date-time */
            created_at?: string;
        };
        MediaUploadPresignRequest: {
            /**
             * @description 输入素材用途。claim 绑定时会按 endpoint 和字段再次校验 purpose，不能跨用途复用。
             * @enum {string}
             */
            purpose: "image_edit_source" | "image_edit_mask" | "image_variation_source" | "video_input_image" | "video_input_video" | "video_input_audio";
            /**
             * @description 必须落在 purpose 对应白名单内；服务端 bind 时还会 HeadObject 复核真实类型。
             * @enum {string}
             */
            content_type: "image/png" | "image/jpeg" | "image/webp" | "video/mp4" | "video/webm" | "video/quicktime" | "audio/wav" | "audio/mpeg" | "audio/mp4" | "audio/aac" | "audio/ogg" | "audio/webm";
            /** @description 上传字节数；不同 purpose 有独立上限。 */
            content_length: number;
            /** @description Base64 MD5；R2 PUT 必须携带同值 Content-MD5。 */
            content_md5: string;
            /** @description Lowercase hex SHA-256；bind 时用于服务端一致性校验。 */
            checksum_sha256: string;
        };
        MediaUploadPresignResponse: {
            /**
             * Format: uri
             * @description 预签名 R2 PUT URL，仅在 `expires_in` 秒内有效；不要持久化或回显到日志。
             */
            upload_url: string;
            /** @enum {string} */
            method: "PUT";
            required_headers: {
                /** @example image/png */
                "Content-Type": string;
                /** @example 1B2M2Y8AsgTpgAmY7PhCfg== */
                "Content-MD5": string;
            };
            /**
             * @description 提交生成任务时使用的 claim ID；仅当前用户和当前 API Key 可绑定一次。
             * @example upl_2f8bb7d7f4a24c3a8f4f8a7e
             */
            upload_id: string;
            /** @description presign URL 有效秒数，当前为 300。 */
            expires_in: number;
            /**
             * Format: date-time
             * @description 未绑定 claim 的 UTC 过期时间；过期后可由 cleanup worker 删除临时对象。
             */
            claim_expires_at: string;
            /** @description 当前 purpose 允许的最大上传字节数。 */
            max_content_length: number;
            /**
             * Format: uri
             * @description 调试用临时对象 URL；客户端不应提交该 URL，提交任务只使用 `upload_id`。
             */
            public_url?: string;
        };
        TTSUploadPresignRequest: {
            /**
             * @description Strict allowlist; only `voice_clone_sample` is accepted in this release.
             * @enum {string}
             */
            purpose: "voice_clone_sample";
            /**
             * @description Strict allowlist; audio/wav only (MP3/M4A in a follow-up release).
             * @enum {string}
             */
            content_type: "audio/wav";
            /** @description Byte length of the file to upload. Hard cap 10 MiB (10485760). */
            content_length: number;
            /** @description Base64 MD5 (16-byte digest -> 24 chars). Enforced by R2 PUT. */
            content_md5: string;
            /** @description Lowercase hex SHA-256 (64 chars). Recomputed server-side at commit. */
            checksum_sha256: string;
        };
        TTSUploadPresignResponse: {
            /**
             * Format: uri
             * @description Pre-signed R2 PUT URL valid for `expires_in` seconds.
             */
            upload_url: string;
            /** @enum {string} */
            method: "PUT";
            /**
             * @description Headers the client must send on the PUT. `Content-Length` is omitted on purpose
             *     because browsers treat it as a forbidden header (set automatically by fetch/XHR).
             */
            required_headers: {
                /** @example audio/wav */
                "Content-Type": string;
                /** @example 1B2M2Y8AsgTpgAmY7PhCfg== */
                "Content-MD5": string;
            };
            /** @description Claim ID to pass back as `upload_id` when calling `POST /audio/voices`. */
            upload_id: string;
            /** @description Presign validity in seconds (300). */
            expires_in: number;
            /** @description Server-enforced upper bound on the upload size, in bytes (10485760). */
            max_content_length: number;
        };
        TTSSpeechRequest: {
            /** @example mimo-v2.5-tts */
            model: string;
            /** @example 你好，欢迎使用 AllToken。 */
            input: string;
            voice: components["schemas"]["VoiceField"];
            /**
             * @description First release accepts wav/pcm/mp3; opus/aac/flac return 400.
             * @default wav
             * @enum {string}
             */
            response_format: "wav" | "pcm" | "mp3" | "opus" | "aac" | "flac";
            /**
             * @description Must be 1.0 in the first release; other values return 422.
             * @default 1
             */
            speed: number;
            /**
             * @description true is not supported in the first release.
             * @default false
             */
            stream: boolean;
        };
        /** @description Builtin voice string, gateway voice_id string, or OpenAI-style {id} object. */
        VoiceField: string | {
            /** @example voice_abc123 */
            id: string;
        };
        AudioVoiceListResponse: {
            /** @enum {string} */
            object: "list";
            data: components["schemas"]["AudioVoiceObject"][];
        };
        AudioVoiceObject: {
            /** @example alloy */
            id: string;
            /** @enum {string} */
            object: "audio.voice";
            /** @example Alloy */
            name: string;
            /** @example en-US */
            language?: string;
            /** @enum {string} */
            source: "builtin" | "clone" | "design";
            /** Format: int64 */
            created_at: number;
        };
        VoiceTaskCreateRequest: {
            /** @enum {string} */
            model: "mimo-v2.5-tts-voiceclone" | "mimo-v2.5-tts-voicedesign";
            name: string;
            /**
             * @description PR-TTS-6 R2 direct-upload claim ID (recommended path, up to 10 MiB sample).
             *     Mutually exclusive with multipart `sample_audio` and `sample_audio_base64`;
             *     exclusivity check is only triggered when `upload_id` is present — legacy single-source
             *     clients see zero behavior change.
             */
            upload_id?: string;
            /** @description Clone only. Base64 audio sample, decoded size <= 10 MiB, MIME allowlist wav/mp3/mp4/m4a. */
            sample_audio_base64?: string;
            /** @description Rejected by the server; remote samples are not supported. */
            sample_audio_url?: string;
            sample_text?: string;
            /** @description Voice design prompt. */
            description?: string;
            /** @example zh-CN */
            language?: string;
            /** @description Clone requests must set consent=true. */
            consent?: boolean;
        };
        VoiceTaskResponse: {
            /** @example voice_task_abc123 */
            id: string;
            /** @enum {string} */
            object: "audio.voice.task";
            /** @enum {string} */
            status: "queued" | "running" | "completed" | "failed" | "canceled";
            /** @example mimo-v2.5-tts-voiceclone */
            model: string;
            name?: string;
            /** Format: int64 */
            created_at: number;
            /** @example voice_abc123 */
            voice_id?: string;
            /** Format: uri */
            sample_url?: string;
            /** Format: date-time */
            sample_url_expires_at?: string;
            error?: components["schemas"]["VoiceTaskError"];
        };
        VoiceTaskError: {
            type?: string;
            code?: string;
            message?: string;
        };
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
        EmbeddingRequest: {
            /**
             * @description 网关模型 ID，必须是 embedding 模型（如 text-embedding-v4）。
             * @example text-embedding-v4
             */
            model: string;
            /** @description 待向量化文本；字符串或字符串数组。 */
            input: string | string[];
            /**
             * @description float（默认）或 base64。
             * @default float
             * @enum {string}
             */
            encoding_format: "float" | "base64";
            /** @description 自定义输出维度（text-embedding-v4 支持 64~2048，默认 1024）；上游不支持时忽略。 */
            dimensions?: number;
            user?: string;
        };
        EmbeddingResponse: {
            /** @example list */
            object: string;
            data: components["schemas"]["EmbeddingObject"][];
            /** @example text-embedding-v4 */
            model: string;
            usage: {
                prompt_tokens: number;
                total_tokens: number;
            };
        };
        EmbeddingObject: {
            /** @example embedding */
            object: string;
            index: number;
            /** @description float 数组（默认）或 base64 字符串（encoding_format=base64 时）。 */
            embedding: number[] | string;
        };
        ModelList: {
            /** @enum {string} */
            object: "list";
            data: components["schemas"]["ModelInfo"][];
        };
        ModelInfo: {
            id: string;
            /** @enum {string} */
            object: "model" | "video" | "image" | "audio";
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
            modality?: "text" | "vision" | "image" | "video" | "audio";
            display_name?: string;
            brand?: string;
            family?: string;
            series?: string;
            /** Format: uri */
            logo_url?: string;
            description?: string;
            input_modalities?: string[];
            output_modalities?: string[];
            /**
             * @description Video model capability hints, only present in /videos/models responses (omitempty).
             *     Frontend uses this to render form controls; falls back to hardcoded defaults when absent.
             */
            capabilities?: components["schemas"]["VideoCapabilities"];
        };
        /**
         * @description Video model capability hints for /videos/models. These are UI hints, not
         *     server-side validation constraints. Models not in the whitelist omit this
         *     field (omitempty); the frontend falls back to hardcoded defaults.
         */
        VideoCapabilities: {
            /** @description Aspect ratio config; values=null means UI hides the ratio control */
            ratios?: {
                /**
                 * @example [
                 *       "16:9",
                 *       "9:16",
                 *       "4:3",
                 *       "3:4",
                 *       "21:9",
                 *       "1:1"
                 *     ]
                 */
                values?: string[] | null;
                /** @example 16:9 */
                default?: string;
            };
            /** @description Resolution config; values=null means single-price (UI hides control) */
            resolutions?: {
                /**
                 * @example [
                 *       "480p",
                 *       "720p",
                 *       "1080p"
                 *     ]
                 */
                values?: string[] | null;
                /** @example 720p */
                default?: string;
            };
            /**
             * @description Duration constraint; null means upstream-adaptive (e.g. happyhorse-1.0-video-edit).
             *     type=range: continuous integer range; type=enum: fixed values.
             */
            duration?: {
                /** @enum {string} */
                type?: "range" | "enum";
                /** @description Present when type=enum */
                values?: number[];
                /** @description Present when type=range */
                min?: number;
                /** @description Present when type=range */
                max?: number;
                /** @description Present when type=range */
                step?: number;
                default?: number;
                /** @description Whether duration=-1 (auto) is supported */
                supports_auto?: boolean;
            } | null;
            /** @description Frame count constraint; null means not supported (only seedance-1.0-pro is non-null) */
            frames?: {
                min?: number;
                max?: number;
                step?: number;
                base?: number;
            } | null;
            /** @description UI feature flags (hand-maintained; not server-side enforced) */
            features?: {
                generate_audio?: boolean;
                return_last_frame?: boolean;
                camera_fixed?: boolean;
                watermark?: boolean;
                seed?: boolean;
                draft?: boolean;
                service_tier_flex?: boolean;
                tools_web_search?: boolean;
            };
            /** @description Prompt constraint; null means no gateway-level limit (e.g. Seedance) */
            prompt?: {
                /** @description Max prompt length in rune count */
                max_length?: number;
            } | null;
            /** @description Multimodal input constraint; null means text-only / no constraint */
            content?: {
                image_count?: {
                    min?: number;
                    max?: number;
                };
                video_count?: {
                    min?: number;
                    max?: number;
                };
                /** @description Allowed content item roles; null means any role accepted */
                allowed_roles?: string[] | null;
            } | null;
            /** @description Supported input type identifiers (e.g. text, image_first_frame, video_reference) */
            input_types?: string[];
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
            /** @description 是否固定镜头，默认 false；仅 seedance-1.0-pro / 1.5-pro 支持 */
            camera_fixed?: boolean;
            /**
             * @description 生成视频是否加水印。不传跟随上游默认，传值显式控制
             * @default false
             */
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
            /**
             * @description 由 `POST /uploads/presign` 返回的媒体输入 claim ID。简化格式中：
             *     `type=image` 必须使用 `video_input_image`，`type=video` 必须使用
             *     `video_input_video`，`type=audio` 必须使用 `video_input_audio`。
             *     与同一 item 内的 URL 字段互斥；任务终态后输入对象会被删除。
             */
            upload_id?: string;
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
        ImageEditUploadIDRequest: {
            /** @example gpt-image-2 */
            model: string;
            /** @description `POST /uploads/presign` 以 `purpose=image_edit_source` 返回的 upload_id。 */
            image_upload_id: string;
            /** @description 编辑提示词，必填。 */
            prompt: string;
            /** @description 可选 mask；必须来自 `purpose=image_edit_mask` 的 upload_id。 */
            mask_upload_id?: string;
            /** @default 1 */
            n: number;
            /**
             * @default auto
             * @example 1024x1024
             */
            size: string;
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
            output_compression?: number;
            /**
             * @default auto
             * @enum {string}
             */
            background: "auto" | "opaque" | "transparent";
            /**
             * @default auto
             * @enum {string}
             */
            moderation: "auto" | "low";
            user?: string;
        };
        ImageVariationUploadIDRequest: {
            /** @example dall-e-2 */
            model: string;
            /** @description `POST /uploads/presign` 以 `purpose=image_variation_source` 返回的 upload_id。 */
            image_upload_id: string;
            /**
             * @default auto
             * @enum {string}
             */
            size: "auto" | "1024x1024" | "1536x1024" | "1024x1536";
            user?: string;
        };
        ImageGenerationRequest: {
            /**
             * @example wan2.7-image
             * @enum {string}
             */
            model: "gpt-image-2" | "wan2.7-image" | "wan2.7-image-pro";
            prompt: string;
            /**
             * @description 单次生成张数，1-10。
             * @default 1
             */
            n: number;
            /**
             * @description `auto` 或 `WIDTHxHEIGHT`；gpt-image-2 起支持任意分辨率（16 整除、最大 3840x2160、比例 1:3 ~ 3:1）。
             * @default auto
             * @example 1024x1024
             */
            size: string;
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
            /** @description 仅 jpeg / webp 生效，0-100；未传则上游默认 100。 */
            output_compression?: number;
            /**
             * @default auto
             * @enum {string}
             */
            background: "auto" | "opaque" | "transparent";
            /**
             * @default auto
             * @enum {string}
             */
            moderation: "auto" | "low";
            /**
             * Format: int64
             * @description 仅 `wan2.7-image` / `wan2.7-image-pro` 生效，透传到 DashScope Wan `parameters.seed`；其它图像模型不保证生效。
             */
            seed?: number;
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
        ThreedGenerationRequest: {
            /**
             * @description 网关模型 ID（`tripo-h3.1` / `tripo-p1.0` / `seed3d-2.0`）
             * @example tripo-h3.1
             */
            model: string;
            input: components["schemas"]["ThreedInput"];
            parameters?: components["schemas"]["ThreedParameters"];
        };
        /** @description 三选一互斥（prompt xor image xor images）；按模型 capability 校验，跨族错配返 400。 */
        ThreedInput: {
            /** @description 文生 3D 提示词（仅 tripo 支持） */
            prompt?: string;
            /**
             * Format: uri
             * @description 单图生 3D 图片 URL（tripo + seed3d 支持；仅 https，禁 base64，SSRF 黑名单校验）
             */
            image?: string;
            /** @description 多图生 3D（仅 tripo 支持，2-4 张 URL） */
            images?: string[];
        };
        /** @description 公共参数；不在模型 capability 接受集内的字段传入会返 400 `param_not_supported_for_model`（不静默忽略）。 */
        ThreedParameters: {
            /**
             * @description 公共档位。
             *     - seed3d-2.0：直接映射 `--subdivisionlevel low/medium/high`
             *     - tripo-h3.1：low/medium → 上游 geometry_quality=standard；high → ultra
             *     - tripo-p1.0：仅接受 low/medium（不接 high，上游无 ultra 档位）
             * @default medium
             * @enum {string}
             */
            detail_level: "low" | "medium" | "high";
            /**
             * @description 仅 tripo 系列；seed3d 传入返 400
             * @default standard
             * @enum {string}
             */
            texture_quality: "standard" | "detailed";
            /**
             * @description 是否生成 PBR 材质（仅 tripo）
             * @default true
             */
            pbr: boolean;
            /**
             * @description 是否生成贴图（仅 tripo）
             * @default true
             */
            texture: boolean;
            /**
             * @description 输出文件格式（仅 seed3d；tripo 固定 glb）
             * @default glb
             * @enum {string}
             */
            file_format: "glb" | "obj" | "usd" | "usdz";
        };
        ThreedGenerationResponse: {
            /**
             * @description 任务 ID，前缀 `td3d_`
             * @example td3d_a1b2c3d4e5f6a7b8c9d0e1f2
             */
            id: string;
            /** @enum {string} */
            object: "threed.generation";
            /**
             * @description 注意：completed 任务过期时 status **保留为 completed**，过期信号通过 `is_expired=true` + HTTP 410 + `error.code=result_expired` 表达。
             * @enum {string}
             */
            status: "queued" | "processing" | "cancelling" | "completed" | "failed" | "cancelled" | "expired";
            model: string;
            /** @enum {string} */
            input_mode?: "text" | "single_image" | "multi_image";
            /** @description 仅 status=completed 时填；按 model api_format 投影（tripo 3 资产 / seed3d 单 archive） */
            assets?: components["schemas"]["ThreedAsset"][];
            /**
             * Format: date-time
             * @description 顶层 expires_at = min(assets[].expires_at)
             */
            expires_at?: string;
            /** @description 距离 expires_at 的剩余秒数 */
            expires_in?: number;
            /** @description 仅 completed 状态有意义；true 时 HTTP 410 + error.code=result_expired */
            is_expired: boolean;
            usage?: components["schemas"]["ThreedUsage"];
            error?: components["schemas"]["ThreedError"];
            /** Format: date-time */
            created_at: string;
            /** Format: date-time */
            updated_at?: string;
            /** Format: date-time */
            completed_at?: string;
        };
        ThreedAsset: {
            /**
             * @description 资产类型。OpenAPI 用 string 而非 enum（未来供应商可能新增 role）。已知值：
             *     - `textured_model`：tripo PBR 带贴图模型
             *     - `base_mesh`：tripo 基础几何无贴图
             *     - `preview`：tripo 预览渲染图
             *     - `archive`：seed3d zip（含 contained_formats[]）
             */
            role: string;
            /** @description 文件格式（glb / png / zip / 未来 fbx / obj 等） */
            format: string;
            /**
             * Format: uri
             * @description 上游签名 URL 或固定 URL（无签名）；按 expires_at 失效
             */
            url: string;
            /** @description MIME 类型（`model/gltf-binary` / `image/png` / `application/zip`） */
            mime_type?: string;
            /**
             * Format: date-time
             * @description 该 asset 的失效时间
             */
            expires_at?: string;
            /** @description 仅 role=archive 填，描述压缩包内的文件格式（如 `[glb]`） */
            contained_formats?: string[];
        };
        ThreedUsage: {
            /** @enum {string} */
            task_type?: "text_to_3d" | "image_to_3d";
            /** @description 通常 1 */
            count?: number;
            /**
             * @description 请求参数回显
             * @enum {string}
             */
            detail_level?: "low" | "medium" | "high";
            /** @description 仅 tripo */
            texture_quality?: string;
            /** @description 仅 seed3d */
            file_format?: string;
            /**
             * Format: int64
             * @description 仅 seed3d；火山按 token 计费的审计字段（v1 chat 侧按任务计费）
             */
            completion_tokens?: number;
        };
        ThreedError: {
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
        UsageResponse: {
            /**
             * @description 当前固定 USD
             * @enum {string}
             */
            currency: "USD";
            /**
             * Format: double
             * @description USD API 使用额度数值（原始精度，可能含 6 位小数）
             */
            usage_quota: number;
            /**
             * @description 展示用 API 使用额度字符串，`$x.xx` 2 位小数 + 美元符号；负值前缀 `-$`
             * @example $9.88
             */
            usage_quota_str: string;
            token_quota: components["schemas"]["TokenBalance"];
        };
        TokenBalance: {
            /**
             * Format: int64
             * @description 所有 `remaining_tokens > 0` 的 grant token 总和
             */
            total_remaining: number;
            by_model: components["schemas"]["TokenBalanceByModel"][];
        };
        TokenBalanceByModel: {
            /** @description 限定模型 ID；`null` 表示通用 grant（可对任意模型生效） */
            model: string | null;
            /** Format: int64 */
            remaining_tokens: number;
        };
        TransactionListResponse: {
            data: {
                summary: components["schemas"]["TransactionListSummary"];
                /** @description 满足过滤条件的总行数（不受 limit/offset 影响），用于分页 UI */
                total: number;
                items: components["schemas"]["TransactionItem"][];
            };
        };
        /** @description 按方向二分汇总当前页 items（不是 total 全集汇总） */
        TransactionListSummary: {
            /** Format: int64 */
            tokens_added?: number;
            /** Format: int64 */
            tokens_deducted?: number;
            /** Format: double */
            cost_added?: number;
            /** @example $0.00 */
            cost_added_str?: string;
            /** Format: double */
            cost_deducted?: number;
            /** @example $0.00 */
            cost_deducted_str?: string;
        };
        TransactionItem: {
            /** Format: int64 */
            id: number;
            /** @description API 返回的旧版内部精确类型，如 `grant_add` / `grant_deduct` / `credit_add` / `credit_deduct` / `credit_refund` / `exchange_in` / `exchange_out` / `video_deduct` / `image_deduct` / `fee_deduct` / `fee_refund` */
            change_type: string;
            /** @description 已 i18n 翻译；按 `Accept-Language` 切换 */
            description: string;
            /** @enum {string} */
            direction: "add" | "deduct" | "exchange" | "refund";
            /** @enum {string} */
            source: "grant" | "credit" | "exchange" | "video" | "image";
            /** @description postpay / prepay（视 change_type 而定，可选） */
            pay_mode?: string;
            /** @description API 返回的旧版 category 值：recharge / consumption / refund / fee / exchange */
            category?: string;
            /**
             * Format: int64
             * @description 带正负号（add=正，deduct=负）
             */
            tokens_delta: number;
            /**
             * Format: double
             * @description 仅扣款/退款类有值；非扣款类返 null
             */
            cost: number | null;
            /** @description 4 位小数 + $ 符号前置（负数 `-$0.0023`，负零已修复为 `$0.0000`） */
            cost_str: string | null;
            /** @description 0=未指定 / 1=Web / 2=API */
            billing_type: number | null;
            /** @description i18n 翻译（Web / API / CodePlan ...） */
            billing_type_label?: string;
            model_id?: string;
            /** @description 模型展示名（来自 `or_models.display_name`，不存在时回落 model_id） */
            model?: string;
            /** Format: int64 */
            grant_id?: number | null;
            request_id?: string | null;
            remark?: string;
            details?: components["schemas"]["TransactionItemDetail"][];
            /** Format: date-time */
            created_at: string;
        };
        /** @description deduct 类附带的逐 token-type 明细（input/output/cache/reasoning ...） */
        TransactionItemDetail: {
            /** @description input / output / cache_creation / cache_hit / reasoning ... */
            token_type: string;
            tokens: number;
            /** Format: double */
            price_per_1k: number;
            price_per_1k_str: string;
            /**
             * Format: double
             * @description deduct 取正，refund 透传原符号
             */
            cost: number;
            cost_str: string;
            /** @description 价格 fallback 时记录原始 token_type */
            fallback_token_type?: string | null;
            /** @description 价格表 miss 时置 1，便于排障 */
            price_not_found?: number | null;
        };
        TransactionDetailResponse: {
            request_id: string;
            summary: components["schemas"]["TransactionDetailSummary"];
            /** @description 同一 request_id 下的多行 ledger，按 `id ASC` 排 */
            ledgers: components["schemas"]["TransactionItem"][];
        };
        TransactionDetailSummary: {
            /** Format: int64 */
            total_tokens_delta: number;
            /**
             * Format: double
             * @description 所有 ledger 行 cost 聚合后的方向化总额
             */
            total_cost: number;
            /** @description 4 位小数 + $ 符号前置 */
            total_cost_str: string;
            /**
             * Format: double
             * @description 手续费占比 `|sum(fee_cost)| / |sum(deduct_cost)|`，仅含 fee 的笔有值
             */
            fee_rate?: number | null;
            model?: string;
            billing_type?: number | null;
            category?: string;
            /** Format: date-time */
            first_created_at?: string | null;
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
        /** @description API 使用额度不足（网关扩展的 402） */
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
        /** @description 超出限流 */
        TooManyRequests: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["ErrorResponse"];
            };
        };
        /** @description 请求体或样本过大 */
        PayloadTooLarge: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["ErrorResponse"];
            };
        };
        /** @description 请求语义校验失败 */
        UnprocessableEntity: {
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
    parameters: {
        FeedbackCategory: "missing_endpoint" | "missing_capability" | "missing_model" | "model_quality" | "performance" | "reliability" | "pricing" | "documentation" | "error_message" | "business_gap" | "out_of_scope";
        FeedbackStatus: "received" | "triaging" | "planned" | "in_progress" | "shipped" | "wontfix" | "duplicate" | "needs_more_info";
        /** @description 关键字搜索 summary+details；rune ≤ 1 返 400 invalid_q */
        FeedbackQ: string;
        /** @description YYYY-MM-DD（UTC midnight） */
        FeedbackDateFrom: string;
        /** @description YYYY-MM-DD（UTC midnight，exclusive 上限） */
        FeedbackDateTo: string;
        FeedbackSort: "created_desc" | "created_asc" | "status_changed_desc";
        FeedbackLimit: number;
        FeedbackOffset: number;
    };
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    listOwnFeedback: {
        parameters: {
            query?: {
                category?: components["parameters"]["FeedbackCategory"];
                status?: components["parameters"]["FeedbackStatus"];
                /** @description 关键字搜索 summary+details；rune ≤ 1 返 400 invalid_q */
                q?: components["parameters"]["FeedbackQ"];
                /** @description YYYY-MM-DD（UTC midnight） */
                date_from?: components["parameters"]["FeedbackDateFrom"];
                /** @description YYYY-MM-DD（UTC midnight，exclusive 上限） */
                date_to?: components["parameters"]["FeedbackDateTo"];
                sort?: components["parameters"]["FeedbackSort"];
                limit?: components["parameters"]["FeedbackLimit"];
                offset?: components["parameters"]["FeedbackOffset"];
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data?: {
                            total?: number;
                            items?: components["schemas"]["FeedbackSelfItem"][];
                        };
                    };
                };
            };
        };
    };
    submitFeedback: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["FeedbackSubmitRequest"];
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["FeedbackSubmitResponse"];
                };
            };
            /** @description 字段校验失败（invalid_category / summary_too_short / summary_too_long / invalid_webhook_url / payload_too_large / malformed_json / 等） */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description 缺少或非法 API Key */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description AI 助手在黑名单（ai_assistant_blocked，PR-2 接通） */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description 超过 50/天/key 限制（PR-2 接通） */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getFeedback: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                feedback_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Self / Public 视图 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description 不存在或无权限（feedback_not_found） */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    listPublicFeedback: {
        parameters: {
            query?: {
                category?: components["parameters"]["FeedbackCategory"];
                status?: components["parameters"]["FeedbackStatus"];
                /** @description 关键字搜索 summary+details；rune ≤ 1 返 400 invalid_q */
                q?: components["parameters"]["FeedbackQ"];
                /** @description YYYY-MM-DD（UTC midnight） */
                date_from?: components["parameters"]["FeedbackDateFrom"];
                /** @description YYYY-MM-DD（UTC midnight，exclusive 上限） */
                date_to?: components["parameters"]["FeedbackDateTo"];
                sort?: components["parameters"]["FeedbackSort"];
                limit?: components["parameters"]["FeedbackLimit"];
                offset?: components["parameters"]["FeedbackOffset"];
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data?: {
                            total?: number;
                            items?: components["schemas"]["FeedbackPublicItem"][];
                        };
                    };
                };
            };
            /** @description 非法过滤参数（invalid_category / invalid_status / invalid_sort / invalid_q / invalid_date_range / invalid_limit / invalid_offset） */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    listFeedbackCategories: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data?: {
                            items?: {
                                value?: string;
                                name?: string;
                                description?: string;
                            }[];
                        };
                    };
                };
            };
        };
    };
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
    createEmbedding: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["EmbeddingRequest"];
            };
        };
        responses: {
            /** @description 向量列表 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["EmbeddingResponse"];
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
                     *           ],
                     *           "capabilities": {
                     *             "ratios": {
                     *               "values": [
                     *                 "16:9",
                     *                 "9:16",
                     *                 "4:3",
                     *                 "3:4",
                     *                 "21:9",
                     *                 "1:1",
                     *                 "adaptive"
                     *               ],
                     *               "default": "16:9"
                     *             },
                     *             "resolutions": {
                     *               "values": [
                     *                 "480p",
                     *                 "720p",
                     *                 "1080p"
                     *               ],
                     *               "default": "720p"
                     *             },
                     *             "duration": {
                     *               "type": "range",
                     *               "min": 4,
                     *               "max": 15,
                     *               "default": 5,
                     *               "supports_auto": true
                     *             },
                     *             "frames": null,
                     *             "features": {
                     *               "generate_audio": true,
                     *               "return_last_frame": true,
                     *               "camera_fixed": false,
                     *               "watermark": true,
                     *               "seed": true,
                     *               "draft": false,
                     *               "service_tier_flex": false,
                     *               "tools_web_search": true
                     *             },
                     *             "prompt": null,
                     *             "content": null,
                     *             "input_types": [
                     *               "text",
                     *               "image_first_frame",
                     *               "image_first_last_frame",
                     *               "image_reference",
                     *               "video_reference",
                     *               "draft_task",
                     *               "multimodal"
                     *             ]
                     *           }
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
    createSpeech: {
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
                 *       "model": "mimo-v2.5-tts",
                 *       "input": "你好，欢迎使用 AllToken。",
                 *       "voice": "mimo:default",
                 *       "response_format": "wav",
                 *       "speed": 1
                 *     }
                 */
                "application/json": components["schemas"]["TTSSpeechRequest"];
            };
        };
        responses: {
            /** @description Binary audio bytes */
            200: {
                headers: {
                    "X-Request-Id"?: string;
                    "X-Characters-Count"?: number;
                    "X-Voice-Id"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "audio/wav": string;
                    "audio/L16; rate=24000": string;
                    "audio/mpeg": string;
                };
            };
            400: components["responses"]["BadRequest"];
            401: components["responses"]["Unauthorized"];
            404: components["responses"]["NotFound"];
            422: components["responses"]["UnprocessableEntity"];
            429: components["responses"]["TooManyRequests"];
        };
    };
    listAudioVoices: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Audio voice list */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AudioVoiceListResponse"];
                };
            };
            401: components["responses"]["Unauthorized"];
        };
    };
    createAudioVoiceTask: {
        parameters: {
            query?: never;
            header?: {
                /** @description 24-hour idempotency key for voice task creation. */
                "Idempotency-Key"?: string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["VoiceTaskCreateRequest"];
            };
        };
        responses: {
            /** @description Voice task accepted */
            202: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["VoiceTaskResponse"];
                };
            };
            400: components["responses"]["BadRequest"];
            401: components["responses"]["Unauthorized"];
            413: components["responses"]["PayloadTooLarge"];
            429: components["responses"]["TooManyRequests"];
        };
    };
    createVoiceSampleUploadPresign: {
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
                 *       "purpose": "voice_clone_sample",
                 *       "content_type": "audio/wav",
                 *       "content_length": 524288,
                 *       "content_md5": "1B2M2Y8AsgTpgAmY7PhCfg==",
                 *       "checksum_sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
                 *     }
                 */
                "application/json": components["schemas"]["TTSUploadPresignRequest"];
            };
        };
        responses: {
            /** @description Presigned upload instructions */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TTSUploadPresignResponse"];
                };
            };
            400: components["responses"]["BadRequest"];
            401: components["responses"]["Unauthorized"];
            413: components["responses"]["PayloadTooLarge"];
            429: components["responses"]["TooManyRequests"];
        };
    };
    getAudioVoiceTask: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @example voice_task_abc123 */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Voice task state */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["VoiceTaskResponse"];
                };
            };
            401: components["responses"]["Unauthorized"];
            404: components["responses"]["NotFound"];
            410: components["responses"]["Gone"];
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
    createMediaUploadPresign: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["MediaUploadPresignRequest"];
            };
        };
        responses: {
            /** @description Presigned upload instructions */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MediaUploadPresignResponse"];
                };
            };
            400: components["responses"]["BadRequest"];
            401: components["responses"]["Unauthorized"];
            413: components["responses"]["PayloadTooLarge"];
            429: components["responses"]["TooManyRequests"];
            500: components["responses"]["ServerError"];
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
                "application/json": components["schemas"]["ImageEditUploadIDRequest"];
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
                "application/json": components["schemas"]["ImageVariationUploadIDRequest"];
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
    createAsync3DGeneration: {
        parameters: {
            query?: never;
            header?: {
                /** @description 24h 短期去重；命中时直接返既有 task 的当前状态。 */
                "Idempotency-Key"?: string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ThreedGenerationRequest"];
            };
        };
        responses: {
            /** @description 任务已入队，使用 `GET /3d/generations/{id}` 轮询 */
            202: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ThreedGenerationResponse"];
                };
            };
            /** @description 请求参数错误（含 param_not_supported_for_model / detail_level_not_supported / image_url_not_allowed / invalid_input_mode 等） */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description 余额不足 */
            402: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description 无可用供应商 / 计费未配置 */
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
    create3DGeneration: {
        parameters: {
            query?: never;
            header?: {
                "Idempotency-Key"?: string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ThreedGenerationRequest"];
            };
        };
        responses: {
            /** @description 任务已入队 */
            202: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ThreedGenerationResponse"];
                };
            };
        };
    };
    get3DGeneration: {
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
            /** @description 任务状态 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ThreedGenerationResponse"];
                };
            };
            404: components["responses"]["NotFound"];
            /** @description 结果 URL 已过期（completed + is_expired=true） */
            410: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ThreedGenerationResponse"];
                };
            };
        };
    };
    cancel3DGeneration: {
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
            /** @description 已取消 + 全额退款 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ThreedGenerationResponse"];
                };
            };
            404: components["responses"]["NotFound"];
            /** @description 任务状态不允许取消（已完成 / 已失败 / 已取消 / 已开始轮询的 processing） */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description 上游 cancel 失败（seed3d 路径；任务回滚到原状态，未退款） */
            502: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    getUsage: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description API 使用额度信息 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UsageResponse"];
                };
            };
            401: components["responses"]["Unauthorized"];
            500: components["responses"]["ServerError"];
        };
    };
    listTransactions: {
        parameters: {
            query?: {
                limit?: number;
                offset?: number;
                /** @description API 返回的旧版 change_type 值，可精确单选（与 source/direction 互斥；如 `grant_deduct` / `credit_add`） */
                change_type?: string;
                /** @description API 返回的旧版 source 值：grant / credit / exchange / video / image */
                source?: "grant" | "credit" | "exchange" | "video" | "image";
                /** @description add / deduct / exchange / refund */
                direction?: "add" | "deduct" | "exchange" | "refund";
                /** @description 0=全部 / 1=Web / 2=API */
                billing_type?: 0 | 1 | 2;
                /** @description YYYY-MM-DD（含） */
                date_from?: string;
                /** @description YYYY-MM-DD（含）；`date_from > date_to` 返 400 */
                date_to?: string;
                /** @description 按 model 精确过滤 */
                model?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 流水列表 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TransactionListResponse"];
                };
            };
            400: components["responses"]["BadRequest"];
            401: components["responses"]["Unauthorized"];
            500: components["responses"]["ServerError"];
        };
    };
    getTransactionByRequestID: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description 网关在每次请求时下发的 `x-gateway-request-id`（或 `chatcmpl-id`） */
                request_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 单笔账单详情 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TransactionDetailResponse"];
                };
            };
            400: components["responses"]["BadRequest"];
            401: components["responses"]["Unauthorized"];
            404: components["responses"]["NotFound"];
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
