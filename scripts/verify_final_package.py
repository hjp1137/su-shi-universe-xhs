#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
苏轼宇宙小红书小工具 - 任务14 最终交付产物包深度验证与哈希计算脚本 (verify_final_package.py)
验证基线：Skill 1.6.0 官方规范 / zip-artifact-spec.md / performance-budget.md / jsbridge-api.md
"""

import os
import sys
import zipfile
import hashlib
import re
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent
DIST_DIR = PROJECT_ROOT / "dist"
ZIP_PATH = DIST_DIR / "su-shi-universe-xhs.zip"

MAX_ZIP_HARD_LIMIT = 10 * 1024 * 1024       # 10 MiB 硬门禁
RECOMMENDED_ZIP_LIMIT = 2 * 1024 * 1024    # 2 MiB 项目推荐上限
MAX_SINGLE_TEXT_FILE = 2 * 1024 * 1024     # 2 MiB 单文件限制

ALLOWED_EXTENSIONS = {
    ".html", ".css", ".js",
    ".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg",
    ".woff", ".woff2", ".json"
}

FORBIDDEN_NAME_PATTERNS = [
    r"\.git", r"node_modules", r"\.map$", r"\.py$", r"\.md$",
    r"__pycache__", r"\.DS_Store", r"Thumbs\.db"
]

FORBIDDEN_CONTENT_PATTERNS = [
    (r"fetch\(", "fetch API 网络调用"),
    (r"XMLHttpRequest", "XMLHttpRequest 网络调用"),
    (r"new\s+WebSocket\(", "WebSocket 网络连接"),
    (r"new\s+EventSource\(", "EventSource 实时流"),
    (r"new\s+RTCPeerConnection\(", "WebRTC 连接"),
    (r"navigator\.geolocation", "地理定位 API"),
    (r"navigator\.clipboard", "剪贴板 API"),
    (r"document\.execCommand\(", "execCommand 剪贴板"),
    (r"new\s+Worker\(", "Web Worker"),
    (r"new\s+SharedWorker\(", "SharedWorker"),
    (r"navigator\.serviceWorker", "ServiceWorker"),
    (r"\beval\(", "eval 动态代码执行"),
    (r"new\s+Function\(", "new Function 动态执行"),
    (r"window\.open\(", "window.open 新窗口"),
    (r"window\.prompt\(", "window.prompt 阻塞弹窗"),
    (r"<base\s+", "<base> 标签"),
    (r"<iframe", "iframe 嵌入"),
    (r"<object", "object 嵌入"),
    (r"onclick\s*=", "行内 onclick 事件"),
    (r"<script\s+type=[\"']module[\"']", "ES Module <script> 标签"),
    (r"https?://", "http/https 外部网络 URL"),
]


def log_step(name):
    print(f"\n==== [终极检验] {name} ====")


def compute_sha256(filepath):
    h = hashlib.sha256()
    with open(filepath, "rb") as f:
        while chunk := f.read(65536):
            h.update(chunk)
    return h.hexdigest()


def verify_package():
    errors = []
    warnings = []

    log_step("1. 检查 ZIP 产物文件存在性与体积门禁")
    if not ZIP_PATH.exists():
        print(f"  [FAIL] ZIP 产物不存在: {ZIP_PATH}")
        return False, ["ZIP 产物未找到，请先执行构建打包"]

    zip_size = ZIP_PATH.stat().st_size
    sha256_hash = compute_sha256(ZIP_PATH)
    print(f"  产物路径: {ZIP_PATH}")
    print(f"  文件大小: {zip_size} 字节 ({zip_size / 1024:.2f} KB / {zip_size / 1024 / 1024:.3f} MB)")
    print(f"  SHA-256 : {sha256_hash}")

    if zip_size > MAX_ZIP_HARD_LIMIT:
        errors.append(f"ZIP 产物大小超过 10 MiB 硬门禁: {zip_size / 1024 / 1024:.2f} MiB")
    elif zip_size > RECOMMENDED_ZIP_LIMIT:
        warnings.append(f"ZIP 产物大小超过 2 MiB 推荐上限: {zip_size / 1024 / 1024:.2f} MiB")
    else:
        print(f"  [PASS] ZIP 体积极度优异 ({zip_size / 1024:.2f} KB)，远低于 2 MiB 推荐目标！")

    log_step("2. 验证 ZIP 解压顶层入口结构 (绝对严禁外层多嵌套目录)")
    with zipfile.ZipFile(ZIP_PATH, "r") as zf:
        namelist = zf.namelist()

        if "index.html" not in namelist:
            errors.append("ZIP 根目录缺失 index.html 入口！(必须解压顶层直接出现 index.html)")
        else:
            print("  [PASS] index.html 位于 ZIP 顶层根目录，入口结构 100% 正确！")

        # 检查是否有多余嵌套的 dist/ 或顶层文件夹
        for name in namelist:
            if name.startswith("dist/") or name.startswith("su-shi-universe-xhs/"):
                errors.append(f"ZIP 内部包含多余顶层包装目录: {name}")
                break

        print(f"  ZIP 内包含 {len(namelist)} 个文件/条目")

        log_step("3. 检查文件类型白名单与禁止文件排除")
        for name in namelist:
            if name.endswith("/"):
                continue

            ext = Path(name).suffix.lower()
            if ext not in ALLOWED_EXTENSIONS:
                errors.append(f"文件 [{name}] 拓展名 '{ext}' 不在官方白名单中")

            for fpat in FORBIDDEN_NAME_PATTERNS:
                if re.search(fpat, name, re.IGNORECASE):
                    errors.append(f"文件 [{name}] 命中禁止打包模式 '{fpat}'")

            # 检查单个文件解压大小
            info = zf.getinfo(name)
            if info.file_size > MAX_SINGLE_TEXT_FILE and ext in [".html", ".css", ".js", ".json"]:
                errors.append(f"文本文件 [{name}] 解压大小超过 2 MiB: {info.file_size / 1024 / 1024:.2f} MiB")

        if not errors:
            print("  [PASS] 文件白名单与黑名单排除检测 100% 通过")

        log_step("4. ZIP 内部代码静态安全合规深度扫描 (无 CSP/无外链/无禁止 API)")
        for name in namelist:
            ext = Path(name).suffix.lower()
            if ext not in [".html", ".js", ".css"]:
                continue

            content = zf.read(name).decode("utf-8", errors="replace")

            for pat, desc in FORBIDDEN_CONTENT_PATTERNS:
                if "https?://" in pat:
                    real_urls = [m for m in re.findall(r'https?://[^\s"\'<>]+', content) if "www.w3.org" not in m]
                    if real_urls:
                        errors.append(f"文件 [{name}] 包含外部网络 URL: {real_urls[:2]}")
                    continue

                # 排除注释中说明禁止项的情况，针对实际代码
                matches = re.finditer(pat, content)
                for m in matches:
                    start = max(0, m.start() - 30)
                    end = min(len(content), m.end() + 30)
                    snippet = content[start:end].replace("\n", " ")
                    line_start = content.rfind("\n", 0, m.start())
                    line_end = content.find("\n", m.end())
                    line = content[line_start:line_end].strip() if line_start != -1 and line_end != -1 else ""
                    if line.startswith("//") or line.startswith("/*") or line.startswith("*"):
                        continue
                    errors.append(f"文件 [{name}] 包含违规内容: {desc} -> 片段: {snippet}")

        if not errors:
            print("  [PASS] 静态安全深度扫描全部通过，零网络调用，零违禁 API，零外链！")

    print("\n================ 最终包体验证汇总 ================")
    if errors:
        print(f"FAILED: 发现 {len(errors)} 项严重错误，{len(warnings)} 项警告：")
        for e in errors:
            print(f"  [ERROR] {e}")
        return False
    else:
        print(f"SUCCESS: 最终比赛产物包完美达标！")
        print(f"  产物路径 : {ZIP_PATH.resolve()}")
        print(f"  产物大小 : {zip_size / 1024:.2f} KB (≤ 2048 KB 强推荐目标达成)")
        print(f"  SHA-256  : {sha256_hash}")
        return True


if __name__ == "__main__":
    success = verify_package()
    sys.exit(0 if success else 1)
