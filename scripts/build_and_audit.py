#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
苏轼宇宙小工具 - 构建、静态审计与打包脚本
符合小红书官方 minitool-zip-builder-1.6.0 规范
"""

import os
import sys
import shutil
import zipfile
import re
import subprocess
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent
DIST_DIR = PROJECT_ROOT / "dist"
PACKAGE_NAME = "su-shi-universe-xhs.zip"
ZIP_OUTPUT = DIST_DIR / PACKAGE_NAME
SKILL_AUDIT_SCRIPT = PROJECT_ROOT / ".skill" / "minitool-zip-builder" / "scripts" / "audit_artifact.py"

ALLOWED_EXTENSIONS = {
    ".html", ".css", ".js",
    ".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg",
    ".woff", ".woff2", ".json"
}

FORBIDDEN_PATTERNS = [
    (r"fetch\(", "fetch API 网络请求"),
    (r"XMLHttpRequest", "XMLHttpRequest 网络请求"),
    (r"new\s+WebSocket\(", "WebSocket 实时连接"),
    (r"new\s+EventSource\(", "EventSource 实时连接"),
    (r"new\s+RTCPeerConnection\(", "RTCPeerConnection"),
    (r"navigator\.geolocation", "地理定位 API"),
    (r"navigator\.clipboard", "剪贴板 API"),
    (r"document\.execCommand\(", "execCommand 剪贴板操作"),
    (r"navigator\.bluetooth", "蓝牙 API"),
    (r"navigator\.usb", "USB API"),
    (r"new\s+Worker\(", "Web Worker"),
    (r"new\s+SharedWorker\(", "SharedWorker"),
    (r"navigator\.serviceWorker", "Service Worker"),
    (r"eval\(", "eval 动态执行"),
    (r"new\s+Function\(", "new Function 动态执行"),
    (r"window\.open\(", "window.open 打开新窗口"),
    (r"<base\s+", "<base> 标签"),
    (r"<iframe", "iframe 嵌套"),
    (r"<object", "object 嵌套"),
    (r"onclick\s*=", "行内 onclick 事件"),
    (r"https?://", "http/https 外部网络资源引用"),
]


def clean_dist():
    if DIST_DIR.exists():
        shutil.rmtree(DIST_DIR)
    DIST_DIR.mkdir(parents=True, exist_ok=True)
    print(f"[1/5] 已清理并初始化输出目录: {DIST_DIR}")


def copy_runtime_files():
    runtime_entries = [
        ("index.html", DIST_DIR / "index.html"),
        ("assets", DIST_DIR / "assets"),
        ("src", DIST_DIR / "src"),
        ("data", DIST_DIR / "data"),
    ]

    for src_name, dst_path in runtime_entries:
        src_path = PROJECT_ROOT / src_name
        if not src_path.exists():
            continue
        if src_path.is_file():
            shutil.copy2(src_path, dst_path)
        elif src_path.is_dir():
            shutil.copytree(src_path, dst_path, ignore=shutil.ignore_patterns("*.md", "*.git*", "*.map"))

    print("[2/5] 运行时文件已复制到 dist/ 目录")


def check_dist_compliance():
    print("[3/5] 正在执行小红书端能力与静态合规检查...")
    errors = []

    # 1. 检查 index.html 是否位于根目录
    if not (DIST_DIR / "index.html").is_file():
        errors.append("根目录下缺失 index.html 入口文件！")

    # 2. 检查文件后缀
    for path in DIST_DIR.rglob("*"):
        if path.is_file():
            ext = path.suffix.lower()
            if ext not in ALLOWED_EXTENSIONS and path.name != PACKAGE_NAME:
                errors.append(f"发现未经官方允许的文件类型: {path.relative_to(DIST_DIR)}")

    # 3. 检查 HTML / JS / CSS 源码内容是否有禁用模式
    text_suffixes = {".html", ".css", ".js"}
    for path in DIST_DIR.rglob("*"):
        if path.is_file() and path.suffix.lower() in text_suffixes:
            try:
                content = path.read_text(encoding="utf-8")
            except Exception as e:
                errors.append(f"无法读取文件 {path}: {e}")
                continue

            rel_path = path.relative_to(DIST_DIR).as_posix()

            # 针对 index.html 特别检查是否有内联 <script>...</script>
            if path.name == "index.html":
                # 排除带有 src 的 script
                script_inline = re.findall(r"<script(?![^>]*\bsrc=)[^>]*>(.*?)</script>", content, re.DOTALL | re.IGNORECASE)
                for s in script_inline:
                    if s.strip():
                        errors.append(f"{rel_path}: 存在内联脚本代码，违背容器 CSP 约束")

            # 检查禁用特征
            for pattern, desc in FORBIDDEN_PATTERNS:
                # 在检查外链时，排除 xmlns 命名空间声明（例如 svg 的 xmlns="http://www.w3.org/2000/svg"）
                if "https?://" in pattern and path.suffix.lower() == ".svg":
                    continue
                matches = re.findall(pattern, content, re.IGNORECASE)
                if matches:
                    # 针对 https?:// 检查，进一步判断是否是真正的外链
                    if "https?://" in pattern:
                        real_urls = [m for m in re.findall(r'https?://[^\s"\'<>]+', content) if "www.w3.org" not in m]
                        if real_urls:
                            errors.append(f"{rel_path}: 发现外部网络 URL 引用: {real_urls[:3]}")
                    else:
                        errors.append(f"{rel_path}: 命中被禁能力或不合规模式: {desc}")

    if errors:
        for err in errors:
            print(f"  [ERROR] {err}")
        return False
    print("  [PASS] 端能力与文件格式合规检查通过")
    return True


def create_zip():
    print(f"[4/5] 正在打包为离线 zip: {PACKAGE_NAME} ...")
    # 严格遵照规范：压缩目录内的所有文件，使解压后第一级直接呈现 index.html
    with zipfile.ZipFile(ZIP_OUTPUT, "w", compression=zipfile.ZIP_DEFLATED) as zf:
        for root, dirs, files in os.walk(DIST_DIR):
            for file in sorted(files):
                if file == PACKAGE_NAME:
                    continue
                full_path = Path(root) / file
                rel_path = full_path.relative_to(DIST_DIR)
                zf.write(full_path, arcname=rel_path.as_posix())

    zip_size_kb = ZIP_OUTPUT.stat().st_size / 1024
    print(f"  [PASS] 打包成功，包体积: {zip_size_kb:.2f} KB (小于 2048 KB 建议上限)")


def run_official_audit():
    print("[5/5] 正在执行小红书官方 Skill 审计脚本 (audit_artifact.py)...")
    if not SKILL_AUDIT_SCRIPT.exists():
        print(f"  [ERROR] 官方审计脚本不存在: {SKILL_AUDIT_SCRIPT}")
        return False

    # 1. 审计 dist 目录
    print("\n--- 官方脚本审计产物目录 (dist/) ---")
    res_dir = subprocess.run([sys.executable, str(SKILL_AUDIT_SCRIPT), str(DIST_DIR)], capture_output=True, text=True)
    print(res_dir.stdout.strip())
    if res_dir.stderr.strip():
        print(res_dir.stderr.strip())

    # 2. 审计 zip 文件
    print(f"\n--- 官方脚本审计产物 ZIP ({PACKAGE_NAME}) ---")
    res_zip = subprocess.run([sys.executable, str(SKILL_AUDIT_SCRIPT), str(ZIP_OUTPUT)], capture_output=True, text=True)
    print(res_zip.stdout.strip())
    if res_zip.stderr.strip():
        print(res_zip.stderr.strip())

    if res_dir.returncode != 0 or res_zip.returncode != 0:
        print("\n  [FAIL] 官方 Skill 审计未通过！")
        return False

    print("\n  [PASS] 官方 Skill 审计全部通过！")
    return True


def main():
    clean_dist()
    copy_runtime_files()
    if not check_dist_compliance():
        sys.exit(1)
    create_zip()
    if not run_official_audit():
        sys.exit(1)
    print(f"\n==========================================")
    print(f"构建与官方校验全部完成！")
    print(f"产物目录: {DIST_DIR}")
    print(f"ZIP 产物: {ZIP_OUTPUT}")
    print(f"==========================================")


if __name__ == "__main__":
    main()
