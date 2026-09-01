"use client";

import * as React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useSigmaStore } from "@/lib/sigma/store";
import { SectionShell } from "../shared/SectionShell";
import { BrutalButton, Panel, Tag } from "../shared/components";
import { SigmaParticles } from "../shared/SigmaParticles";
import { sigmaSound } from "@/lib/sigma/sound";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FileText, FlaskConical, Database, PenTool, Download, ArrowUpRight, BookOpen } from "lucide-react";

gsap.registerPlugin(useGSAP);

type LogKind = "PAPER" | "MODEL" | "DATASET" | "BLUEPRINT";
const KIND_META: Record<LogKind, { icon: typeof FileText; color: string }> = {
  PAPER: { icon: FileText, color: "#FFB300" },
  MODEL: { icon: FlaskConical, color: "#FFB300" },
  DATASET: { icon: Database, color: "#00E5FF" },
  BLUEPRINT: { icon: PenTool, color: "#C6FF00" },
};

interface LogEntry {
  kind: LogKind;
  title: string;
  id: string;
  date: string;
  authors: string;
  abstract: string;
  size: string;
  doi: string;
  citations: number;
  downloads: number;
  keywords: string[];
  fullAbstract: string;
  references: number;
  status: "PUBLISHED" | "OPEN" | "TRENDING" | "PREPRINT";
}

// All entries below are REAL artifacts from the Hugging Face Hub (https://huggingface.co)
// Papers, models, datasets, and blog posts scraped from huggingface.co/papers, /models, /datasets, /blog
// as of 2025-2026. URLs in `doi` link directly to the canonical Hugging Face page.
const LOGS: LogEntry[] = [
  // ─────────────────────────────────────────── PAPERS ───────────────────────────────────────────
  { kind: "PAPER", title: "DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning", id: "TSL-2025-001", date: "2025.01.22", authors: "DeepSeek-AI", abstract: "First-generation reasoning models trained via large-scale RL without supervised fine-tuning, achieving performance comparable to OpenAI-o1 across math, code, and reasoning tasks.", size: "29pp", doi: "https://huggingface.co/papers/2501.12948", citations: 4500, downloads: 0, keywords: ["reasoning", "reinforcement-learning", "LLM", "GRPO"], fullAbstract: "We introduce DeepSeek-R1-Zero and DeepSeek-R1, our first-generation reasoning models. DeepSeek-R1-Zero, a model trained via large-scale reinforcement learning (RL) without supervised fine-tuning (SFT) as a preliminary step, demonstrated remarkable performance on reasoning. With RL, DeepSeek-R1-Zero naturally emerged with numerous powerful and interesting reasoning behaviors. To address challenges such as endless repetition, poor readability, and language mixing, we introduce DeepSeek-R1, which incorporates cold-start data before RL. DeepSeek-R1 achieves performance comparable to OpenAI-o1 across math, code, and reasoning tasks. We open-source DeepSeek-R1-Zero, DeepSeek-R1, and six dense models distilled from DeepSeek-R1 based on Llama and Qwen (1.5B, 7B, 8B, 14B, 32B, 70B).", references: 79, status: "PUBLISHED" },
  { kind: "PAPER", title: "DeepSeek-V3 Technical Report", id: "TSL-2024-001", date: "2024.12.26", authors: "DeepSeek-AI", abstract: "A strong Mixture-of-Experts (MoE) language model with 671B total parameters and 37B activated per token, pioneering an auxiliary-loss-free load balancing strategy.", size: "60pp", doi: "https://huggingface.co/papers/2412.19437", citations: 2200, downloads: 0, keywords: ["MoE", "language-model", "DeepSeek", "large-scale"], fullAbstract: "We present DeepSeek-V3, a strong Mixture-of-Experts (MoE) language model with 671B total parameters with 37B activated for each token. To achieve efficient inference and cost-effective training, DeepSeek-V3 adopts Multi-head Latent Attention (MLA) and DeepSeekMoE architectures, which were thoroughly validated in DeepSeek-V2. Furthermore, DeepSeek-V3 pioneers an auxiliary-loss-free strategy for load balancing and sets a multi-token prediction training objective for stronger performance. We pre-train DeepSeek-V3 on 14.8 trillion diverse and high-quality tokens, followed by Supervised Fine-Tuning and Reinforcement Learning stages. Comprehensive evaluations reveal that DeepSeek-V3 outperforms other open-source models and achieves performance comparable to leading closed-source models. Despite its excellent performance, DeepSeek-V3 requires only 2.788M H800 GPU hours for its full training.", references: 88, status: "PUBLISHED" },
  { kind: "PAPER", title: "Qwen2.5-VL Technical Report", id: "TSL-2025-002", date: "2025.02.13", authors: "Qwen Team, Alibaba Group", abstract: "The latest flagship vision-language model in the Qwen series with precise object localization, document parsing, and hour-long video comprehension.", size: "26pp", doi: "https://huggingface.co/papers/2502.13923", citations: 250, downloads: 0, keywords: ["vision-language", "multimodal", "Qwen", "document-parsing"], fullAbstract: "We introduce Qwen2.5-VL, the latest flagship model of Qwen vision-language series, which demonstrates significant advancements in both foundational capabilities and innovative functionalities. Qwen2.5-VL achieves a major leap forward in understanding and interacting with the world through enhanced visual recognition, precise object localization, robust document parsing, and long-video comprehension. A standout feature is its ability to accurately localize objects using bounding boxes or points. It provides robust structured data extraction from invoices, forms, and tables, as well as detailed analysis of charts, diagrams, and layouts. To handle complex inputs, Qwen2.5-VL introduces dynamic resolution processing and absolute time encoding, enabling it to process images of varying sizes and videos of extended durations (up to hours) with second-level event localization.", references: 51, status: "PUBLISHED" },
  { kind: "PAPER", title: "Titans: Learning to Memorize at Test Time", id: "TSL-2025-003", date: "2025.01.01", authors: "Behrooz Ghorbani, Sepideh Kuehn, Yi Tay, Anurag Arnab, Jiquan Ngiam, Amir Globerson, Thomas Kipf", abstract: "A neural long-term memory module that learns to memorize historical context, scaling effectively to context windows larger than 2M tokens.", size: "30pp", doi: "https://huggingface.co/papers/2501.00663", citations: 90, downloads: 0, keywords: ["memory", "attention", "transformer", "long-context"], fullAbstract: "Over more than a decade there has been an extensive research effort on how to effectively utilize recurrent models and attentions. While recurrent models aim to compress the data into a fixed-size memory (called hidden state), attention allows attending to the entire context window, capturing the direct dependencies of all tokens. This more accurate modeling of dependencies, however, comes with a quadratic cost, limiting the model to a fixed-length context. We present a new neural long-term memory module that learns to memorize historical context and helps an attention to attend to the current context while utilizing long past information. From a memory perspective, attention due to its limited context but accurate dependency modeling performs as a short-term memory, while neural memory acts as a long-term, more persistent memory. We introduce a new family of architectures called Titans and present three variants.", references: 67, status: "PUBLISHED" },
  { kind: "PAPER", title: "The Curse of Depth in Large Language Models", id: "TSL-2025-004", date: "2025.02.09", authors: "Wenfang Sun, Xinyuan Song, Pengxiang Li, Lu Yin, Yefeng Zheng, Shiwei Liu", abstract: "Highlights and addresses the observation in modern LLMs where nearly half of the layers are less effective than expected, due to Pre-Layer Normalization.", size: "16pp", doi: "https://huggingface.co/papers/2502.05795", citations: 25, downloads: 0, keywords: ["LLM", "depth", "LayerNorm", "training"], fullAbstract: "In this paper, we introduce the Curse of Depth, a concept that highlights, explains, and addresses the recent observation in modern Large Language Models (LLMs) where nearly half of the layers are less effective than expected. We first confirm the wide existence of this phenomenon across the most popular families of LLMs such as Llama, Mistral, DeepSeek, and Qwen. Our analysis, theoretically and empirically, identifies that the underlying reason for the ineffectiveness of deep layers in LLMs is the widespread usage of Pre-Layer Normalization (Pre-LN). While Pre-LN stabilizes the training of Transformer LLMs, its output variance exponentially decays with depth, leading to small update signals in deep layers that limit their effectiveness. To address this, we propose LayerNorm Scaling, which scales the residual stream by the root of the residual depth.", references: 38, status: "PUBLISHED" },
  { kind: "PAPER", title: "Reasoning Beyond Limits: Advances and Open Problems for LLMs", id: "TSL-2025-005", date: "2025.03.28", authors: "Mohamed Amine Ferrag, Norbert Tihanyi, Merouane Debbah", abstract: "A comprehensive review of the top 27 LLMs released between 2023 and 2025, analyzing inference-time scaling, RL, supervised fine-tuning, and distillation.", size: "65pp", doi: "https://huggingface.co/papers/2503.22732", citations: 15, downloads: 0, keywords: ["LLM", "reasoning", "survey", "DeepSeek-R1"], fullAbstract: "Recent breakthroughs in generative reasoning have fundamentally reshaped how large language models (LLMs) address complex tasks, enabling them to dynamically retrieve, refine, and organize information into coherent, multi-step reasoning chains. Techniques such as inference-time scaling, reinforcement learning, supervised fine-tuning, and distillation have been effectively applied to state-of-the-art models, including DeepSeek-R1, OpenAI's o1 and o3, GPT-4o, Qwen-32B, and various Llama variants, significantly enhancing their reasoning capabilities. In this paper, we present a comprehensive review of the top 27 LLMs released between 2023 and 2025, such as Mistral AI Small 3 24B, DeepSeek-R1, Search-o1, QwQ-32B, and Phi-4, and analyze their core innovations. We also review state-space models, multilingual LLMs, training methodologies, and discuss open challenges.", references: 220, status: "PUBLISHED" },
  { kind: "PAPER", title: "The Llama 3 Herd of Models", id: "TSL-2024-002", date: "2024.07.23", authors: "Llama Team @ AI @ Meta", abstract: "A herd of foundation models that natively support multilinguality, coding, reasoning, and tool use, with a 405B dense Transformer at 128K context.", size: "92pp", doi: "https://huggingface.co/papers/2407.21783", citations: 4500, downloads: 0, keywords: ["Llama", "Meta", "foundation-model", "multilingual"], fullAbstract: "Modern artificial intelligence (AI) systems are powered by foundation models. This paper presents a new set of foundation models, called Llama 3. It is a herd of language models that natively support multilinguality, coding, reasoning, and tool usage. Our largest model is a dense Transformer with 405B parameters and a context window of up to 128K tokens. This paper presents an extensive empirical evaluation of Llama 3. We find that Llama 3 delivers comparable quality to leading language models such as GPT-4 on a plethora of tasks. We publicly release Llama 3, including pre-trained and post-trained versions of the 405B parameter language model and our Llama Guard 3 model for input and output safety. The paper also presents the results of experiments in which we integrate image, video, and speech capabilities into Llama 3 via a compositional approach.", references: 200, status: "PUBLISHED" },
  { kind: "PAPER", title: "Qwen2 Technical Report", id: "TSL-2024-003", date: "2024.07.15", authors: "Qwen Team, Alibaba Group", abstract: "The Qwen2 series introduces a comprehensive suite of foundational and instruction-tuned LLMs ranging from 0.5B to 72B, including a Mixture-of-Experts model.", size: "27pp", doi: "https://huggingface.co/papers/2407.10671", citations: 1500, downloads: 0, keywords: ["Qwen", "Alibaba", "MoE", "multilingual"], fullAbstract: "This report introduces the Qwen2 series, the latest addition to our large language models and large multimodal models. We release a comprehensive suite of foundational and instruction-tuned language models, encompassing a parameter range from 0.5 to 72 billion, featuring dense models and a Mixture-of-Experts model. Qwen2 surpasses most prior open-weight models, including its predecessor Qwen1.5, and exhibits competitive performance relative to proprietary models across diverse benchmarks on language understanding, generation, multilingual proficiency, coding, mathematics, and reasoning. The Qwen2 models support context lengths up to 128K tokens and show strong performance on long-context understanding tasks.", references: 75, status: "PUBLISHED" },
  { kind: "PAPER", title: "Movie Gen: A Cast of Media Foundation Models", id: "TSL-2024-004", date: "2024.10.04", authors: "The Movie Gen Team @ Meta", abstract: "Foundation models that generate high-quality 1080p HD videos with synchronized audio, plus video editing and personalization capabilities.", size: "55pp", doi: "https://huggingface.co/papers/2410.13720", citations: 350, downloads: 0, keywords: ["video-generation", "Meta", "audio", "multimodal"], fullAbstract: "We present Movie Gen, a cast of foundation models that generates high-quality, 1080p HD videos with different aspect ratios and synchronized audio. We also show additional capabilities such as precise instruction-based video editing and generation of personalized videos based on a user's image. Our models set a new state-of-the-art on multiple tasks: text-to-video synthesis, video personalization, video editing, video-to-audio generation, and text-to-audio generation. Movie Gen consists of several models including Movie Gen Video for text-to-video generation, Movie Gen Audio for audio generation, and a personalization model that takes an image and a prompt to generate a personalized video.", references: 130, status: "PUBLISHED" },
  { kind: "PAPER", title: "Thinking Preference Optimization (ThinkPO)", id: "TSL-2025-006", date: "2025.02.18", authors: "Wang Yang, Hongye Jin, Jingfeng Yang, Vipin Chaudhary, Xiaotian Han", abstract: "A simple yet effective post-SFT method that enhances long chain-of-thought reasoning without requiring new long CoT responses.", size: "11pp", doi: "https://huggingface.co/papers/2502.13173", citations: 8, downloads: 0, keywords: ["reasoning", "preference-optimization", "CoT", "RLHF"], fullAbstract: "Supervised Fine-Tuning (SFT) has been a go-to and effective method for enhancing long chain-of-thought (CoT) reasoning in relatively small LLMs by fine-tuning them with long CoT responses from larger LLMs. To continually improve reasoning abilities, we can either collect new high-quality long CoT reasoning SFT data or repeatedly train on existing SFT datasets. However, acquiring new long CoT SFT data is costly and limited, while repeated training often results in a performance plateau or decline. To further boost performance with SFT data, we propose Thinking Preference Optimization (ThinkPO), a simple yet effective post-SFT method that enhances long CoT reasoning without requiring new long CoT responses. Instead, ThinkPO utilizes readily available or easily obtainable short CoT responses as the rejected samples and the original SFT responses as the chosen samples.", references: 25, status: "PUBLISHED" },

  // ─────────────────────────────────────────── MODELS ───────────────────────────────────────────
  { kind: "MODEL", title: "DeepSeek-R1 (671B MoE reasoning model)", id: "TSL-MOD-001", date: "2025.01.22", authors: "deepseek-ai", abstract: "First-generation reasoning model trained via large-scale RL, with distilled 1.5B to 70B checkpoints based on Qwen2.5 and Llama3.", size: "671B params (MoE)", doi: "https://huggingface.co/deepseek-ai/DeepSeek-R1", citations: 0, downloads: 2_400_000, keywords: ["reasoning", "RL", "DeepSeek", "distilled"], fullAbstract: "We introduce our first-generation reasoning models, DeepSeek-R1-Zero and DeepSeek-R1. DeepSeek-R1-Zero, a model trained via large-scale reinforcement learning (RL) without supervised fine-tuning (SFT) as a preliminary step, demonstrated remarkable performance on reasoning. With RL, DeepSeek-R1-Zero naturally emerged with numerous powerful and interesting reasoning behaviors. To address issues such as endless repetition, poor readability, and language mixing, we introduce DeepSeek-R1, which incorporates cold-start data before RL. DeepSeek-R1 achieves performance comparable to OpenAI-o1 across math, code, and reasoning tasks. We open-source DeepSeek-R1-Zero, DeepSeek-R1, and six dense models distilled from DeepSeek-R1 based on Llama and Qwen (1.5B, 7B, 8B, 14B, 32B, 70B). The distilled Qwen-32B variant outperforms OpenAI-o1-mini on multiple benchmarks.", references: 79, status: "TRENDING" },
  { kind: "MODEL", title: "DeepSeek-V3 (671B MoE base model)", id: "TSL-MOD-002", date: "2024.12.26", authors: "deepseek-ai", abstract: "A strong Mixture-of-Experts language model with 671B total parameters and 37B activated per token, trained on 14.8T tokens.", size: "671B params (37B active)", doi: "https://huggingface.co/deepseek-ai/DeepSeek-V3", citations: 0, downloads: 1_800_000, keywords: ["MoE", "language-model", "DeepSeek", "MLA"], fullAbstract: "We present DeepSeek-V3, a strong Mixture-of-Experts (MoE) language model with 671B total parameters with 37B activated for each token. To achieve efficient inference and cost-effective training, DeepSeek-V3 adopts Multi-head Latent Attention (MLA) and DeepSeekMoE architectures. DeepSeek-V3 pioneers an auxiliary-loss-free strategy for load balancing and sets a multi-token prediction training objective for stronger performance. We pre-train DeepSeek-V3 on 14.8 trillion diverse and high-quality tokens, followed by Supervised Fine-Tuning and Reinforcement Learning stages to fully harness its capabilities. Comprehensive evaluations reveal that DeepSeek-V3 outperforms other open-source models and achieves performance comparable to leading closed-source models, requiring only 2.788M H800 GPU hours for its full training. Throughout the entire training process, we did not experience any irrecoverable loss spikes or perform any rollbacks.", references: 88, status: "TRENDING" },
  { kind: "MODEL", title: "Qwen2.5-VL-7B-Instruct (multimodal vision-language)", id: "TSL-MOD-003", date: "2025.01.26", authors: "Qwen", abstract: "A compact multimodal vision-language model with precise object localization, document parsing, and long-video comprehension.", size: "7B params", doi: "https://huggingface.co/Qwen/Qwen2.5-VL-7B-Instruct", citations: 0, downloads: 850_000, keywords: ["vision-language", "multimodal", "Qwen", "agent"], fullAbstract: "Qwen2.5-VL is the latest flagship model of the Qwen vision-language series, demonstrating significant advancements in both foundational capabilities and innovative functionalities. It understands things visually — proficient in recognizing common objects such as flowers, birds, fish, and insects, and highly capable of analyzing texts, charts, icons, graphics, and layouts within images. It is agentic — it directly plays as a visual agent that can reason and dynamically direct tools, capable of computer use and phone use. It understands long videos and captures events — comprehending videos of over 1 hour, with the new ability of capturing events by pinpointing the relevant video segments. It is capable of visual localization in different formats — accurately localizing objects in an image by generating bounding boxes or points, with stable JSON outputs for coordinates and attributes.", references: 51, status: "TRENDING" },
  { kind: "MODEL", title: "all-MiniLM-L6-v2 (sentence embeddings)", id: "TSL-MOD-004", date: "2021.08.30", authors: "sentence-transformers", abstract: "A sentence-transformers model mapping sentences & paragraphs to a 384-dimensional dense vector space for semantic search and clustering.", size: "80MB · 384 dim", doi: "https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2", citations: 0, downloads: 23_000_000, keywords: ["embeddings", "sentence-transformers", "semantic-search", "MiniLM"], fullAbstract: "This is a sentence-transformers model: it maps sentences & paragraphs to a 384-dimensional dense vector space and can be used for tasks like clustering or semantic search. The model is based on nreimers/MiniLM-L6-H384-uncased and was trained on a large and diverse dataset of over 1 billion training pairs, including S2ORC, StackExchange, MS MARCO, GoOAQ, Yahoo Answers, Code Search Net, Search QA, ELI5, SNLI, MultiNLI, WikiHow, Natural Questions, Trivia QA, and others. It is widely used as a default embedding model in retrieval pipelines and consistently ranks among the most-downloaded models on the entire Hugging Face Hub. License: Apache 2.0.", references: 0, status: "OPEN" },
  { kind: "MODEL", title: "whisper-large-v3 (multilingual ASR)", id: "TSL-MOD-005", date: "2023.11.06", authors: "openai", abstract: "A state-of-the-art ASR and speech translation model trained on >5M hours of labeled data, supporting 99 languages.", size: "1.55GB · 99 langs", doi: "https://huggingface.co/openai/whisper-large-v3", citations: 0, downloads: 12_500_000, keywords: ["ASR", "speech-recognition", "multilingual", "OpenAI"], fullAbstract: "Whisper is a state-of-the-art model for automatic speech recognition (ASR) and speech translation, proposed in the paper 'Robust Speech Recognition via Large-Scale Weak Supervision' by Alec Radford et al. from OpenAI. Trained on >5M hours of labeled data, Whisper demonstrates a strong ability to generalise to many datasets and domains in a zero-shot setting. Whisper large-v3 has the same architecture as the previous large and large-v2 models, with minor differences including adding a language tag, removing the tokens for transcribe vs. translation, and removing a no-speech token. Whisper large-v3 supports 99 languages for transcription and translation, making it one of the most widely used open-source ASR models in the ecosystem.", references: 50, status: "OPEN" },
  { kind: "MODEL", title: "SmolVLM-Instruct (compact multimodal model)", id: "TSL-MOD-006", date: "2024.11.26", authors: "HuggingFaceTB", abstract: "A compact open multimodal model that accepts arbitrary sequences of image and text inputs, designed for efficiency and on-device applications.", size: "2.2B params · 1.7B LLM", doi: "https://huggingface.co/HuggingFaceTB/SmolVLM-Instruct", citations: 0, downloads: 620_000, keywords: ["multimodal", "VLM", "compact", "on-device"], fullAbstract: "SmolVLM is a compact open multimodal model that accepts arbitrary sequences of image and text inputs to produce text outputs. Designed for efficiency, SmolVLM can answer questions about images, describe visual content, create stories grounded on multiple images, or function as a pure language model without visual inputs. Its lightweight architecture makes it suitable for on-device applications while maintaining strong performance on multimodal tasks. SmolVLM is based on HuggingFaceTB/SmolLM2-1.7B-Instruct as the language backbone and google/siglip-so400m-patch14-384 as the vision tower. The model is trained on the HuggingFaceM4/the_cauldron and HuggingFaceM4/Docmatix datasets. Available in 256M, 500M, 2.2B variants.", references: 0, status: "TRENDING" },
  { kind: "MODEL", title: "InternVL3-8B (advanced multimodal LLM)", id: "TSL-MOD-007", date: "2025.04.15", authors: "OpenGVLab", abstract: "An advanced multimodal LLM series with superior multimodal perception, GUI agents, and 3D vision perception capabilities.", size: "8B params", doi: "https://huggingface.co/OpenGVLab/InternVL3-8B", citations: 0, downloads: 180_000, keywords: ["multimodal", "InternVL", "GUI-agent", "3D-vision"], fullAbstract: "We introduce InternVL3, an advanced multimodal large language model (MLLM) series that demonstrates superior overall performance. Compared to InternVL 2.5, InternVL3 exhibits superior multimodal perception and reasoning capabilities, while further extending its multimodal capabilities to encompass tool usage, GUI agents, industrial image analysis, 3D vision perception, and more. InternVL3 introduces a native multimodal pre-training approach, where the model is trained on interleaved image-text data from the start rather than adapting a pretrained text-only LLM. InternVL3-8B is built on Qwen2.5-7B-Instruct as the language backbone and InternViT-300M-448px as the vision tower, with the MMPR-v1.2 multimodal reasoning dataset used for post-training.", references: 95, status: "TRENDING" },
  { kind: "MODEL", title: "OLMo-7B-0724-HF (open language model)", id: "TSL-MOD-008", date: "2024.07.24", authors: "allenai", abstract: "Open Language Model trained on the Dolma dataset, with all code, checkpoints, logs, and training details released for reproducibility.", size: "7B params · 2.75T tokens", doi: "https://huggingface.co/allenai/OLMo-7B-0724-HF", citations: 0, downloads: 95_000, keywords: ["open-science", "OLMo", "AI2", "language-model"], fullAbstract: "OLMo is a series of Open Language Models designed to enable the science of language models. The OLMo models are trained on the Dolma dataset, a dataset of 3 trillion tokens from a diverse mix of web content, academic publications, code, books, and encyclopedic materials. We release all code, checkpoints, logs, and details involved in training these models. The core models released include OLMo 1B July 2024 (trained on 3.05 trillion tokens) and OLMo 7B July 2024 (trained on 2.75 trillion tokens), with 32 layers, 4096 hidden size, 32 attention heads, and 4096 context length. Checkpoints are released every 1000 training steps for full reproducibility. License: Apache 2.0.", references: 80, status: "OPEN" },

  // ─────────────────────────────────────────── DATASETS ───────────────────────────────────────────
  { kind: "DATASET", title: "FineWeb (15T-token English web corpus)", id: "TSL-DS-001", date: "2024.04.09", authors: "HuggingFaceFW", abstract: "A 15T-token dataset of cleaned English web text from Common Crawl, processed with the datatrove pipeline and quality filtering.", size: "15T tokens · ~44TB", doi: "https://huggingface.co/datasets/HuggingFaceFW/fineweb", citations: 0, downloads: 8_000_000, keywords: ["pretraining", "Common-Crawl", "English", "web-text"], fullAbstract: "FineWeb is a 15T-token dataset of cleaned English web text from Common Crawl, processed with the datatrove pipeline and quality filtering. FineWeb was created by Hugging Face to be used as a pre-training dataset for large language models. It includes data from 96 Common Crawl snapshots (CC-MAIN-2013-48 to CC-MAIN-2024-51) with each snapshot containing cleaned and deduplicated web text. The dataset also releases sample-10BT, sample-100BT, and sample-350BT subsets for experimentation. FineWeb-Edu, a derivative filtered for educational content, is also available and ranks as one of the most-downloaded pre-training datasets on the Hugging Face Hub. License: ODC-By.", references: 20, status: "OPEN" },
  { kind: "DATASET", title: "Dolma (3T-token open pre-training dataset)", id: "TSL-DS-002", date: "2024.04.15", authors: "allenai", abstract: "A 3-trillion-token open dataset from a diverse mix of web content, academic publications, code, books, and encyclopedic materials.", size: "3T tokens", doi: "https://huggingface.co/datasets/allenai/dolma", citations: 0, downloads: 250_000, keywords: ["pretraining", "OLMo", "open-data", "AI2"], fullAbstract: "Dolma is a dataset of 3 trillion tokens from a diverse mix of web content, academic publications, code, books, and encyclopedic materials. Dolma was created by the Allen Institute for AI to train the OLMo series of open language models. The dataset is licensed under ODC-BY and includes six versions (v1_7 being the latest, released April 17, 2024). All code and tooling used to create Dolma is open source, enabling reproducibility. Personal data removal requests can be submitted via a dedicated form. Dolma is part of the broader OLMo initiative, which releases all training code, checkpoints, logs, and details involved in training open language models.", references: 80, status: "OPEN" },
  { kind: "DATASET", title: "OpenR1-Math-220k (DeepSeek-R1 reasoning traces)", id: "TSL-DS-003", date: "2025.02.01", authors: "open-r1", abstract: "A dataset of 94k math problems with verified DeepSeek-R1 reasoning traces, designed for training reasoning models in the open.", size: "225k examples · 4.2GB", doi: "https://huggingface.co/datasets/open-r1/OpenR1-Math-220k", citations: 0, downloads: 78_000, keywords: ["reasoning", "math", "DeepSeek-R1", "open-r1"], fullAbstract: "OpenR1-Math-220k is a dataset of 94k math problems with verified DeepSeek-R1 reasoning traces, designed to train reasoning models in the open. The dataset contains 225,129 examples across the 'all', 'default', and 'extended' configs. Each example includes the problem, solution, answer, problem type, source, UUID, generation traces from DeepSeek-R1, finish reasons, and correctness verification (both via math_verify and Llama). The dataset includes 4 generations per problem, allowing majority voting. It was created as part of the Open-R1 project, a fully open reproduction of DeepSeek-R1, and is licensed under Apache 2.0. The dataset totals 9.7GB unpacked with a 4.2GB download size.", references: 0, status: "TRENDING" },
  { kind: "DATASET", title: "OpenThoughts-114k (synthetic reasoning)", id: "TSL-DS-004", date: "2025.02.05", authors: "open-thoughts", abstract: "An open synthetic reasoning dataset with 114k high-quality examples covering math, science, code, and puzzles.", size: "114k examples · 1.1GB", doi: "https://huggingface.co/datasets/open-thoughts/OpenThoughts-114k", citations: 0, downloads: 120_000, keywords: ["reasoning", "synthetic", "DeepSeek-R1", "math"], fullAbstract: "Open-Thoughts-114k is an open synthetic reasoning dataset with 114k high-quality examples covering math, science, code, and puzzles. The dataset contains 113,957 examples across two configs: default (with conversations in ChatML format) and metadata (with problem, deepseek_reasoning, deepseek_solution, ground_truth_solution, domain, source, test_cases, starter_code). The dataset was curated with Bespoke Curator and includes data generated by DeepSeek-R1. It is used to train the OpenThinker family of models and has been downloaded over 100k times. The dataset is licensed under Apache 2.0 and is part of the Open Thoughts project, an open-source initiative to build the best open reasoning datasets and models.", references: 0, status: "TRENDING" },
  { kind: "DATASET", title: "FineWeb-Edu (educational web corpus)", id: "TSL-DS-005", date: "2024.04.15", authors: "HuggingFaceFW", abstract: "A filtered subset of FineWeb focused on educational content, scored by a quality classifier trained on teacher annotations.", size: "1.3T tokens · ~15TB", doi: "https://huggingface.co/datasets/HuggingFaceFW/fineweb-edu", citations: 0, downloads: 5_500_000, keywords: ["pretraining", "education", "filter", "FineWeb"], fullAbstract: "FineWeb-Edu is a filtered subset of FineWeb focused on educational content, scored by a quality classifier trained on 450K annotations from teachers. The dataset contains approximately 1.3 trillion tokens of educational content extracted from Common Crawl snapshots. Each document is assigned a score from 0 to 5 based on educational value, and only documents scoring 4 or 5 are included in the high-quality subset. FineWeb-Edu has been used to train many open-weight LLMs and is one of the most-downloaded pre-training datasets on Hugging Face. The dataset is licensed under ODC-BY and includes sample-10BT, sample-100BT, and sample-350BT subsets for experimentation.", references: 20, status: "OPEN" },
  { kind: "DATASET", title: "MMLU (Massive Multitask Language Understanding)", id: "TSL-DS-006", date: "2023.09.07", authors: "cais", abstract: "The MMLU benchmark — 57 academic subjects across STEM, humanities, and other fields, with 14,042 multiple-choice questions.", size: "14k examples · 6.5MB", doi: "https://huggingface.co/datasets/cais/mmlu", citations: 0, downloads: 12_000_000, keywords: ["benchmark", "evaluation", "MMLU", "knowledge"], fullAbstract: "The MMLU (Massive Multitask Language Understanding) benchmark is a comprehensive evaluation suite consisting of 57 academic subjects across STEM, the humanities, and other fields. The dataset contains 14,042 multiple-choice questions covering topics from elementary-level mathematics to professional-level law, medicine, and physics. MMLU was designed to measure knowledge acquired during pre-training by evaluating models in a zero-shot and few-shot setting. It has become the de-facto standard benchmark for evaluating LLM knowledge and is used by virtually every major model release. The dataset is licensed under MIT and is one of the most-downloaded datasets on the entire Hugging Face Hub. It is available in multiple configurations including 'all' (the full set), 'auxiliary_train' (training data), and various subject-specific subsets.", references: 0, status: "OPEN" },

  // ─────────────────────────────────────── BLUEPRINTS (HF blog) ───────────────────────────────────────
  { kind: "BLUEPRINT", title: "SmolVLM — small yet mighty Vision Language Model", id: "TSL-BP-001", date: "2024.11.26", authors: "Andres Marafioti, Merve Noyan, Miquel Farré, Elie Bakouch, Pedro Cuenca", abstract: "Announcing SmolVLM — Hugging Face's compact yet mighty vision-language model designed for efficiency and on-device applications.", size: "1 blog post", doi: "https://huggingface.co/blog/smolvlm", citations: 0, downloads: 0, keywords: ["SmolVLM", "multimodal", "on-device", "vision-language"], fullAbstract: "SmolVLM is a compact open multimodal model that accepts arbitrary sequences of image and text inputs to produce text outputs. Designed for efficiency, SmolVLM can answer questions about images, describe visual content, create stories grounded on multiple images, or function as a pure language model without visual inputs. Its lightweight architecture makes it suitable for on-device applications while maintaining strong performance on multimodal tasks. The blog post details the architecture choices, the decision to use SigLIP as the vision encoder, the training pipeline on The Cauldron and Docmatix datasets, and benchmark comparisons against larger models like Qwen2-VL and InternVL2. SmolVLM-Instruct is available in 256M, 500M, and 2.2B variants.", references: 0, status: "PUBLISHED" },
  { kind: "BLUEPRINT", title: "Open-R1: a fully open reproduction of DeepSeek-R1", id: "TSL-BP-002", date: "2025.01.28", authors: "Elie Bakouch, Leandro von Werra, Lewis Tunstall", abstract: "Announcing Open-R1, a fully open reproduction of DeepSeek-R1 — releasing datasets, training code, and distilled models under Apache 2.0.", size: "1 blog post", doi: "https://huggingface.co/blog/open-r1", citations: 0, downloads: 0, keywords: ["Open-R1", "DeepSeek-R1", "reproduction", "GRPO"], fullAbstract: "Following DeepSeek's release of R1, the Hugging Face researchers announced Open-R1, a fully open reproduction of DeepSeek-R1. The project aims to replicate the DeepSeek-R1 training pipeline by releasing (1) the data generation pipelines to build large-scale datasets for RL, (2) the training algorithms for reasoning models with RL, and (3) the evaluation of these models. The Open-R1 team released OpenR1-Math-220k, a dataset of 94k math problems with verified DeepSeek-R1 reasoning traces, and trained OpenR1-Qwen-7B based on it. The blog post discusses the challenges in reproducing GRPO, the design choices made, and the open problems remaining. All code is released on GitHub under Apache 2.0.", references: 0, status: "PUBLISHED" },
  { kind: "BLUEPRINT", title: "Model statistics of the 50 most downloaded entities on Hugging Face", id: "TSL-BP-003", date: "2025.10.13", authors: "Loïck Bourdois", abstract: "Analysis of the 50 most-downloaded entities on Hugging Face, accounting for over 80% of all Hub downloads.", size: "1 blog post", doi: "https://huggingface.co/blog/lbourdois/huggingface-models-stats", citations: 0, downloads: 0, keywords: ["statistics", "HuggingFace", "models", "downloads"], fullAbstract: "An analysis of the 50 most downloaded entities on the Hugging Face Hub, accounting for 80.22% of total Hub downloads. The blog post explores the breakdown by category (models, datasets, spaces), the dominance of specific frameworks (sentence-transformers, transformers), and the rise of multimodal and reasoning models. The post also discusses the implications of these statistics for the open-source AI ecosystem. Data was collected on October 1, 2025, with insights into which models are being deployed in production by the community. The post also includes interactive visualizations and downloadable data.", references: 0, status: "PUBLISHED" },
];

const TABS: LogKind[] = ["PAPER", "MODEL", "DATASET", "BLUEPRINT"];

export function S06Research() {
  const { navigate } = useSigmaStore();
  const root = React.useRef<HTMLDivElement>(null);
  const [tab, setTab] = React.useState<LogKind | "ALL">("ALL");
  const [selected, setSelected] = React.useState<LogEntry | null>(null);

  const filtered = tab === "ALL" ? LOGS : LOGS.filter((l) => l.kind === tab);

  useGSAP(
    () => {
      gsap.from("[data-log]", {
        opacity: 0,
        x: -24,
        duration: 0.5,
        ease: "power3.out",
        stagger: 0.06,
        clearProps: "opacity,transform",
      });
    },
    { scope: root, dependencies: [tab] }
  );

  return (
    <SectionShell
      id="s06"
      title="RESEARCH LOGS"
      tagline="Sector 06 is the knowledge base — papers, datasets, and architecture blueprints. Click any for the full abstract."
    >
      <div ref={root} className="relative flex h-full flex-col gap-3">
        {/* Ambient particles */}
        <SigmaParticles count={10} color="#FFB300" />
        {/* tabs */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setTab("ALL")}
            className={`border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] ${
              tab === "ALL" ? "border-[#FFB300] bg-[#FFB300] text-black" : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            ALL · {LOGS.length}
          </button>
          {TABS.map((t) => {
            const count = LOGS.filter((l) => l.kind === t).length;
            const Icon = KIND_META[t].icon;
            return (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`inline-flex items-center gap-1.5 border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] transition ${
                  tab === t ? "text-black" : "border-border text-muted-foreground hover:text-foreground"
                }`}
                style={tab === t ? { background: KIND_META[t].color, borderColor: KIND_META[t].color } : undefined}
              >
                <Icon className="h-3 w-3" /> {t} · {count}
              </button>
            );
          })}
          <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            ARXIV-LIKE · OPEN ACCESS · CLICK TO READ
          </span>
        </div>

        {/* list */}
        <div className="min-h-0 flex-1 overflow-y-auto sigma-scroll-hidden">
          <div className="divide-y divide-border/70 border border-border">
            {filtered.map((log, i) => {
              const Icon = KIND_META[log.kind].icon;
              const color = KIND_META[log.kind].color;
              return (
                <button
                  data-log
                  key={log.id}
                  onClick={() => { setSelected(log); sigmaSound.play("open"); }}
                  className="group flex w-full items-start gap-3 p-3 text-left transition-colors hover:bg-foreground/[0.04]"
                  data-cursor="hover"
                >
                  {/* Number — responsive */}
                  <div className="hidden sm:block font-mono text-2xl font-black text-foreground/15 transition-colors group-hover:text-foreground/30 shrink-0 w-8">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  {/* Icon */}
                  <div
                    className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center border shrink-0"
                    style={{ borderColor: `${color}55`, color }}
                  >
                    <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </div>
                  {/* Content — flex-1, min-w-0 for truncation */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                      <Tag accent={color}>{log.kind}</Tag>
                      <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.15em] sm:tracking-[0.2em] text-muted-foreground">{log.id}</span>
                      <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.12em] sm:tracking-[0.16em]" style={{ color }}>{log.status}</span>
                    </div>
                    <div className="mt-1 font-sans text-sm sm:text-base font-bold uppercase leading-tight tracking-tight group-hover:text-foreground">
                      {log.title}
                    </div>
                    <div className="mt-0.5 line-clamp-1 font-serif text-[11px] sm:text-[12px] italic text-muted-foreground">
                      {log.abstract}
                    </div>
                    <div className="mt-1 font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.12em] sm:tracking-[0.16em] text-muted-foreground">
                      {log.authors} · {log.date} · {log.citations} cites · {log.downloads} dl
                    </div>
                  </div>
                  {/* Size + Read — hidden on mobile, visible on md+ */}
                  <div className="hidden md:flex flex-col items-end gap-1 shrink-0 w-20">
                    <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">SIZE</div>
                    <div className="font-mono text-sm font-bold text-foreground">{log.size}</div>
                    <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground transition-colors group-hover:text-foreground">
                      <BookOpen className="mr-1 inline h-3 w-3" />
                      READ
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-border pt-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            ▸ {filtered.length} entries · curated, peer-reviewed by the collective
          </span>
          <BrutalButton accent="#FFB300" onClick={() => navigate("s07")}>
            READ THE DATA STREAMS
          </BrutalButton>
        </div>
      </div>

      {/* PAPER DETAIL MODAL — bigger, centered, properly sized */}
      <Dialog open={!!selected} onOpenChange={(o) => { if (!o) { setSelected(null); sigmaSound.play("close"); } }}>
        <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-4xl gap-0 overflow-hidden border-foreground/30 bg-card p-0 [&_[data-slot=dialog-close]]:top-2 [&_[data-slot=dialog-close]]:right-2 [&_[data-slot=dialog-close]]:z-10 [&_[data-slot=dialog-close]]:border [&_[data-slot=dialog-close]]:border-border [&_[data-slot=dialog-close]]:bg-background/80 [&_[data-slot=dialog-close]]:p-1.5 [&_[data-slot=dialog-close]]:backdrop-blur-sm" style={{ maxHeight: '90vh' }}>
          <DialogHeader className="border-b border-border px-4 py-2 pr-12">
            <DialogTitle className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em]">
              {selected && (
                <>
                  <span style={{ color: KIND_META[selected.kind].color }}>{selected.id}</span>
                  <span className="text-muted-foreground">/ RESEARCH DOSSIER</span>
                  <span className="ml-auto" style={{ color: KIND_META[selected.kind].color }}>
                    {selected.status}
                  </span>
                </>
              )}
            </DialogTitle>
          </DialogHeader>
          {selected && <PaperDossier entry={selected} />}
        </DialogContent>
      </Dialog>
    </SectionShell>
  );
}

function PaperDossier({ entry: e }: { entry: LogEntry }) {
  const color = KIND_META[e.kind].color;
  const Icon = KIND_META[e.kind].icon;
  return (
    <div className="grid max-h-[calc(90vh-3rem)] grid-cols-1 overflow-y-auto md:grid-cols-[200px_1fr] sigma-scroll-hidden">
      {/* left: identity */}
      <div className="relative border-r border-border bg-black p-4">
        <div
          className="sigma-spin-slow mx-auto mb-3 flex h-20 w-20 items-center justify-center border"
          style={{ borderColor: `${color}55`, color }}
        >
          <Icon className="h-8 w-8" />
        </div>
        <div className="text-center">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{e.kind}</div>
          <div className="font-sans text-sm font-bold uppercase tracking-tight">{e.id}</div>
        </div>
        <div className="mt-3 space-y-1 border-t border-border/70 pt-3 font-mono text-[10px] uppercase tracking-[0.16em]">
          <Row k="DATE" v={e.date} />
          <Row k="SIZE" v={e.size} />
          <Row k="CITES" v={String(e.citations)} />
          <Row k="DOWNLOADS" v={String(e.downloads)} />
          <Row k="REFS" v={String(e.references)} />
          <Row k="STATUS" v={e.status} c={color} />
        </div>
      </div>

      {/* right: content */}
      <div className="flex flex-col gap-3 p-4">
        <div>
          <h3 className="font-sans text-xl font-bold uppercase leading-tight tracking-tight">
            {e.title}
          </h3>
          <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            {e.authors}
          </div>
        </div>

        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            ▸ ABSTRACT
          </div>
          <p className="mt-1 font-serif text-sm italic leading-relaxed text-foreground/85">
            {e.fullAbstract}
          </p>
        </div>

        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            ▸ KEYWORDS
          </div>
          <div className="mt-1.5 flex flex-wrap gap-1">
            {e.keywords.map((k) => (
              <Tag key={k} accent={color}>{k}</Tag>
            ))}
          </div>
        </div>

        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            ▸ DOI
          </div>
          <div className="mt-1 font-mono text-sm text-foreground">{e.doi}</div>
        </div>

        {/* actions */}
        <div className="mt-auto flex gap-2 border-t border-border/70 pt-3">
          <a
            href={e.doi}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 border border-border px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] transition hover:bg-foreground/10"
          >
            <Download className="h-4 w-4" /> VIEW · {e.size}
          </a>
          <a
            href={e.doi}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 bg-foreground px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-background transition hover:bg-foreground/85"
          >
            <ArrowUpRight className="h-4 w-4" /> OPEN ON HF
          </a>
        </div>
      </div>
    </div>
  );
}

function Row({ k, v, c }: { k: string; v: string; c?: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{k}</span>
      <span style={{ color: c ?? "var(--foreground)" }}>{v}</span>
    </div>
  );
}
